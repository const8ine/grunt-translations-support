module.exports = function (grunt) {
	'use strict';

	const os = require('os');

	if (process.platform === 'win32') {
		os.tmpDir = os.tmpdir;
	}

	// Measures the time each task takes
	require('time-grunt')(grunt);

	// Load necessary Grunt tasks
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-bake');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Project configuration
	grunt.initConfig({
		// Metadata
		pkg: grunt.file.readJSON('package.json'),

		// Config
		config: {
			// Source's paths
			source: {
				path: 'source',
				i18n: '<%= config.source.path %>/i18n/',
			},
			// Dist's paths
			dist: {
				path: 'dist',
				i18n: '<%= config.dist.path %>/i18n/',
			},
		},

		// Task configuration: Development
		bake: {
			dev: {
				files: [{
					expand: true,
					cwd: '<%= config.source.path %>/',
					src: ['*.html'],
					dest: '<%= config.dist.path %>/',
					ext: '.html'
				}],
			}
		},

		copy: {
			dev: {
				files: [
					{
						expand: true,
						cwd: '<%= config.source.path %>/html/',
						src: ['*.html'],
						dest: '<%= config.dist.path %>/html/',
						ext: '.html'
					},
					{
						expand: true,
						cwd: '<%= config.source.i18n %>',
						src: '**/*.json',
						dest: '<%= config.dist.i18n %>',
						filter: 'isFile',
					},
				]
			}
		},

		// Task configuration: String replace for translations
		'string-replace': {
			translate: {
				files: [{
					expand: true,
					cwd: '<%= config.dist.path %>',
					src: '**/*.html',
					dest: '<%= config.dist.path %>'
				}],
				options: {
					replacements: [],
				},
			},
		},
	});

	// Custom task to dynamically configure the replacements for string-replace
	grunt.registerTask('configAndRunStringReplace', function () {
		const fileSource = grunt.file.readJSON('dist/i18n/en.locale.json');

		function extractKeyValuePairs(obj) {
			const result = [];

			function traverse(current, path = '') {
				for (const key in current) {
					if (typeof current[key] === 'string') {
						result.push({ pattern: path + key, replacement: current[key] });
					} else if (typeof current[key] === 'object') {
						traverse(current[key], path + key + '.');
					}
				}
			}

			traverse(obj);
			return result;
		}

		// Iterate through the keys in the JSON and create replacements
		const replacements = extractKeyValuePairs(fileSource);

		grunt.config.set('string-replace.translate.options.replacements', replacements);
	});

	// Translations support
	grunt.registerTask('translate', ['copy:dev', 'configAndRunStringReplace', 'string-replace:translate']);

	// Default task
	grunt.registerTask('default', ['bake:dev', 'translate']);
};
