$(document).ready(function() {
  const cartBtn = $('#cart-button'),
        accBtn = $('#account-button'),
        favBtn = $('#favourite-button'),
        navProducts = $('#products'),
        burger = $('.burger');
        srollToTop = $('#scroll-to-top');



  $('.home__carousel-items').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    variableWidth: true,
    infinite: true,
    autoplay: true,
    swipeToSlide: false,
    arrows: false,
    prevArrow: '<button class="btn home__carousel-btn home__carousel-btn--prev"><span></span></button>',
    nextArrow: '<button class="btn home__carousel-btn home__carousel-btn--next"><span></span></button>',
    dots: false,
    dotsClass: 'home__carousel-dots',
  });

  $('.blog__carousel-items').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 800,
    variableWidth: true,
    infinite: true,
    autoplay: true,
    centerMode: true,
    centerPadding: "0px",
    swipeToSlide: true,
    arrows: false,
    dots: true,
    dotsClass: 'blog__carousel-dots',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });

  $('.banner__carousel-items').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 800,
    variableWidth: true,
    infinite: true,
    autoplay: false,
    centerMode: false,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    dotsClass: 'banner__carousel-dots',
    responsive: [
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        }
      },
    ]
    
  });

  // $('.banner__carousel-items').on('afterChange', function() {
  //   ($('.current').text('hello')
  // })


  const header = $('.header');
  const headerPos = header.offset().top;

  $(window).scroll(function() {
    const scroll = $(window).scrollTop();

    if(scroll >= headerPos) {
      header.addClass('header--fixed');
      $('.header__form-search').css({"backgroundColor": "transparent"});
    } else {
      header.removeClass('header--fixed');
      $('.header__form-search').css({"backgroundColor": "#ffffff"});
    }

    const homeHeight = $('.home').innerHeight();

    if(scroll > 777) {
      srollToTop.addClass('scroll-to-top--active');
    } else {
      srollToTop.removeClass('scroll-to-top--active');
    }
  })

  burger.on('click', function() {
    $('.header__mobile').toggleClass('header__mobile--active');
    $('.header').toggleClass('header--active');
  })

  cartBtn.on('click', function() {
    const cart = $('.header__profile-cart');

    // if ($(window).width() > 768) {
      cart.toggleClass('header__profile-cart--active');
    // }       
  })


  $(document).on('click', function(e) {
    const cart = $('.header__profile-cart');

    if (e.target.closest('.header__profile-button--cart') || e.target.closest('.header__profile-cart')) {
      return
    } else {
      cart.removeClass('header__profile-cart--active');
    }

    if (e.target.closest('.burger') || e.target.closest('.header__mobile')) {
      return
    } else {
      $('.header__mobile').removeClass('header__mobile--active');
      $('.header').removeClass('header--active');
    }
  })

  // $(window).on('resize', function() {
  //   const headerWidth = $('.header__inner').width() - 40;
  //   const headerOffset = 28.5;
  //   $('.header__menu-submenu').width(headerWidth);
  //   $('.header__menu-submenu').css({
  //     "left": '-' + headerOffset + "px", 
  //   })
  // })

  srollToTop.on('click', function() {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
  });

  $('.header__logo-link').on('click', function(e) {
    e.preventDefault();

    $('html, body').animate({
      scrollTop: 0
    }, 800);
  });


  mobileButtons = $('.header__mobile-menu-item');

  mobileButtons.on('click', function() { 
    const children = $(this).children('.header__mobile-submenu');

    children.toggleClass('header__mobile-submenu--active');
  })

  $('.header__menu-link').on('click', function(e) {
    e.preventDefault();
  })

  $('.footer__item-link').on('click', function(e) {
    e.preventDefault();
  })

  $('.footer__form-button').on('click', function(e) {
    e.preventDefault();
  })
})