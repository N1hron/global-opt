const {src, dest, watch, parallel} = require('gulp'),
      scss = require('gulp-sass')(require('sass')),
      concat = require('gulp-concat'),
      rename = require('gulp-rename'),
      browserSync = require('browser-sync').create(),
      autoprefixer = require('gulp-autoprefixer'),
      sourcemaps = require('gulp-sourcemaps');

function styles() {
    return src('src/scss/style.scss')
        .pipe(autoprefixer())
        .pipe(sourcemaps.init())
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write())
        .pipe(rename('style.min.css'))
        .pipe(dest('src/css'))
}

function watchFiles() {
    watch(['src/scss/*.scss'], styles);
    watch(['src/*.html']).on('change', browserSync.reload);
    watch(['src/scss/*.scss']).on('change', browserSync.reload);
    watch(['src/assets/**.*.*']).on('change', browserSync.reload);
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
}

exports.styles = styles;
exports.watchFiles = watchFiles;
exports.browsersync = browsersync;

exports.default = parallel(styles, browsersync, watchFiles);