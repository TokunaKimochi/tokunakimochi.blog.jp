import gulp from 'gulp';
import rename from 'gulp-rename';
import gulpIf from 'gulp-if';
import replace from 'gulp-replace';
import ghPages from 'gulp-gh-pages';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import atImport from 'postcss-import';


export const ghp = () => {
  return gulp.src('./public/**/*')
    .pipe(gulpIf('loadjsrc.js', replace('./', 'https://tokunakimochi.github.io/tokunakimochi.blog.jp/')))
    .pipe(ghPages());
};

export const cp = () => {
  return gulp.src('./scripts/loadjsrc.js')
    .pipe(gulp.dest('./public'));
};

export const css = () => {
  const plugins = [
    atImport(),
    autoprefixer(),
    cssnano()
  ];
  return gulp.src('./styles/import.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(rename('tokunakimochi-blog-jp.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public'));
};

export default gulp.parallel(cp, css);
