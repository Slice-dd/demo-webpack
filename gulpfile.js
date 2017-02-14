var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    order = require('gulp-order'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    fileinclude = require('gulp-file-include'),
    webpack = require('gulp-webpack');


// gulp task styles
gulp.task('styles', function() {
    return sass('src/css/*.scss')
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/css/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css/'))
        .pipe(notify({ message: 'Styles task complete' }))
});

// //gulp task script
// gulp.task('scripts', function(param) {
//     return gulp.src(['src/**/.js'])
//         .pipe(order([
//             'lib/jquery.min.js ',
//             'lib/*.js',
//             'js/*.js'
//         ]))
//         .pipe(jshint('.jshintrc'))
//         .pipe(jshint.reporter('default'))
//         .pipe(concat('main.js'))
//         .pipe(gulp.dest('dist/js/'))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js/'))
//         .pipe(notify({ message: 'Scripts task complate' }))
// });

gulp.task('scripts', function(callback) {
    return gulp.src('src/entry.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/js'))
})



//gulp task images
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({ message: 'Images task complate' }))

});

//gulp task html
gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(notify({ message: 'html task conplate' }))
});


//gulp clean
gulp.task('clean', function() {
    return gulp.src(['dist/css', 'dist/js', 'dist/images'])
});


//default
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'html');
});



gulp.task('watch', function() {

    //watch .scss
    gulp.watch('src/css/**/*.scss', ['styles']);

    //wactch .js
    gulp.watch('src/js/**/*.js', ['scripts']);

    //wacth images
    gulp.watch('src/images/**/*', ['images']);

    //wacth html
    gulp.watch('src/**/*.html', ['html']);


    livereload.listen();
    gulp.watch(['dist/**']).on('change', livereload.changed)

});