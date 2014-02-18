var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	compass = require('gulp-compass'),
	htmlmin = require('gulp-htmlmin'),
	watch = require('gulp-watch'),
	clean = require('gulp-clean'),
	exec = require('execSync').exec;

var javascriptLibs = [
	"./bower_components/underscore/underscore.js",
	"./bower_components/angular/angular.js",
	"./bower_components/angular-route/angular-route.js"
];

var javascriptSrcs = ["./src/main/javascript/**/*js"];

var scssSrcs = ['./src/main/sass/**/*scss'];
var scssLibs = ['./bower_components/bootstrap-sass/vendor/assets/stylesheets/**/_*scss'];

var markupSrcs = './src/main/markup/**/*html';

var javascriptTask = function(optimize) {
	return function() {
		var js = gulp.src(javascriptLibs.concat(javascriptSrcs))
			.pipe(concat('app.js'));

		if (optimize) {
			js.pipe(uglify());
		}

		js.pipe(gulp.dest('./target/javascript'));
	};
};

gulp.task('javascript', javascriptTask(false));
gulp.task('javascript-optimized', javascriptTask(true));

var compassTask = function(optimize) {
	return function() {
		var css = gulp.src(scssLibs.concat(scssSrcs))
			.pipe(gulp.dest('./target/sass'))
			.pipe(compass({
				css: 'target/css',
				sass: 'target/sass',
				image: 'src/main/images',
				comments: optimize ? false : true,
				style: optimize ? "compressed" : "compact"
			}));
	};
};

gulp.task('compass', compassTask(false));
gulp.task('compass-optimized', compassTask(true));

var markupTask = function(optimize) {
	return function() {
		var markup = gulp.src(markupSrcs);

		if (optimize) {
			markup.pipe(htmlmin({
				collapseWhitespace: true,
				removeComments: true
			}));
		}

		markup.pipe(gulp.dest('./target/markup'));
	};
};

gulp.task('watch', function() {
	gulp.src(javascriptSrcs)
		.pipe(watch(function() {
			javascriptTask(false)();
		}));
	gulp.src(scssSrcs)
		.pipe(watch(function() {
			compassTask(false)();
		}));
	gulp.src(markupSrcs)
		.pipe(watch(function() {
			markupTask(false)();
		}));
});

gulp.task('markup', markupTask(false));
gulp.task('markup-optimized', markupTask(true));

gulp.task('build', ['javascript', 'compass', 'markup']);
gulp.task('build-optimized', ['javascript-optimized', 'compass-optimized', 'markup-optimized']);