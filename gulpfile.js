'use strict';

// Определим константу с папками
const dirs = {
  source: 'src',  // папка с исходниками (путь от корня проекта)
  build: 'build', // папка с результатом работы (путь от корня проекта)
};

// Определим необходимые инструменты
const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const objectFitImages = require('postcss-object-fit-images');
const replace = require('gulp-replace');
const del = require('del');
const browserSync = require('browser-sync').create();
const ghPages = require('gulp-gh-pages');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cheerio = require('gulp-cheerio');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-cleancss');
const pug = require('gulp-pug');
const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const merge = require('merge-stream');
const wait = require('gulp-wait');
const htmlbeautify = require('gulp-html-beautify');
// var styleguide = require('sc5-styleguide');

// Перечисление и настройки плагинов postCSS, которыми обрабатываются стилевые файлы
let postCssPlugins = [
  autoprefixer({                                           // автопрефиксирование
    browsers: ['last 2 version']
  }),
  mqpacker({                                               // объединение медиавыражений с последующей их сортировкой
    sort: true
  }),
  objectFitImages(),                                       // возможность применять object-fit
];

// Изображения, которые нужно копировать
let images = [
  dirs.source + '/img/*.{gif,png,jpg,jpeg,svg,ico}',
  dirs.source + '/blocks/**/img/*.{gif,png,jpg,jpeg,svg}',
  '!' + dirs.source + '/blocks/sprite-png/png/*',
  '!' + dirs.source + '/blocks/sprite-svg/svg/*',
];

// Cписок обрабатываемых файлов в указанной последовательности
let jsList = [
  dirs.source + '/js/jquery.min.js',
  dirs.source + '/js/jquery-migrate.min.js',
  // dirs.source + '/js/jquery-ui.min.js',
  dirs.source + '/js/bootstrap.bundle.min.js',
  dirs.source + '/js/svg4everybody.min.js',
  dirs.source + '/js/ofi.min.js',
  dirs.source + '/js/pushy.min.js',
  dirs.source + '/js/slick.min.js',
  dirs.source + '/js/jquery.barrating.min.js',
  dirs.source + '/js/truncate.js',
  dirs.source + '/js/auto-search.js',
  dirs.source + '/js/map.js',
  dirs.source + '/js/ok.json',
  dirs.source + '/js/modals.js',
  dirs.source + '/js/script.js'
];

// var styleguidePath = 'styleguide'; // папка, куда будет генерироваться стайлгайд
// var overviewPath = dirs.source + '/scss/styleguide.md'; //путь до описания стайлгайда
// var scssRoot = dirs.source + '/scss/style.scss'; // путь до главного sass-файла

// Компиляция и обработка стилей
gulp.task('style', function () {
  return gulp.src(dirs.source + '/scss/style.scss')        // какой файл компилировать
    .pipe(plumber({                                        // при ошибках не останавливаем автоматику сборки
      errorHandler: function(err) {
        notify.onError({
          title: 'Styles compilation error',
          message: err.message
        })(err);
        this.emit('end');
      }
    }))
    .pipe(wait(100))
    .pipe(sourcemaps.init())                               // инициируем карту кода
    .pipe(sass({
      outputStyle: 'expanded'
    }))                                                    // компилируем
    .pipe(postcss(postCssPlugins))                         // делаем постпроцессинг
    .pipe(sourcemaps.write('/'))                           // записываем карту кода как отдельный файл
    .pipe(gulp.dest(dirs.build + '/css/'))                 // записываем CSS-файл
    .pipe(browserSync.stream({match: '**/*.css'}))         // укажем browserSync необходимость обновить страницы в браузере
    .pipe(rename('style.min.css'))                         // переименовываем (сейчас запишем рядом то же самое, но минимизированное)
    .pipe(cleanCSS())                                      // сжимаем и оптимизируем
    .pipe(gulp.dest(dirs.build + '/css/'));                // записываем CSS-файл
});

