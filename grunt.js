/*global module:false*/
module.exports = function(grunt) {

	"use strict";
	
	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd hh:MM") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
		},
		min: {
			dist: {
			src: ['<banner:meta.banner>', 'src/jquery.*.js'],
			dest: 'dist/<%= pkg.name %>.min.js'
			}
		},
		qunit: {
			files: [
				'http://localhost:8080/tests/jquery.loading-progress.js.test.html?noglobals=true&notrycatch=true&jquery=2.0.3',
				'http://localhost:8080/tests/jquery.loading-progress.js.test.html?noglobals=true&notrycatch=true&jquery=1.10.2',
				'http://localhost:8080/tests/jquery.loading-progress.js.test.html?noglobals=true&notrycatch=true&jquery=1.9.1',
				'http://localhost:8080/tests/jquery.loading-progress.js.test.html?noglobals=true&notrycatch=true&jquery=1.8',
				'http://localhost:8080/tests/jquery.loading-progress.js.test.html?noglobals=true&notrycatch=true&jquery=1.7',
				'http://localhost:8080/tests/jquery.loading-progress.js.test.html?noglobals=true&notrycatch=true&jquery=1.6',
				'http://localhost:8080/tests/jquery.loading-progress.js.test.html?noglobals=true&notrycatch=true&jquery=1.5',
				
				'http://localhost:8080/tests/jquery.loading-progress.js.test.timebased.html?noglobals=true&notrycatch=true&jquery=2.0.3',
				'http://localhost:8080/tests/jquery.loading-progress.js.test.timebased.html?noglobals=true&notrycatch=true&jquery=1.10.2']
		},
		lint: {
			files: ['grunt.js', 'src/jquery.*.js']
		},
		/*watch: {
			files: '<config:lint.files>',
			tasks: 'lint qunit'
		},*/
		jshint: {
			options: {
				curly: true,
				eqeqeq: false, // allow ==
				immed: false, //
				latedef: false, // late definition
				newcap: false, // capitalize ctos
				nonew: true, // no new ..()
				noarg: true, 
				sub: true,
				undef: true,
				//boss: true,
				eqnull: true, // relax
				browser: true,
				regexp: true,
				strict: true,
				trailing: false,
				smarttabs: true,
				lastsemic: true
			},
			globals: {
				jQuery: true,
				console: true
			}
		},
		uglify: {},
		server: {
			port: 8080,
			base: '.'
		}
	});

	// Default task.
	grunt.registerTask('default', 'lint server qunit min');

};