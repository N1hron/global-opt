const {src, dest, watch, parallel, series} = require('gulp'),
      scss = require('gulp-sass')(require('sass')),
      rename = require('gulp-rename'),
      browserSync = require('browser-sync').create(),
      autoprefixer = require('gulp-autoprefixer'),
      sourcemaps = require('gulp-sourcemaps'),
      webpack = require('webpack-stream'),
      del = require('del'),
      imagemin = require('gulp-imagemin');

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

function moveResources() {
  return src([
      'src/css/style.min.css',
      'src/*.html',
      'src/*.js',
      'src/*.js.*',
      'src/assets/fonts/*',
      'src/assets/favicons/*'
    ], {base: 'src'})
    .pipe(dest('dist'))
}

function minifyAndMoveImages() {
  return src('src/assets/img/*', {base: 'src'})
    .pipe(imagemin())
    .pipe(dest('dist')) 
}

function clearDist() {
  return del('dist');
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
exports.moveResources = moveResources;
exports.clearDist = clearDist;
exports.minifyAndMoveImages = minifyAndMoveImages;

exports.default = parallel(styles, js, browsersync, watchFiles);
exports.build = series(clearDist, moveResources, minifyAndMoveImages);