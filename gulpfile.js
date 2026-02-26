const {
    src,
    dest,
    watch,
    series,
} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

// Paths

const paths = {
    scss: {
        src: './scss/**/*.scss',
        dest: './dist/css'
    },
    js: {
        src: './js/**/*.js',
        dest: './dist/js'
    },
    html : {
        src: './*.html',
        dest: './dist'
    },
    img: {
        src: './img/**/*.*',
        dest: './dist/img'
    }
};

// Compile SCSS to CSS
function styleTask() {
    // Compile the single entrypoint `scss/style.scss` so Sass sees the file extension
    // and partials are loaded via `@use`/`@forward`. Don't concat before sass.
    return src('./scss/style.scss', { sourcemaps: true })
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(concat('style.css'))
        .pipe(dest(paths.scss.dest, { sourcemaps: '.' }))
        .pipe(browserSync.stream());
}

// Minify JavaScript

function jsTask() {
    return src(paths.js.src, { sourcemaps: true })
        .pipe(concat('all.js'))
        .pipe(terser())
        .pipe(dest(paths.js.dest, { sourcemaps: '.' }))
        .pipe(browserSync.stream());
}

// Optimize Images

function htmlTask() {
    return src(paths.html.src)
        .pipe(dest(paths.html.dest))
}

function imgTask() {
    return src(paths.img.src)
        .pipe(imagemin())
        .pipe(dest(paths.img.dest))
}

// Watch Files

function watchTask() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    watch(paths.html.src, htmlTask).on('change', browserSync.reload);
    watch(paths.scss.src, styleTask);
    watch(paths.js.src, jsTask);
    watch(paths.img.src, imgTask);
}

exports.default = series(
    styleTask,
    jsTask,
    htmlTask,
    imgTask,
    watchTask
)


