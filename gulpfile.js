var gulp      	 = require('gulp'), // Подключаем Gulp
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'); // Подключаем gulp-uglifyjs (для сжатия JS)
 	del          = require('del'); // Подключаем библиотеку для удаления файлов и папок
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
  	cache        = require('gulp-cache'); // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png

gulp.task('clean', function() {
    return del.sync('public');  
});

gulp.task('fonts', function(){
    return gulp.src('resource/fonts/*.*')
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('scripts', function() {
    return gulp.src([ 
        	'resource/js/*.js', // Берем все JS
        ])
        .pipe(concat('script.min.js')) // Собираем их в кучу в новом файле
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('public/js')); // Выгружаем в папку 
});

gulp.task('css', function() {
    return gulp.src('resource/css/*.css') // Выбираем файл для минификации
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(concat('style.min.css')) 
        .pipe(cssnano()) // Сжимаем 
        .pipe(gulp.dest('public/css')); // Выгружаем в папку
});

gulp.task('img', function() {
    return gulp.src('resource/img/*.*') // Берем все изображения  
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('public/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'fonts','img', 'css', 'scripts'], function() {

});