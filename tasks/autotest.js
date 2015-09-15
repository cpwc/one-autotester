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

                var sourceFilePattern = [];
                var queryFilePattern = [];

                if (args.length == 0) {
                    sourceFilePattern.push(config.path.tests + (config.pattern.source).replace('[args]', '*').replace('[no]', '*'));
                    queryFilePattern.push(config.path.tests + (config.pattern.query).replace('[args]', '*').replace('[no]', '*'));
                } else {
                    args.forEach(function (arg) {
                        sourceFilePattern.push(config.path.tests + (config.pattern.source).replace('[args]', arg).replace('[no]', '*'));
                        queryFilePattern.push(config.path.tests + (config.pattern.query).replace('[args]', arg).replace('[no]', '*'));
                    });
                }

                console.log(sourceFilePattern);

                for (var i = 0; i < sourceFilePattern.length; i++) {
                    var sources = grunt.file.expand(sourceFilePattern[i]);
                    var queries = grunt.file.expand(queryFilePattern[i]);

                    if (sources.length != queries.length) {
                        grunt.fail.warn('Number of source files and query files does not tally.');
                    }

                    for (var j = 0; j < sources.length; j++) {
                        var results = sources[j].replace('.txt', '').split(config.pattern.separator);
                        files.push({
                            source: sources[j],
                            query: queries[j],
                            out: (config.pattern.out).replace('[args]', results[0]).replace('[no]', results[2]),
                            redirect: (config.pattern.redirect).replace('[args]', results[0]).replace('[no]', results[2])
                        });
                    }
                }

                //console.log(files);
                done();

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
