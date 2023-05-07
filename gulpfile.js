const {src, dest, watch, parallel} = require('gulp'),
      scss = require('gulp-sass')(require('sass')),
      rename = require('gulp-rename'),
      browserSync = require('browser-sync').create(),
      autoprefixer = require('gulp-autoprefixer'),
      sourcemaps = require('gulp-sourcemaps'),
      webpack = require('webpack-stream');

function styles() {
    return src('src/scss/style.scss')
        .pipe(autoprefixer())
        .pipe(sourcemaps.init())
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write())
        .pipe(rename('style.min.css'))
        .pipe(dest('src/css'))
}

function js() {
    return src('src/js/main.js')
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'index.js'
            },
            devtool: 'source-map',
            module: {
                rules: [
                  {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: [
                          ['@babel/preset-env']
                        ]
                      }
                    }
                  }
                ]
              }
        }))
        .pipe(dest('src/'));
}

function watchFiles() {
    watch(['src/scss/*.scss'], styles);
    watch(['src/js/**/*.js'], js);
    watch(['src/*.html']).on('change', browserSync.reload);
    watch(['src/scss/*.scss']).on('change', browserSync.reload);
    watch(['src/js/**/*.js']).on('change', browserSync.reload);
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
exports.js = js;
exports.watchFiles = watchFiles;
exports.browsersync = browsersync;

exports.default = parallel(styles, js, browsersync, watchFiles);