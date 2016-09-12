// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('lint', function() {
  return gulp.src('js/*.js')
    .pipe(plumber({
      errorHandler: function(error) {
        var title = '[task]eslint ' + error.plugin;
        var errorMsg = 'error: ' + error.message;
        console.error(title + '\n' + errorMsg);
      }
    }))
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .pipe(plumber.stop());
});

gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
  return gulp.src('js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
  gulp.watch('js/*.js', ['lint', 'scripts']);
  gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('default', ['lint', 'sass', 'scripts'], function() {
  gulp.run('watch');
});
