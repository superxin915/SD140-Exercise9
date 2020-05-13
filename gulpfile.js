const gulp = require(`gulp`);
const cleanCSS = require(`gulp-clean-css`);
const htmlmin = require(`gulp-htmlmin`);
const minify = require(`gulp-minify`);

exports.default = cb => {
  gulp.src(`css/*.css`)
    .pipe(cleanCSS())
    .pipe(gulp.dest(`dest/css`));

  gulp.src(`*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dest'));

  gulp.task(`compress`, () => {
    gulp.src(`js/*.js`)
      .pipe(minify())
      .pipe(gulp.dest('dest/js'));
  })

  cb();
}