import gulp from 'gulp';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import gulpIf from 'gulp-if';
import replace from 'gulp-replace';
import ghPages from 'gulp-gh-pages';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';


export const ghp = () => {
  return gulp.src('./public/**/*')
    .pipe(gulpIf('loadjsrc.js', replace('./', '//tokunakimochi.github.io/tokunakimochi.blog.jp/')))
    .pipe(ghPages());
};

export const cp = () => {
  return gulp.src('./scripts/loadjsrc.js')
    .pipe(gulp.dest('./public'));
};

export const js0 = () => {
  return gulp.src('./scripts/escape-kaomoji.iife.js')
    .pipe(rename('tokunakimochi-blog-jp.iife.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public'));
};

export const css = () => {
  const plugins = [
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

export default gulp.parallel(cp, js0, css);
