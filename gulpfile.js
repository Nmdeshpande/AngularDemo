var gulp = require('gulp');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var minifyCSS = require('gulp-clean-css');
var changed = require('gulp-changed');
var uglify = require('gulp-uglify');
var jsonminify = require('gulp-jsonminify');
var appjs = require('gulp-uglify');
var htmlfile = require('gulp-htmlmin');
gulp.task('html', function() {
	return gulp.src('app/*.html')
	.pipe(htmlfile({collapseWhitespace: true}))
	.pipe(gulp.dest('build/'));
});
gulp.task('json', function() {
	return gulp.src('app/item-data.json')
	.pipe(jsonminify())
	.pipe(gulp.dest('build/'));
});
gulp.task('app', function(){
	gulp.src('app/app.js')
	.pipe(concat('app.js'))
	.pipe(appjs())
	.pipe(gulp.dest('build/'));
});
gulp.task('style', function() {
	gulp.src(['app/asset/css/*.css'])
	.pipe(concat('style.css'))
	.pipe(minifyCSS())
	.pipe(gulp.dest('build/asset/css/'));
});
gulp.task('stylelib', function() {
	gulp.src(['app/asset/css-libraries/*.css'])
	.pipe(concat('stylelib.css'))
	.pipe(minifyCSS())
	.pipe(gulp.dest('build/asset/css-libraries/'));
});
gulp.task('js', function(){
	gulp.src('app/asset/js/*.js')
	.pipe(concat('script.js'))
	.pipe(uglify())
	.pipe(gulp.dest('build/asset/js/'));
});
gulp.task('jslib', function(){
	gulp.src('app/asset/js-libraries/*.js')
	.pipe(concat('scriptlib.js'))
	.pipe(uglify())
	.pipe(gulp.dest('build/asset/js-libraries/'));
});
gulp.task('imagemin', function() {
	var img_src = 'app/asset/images/**/*', img_dest = 'build/asset/images';
	// or we can use // var imgSrc = 'src/images/*.+(png|jpg|gif)',
	gulp.src(img_src)
	.pipe(changed(img_dest))
	.pipe(imagemin())
	.pipe(gulp.dest(img_dest));
});
gulp.task('default', ['html','app','imagemin','style','stylelib','js','jslib','json'], function() {
	// watch for CSS changes. It will update the minified file automatically when we do any changes in our original css.
	gulp.watch('app/asset/css/*.css', function() {   
		// run styles upon changes
		gulp.run('style');
	});
	gulp.watch('app/asset/images/*.**', function() {   
		// run  upon changes
		gulp.run('imagemin');
	});
	gulp.watch('app/asset/css-libraries/*.css', function() {   
		// run styles upon changes
		gulp.run('stylelib');
	});
	gulp.watch('app/asset/js/*.js', function() {   
		// run  upon changes
		gulp.run('js');
	});
	gulp.watch('app/asset/js-libraries/*.js', function() {   
		// run  upon changes
		gulp.run('jslib');
	});
	gulp.watch('app/item-data.json', function() {   
		// run  upon changes
		gulp.run('jsonminify');
	});
	gulp.watch('app/app.js', function() {   
		// run  upon changes
		gulp.run('appjs');
	});
	gulp.watch('app/*.html', function() {   
		// run  upon changes
		gulp.run('htmlfile');
	});
});