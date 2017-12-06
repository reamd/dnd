/**
 * Created by reamd on 2016/10/25.
 */
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    del = require('del'),
    livereload = require('gulp-livereload'),
    webServer = require('gulp-webserver'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('del', function () {
    return del.sync('dist');
});

gulp.task('scripts',function() {
    return setTimeout(function () {
        gulp.src('src/**.js')
            .pipe(gulp.dest('dist/'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest('dist/'))
            .pipe(notify("<%= file.relative %> uglify success!"));
    },3000)
});

gulp.task('server', function() {
    gulp.src('./')
        .pipe(webServer({
            port: 8282,
            // path: '/example',
            livereload: {
                enable: true
            },
            directoryListing: true,
            fallback: 'index.html',
            open: '/example/index.html'
        }));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.js', ['scripts']);
});

/*研发环境*/
gulp.task('dev', ['del', 'server', 'watch']);

/*发布环境*/
gulp.task('build', ['del', 'scripts']);
