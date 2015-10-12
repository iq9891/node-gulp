var gulp    = require('gulp');
var gutil    = require('gulp-util');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');

gulp.task('merger', function () {
    gulp.src('./src/*.js')
        .pipe(uglify())//压缩js
        .pipe(concat('all.min.js'))//合并js
        .pipe(gulp.dest('./to'));//输出新的js
});

gulp.task('default', ['merger']);

//http://www.tuicool.com/articles/2YzUVf
