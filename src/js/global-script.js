// Сразу после загрузки виден только индикатор загрузки
// Как только документ готов, показываем документ, скрываем загрузчик
// Эта функциональность вынесена инлайново в <head>

$(document).ready(function() {

  // главное меню: показ/сокрытие
  $('.js-main-menu-toggler').on('click', function(){
    $('#main-nav').toggleClass('main-nav--open');
    $('html').toggleClass('js-main-nav-open');
  });

  // главное меню: для контентных страниц продублируем логотип,
  // чтобы не извращаться со вставкой второго такого же в разметку
  $('#main-nav.main-nav--content .main-nav__logo').clone().addClass('main-nav__logo--inserted-js').prependTo('#main-nav');

  // полноэкранный показ: инициация плагина для одноблочных страниц
  $('#one-screen-page').fullpage({
    menu: '#main-nav',
    lockAnchors: false,
    normalScrollElements: '#square-loader',
    sectionSelector: '.full-page__section',
  });

  // полноэкранный показ: инициация плагина для статей вынесена в разметку,
  // ибо контроль якорей хочется иметь оттуда
  // $('#articles-page').fullpage({});

});
