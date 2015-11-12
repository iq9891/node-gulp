//npm install --save-dev gulp-babel babel-preset-es2015

var gulp = require('gulp');
var babel = require("gulp-babel");

// 监视文件改动并重新载入
//js检测及压缩
gulp.task('default', function () {
    gulp.src('app/**/*.js')
		.pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('a/'));//创建
});
