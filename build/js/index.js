$(document).ready(function() {
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
    dotsClass: 'home__carousel-nav',
  });

  $('.blog__carousel-items').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    variableWidth: true,
    infinite: true,
    autoplay: true,
    centerMode: true,
    // centerPadding: "30px",
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

  $(window).scroll(function() {
    const header = $('.header');
    const scroll = $(window).scrollTop();
    const headerPos = header.offset().top;

    if(scroll > 55) {
      header.addClass('header--fixed');
      $('.header__form-search').css({"backgroundColor": "transparent"});
    } else {
      header.removeClass('header--fixed');
      $('.header__form-search').css({"backgroundColor": "#ffffff"});
    }
    
  })

})