// Первый таск - генерация стайлгайда:
// gulp.task('styleguide:generate', function() {
//   return gulp.src(dirs.source + 'scss/**/*.scss')
//     .pipe(plumber())
//     .pipe(styleguide.generate({
//       title: 'Your styleguide title',
//       server: true,
//       rootPath: styleguidePath,
//       overviewPath: overviewPath,
//       extraHead: [
//         '<style>html {font-size:10px} body {font-size:16px}</style>'
//       ]
//     }))
//     .pipe(gulp.dest(styleguidePath));
// });
// Следующий таск - применение стилей внутри стайлгайда:
// gulp.task('styleguide:applystyles', function() {
//   return gulp.src(scssRoot)
//     .pipe(plumber())
//     .pipe(sass({
//       errLogToConsole: true
//     }))
//     .pipe(styleguide.applyStyles())
//     .pipe(gulp.dest(styleguidePath));
// });
// Объединение тасков
// gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);

// Компиляция pug
gulp.task('pug', function() {
  return gulp.src([
      dirs.source + '/*.pug',
      '!' + dirs.source + '/mixins.pug',
    ])
    .pipe(plumber())
    .pipe(pug())
    .pipe(htmlbeautify())
    .pipe(gulp.dest(dirs.build));
});

// Копирование html
// gulp.task('copy:html', function () {
//   return gulp.src(dirs.source + '/*.html')
//     .pipe(plumber({ errorHandler: onError }))             // не останавливаем автоматику при ошибках
//     .pipe(gulp.dest(dirs.build));
// });

// Копирование изображений
gulp.task('copy:img', function () {
  if(images.length) {
    return gulp.src(images)
      // .pipe(newer(dirs.build + '/img')) // потенциально опасно, к сожалению
      .pipe(rename({dirname: ''}))
      .pipe(gulp.dest(dirs.build + '/img'));
  }
  else {
    console.log('Изображения не обрабатываются.');
    callback();
  }
});

// Копирование шрифтов
gulp.task('copy:fonts', function () {
  return gulp.src([
      dirs.source + '/fonts/*.{ttf,woff,woff2,eot,svg}',
    ])
    .pipe(gulp.dest(dirs.build + '/fonts'));
});

// Сборка SVG-спрайта
let spriteSvgPath = dirs.source + '/blocks/sprite-svg/svg/';
gulp.task('sprite:svg', function (callback) {
  if(fileExist(spriteSvgPath) !== false) {
    return gulp.src(spriteSvgPath + '*.svg')
      .pipe(svgmin(function (file) {
        return {
          plugins: [{
            cleanupIDs: {
              minify: true
            }
          }]
        }
      }))
      .pipe(svgstore({ inlineSvg: true }))
      .pipe(cheerio({
        run: function($) {
          $('svg').attr('style',  'display:none');
        },
        parserOptions: {
          xmlMode: true
        }
      }))
      .pipe(rename('sprite-svg.svg'))
      .pipe(gulp.dest(dirs.source + '/blocks/sprite-svg/img/'));
  }
  else {
    console.log('SVG-спрайт: нет папки ' + spriteSvgPath);
    callback();
  }
});

// Сборка PNG-спрайта
let spritePngPath = dirs.source + '/blocks/sprite-png/png/';
gulp.task('sprite:png', function () {
  let fileName = 'sprite-' + Math.random().toString().replace(/[^0-9]/g, '') + '.png';
  let spriteData = gulp.src(spritePngPath + '*.png')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(spritesmith({
      imgName: fileName,
      cssName: 'sprite-png.scss',
      padding: 4,
      imgPath: '../img/' + fileName
    }));
  let imgStream = spriteData.img
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest(dirs.source + '/blocks/sprite-png/img/'));
  let cssStream = spriteData.css
    .pipe(gulp.dest(dirs.source + '/blocks/sprite-png/'));
  return merge(imgStream, cssStream);
});

// Очистка перед сборкой
gulp.task('clean', function () {
  return del([
    dirs.build + '/**/*',
    '!' + dirs.build + '/readme.md',
    dirs.source + '/blocks/sprite-png/img',
  ]);
});

