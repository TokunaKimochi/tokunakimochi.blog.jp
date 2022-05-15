import gulp from 'gulp';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import atImport from 'postcss-import';


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

export const watch = () => gulp.watch('./styles/*.scss', css);

export default css;
