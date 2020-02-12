const path = require('path');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const less = require('gulp-less');
const concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var uglifycss = require('gulp-uglifycss');

// Logs Message
gulp.task('message', () => {
  return console.log('Gulp is running...');
});

// Copy All HTML files
gulp.task('copyHtml', () => {
  gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

// Optimize Images
gulp.task('imageMin', () => {
  gulp
    .src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

// Compile LESS
gulp.task('less', () => {
  return gulp
    .src('src/less/*.less')
    .pipe(
      less({
        paths: [path.join(__dirname, 'less', 'includes')]
      })
    )
    .pipe(gulp.dest('src/css'));
});

// Minify Scripts
gulp.task('scripts', () => {
  gulp
    .src('src/js/*.js')
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Minify Styles
gulp.task('styles', () => {
  gulp
    .src('src/css/*.css')
    .pipe(concatCss('style.css'))
    .pipe(
      uglifycss({
        uglyComments: true
      })
    )
    .pipe(gulp.dest('dist/css'));
});

//default tasks
gulp.task('default', [
  'message',
  'copyHtml',
  'imageMin',
  'less',
  'scripts',
  'styles'
]);

//watch task
gulp.task('watch', () => {
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/images/*', ['imageMin']);
  gulp.watch('src/less/*.less', ['less']);
  gulp.watch('src/css/*.css', ['styles']);
  gulp.watch('src/*.html', ['copyHtml']);
});
