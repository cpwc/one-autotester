'use strict';

module.exports = function(grunt) {

  var config = grunt.file.readJSON('one-config.json');

  grunt.initConfig({
    exec: {
      autotester: {
        cmd: function(src, qur, out, redirect) {
          return config.path.autotester + ' ' + src + ' ' + qur + ' ' + out + ' > ' + redirect;
        }
      }
    }
  });

  grunt.registerTask('autotester', 'Run AutoTester', function(src, qur, out, redirect) {
    grunt.task.run('exec:autotester:' + src + ":" + qur + ":" + out + ":" + redirect);
  });

};
