const { watch, src, dest, series } = require('gulp');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
// const purgecss = require('@fullhuman/postcss-purgecss');
const purgecss = require('gulp-purgecss');
const cssnano = require('cssnano');

function liveServer(done) {
  browserSync.init(
    {
      server: {
        baseDir: ['./src', './node_modules'],
      },
    },
    done
  );
}

function watchFiles() {
  watch(['./src/style/**/*.css']).on('change', browserSync.stream);
  watch(['./src/**/*.*', '!./src/styles/**/*.css']).on('change', browserSync.reload);
}

function buildFiles() {
  return src('./node_modules/bootstrap/dist/css/bootstrap.css')
    .pipe(
      purgecss({
        content: ['src/**/*.html'],
      })
    )
    .pipe(postcss([cssnano()]))
    .pipe(dest('./dist/'));
}

exports.default = series(liveServer, watchFiles);
exports.build = buildFiles;
