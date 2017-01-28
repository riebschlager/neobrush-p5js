const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const concat = require('gulp-concat');
const sass = require('gulp-sass');

const vendorScripts = [
    'node_modules/p5/lib/p5.min.js'
];

gulp.task('vendor-scripts', function() {
    return gulp.src(vendorScripts)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./app/js'));
});

gulp.task('styles', function() {
    return gulp
        .src(['./app/scss/main.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css/'));
});

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
    gulp.watch('./app/scss/**/*.scss', ['styles']);
    gulp.watch(['*.html', 'styles/**/*.css', 'js/**/*.js'], {
        cwd: 'app'
    }, reload);
});

gulp.task('default', ['vendor-scripts', 'styles', 'serve']);