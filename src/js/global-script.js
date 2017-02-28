// Сразу после загрузки виден только индикатор загрузки
// Как только документ готов, показываем документ, скрываем загрузчик
// Эта функциональность вынесена инлайново в <head>

$(document).ready(function() {

  // главное меню: показ/сокрытие
  $('.js-main-menu-toggler').on('click', function(){
    $('#main-nav').toggleClass('main-nav--open');
    $('html').toggleClass('js-main-nav-open');
  });

  // контакты: показ/сокрытие псевдомодальных окон
  $('.js-activate-contacts-item').on('click', function(e){
    e.preventDefault();
    $(this).closest('.page-contacts__item').toggleClass('page-contacts__item--js-active');
  });

  // полноэкранный показ: инициация плагина для одноблочных страниц
  $('#one-screen-page').fullpage({
    menu: '#main-nav',
    lockAnchors: false,
    normalScrollElements: '#square-loader',
    sectionSelector: '.full-page__section',
    afterResize: function(){
      if(window.map !== undefined){
        google.maps.event.trigger(map, 'resize');
      }
    }
  });

  // добавление в блок пагинации полноэкранной прокрутки своего контента
  $('#fp-nav').hide().append('<span class="scroll-me-baby">Скролльте</span>');

  // обеспечение поддержки говнобраузерами свойства object-fit
  objectFitImages();

  // выбор даты
  // https://github.com/nazar-pc/PickMeUp
  pickmeup.defaults.locales['ru'] = {
    days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
  };
  pickmeup('.field-date__calendar', {
    flat : true,
    locale: 'ru'
  });
  $('.field-date__calendar').on('pickmeup-change', function (e) {
    $(this).closest('.field-date').find('input').val(e.detail.formatted_date);
  });

  // переключалка видимости для коллапсируемого списка
  $('.js-collapsing-list-toggler').on('click', function(){
    $(this).closest('.collapsing-list').find('.collapsing-list__item--show-1200').removeClass('collapsing-list__item--show-1200');
    $(this).closest('.collapsing-list__item').toggleClass('collapsing-list__item--show-content collapsing-list__item--show-1200');
  });

  // разработка сайтов, этапы: видео
  $('[data-video-link]').magnificPopup({type:'iframe'});

  // кейсы: карусель
  var casesCarousel = $('#cases-carousel');
  var casesCarouselOptions = {
    loop: true,
    items: 1,
    mouseDrag: false,
    touchDrag: false,
    dots: false,
    nav: true,
  };
  // активируем только если 1200+
  if ( $(window).width() >= 1200 ) {
    var owlActive = casesCarousel.owlCarousel(casesCarouselOptions);
  } else {
    casesCarousel.addClass('owl-carousel--off');
  }
  // следим за изменением размера вьюпорта
  $(window).resize(function() {
    if ( window.innerWidth >= 1200 ) {
      // if ( casesCarousel.hasClass('owl-carousel--off') ) {
        casesCarousel.removeClass('owl-carousel--off');
        var owlActive = casesCarousel.owlCarousel(casesCarouselOptions);
      // }
    } else {
      // if ( !casesCarousel.hasClass('owl-carousel--off') ) {
        casesCarousel.addClass('owl-carousel--off').trigger('destroy.owl.carousel');
        casesCarousel.find('.owl-stage-outer').children(':eq(0)').unwrap();
      // }
    }
  });
  // следим за колесом мыши
  casesCarousel.on('mousewheel', '.owl-stage', function (e) {
    if (e.deltaY > 0) {
      casesCarousel.trigger('next.owl');
    } else {
      casesCarousel.trigger('prev.owl');
    }
    e.preventDefault();
  });


});
