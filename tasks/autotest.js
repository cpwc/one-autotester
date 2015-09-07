'use strict';

var async = require('async');

module.exports = function (grunt) {

    var config = grunt.file.readJSON('one-config.json');

    grunt.initConfig({
        exec: {
            autotester: {
                cmd: function (src, qur, out, redirect) {
                    return config.path.autotester + ' ' + src + ' ' + qur + ' ' + out + ' > ' + redirect;
                }
            }
        }
    });

    grunt.registerTask('autotest', 'Get all the files requested to run with AutoTester', function () {

        var files = [];
        var args = this.args;

        async.series([
            function (done) {
                args.forEach(function (arg) {
                    var sources = grunt.file.expand('tests/' + arg + '-src-*.txt');
                    var queries = grunt.file.expand('tests/' + arg + '-qur-*.txt');

                    if (sources.length != queries.length) {
                        grunt.fail.warn('Number of source files and query files does not tally.');
                    }

                    for (var i = 0; i < sources.length; i++) {
                        var results = sources[i].replace('.txt', '').split('-');
                        files.push({
                            source: sources[i],
                            query: queries[i],
                            out: results[0] + '-out-' + results[2] + '.xml',
                            redirect: results[0] + '-out-' + results[2] + '.out',
                        });
                    }

                    console.log(files);
                    done();
                });
            },
            function (done) {
                files.forEach(function (file) {
                    grunt.task.run('exec:autotester:' + file.source + ":" + file.query + ":" + file.out + ":" + file.redirect);
                })
                done();
            }
        ]);

    });
};
