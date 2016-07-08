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
plumber = require("gulp-plumber"),
uglify = require('gulp-uglify');
fs = require("fs");

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
     styles: 'bingo/scss/',
     index :'bingo/index.html' ,
     dist: 'dist/',
     temp: 'temp/'
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
    .pipe(elm())
    .pipe(uglify())
    .on('error', function(err) {
        console.error("error in console" , err);

        browserSync.notify("Elm compile error", 5000);

        // Save the error to index.html, with a simple HTML wrapper
        // so browserSync can inject itself in.
        fs.writeFileSync(sources.dist + 'index.html',
        "<!DOCTYPE HTML><html><body><pre>" +
        err.message +
        "</pre></body></html>");
    })
    .pipe(gulp.dest(sources.temp));
});

gulp.task('elm-bundle', ['elm-init'], function(){
  return gulp.src(sources.elm.main)
    .pipe(elm.bundle('bundle.js'))
    .pipe(gulp.dest(sources.temp));
});

gulp.task('copy-index.html', function(){
  return gulp.src(sources.index)
    .pipe(gulp.dest(sources.temp))
})
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
