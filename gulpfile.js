/**
 *================================
 *     Dependencies
 *================================
 */

var 

gulp = require("gulp"),
browserSync = require("browser-sync").create(),
elm = require("gulp-elm"),
rename = require("gulp-rename"),
plumber = require("gulp-plumber");

/**
 * =====================
 *      Config
 * =====================
 **/
 
 // sources for files
 var sources = {
     elm: {
         main : 'bingo/Bingo.elm'
     },
     css: {
         
     },
     dist: 'dist/'
 };
 
 var ENVIRONMENT_PORT = 8081;
 
 
 /**
 * =====================
 *      Partial tasks
 * =====================
 **/
 
 
// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: sources.dist
        },
        port: ENVIRONMENT_PORT
    });
});

// elm
gulp.task('elm-init', elm.init);


gulp.task('elm', ['elm-init'], function(){
  return gulp.src(sources.elm.main)
    .pipe(plumber())
    .pipe(elm({filetype: 'html'}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(sources.dist));
});
 
gulp.task('elm-bundle', ['elm-init'], function(){
  return gulp.src('src/*.elm')
    .pipe(elm.bundle('bundle.js'))
    .pipe(gulp.dest(sources.dist));
});

//watch
gulp.task('watch', function(){
    gulp.watch(sources.elm.main, ['elm']);
    gulp.watch(sources.dist + '**/*.*')
        .on('change', browserSync.reload);
});



 
 /**
 * =====================
 *      Main tasks
 * =====================
 **/
 
 
 gulp.task('default', 
    [
     'elm',
     'browser-sync', 
     'watch'
    ]);