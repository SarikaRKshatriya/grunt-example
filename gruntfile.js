module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },
            target: {
                files: { 'css/styleprefixed.css': 'css/style.css' }
            }
        },
        watch: {
            files: ['css/style.css'],
            tasks: ['autoprefixer']
        },
        copy: {
            main: {
                files: [
                    { src: 'css/style.css', dest: 'css/stylecopied.css' }
                ]
            }
        },
        cssmin: {
            target: {
                files: { 'css/stylecopied.min.css': ['css/stylecopied.css'] }
            }
        },
        uglify: {
            target: {
                files: {
                    'js/output.min.js': ['js/*.js']
                }
            }
        },
        qunit: {
            all: {
                options: {
                    urls: ['http://localhost:8000/index.html']
                }
            }
        },
        connect: {
            server: {
                options: {
                    port:8000,
                    base:'tests/'
                },
                keepalive:true
            }
        },
        compress:{
            main:{
                options:{
                    archive:'site.zip'
                },
                files:[
                    { expand:true, src: ['css/*'],dset:'/'}
                ]
            }
        },
        // gitcommit:{
        //     task:{
        //         options:{
        //             message:'test',
        //             noVerify:true,
        //             noStatus: false
        //         },

        //     },
        //     files:['.']
        // },
        githooks:{
            all:{
                'pre-commit':'test'
            }
        },
        rsync:{
            options:{
                exclude:["node_modules",".git*"]
            }
        }
    });

    // grunt.loadNpmTasks('grunt-autoprefixer');
    // grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-contrib-uglify');

   // grunt.registerTask('default', ['connect','qunit']);
    grunt.registerTask('default', ['cssmin','uglify','compress']);
    //grunt.registerTask('default', ['gitcommit']);
}