// Копирование Javascript
gulp.task('copy:js', function () {
  if(jsList.length) {
    return gulp.src(jsList)
      .pipe(plumber({ errorHandler: onError }))             // не останавливаем автоматику при ошибках

      .pipe(gulp.dest(dirs.build + '/js'));
  } else {
      console.log('Javascript не обрабатывается');
      callback();
  }
});

// Конкатенация и углификация Javascript
// gulp.task('js', function () {
//   if(jsList.length) {
//     return gulp.src(jsList)
//       .pipe(plumber({ errorHandler: onError }))             // не останавливаем автоматику при ошибках
//       .pipe(concat('script.min.js'))                        // конкатенируем все файлы в один с указанным именем
//       .pipe(uglify())                                       // сжимаем
//       .pipe(gulp.dest(dirs.build + '/js'));                 // записываем
//   }
//   else {
//     console.log('Javascript не обрабатывается');
//     callback();
//   }
// });

// Сборка всего
gulp.task('build', function (callback) {
  gulpSequence(
    'clean',
    ['sprite:svg', 'sprite:png'],
    ['style', 'copy:js', 'copy:img', 'copy:fonts'],
    // 'styleguide',
    'pug',
    // 'copy:html',
    callback
  );
});

// Задача по умолчанию
gulp.task('default', ['serve']);

// Локальный сервер, слежение
gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: dirs.build,
    startPath: 'index.html',
    open: false,
    port: 8080,
  });

  // Слежение за стилями
  gulp.watch([
    dirs.source + '/scss/*.scss',
    dirs.source + '/blocks/**/*.scss',
  ], ['watch:style']);

  // Слежение за pug
  gulp.watch([
    dirs.source + '/**/*.pug',
  ], ['watch:pug']);

  // Слежение за html
  // gulp.watch([
  //   dirs.source + '/*.html',
  // ], ['watch:html']);

  // Слежение за изображениями
  if(images.length) {
    gulp.watch(images, ['watch:img']);
  }

  // Слежение за шрифтами
  gulp.watch(dirs.source + '/fonts/*.{ttf,woff,woff2,eot,svg}', ['watch:fonts']);

  // Слежение за SVG (спрайты)
  gulp.watch('*.svg', {cwd: spriteSvgPath}, ['watch:sprite:svg']);

  // Слежение за PNG (спрайты)
  gulp.watch(spritePngPath + '*.png', {cwd: spritePngPath}, ['watch:sprite:png']);

  // Слежение за JS
  if(jsList.length) {
    gulp.watch(jsList, ['watch:js']);
  }
});

// Браузерсинк с 3-м галпом — такой браузерсинк...
gulp.task('watch:pug', ['pug'], reload);
// gulp.task('watch:html', ['copy:html'], reload);
gulp.task('watch:style', ['style'], reload);
// gulp.task('watch:style', ['style', 'styleguide'], reload); // Слежение за стилями и пересборка styleguide
gulp.task('watch:img', ['copy:img'], reload);
gulp.task('watch:fonts', ['copy:fonts'], reload);
gulp.task('watch:sprite:svg', ['sprite:svg'], reload);
gulp.task('watch:sprite:png', ['sprite:png'], reload);
gulp.task('watch:js', ['copy:js'], reload);

// Отправка в GH pages (ветку gh-pages репозитория)
gulp.task('deploy', function() {
  return gulp.src(dirs.build + '/**/*')
    .pipe(ghPages({
      // origin: "upstream"
      // remoteUrl:
    }));
});

// Перезагрузка браузера
function reload (done) {
  browserSync.reload();
  done();
}

// Проверка существования файла/папки
function fileExist(path) {
  const fs = require('fs');
  try {
    fs.statSync(path);
  } catch(err) {
    return !(err && err.code === 'ENOENT');
  }
}

var onError = function(err) {
  notify.onError({
    title: 'Error in ' + err.plugin,
  })(err);
  this.emit('end');
};
