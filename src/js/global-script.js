// Сразу после загрузки виден только индикатор загрузки
// Как только документ готов, показываем документ, скрываем загрузчик
// Эта функциональность вынесена инлайново в <head>

$(document).ready(function() {

  // главное меню: показ/сокрытие
  $('.js-main-menu-toggler').on('click', function(){
    $('#main-nav').toggleClass('main-nav--open');
    $('html').toggleClass('js-main-nav-open');
  });

  // боковая форма: показ/сокрытие
  $('.js-discuss-project-toggler').on('click', function(e){
    e.preventDefault();
    $('#discuss-project-form').toggleClass('discuss-project-form--open');
    // $('html').toggleClass('js-discuss-project-form-open');
  });

  // контакты: показ/сокрытие псевдомодальных окон
  $('.js-activate-contacts-item').on('click', function(e){
    e.preventDefault();
    $(this).closest('.page-contacts__item').toggleClass('page-contacts__item--js-active');
  });

  // контакты: показ/сокрытие попапа для быстрого контакта
  $('.js-fast-contacts-toggler').on('click', function(e){
    e.preventDefault();
    $('#fast-contact').toggleClass('fast-contacts--js-active');
  });

  //
  $('.field-text__input[type="tel"]').mask("+7 (999) 999-9999");

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




  // кейсы
  var casesCarousel = $('#cases-carousel');
  $('body').append('<div style="display:none" id="all-slides">'+$(casesCarousel).html()+'</div>');
  if (casesCarousel.length) {

    // настройки карусли
    var casesCarouselOptions = {
      loop: true,
      items: 1,
      mouseDrag: false,
      touchDrag: false,
      dots: false,
    };

    // настройки карусели-пагинатора
    var casesCarouselPaginatorOptions = {
      loop: true,
      items: 5,
      mouseDrag: false,
      touchDrag: false,
      dots: false,
      nav: true,
      center: true,
      smartSpeed: 200,
    };

    // оставим в блоке карусели только слайды нужного типа
    slidesFilter( $('#cases-filter .page-cases__filter-item--active').data('show-item-type') );

    // оставляет в блоке карусели только слайды нужного типа
    function slidesFilter(slidesType){
      var needSlides = '';
      $('#all-slides').clone().find('.page-cases__item').each(function(){
        // console.log( $(this) );
        if (findInObject($(this)[0].dataset.itemType.toString().split(' '), slidesType)) {
          needSlides += $(this)[0].outerHTML;
        }
      });
      // console.log(needSlides);
      casesCarousel.html(needSlides);
      // поиск в массиве
      function findInObject(object, value) {
        for (var key in object) {
          if (object[key] == value) return true;
        }
        return false;
      }
    }

    // формируем, включаем карусель-пагинатор, следим за ее событиями
    casesCarouselPaginatorInit();

    // формирует, включает карусель-пагинатор, следит за ее событиями
    function casesCarouselPaginatorInit(){
      // удалим содержимое карусели-пагинатора, если она есть
      var casesCarouselPaginator = $('#cases-carousel-paginator');
      if (casesCarouselPaginator.length) {
        casesCarouselPaginator.trigger("destroy.owl.carousel").text('').off();
      }
      // добавим ее (пустую), если ее нет
      else {
        casesCarousel.before('<div class="page-cases__carousel-paginator-wrap"><div id="cases-carousel-paginator" class="owl-carousel page-cases__carousel-paginator page-cases__carousel-paginator--has-line"></div></div>');
      }

      // сформируем разметку для карусели-пагинатора
      var casesCarouselPaginatorHtml = '';
      var pageCasesItems = casesCarousel.find('.page-cases__item');
      pageCasesItems.each(function(){
        var slide = $(this).find('.page-cases__item-name');
        casesCarouselPaginatorHtml += '<div class="page-cases__carousel-paginator-item" data-id="'+$(this).data('unique-id')+'">'+slide.html()+'</div>';
      });

      // console.log(pageCasesItems.length);
      // var emptySlide = '<div class="page-cases__carousel-paginator-item"><span class="page-cases__name-text"></span></div>';
      // if(pageCasesItems.length < 5) {
      //   for (var i = 5; i > pageCasesItems.length; i--) {
      //     casesCarouselPaginatorHtml += emptySlide;
      //   }
      // }

      // вставим карусель-пагинатор и активируем ее
      var casesCarouselPaginator = $('#cases-carousel-paginator');
      casesCarouselPaginator.html(casesCarouselPaginatorHtml).owlCarousel(casesCarouselPaginatorOptions);

      // следим за изменением в карусели-пагинаторе, меняем карусель с картинками
      casesCarouselPaginator
        .on('translated.owl.carousel', function(event) {
          // получим значение атрибута data-unique-id того слайда главной карусели, на который хотим попасть
          var targetId = $('#cases-carousel-paginator .owl-item').eq(event.item.index).find('.page-cases__carousel-paginator-item').data('id');
          casesCarouselToSlide(targetId);
          casesCarouselPaginator.addClass('page-cases__carousel-paginator--has-line');
        })
        .on('translate.owl.carousel', function(event) {
          casesCarouselPaginator.removeClass('page-cases__carousel-paginator--has-line');
        });

      // следим за колесом мыши на пагинаторе
      casesCarouselPaginator.on('mousewheel', function (e) {
        if (e.deltaY > 0) {
          casesCarouselPaginator.trigger('next.owl');
        } else {
          casesCarouselPaginator.trigger('prev.owl');
        }
        e.preventDefault();
      });
    }

    // листает карусель к слайду с указанным data-unique-id
    function casesCarouselToSlide(targetSlideId) {
      var allNotClonedItems = casesCarousel.find('.owl-item:not(.cloned)');
      var targetIndex = 0;
      allNotClonedItems.each(function(i){
        var target = $(allNotClonedItems[i]).find('[data-unique-id="'+targetSlideId+'"]');
        if (target.length) {
          targetIndex = i;
        }
      });
      // console.log(targetIndex);
      casesCarousel.trigger("to.owl.carousel", targetIndex );
    }

    // активируем главную карусель только если 1200+
    if ( window.innerWidth >= 1200 ) {
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

    // будем следить за фильтром
    var casesFilter = $('#cases-filter');
    casesFilter.on('click', '.page-cases__filter-item', function(e){
      e.preventDefault();
      $(casesFilter).find('.page-cases__filter-item--active').removeClass('page-cases__filter-item--active');
      $(this).addClass('page-cases__filter-item--active');
      // console.log( $(this).data('show-item-type') );
      // убьем карусель
      $(casesCarousel).trigger('destroy.owl.carousel');
      // сменим слайды
      slidesFilter( $(this).data('show-item-type') );
      // активируем карусель
      var owlActive = casesCarousel.owlCarousel(casesCarouselOptions);
      // сформируем и активируем карусель-пагинатор
      casesCarouselPaginatorInit();
      // пролистаем карусель к нужному слайду
      casesCarouselToSlide( $('#cases-carousel-paginator .owl-item.active.center .page-cases__carousel-paginator-item').data('id') );
    });

  }




});
