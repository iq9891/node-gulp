var gulp    = require('gulp');
var gutil    = require('gulp-util');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');
var jshint = require('gulp-jshint');
var spritesmith = require('gulp.spritesmith');
var reveasy = require("gulp-rev-easy");
var htmlmin = require('gulp-htmlmin');

var path = './test/';
var destNew = 'to/';


//添加版本
gulp.task("v", function (argument) {
  gulp.src(path + '*.html')
    .pipe(reveasy({revType:'date', dateFormat:'yyyymmddHHMMssms'}))
    .pipe(gulp.dest(destNew));
})
//html压缩
gulp.task('minhtml', function() {
  return gulp.src(path + '*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(destNew));
});

//其余文件照样输出
gulp.task('other', function () {
    gulp.src(path + 'font/*.eot')
        .pipe(gulp.dest(destNew+ 'font/'));
    gulp.src(path + 'font/*.svg')
        .pipe(gulp.dest(destNew+ 'font/'));
    gulp.src(path + 'font/*.ttf')
        .pipe(gulp.dest(destNew+ 'font/'));
    gulp.src(path + 'font/*.woff')
        .pipe(gulp.dest(destNew+ 'font/'));
    gulp.src(path + 'font/*.woff2')
        .pipe(gulp.dest(destNew+ 'font/'));
	
    gulp.src(path + 'lib/*.js')
        .pipe(gulp.dest(destNew+ 'lib/'));
});

//js合并
gulp.task('concat', function () {
    gulp.src(path + 'js/*.js')
        .pipe(uglify())//压缩
        .pipe(concat('all.min.js'))//合并
        .pipe(gulp.dest(destNew+ 'js/'));//创建
});

//js检测及压缩
gulp.task('minjs', function () {
    gulp.src(path + 'js/*.js')
		.pipe(jshint())//js检测
        .pipe(uglify())//压缩
        //.pipe(concat('all.min.js'))//合并
        .pipe(gulp.dest(destNew + 'js/'));//创建
});
//css压缩
gulp.task('mincss', function () {
    return gulp.src(path + 'style/*.css')
    .pipe(csso())
    .pipe(gulp.dest(destNew + 'style/'));
});
//img压缩
gulp.task('minimg', function () {
    gulp.src(path + 'imgs/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest(destNew + 'imgs/'));
    gulp.src(path + 'imgs/*.png')
    .pipe(imagemin())
    .pipe(gulp.dest(destNew + 'imgs/'));
    gulp.src(path + 'imgs/*.gif')
    .pipe(imagemin())
    .pipe(gulp.dest(destNew + 'imgs/'));
});

//图片合并
gulp.task('sprite', function () {

  // Generate our spritesheet 
  //产生我们的spritesheet
  var spriteData = gulp.src('images/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
	cssTemplate: 'handlebarsStr.css.handlebars',
    cssName: 'sprite.css'
  }));
 
  // Pipe image stream through image optimizer and onto disk 
  //图像通过图像优化器和管道流到盘
  var imgStream = spriteData.img
    .pipe(imagemin())
    .pipe(gulp.dest(destNew + 'image/'));
 
  // Pipe CSS stream through CSS optimizer and onto disk 
  //css通过css优化器和管道流到盘
 
  // Return a merged stream to handle both `end` events 
  //返回一个合并的流来处理这两个结束的事件
 
  return merge(imgStream);
  
});

gulp.task('default', ['minimg', 'mincss', 'minjs','minhtml', 'other']);
