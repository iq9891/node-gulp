var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

//编译sass
gulp.task('sass', function () {
  gulp.src('./app/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

//重新加载改动的文件
gulp.task('reload', reload);

// 监视 Sass 文件的改动，如果发生变更，运行 'sass' 任务，并且重载文件
gulp.task('default', ['sass','watch'], function() {
	browserSync({
		server: {
			baseDir: 'app'
		}
	});
});

//监听改动
gulp.task('watch', function () {
  gulp.watch(['*.html', 'css/*.css', 'scss/*.scss', 'scripts/*.js'], {cwd: 'app'}, ['sass','reload']);
});