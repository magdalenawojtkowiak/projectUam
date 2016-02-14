var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var flatten = require('gulp-flatten');
var ngAnnotate = require('gulp-ng-annotate');
var browserify = require('gulp-browserify');

var paths = {
    sass: ['./app/**/*.scss'],
    js: ['./app/app.js'],
    html: ['./index.html','./app/**/*.html'],
    vendor: [
        './node_modules/angular/angular.min.js',
        './node_modules/angular-ui-router/release/angular-ui-router.min.js',
        './node_modules/angular-aria/angular-aria.js',
        './node_modules/angular-animate/angular-animate.js',
        './node_modules/angular-material/angular-material.js',
        './node_modules/angular-resource/angular-resource.min.js',
        './node_modules/underscore/underscore-min.js'
    ]
};

gulp.task('default', ['sass', 'js', 'html', 'watch']);

gulp.task('sass', function (done) {
    gulp.src('./app/main.scss')
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest('../build/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('../build/css/'))
        .on('end', done);
});

gulp.task('js', function (done) {
    gulp.src(paths.js)
        .pipe(browserify())
        .pipe(ngAnnotate())
        .pipe(gulp.dest('../build/js/'))
        .pipe(uglify())
        .pipe(rename( 'main.min.js'))
        .pipe(gulp.dest('../build/js/'))
        .on('end', done);
});

gulp.task('html', function(done){
    gulp.src(paths.html)
        .pipe(flatten())
        .pipe(gulp.dest('../build/'))
        .on('end', done);
});

gulp.task('vendor', function(done){
   gulp.src(paths.vendor)
       .pipe(concat('vendor.js'))
       .pipe(gulp.dest('../build/vendor/'))
       .on('end', done)
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.html, ['html']);
});

gulp.task('build:prod', ['sass','html', 'js', 'vendor']);
gulp.task('build:dev', ['sass','html', 'js', 'vendor']);
