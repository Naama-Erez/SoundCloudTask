var gulp = require('gulp');
var concat = require('gulp-concat');


gulp.task('build', function () {
    gulp.src(['src/SoundCloud.js','src/*.js','src/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/'));
	gulp.src(['style/*.css'])
		.pipe(concat('style.css'))
		.pipe(gulp.dest('dist/'));
});


gulp.task('default', function () {
    gulp.watch(['src/*.js','src/**/*.js','style/*.css'], ['build']);
});