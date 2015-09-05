module.exports = function(grunt) {

 	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	});

  grunt.loadNpmTasks('grunt-exec');
	grunt.loadTasks('tasks');
  grunt.registerTask('default', ['exec:test']);
};
