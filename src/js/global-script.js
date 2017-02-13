// Сразу после загрузки виден только индикатор загрузки
// Как только документ готов, показываем документ, скрываем загрузчик
// Эта функциональность вынесена инлайново в <head>

$(document).ready(function() {

  // главное меню: показ/сокрытие
  $('.js-main-menu-toggler').on('click', function(){
    $('#main-nav').toggleClass('main-nav--open');
  });

    // полноэкранный показ: инициация плагина
    $('#full-page').fullpage({
      //Navigation
      menu: '#main-nav',
      lockAnchors: false,
      anchors:['screen-1', 'screen-2', 'screen-3', 'screen-4'],
      // navigation: false,
      // navigationPosition: 'right',
      // navigationTooltips: ['screen-1', 'screen-2', 'screen-3', 'screen-4'],
      // showActiveTooltip: false,
      // slidesNavigation: false,
      // slidesNavPosition: 'bottom',

      //Scrolling
      // css3: true,
      // scrollingSpeed: 700,
      // autoScrolling: true,
      // fitToSection: true,
      // fitToSectionDelay: 1000,
      // scrollBar: false,
      // easing: 'easeInOutCubic',
      // easingcss3: 'ease',
      // loopBottom: false,
      // loopTop: false,
      // loopHorizontal: true,
      // continuousVertical: false,
      // continuousHorizontal: false,
      // scrollHorizontally: false,
      // interlockedSlides: false,
      // dragAndMove: false,
      // offsetSections: false,
      // resetSliders: false,
      // fadingEffect: false,
      normalScrollElements: '#square-loader',
      // scrollOverflow: false,
      // scrollOverflowReset: false,
      // scrollOverflowOptions: null,
      // touchSensitivity: 15,
      // normalScrollElementTouchThreshold: 5,
      // bigSectionsDestination: null,

      //Accessibility
      // keyboardScrolling: true,
      // animateAnchor: true,
      // recordHistory: true,

      //Design
      // controlArrows: true,
      // verticalCentered: true,
      // sectionsColor : ['#ccc', '#fff'],
      // paddingTop: '3em',
      // paddingBottom: '10px',
      // fixedElements: '#header, .footer',
      // responsiveWidth: 0,
      // responsiveHeight: 0,
      // responsiveSlides: false,

      //Custom selectors
      sectionSelector: '.full-page__section',
      // slideSelector: '.slide',

      lazyLoading: true,

      //events
      // onLeave: function(index, nextIndex, direction){},
      // afterLoad: function(anchorLink, index){}, // $('#square-loader')
      // afterRender: function(){},
      // afterResize: function(){},
      // afterResponsive: function(isResponsive){},
      // afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
      // onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
    });

});
