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
	run = require('run-sequence'),							        // 按顺序执行任务
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
 * all css
 */
gulp.task('css', function () {
    return gulp.src(Asset.css.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(header(banner))
        .pipe(csscomb())
        .pipe(gulp.dest(Asset.css.dist));
});
/*
gulp.task('crossCssMin', function () {
    return gulp.src(Asset.crossCss.dist+'cross.css')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(Asset.crossCss.dist));
});
*/

/**
 * iconfont
 */
gulp.task('iconfont',function(){
    return gulp.src(Asset.iconfont.src)
        .pipe(changed(Asset.iconfont.dist))
        .pipe(gulp.dest(Asset.iconfont.dist))
        .pipe(size());
});

/**
 * json
 */
gulp.task('json',function(){
    return gulp.src(Asset.json.src)
        .pipe(changed(Asset.json.dist))
        .pipe(gulp.dest(Asset.json.dist))
        .pipe(size());
});

/**
 * docs html
 */
gulp.task('docsHtml',function(){
    return gulp.src(Asset.docs.html.src)
        .pipe(changed(Asset.docs.html.dist))
        .pipe(gulp.dest(Asset.docs.html.dist))
        .pipe(size());
});


/**
 * docs js
 */
gulp.task('docsJs',function(){
    return gulp.src(Asset.js.docs.src)
        .pipe(concat('docs.js'))				        //合并后的文件名
        //.pipe(jshint())                             //先进行检测
        //.pipe(uglify())                             //JS压缩
        //.pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(Asset.js.docs.dist));
});

/**
 * libs js
 */
gulp.task('libsJs',function(){
    gulp.src(Asset.js.libs.src)
        .pipe(changed(Asset.js.libs.dist))
        .pipe(gulp.dest(Asset.js.libs.dist))
        .pipe(size());
});
/**
 * 项目开发进行时 执行的默认任务。
 */
gulp.task('start', function(){
    run('css', 'iconfont', 'docsHtml', 'json', 'docsJs', 'libsJs');  //事先执行任务
    // Watch cross.css files
    gulp.watch(Asset.css.watch, ['css']);

    // Watch iconfont files
    gulp.watch(Asset.iconfont.src, ['iconfont']);

    // Watch docsHtml files
    gulp.watch(Asset.docs.html.src, ['docsHtml']);

    // Watch json files
    gulp.watch(Asset.json.src, ['json']);

    // Watch docsJs files
    gulp.watch(Asset.js.docs.src, ['docsJs']);

    // Watch libsJs files
    gulp.watch(Asset.js.libs.src, ['libsJs']);

    /* 静态服务
     */
    browserSync.init([Asset.css.dist, Asset.iconfont.dist, Asset.docs.html.dist, Asset.json.dist, Asset.js.docs.dist, Asset.js.libs.dist], {
        // 代理模式
        proxy: "192.168.137.44:8181/git/crossui.github.io/dist/docs/"
    });
});