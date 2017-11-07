var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();

var buffer = require('vinyl-buffer');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var ngAnnotate = require('gulp-ng-annotate');
var minifyHTML = require('gulp-htmlmin');

var angularFilesort = require('gulp-angular-filesort'),
    inject = require('gulp-inject'),
    naturalSort = require('gulp-natural-sort'),
    //bowerFiles = require('main-bower-files'),
    es = require('event-stream');


const scripts = require('./scripts');
const styles = require('./styles');

var devMode = false;

var vendorStream = gulp.src(["./node_modules/angular/angular.js",
    "./node_modules/angular-route/angular-route.js",
    "./src/assets/*.js"])
    // .pipe(naturalSort())
    // .pipe(angularFilesort())
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));

// Concatenate AND minify app sources
var appStream = gulp.src(['./src/app/**/*.js'])
    .pipe(naturalSort())
    .pipe(angularFilesort())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    ;

gulp.task('main', function () {
    gulp.src('./src/app/**/*.html')
        .pipe(minifyHTML({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(inject(es.merge(vendorStream, appStream)
        ))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('css', function () {
    gulp.src(styles)
        .pipe(concat('main.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('dist/content/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});



var fontCopy = gulp.src('./src/app/css/fonts/*')
    .pipe(gulp.dest('dist/content/fonts'))
    .pipe(browserSync.reload({
        stream: true
    }));
var imageCpoy = gulp.src('./src/app/css/images/*')
    .pipe(gulp.dest('dist/content/images'))
    .pipe(browserSync.reload({
        stream: true
    }));


gulp.task('copy', function () {
    gulp.src('./src/app/**/*.html')
        .pipe(inject(es.merge(fontCopy, imageCpoy)
        ))
        .pipe(gulp.dest('dist/content/'))
        ;
});
// gulp.task('js', function () {
//     gulp.src(scripts)
//         .pipe(concat('scripts.js'))
//         .pipe(ngAnnotate())
//         .pipe(uglify())
//         .pipe(gulp.dest('./dist/js'))
//         .pipe(browserSync.reload({
//             stream: true
//         }));
// });

// gulp.task('html', function () {
//     return gulp.src('./src/app/**/*.html')
//         .pipe(minifyHTML({
//             removeComments: true,
//             collapseWhitespace: true
//         }))
//         .pipe(gulp.dest('./dist/'))
//         .pipe(browserSync.reload({
//             stream: true
//         }));
// });

gulp.task('build', function () {
    gulp.start(['css', 'main', 'copy']);
});

gulp.task('browser-sync', function () {
    browserSync.init(null, {
        open: true,
        server: {
            baseDir: 'dist',
            routes: {
                "/bower_components": "bower_components",
                "/node_modules": "node_modules"
            }
        },
        browser: "Chrome"
    });
});

gulp.task('start', function () {
    devMode = true;
    gulp.start(['build', 'browser-sync']);
    gulp.watch(['./src/app/css/**/*.css'], ['css']);
    gulp.watch(['./src/app/**/*.js'], ['main']);
    gulp.watch(['./src/app/**/*.html'], ['copy']);
});