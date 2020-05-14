const gulp = require(`gulp`);
const cleanCSS = require(`gulp-clean-css`);
const htmlmin = require(`gulp-htmlmin`);
const minify = require(`gulp-minify`);

function compressCSS(cb) {
  gulp.src(`css/*.css`)
    .pipe(cleanCSS())
    .pipe(gulp.dest(`dest/css`));
  cb();
}

function compressHTML(cb) {
  gulp.src(`*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(`dest`));
  cb();
}

function compressJS(cb) {
  gulp.src(`js/*.js`)
    .pipe(minify())
    .pipe(gulp.dest(`dest/js`));
  cb();
}

function compressFiles(cb) {
  compressCSS(cb);
  compressHTML(cb);
  compressJS(cb);
}

exports.default = compressFiles;