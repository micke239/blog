var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	compass = require('gulp-compass'),
	htmlmin = require('gulp-htmlmin');

var javascripts = [
	"./bower_components/underscore/underscore.js",
	"./bower_components/angular/angular.js",
	"./bower_components/angular-route/angular-route.js",
	"./src/main/javascript/app.js",
	"./src/main/javascript/routes.js",
	"./src/main/javascript/services/Version.js",
	"./src/main/javascript/controllers/IndexController.js",
	"./src/main/javascript/controllers/View2Controller.js",
	"./src/main/javascript/filters/Interpolate.js",
	"./src/main/javascript/directives/AppVersion.js"
];

var javascriptTask = function(optimize) {
	return function() {
		var js = gulp.src(javascripts)
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
		var css = gulp.src('./src/main/sass/**/*scss')
			.pipe(compass({
				css: 'target/css',
				sass: 'src/main/sass',
				image: 'src/main/images',
				comments: optimize ? false : true,
				style: optimize ? "compressed" : "compact"
			}));

		css.pipe(gulp.dest('./target/css'));
	};
};

gulp.task('compass', compassTask(false));
gulp.task('compass-optimized', compassTask(true));

var markupTask = function(optimize) {
	return function() {
		var markup = gulp.src('./src/main/markup/**/*html');

		if (optimize) {
			markup.pipe(htmlmin({
				collapseWhitespace: true,
				removeComments: true
			}));
		}

		markup.pipe(gulp.dest('./target/markup'));
	};
};

gulp.task('markup', markupTask(false));
gulp.task('markup-optimized', markupTask(true));

gulp.task('build', ['javascript', 'compass', 'markup']);
gulp.task('build-optimized', ['javascript-optimized', 'compass-optimized', 'markup-optimized']);