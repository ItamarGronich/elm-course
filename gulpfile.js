/**
 *================================
 *     Dependencies
 *================================
 */

var
  gulp        = require("gulp"),
  browserSync = require("browser-sync").create(),
  elm         = require("gulp-elm"),
  rename      = require("gulp-rename"),
  plumber     = require("gulp-plumber"),
  uglify      = require('gulp-uglify');
  fs          = require("fs");

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

gulp.task('elm', ['elm-init', 'copy-index'], function(){
  return gulp.src(sources.elm.main)
    .pipe(elm())
    .on('error', function(err) {

      browserSync.notify("Elm compile error", 5000);

      // Save the error to index.html, with a simple HTML wrapper
      // so browserSync can inject itself in.
      fs.writeFileSync(sources.dist + 'index.html',
      "<!DOCTYPE HTML><html><body><pre>" +
      err.message +
      "</pre></body></html>");
    })
    .pipe(uglify())
    .pipe(rename('bingo.js'))
    .pipe(gulp.dest(sources.dist));
});

gulp.task('elm-bundle', ['elm-init'], function(){
  return gulp.src(sources.elm.main)
    .pipe(elm.bundle('bundle.js'))
    .pipe(gulp.dest(sources.dist));
});

gulp.task('copy-index', function(){
  return gulp.src(sources.index)
    .pipe(gulp.dest(sources.dist))
});

// gulp.task('styles', function(){
//   return gulp.src(sources.styles + '**/*.*')
//     .pipe();
//     .pipe(gulp.dest(sources.dist))
// });

//watch
gulp.task('watch', function(){
    gulp.watch(sources.elm.main, ['elm']);
    gulp.watch(sources.index, ['copy-index']);
    gulp.watch(sources.dist + '**/*.*')
        .on('change', browserSync.reload);
});

 /**
  * =====================
  *      Main tasks
  * =====================
  **/

 gulp.task('compile-concat-compress', [
   'copy-index',
   'elm',
 ]);

 gulp.task('default',
  [
   'compile-concat-compress',
   'browser-sync',
   'watch'
  ]
    );
