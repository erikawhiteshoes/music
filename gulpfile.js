var gulp           = require('gulp');
//var plugins        = require('gulp-load-plugins');
var data           = require('gulp-data');
var sequence       = require('gulp-sequence');
var sass           = require('gulp-sass');
var concat         = require('gulp-concat');
var nunjucksRender = require('gulp-nunjucks-render');
var imagemin       = require('gulp-imagemin');
var htmlmin        = require('gulp-htmlmin');
var bSync          = require('browser-sync');
var reload         = bSync.reload;

gulp.task('pages', function() {
  return gulp.src("src/pages/**/*.html")
             .pipe(nunjucksRender ({
               path: ["src/templates"]
             }))
              .pipe(htmlmin({collapseWhitespace: true}))
              .pipe(gulp.dest('dist'))
              .pipe(reload({stream: true}));
});


gulp.task('images', function() {
    return gulp.src('src/img/**/*')
              .pipe(imagemin())
              .pipe(gulp.dest('dist/img'))
              .pipe(reload({stream: true}));
  });
gulp.task('styles', function() {
    return gulp.src('src/sass/**/*.scss')
              .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
              .pipe(concat('all.min.css'))
              .pipe(gulp.dest('dist/css'))
              .pipe(reload({stream: true}));
});
  
gulp.task('serve', function(cb) {
  sequence('sync', cb);
});

gulp.task('sync', function() {
  return bSync({server: { baseDir: 'dist' }});
});

gulp.task('assets', ['images', 'styles']);

gulp.task('default', sequence('assets','pages', 'serve'));
