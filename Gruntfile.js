'use strict';
module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // watch for changes and trigger sass, jshint, uglify and livereload
        // replace <themename> with the name of your theme folder
        watch: {
            sass: {
                files: ['content/themes/<themename>/includes/sass/**/*.{scss,sass}'],
                tasks: ['sass', 'autoprefixer', 'cssmin']
            },
            js: {
                files: '<%= jshint.all %>',
                tasks: ['jshint', 'uglify']
            },
            images: {
                files: ['content/themes/<themename>/includes/images/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },
            livereload: {
                options: { livereload: true },
                files: ['content/themes/<themename>/includes/css/<themename>.css', 'content/themes/<themename>/includes/js/*.js', 'content/themes/<themename>/includes/images/**/*.{png,jpg,jpeg,gif,webp,svg}']
            }
        },

        // sass
        // change file paths to match theme folder name
        sass: {
            dist: {
                options: {
                    sourcemap: true,
                    style: 'expanded',
                },
                files: {
                    'content/themes/<themename>/includes/css/<themename>.css': 'content/themes/<themename>/includes/sass/<themename>.scss'
                }
            }
        },

        // autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 9', 'ios 6', 'android 4'],
                map: true
            },
            files: {
                expand: true,
                flatten: true,
                src: 'content/themes/<themename>/includes/css/*.css',
                dest: 'content/themes/<themename>/includes/css'
            },
        },

        // css minify
        cssmin: {
            options: {
                keepSpecialComments: 1
            },
            minify: {
                expand: true,
                cwd: 'content/themes/<themename>/includes/css',
                src: ['*.css', '!*.min.css'],
                ext: '.css'
            }
        },

        // javascript linting with jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                "force": true
            },
            all: [
                'Gruntfile.js',
                'content/themes/<themename>/includes/js/**/*.js'
            ]
        },

        // uglify to concat, minify, and make source maps
        uglify: {
            plugins: {
                options: {
                    sourceMap: 'assets/js/plugins.js.map',
                    sourceMappingURL: 'plugins.js.map',
                    sourceMapPrefix: 2
                },
                files: {
                    'assets/js/plugins.min.js': [
                        'assets/js/source/plugins.js',
                        'assets/js/vendor/navigation.js',
                        'assets/js/vendor/skip-link-focus-fix.js',
                        // 'assets/js/vendor/yourplugin/yourplugin.js',
                    ]
                }
            },
            main: {
                options: {
                    sourceMap: 'assets/js/main.js.map',
                    sourceMappingURL: 'main.js.map',
                    sourceMapPrefix: 2
                },
                files: {
                    'assets/js/main.min.js': [
                        'assets/js/source/main.js'
                    ]
                }
            }
        },

        // image optimization
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive: true,
                    interlaced: true
                },
                files: [{
                    expand: true,
                    cwd: 'content/themes/<themename>/includes/css/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'content/themes/<themename>/includes/css/images/'
                }]
            }
        },

        // deploy via rsync
        deploy: {
            options: {
                args: ["-rlvz", "--checksum"],
                exclude: ['local-config.php', '.htaccess', '.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', '.ftppass', '.DS_Store', 'README.md', 'config.rb', '.jshintrc', '*.log', '*.swp', 'shared/*', 'content/upgrade/*'],
                recursive: true,
                syncDestIgnoreExcl: false
            },   
            // here for future use in prototypes         
            prototype: {
                options: {
                    src: "./prototype/",
                    dest: "~/subdomains/prototype",
                    host: "<account>@<hostname>"
                }
             },
            dev: {
                options: {
                    src: "./",
                    dest: "~/subdomains/dev",
                    host: "<account>@<hostname>"
                }
             },
            production: {
                options: {
                    src: "./",
                    dest: "~/public_html",
                    host: "<account>@<hostname>"
                }
            }
        },

        // deploy via ftp
        // only for use when there is FTP but no SSH access
        // see: https://github.com/zonak/grunt-ftp-deploy
        'ftp-deploy': {
          build: {
            auth: {
              host: '<host@tld>',
              port: 21,
              authKey: 'key1'
            },
            src: 'public_html',
            dest: '/',
            exclusions: ['local-config.php', '.htaccess','*.mp4','*.pdf', '.DS_Store', 'Thumbs.db', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', 'wp-content/debug.log', '.ftppass', '.git', '.gitignore', '_hcc_thumbs', 'aspnet_client', '_db_backups', 'stats', '*.swf', '*.xml', '*.gif', '*.jpg']
          }
        }
    });


    // rename tasks
    grunt.renameTask('rsync', 'deploy');
 
    // register task
    grunt.registerTask('default', ['watch']);

    grunt.registerTask('deployPrototype', [
        'deploy:prototype'
    ]);
    grunt.registerTask('deployDev', [
        'checkbranch:dev',
        'deploy:dev'
    ]);
     grunt.registerTask('deployProduction', [
        'checkbranch:master',
        'deploy:production'
    ]);

};