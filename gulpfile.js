var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var bump = require('gulp-bump');
var webserver = require('gulp-webserver');

gulp.task('default', ['sass', 'bump', 'webserver'], function() {
});

gulp.task('sass', function() {
    return gulp.src('app/**/*.scss')
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('app'));
});

gulp.watch('app/**/*.scss', ['sass']);

gulp.task('webserver', function() {
    gulp.src('')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: '/app'
        }));
});

gulp.task('bump', function(){
    gulp.src('./package.json')
        .pipe(bump())
        .pipe(gulp.dest('./'));
});