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

        var finish = this.async();

        async.series([
            function (done) {
                args.forEach(function (arg) {
                    var sourceFilePattern = config.path.tests + (config.pattern.source).replace("[args]", arg).replace("[no]", "*");
                    var queryFilePattern = config.path.tests + (config.pattern.query).replace("[args]", arg).replace("[no]", "*");
                    var sources = grunt.file.expand(sourceFilePattern);
                    var queries = grunt.file.expand(queryFilePattern);

                    if (sources.length != queries.length) {
                        grunt.fail.warn('Number of source files and query files does not tally.');
                    }

                    for (var i = 0; i < sources.length; i++) {
                        var results = sources[i].replace('.txt', '').split(config.pattern.separator);
                        files.push({
                            source: sources[i],
                            query: queries[i],
                            out: (config.pattern.out).replace("[args]", results[0]).replace("[no]", results[2]),
                            redirect: (config.pattern.redirect).replace("[args]", results[0]).replace("[no]", results[2])
                        });
                    }

                    //console.log(files);
                    done();
                });
            },
            function (done) {
                files.forEach(function (file) {
                    grunt.task.run('exec:autotester:' + file.source + ":" + file.query + ":" + file.out + ":" + file.redirect);
                });
                done();
            },
            function (done) {
                grunt.task.run('extract');
                done();
            }
        ], function (err, results) {
            finish();
        });

    });
};
