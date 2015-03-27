module.exports = function(grunt) {

	grunt.initConfig({
		concat: {
		  options: {
		    // define a string to put between each file in the concatenated output
		    separator: ';'
		  },
		  dist: {
		    // the files to concatenate
		    src: ['src/**/*.js'],
		    // the location of the resulting JS file
		    dest: 'dist/invest.js'
		  }
		},
		uglify: {
		  options: {
		    // the banner is inserted at the top of the output
		    banner: '/*! filingr000ve :3 <%= grunt.template.today("dd-mm-yyyy") %> */\n'

		  },
		  mangle: {toplevel: true},
		  dist: {
		    files: {
		      'dist/invest.min.js': ['<%= concat.dist.dest %>']
		    }
		  }
		}
	});



grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');

// the default task can be run just by typing "grunt" on the command line
grunt.registerTask('default', ['concat', 'uglify']);

};	