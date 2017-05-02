const gulp = require('gulp');
const concat = require('gulp-concat');
const ngAnnotate = require('gulp-ng-annotate');
const changed = require('gulp-changed');
//let minifyHTML = require('gulp-minify-html');
const minifyHTML = require('gulp-htmlmin');
const minifyCss = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const image = require('gulp-image');
const gulpCopy = require('gulp-copy');

gulp.task('image', () => {
  gulp.src('./client-src/assets/images/**/*.*')
    .pipe(image())
    .pipe(gulp.dest('./client-build/assets/images/'));
});

gulp.task('minify-css', () => {
  return gulp.src('./client-src/assets/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./client-build/assets/css/'));
});

gulp.task('minify-html', () => {

  gulp.src('./client-src/ng-components/**/*.html')
    .pipe(minifyHTML({ collapseWhitespace: true }))
    .pipe(gulp.dest('./client-build/ng-components'));

  gulp.src('./client-src/ng-templates/**/*.html')
    .pipe(minifyHTML({ collapseWhitespace: true }))
    .pipe(gulp.dest('./client-build/ng-templates'));

  gulp.src('./client-build/unminified/index.html')
    .pipe(minifyHTML({ collapseWhitespace: true }))
    .pipe(gulp.dest('./client-build'));
});

gulp.task('json', () => {
  gulp.src('./client-src/**/*.json')
    .pipe(gulp.dest('./client-build'));
});

gulp.task('PDFs', () => {
  gulp.src('./client-src/assets/PDFs/*.pdf')
    .pipe(gulp.dest('.assets/PDFs/'));
});

gulp.task('watch', () => {
  gulp.watch('./client-src/assets/images/**/*.*', ['image']);
  gulp.watch('./client-src/assets/**/*.css', ['minify-css']);
  gulp.watch('./client-src/**/*.html', ['minify-html']);
  gulp.watch('./client-src/**/*.json', ['json']);
});

gulp.task('default', [
  'image',
  'minify-css',
  'minify-html',
  'json',
]);