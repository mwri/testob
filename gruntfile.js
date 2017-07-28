module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		concat: {
			options: {
				separator: '\n\n',
				stripBanners: { line: true },
				banner: '// Package: <%= pkg.name %> v<%= pkg.version %> (built <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>)\n// Copyright: (C) 2017 <%= pkg.author.name %> <<%= pkg.author.email %>>\n// License: <%= pkg.license %>\n\n\n',
			},
			es5: {
				src: ['lib/*.js'],
				dest: 'dist/<%= pkg.name %>_es5.js',
			},
			es6: {
				src: ['lib/*.js'],
				dest: 'dist/<%= pkg.name %>.js',
			},
		},

		uglify: {
			options: {
				banner: '// Package: <%= pkg.name %> v<%= pkg.version %> (built <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>)\n// Copyright: (C) 2017 <%= pkg.author.name %> <<%= pkg.author.email %>>\n// License: <%= pkg.license %>\n',
			},
			build: {
				files: {
					'dist/<%= pkg.name %>_es5.min.js': ['<%= concat.es5.dest %>']
				},
			},
		},

		jshint: {
			files: ['gruntfile.js', 'lib/*.js', 'test/*.js'],
			options: {
				esversion: 6,
				laxbreak: true,
				globals: {
					jQuery:   true,
					console:  true,
					module:   true,
					document: true,
				},
			},
		},

		karma: {
			es5: {
				options: {
					files: [
						'dist/testob_es5.min.js',
						'test/*.js',
					],
					basePath:    '',
					urlRoot:     '/',
					frameworks:  ['jasmine'],
					port:        9876,
					colors:      true,
					autoWatch:   false,
					interval:    200,
					singleRun:   true,
					browsers:    ['ChromeHeadless'],
					reporters:     ['spec'],
					concurrency: Infinity,
				},
			},
			es6: {
				options: {
					files: [
						'dist/testob.js',
						'test/*.js',
					],
					basePath:    '',
					urlRoot:     '/',
					frameworks:  ['jasmine'],
					port:        9876,
					colors:      true,
					autoWatch:   false,
					interval:    200,
					singleRun:   true,
					browsers:    ['ChromeHeadless'],
					reporters:     ['spec', 'coverage'],
					preprocessors: { 'dist/testob.js': ['coverage'] },
					concurrency: Infinity,
					coverageReporter: {
						type : 'lcov',
						subdir: 'karma/',
					},
				},
			},
			travis_ci_es5: {
				options: {
					files: [
						'dist/testob_es5.min.js',
						'test/*.js',
					],
					basePath:    '',
					urlRoot:     '/',
					frameworks:  ['jasmine'],
					port:        9876,
					colors:      true,
					autoWatch:   false,
					interval:    200,
					singleRun:   true,
					browsers:    ['ChromeTravisCI'],
					reporters:     ['spec'],
					concurrency: Infinity,
					customLaunchers: {
						ChromeTravisCI: {
							base:  'Chrome',
							flags: ['--no-sandbox']
						}
					},
				},
			},
			travis_ci_es6: {
				options: {
					files: [
						'dist/testob.js',
						'test/*.js',
					],
					basePath:    '',
					urlRoot:     '/',
					frameworks:  ['jasmine'],
					port:        9876,
					colors:      true,
					autoWatch:   false,
					interval:    200,
					singleRun:   true,
					browsers:    ['ChromeTravisCI'],
					reporters:     ['spec', 'coverage'],
					preprocessors: { 'dist/testob.js': ['coverage'] },
					concurrency: Infinity,
					coverageReporter: {
						type:   'lcovonly',
						file:   'lcov.info',
						subdir: 'karma/',
					},
					customLaunchers: {
						ChromeTravisCI: {
							base:  'Chrome',
							flags: ['--no-sandbox']
						},
					},
				},
			},
		},

		simplemocha: {
			all: {
				src: ['test/*.js'],
			},
		},

		mocha_istanbul: {
			all: {
				src: ['test/*.js'],
			},
		},

		babel: {
			options: {
				presets: ['es2015'],
			},
			build: {
				files: {
					'dist/testob_es5.js': 'dist/testob_es5.js',
				},
			},
		},

		lcovMerge: {
			emitters: 'coverage/*/lcov.info',
			options: {
				outputFile: 'coverage/lcov.info',
			},
		},

		watch: {
			full: {
				options: {
					spawn: true,
				},
				files: [
					'lib/*.js',
					'test/*.js',
				],
				tasks: ['build'],
			},
			dev: {
				options: {
					spawn: true,
				},
				files: [
					'lib/*.js',
					'test/*.js',
				],
				tasks: ['dev'],
			},
		},

	});

	grunt.registerTask('build', [
		'jshint',
		'concat:es5',
		'concat:es6',
		'babel',
		'uglify',
		'karma:es5',
		'karma:es6',
		'mocha_istanbul',
		]);

	grunt.registerTask('travis_ci_build', [
		'jshint',
		'concat:es5',
		'concat:es6',
		'babel',
		'uglify',
		'karma:travis_ci_es5',
		'karma:travis_ci_es6',
		'mocha_istanbul',
		'lcovMerge',
		]);

	grunt.registerTask('dev', [
		'jshint',
		'concat:es6',
		'simplemocha',
		]);

	grunt.registerTask('default', ['build']);
	grunt.registerTask('test',    ['build']);

	grunt.registerTask('watch_dev',  ['watch:dev']);
	grunt.registerTask('watch_full', ['watch:full']);

};
