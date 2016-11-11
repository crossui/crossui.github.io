/** 切记：
 * 在所有任务中gulp.src前面加上return
 * 在任务之前先建立 config.js
 */


/**
 * 全局变量集
 */
var gulp        = require('gulp'),                                  // gulp
    sass        = require('gulp-sass'),                             // gulp-sass
	sourcemaps	= require('gulp-sourcemaps'),            			// sass maps
    cssmin      = require('gulp-minify-css'),                       // css min
    csslint     = require('gulp-csslint'),       	                // 检查css的语法错误。
	csscomb    	= require('gulp-csscomb'),							// 格式化css代码，美化css代码，更容易阅读。
    notify      = require('gulp-notify'),                           // watch 监听 错误提示
    plumber     = require('gulp-plumber'),                          // watch 出现异常并不终止监听
    rev         = require('gulp-rev-append'),                       // 给URL自动添加MD5版本号 (注： 将html和css中包含url,src等资源链接加上 ?v=@@hash )
	uglify		= require('gulp-uglify'),							// 压缩javascript文件，减小文件大小。
	concat		= require('gulp-concat'),							// 合并javascript文件，减少网络请求。
	rename 		= require('gulp-rename'),							// 重命名
	jshint		= require('gulp-jshint'),							// js代码检测
	browserSync = require('browser-sync').create(),					// 自动刷新，释放你的F5
	base64 		= require('gulp-base64'),							// 图片转换成Base64编码
	size 		= require('gulp-size'),								// 显示文件大小
	clean		= require('gulp-clean'),							// 删除文件和文件夹		
	spritesmith = require('gulp.spritesmith'),						// CSS Sprites	
	runSequence = require('run-sequence'),							// 按顺序执行任务
	changed		= require('gulp-changed'),							// 实现文件拷贝--只拷贝变动过的文件 
	stylish 	= require('jshint-stylish'),						// js压缩过中错误的提示
    header      = require('gulp-header'),                           // 头注释
    banner      = require('./config').banner,                       // 样式banner
    Asset       = require('./config').Asset;                        // config 文件路径
	//path
	//yargs
	//fs
	//gulp-tap
	//gulp-cssnano
	//gulp-postcss
	//autoprefixer
	//gulp-sourcemaps

	
	
	
	


//测试gulp是否正常运行 gulp hello
gulp.task('hello',function(){
	console.log('hello world');
});

/**
 * cross.css  cross.min.css
 */
gulp.task('crossCss', function () {
    return gulp.src(Asset.crossCss.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(header(banner))
        .pipe(csscomb())
        .pipe(gulp.dest(Asset.crossCss.dist));
});
gulp.task('crossCssMin', function () {
    return gulp.src(Asset.crossCss.dist+'cross.css')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(Asset.crossCss.dist));
});

/*
gulp.task('default', ['clean'], function() {
    gulp.start(['styles', 'scripts', 'sprites', 'images', 'fonts']);
});*/
