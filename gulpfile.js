var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var webserver = require('gulp-webserver');

gulp.task('default', ['sass', 'webserver'], function() {
});

gulp.task('sass', function() {
    return gulp.src('app/**/*.scss')
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('app'));
});

gulp.task('webserver', function() {
    gulp.src('')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: '/app'
        }));
});

gulp.watch('app/**/*.scss', ['sass']);