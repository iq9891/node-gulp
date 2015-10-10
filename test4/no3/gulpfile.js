var gulp = require('gulp');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');
 
gulp.task('default', function () {

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
    .pipe(gulp.dest('to/image/'));
 
  // Pipe CSS stream through CSS optimizer and onto disk 
  //css通过css优化器和管道流到盘
  var cssStream = spriteData.css
    .pipe(csso())
    .pipe(gulp.dest('to/css/'));
 
  // Return a merged stream to handle both `end` events 
  //返回一个合并的流来处理这两个结束的事件
  return merge(imgStream, cssStream);
  
});