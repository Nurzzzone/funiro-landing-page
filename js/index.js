$(window).on('load', function() {
  $('.loader').addClass('loader--disabled');

  $('html').css({
    "overflow": 'auto',
  });
})

$(document).ready(function() {
  const cartBtn = $('#cart-button'),
        accBtn = $('#account-button'),
        favBtn = $('#favourite-button'),
        navProducts = $('#products'),
        burger = $('.burger');
        header = $('.header');
        srollToTop = $('#scroll-to-top');




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

    if(scroll > 300) {
      srollToTop.addClass('scroll-to-top--active');
    } else {
      srollToTop.removeClass('scroll-to-top--active');
    }
  })

  // Show mobile menu on click
  burger.on('click', function() {
    $('.header__mobile').toggleClass('header__mobile--active');
    $('.header').toggleClass('header--active');
  })

  // Show cart on click
  cartBtn.on('click', function() {
    const cart = $('.header__profile-cart');

    // if ($(window).width() > 768) {
      cart.toggleClass('header__profile-cart--active');
    // }       
  })

  const cartQuantity = $('.cart-counter');
  const addToCart = $('.btn-add');
  const totalPrice = ('.header__profile-cart-price-totalprice');
  let price = 0;

  const randomId =  () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
  };

  const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  };

  const plusfullPrice = (currentPrice) => {
    return price += currentPrice;
  };

  const minusfullPrice = (currentPrice) => {
    return price -= currentPrice;
  };

  const printFullPrice = () => {
    $(totalPrice).text(`${normalPrice(price)} Rp`);

    if($(totalPrice) <= 0) {
      $(totalPrice).text(0); 
    } else {
      return
    }
  };

  const printQuantity = () => {
    // display empty cart 
    const emptyCart = $('.empty-cart');

    //get cart element 
    const cart = $('.header__profile-cart-items');

    // get length of items inside the cart
    let length = $(cart).find('div.simplebar-content').children().length;

    // print the length of items inside the item
    cartQuantity.text(length);

    if (length > 0) {
      cartQuantity.addClass('cart-counter--active');
      emptyCart.removeClass('empty-cart--active');
    } else {
      cartQuantity.removeClass('cart-counter--active');
      emptyCart.addClass('empty-cart--active');
    }
  }

  const deleteProducts = (productParent) => {
    //get item id
    let id = productParent.find('.header__profile-cart-product').data('id');

    // disabled false
    let addToCart = $(`.product[data-id="${ id }"]`).find('.btn-add');
    addToCart.prop('disabled', false);

    // minus price 
    let currentPrice = parseInt(priceWithoutSpaces(productParent.find('.header__profile-cart-product-price').text()));
    minusfullPrice(currentPrice);

    // print full price
    printFullPrice();

    // remove item in cart 
    productParent.remove();

    // count and print quantity
    printQuantity();
  }

  const generateCartProduct = (img, title, price, id) => {

    // create an item that will be displayed in the cart
    return `
      <li class="header__profile-cart-item">
        <article class="header__profile-cart-product" data-id=${ id }>
          <img class="header__profile-cart-product-img" src="${ img }" alt="image">
          <div class="header__profile-cart-product-body">
            <h4 class="header__profile-cart-product-title">${ title }</h4>
            <span class="header__profile-cart-product-price">${ price } Rp</span>
          </div>
          <div class="header__profile-cart-product-delete">
            <span class="delete-line"></span>
            <span class="delete-line"></span>
          </div>
          <div class="header__profile-cart-product-overlay"></div>
        </article>
      </li>
    `;
  }

  addToCart.each(function () { 
    $(this).closest('.product').attr('data-id', randomId());

    $(this).on('click', function(e) {
      // target the current button
      let self = e.currentTarget;

      // get items where button
      let parent = self.closest('.product');

      // get id of current item
      let id = parent.dataset.id;

      // get img of current item 
      let img = $(parent).find('.product-img').attr('src');

      // get title of current item
      let title = $(parent).find(".product-title").text();

      //get price and convert it to an integer 
      let priceNumber = parseInt(priceWithoutSpaces($(parent).find('.product-price-new').text()));


      plusfullPrice(priceNumber);
      // console.log(price);
      printFullPrice();

      const cart = $('.header__profile-cart-items');
      $(cart).find('div.simplebar-content').prepend(generateCartProduct(img, title, priceNumber, id));
      printQuantity();
      self.disabled = true;
    });
  });

  $('.header__profile-cart-items').on('click', function(e) {
    // const deleteBtn = $(e.target).hasClass('header__profile-cart-product-delete');
    // const span = $(e.target).is('span').parent('.header__profile-cart-product-delete');
    // console.log(span)

    if($(e.target).hasClass('delete-line') || $(e.target).hasClass('header__profile-cart-product-delete')) {
      // create a function that can delete items 
      deleteProducts($(e.target).closest('.header__profile-cart-item'));
    }
  });

  // const cart = $('.header__profile-cart-items');
  // const content = $(cart).find('div.simplebar-content').children().insert;
  // console.log(id);

  $(document).on('click', function(e) {
    const cart = $('.header__profile-cart');

    if (e.target.closest('.header__profile-button--cart') || 
        e.target.closest('.header__profile-cart') || 
        e.target.closest('.header__profile-cart-product-delete')) {
      $('.header__profile-account').removeClass('header__profile-account--active');
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

    if (e.target.closest('.header__profile-button--account') || e.target.closest('.header__profile-account')) {
      return 
    } else {
      $('.header__profile-account').removeClass('header__profile-account--active');
    }
  })

  // scroll-to-top button
  srollToTop.on('click', function() {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
  });

  // scroll to top on logo click
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
  });

  $('.header__profile-button--account').on('click', function() {
    $('.header__profile-account').toggleClass('header__profile-account--active');
  });

  $('.btn-login').on('click', function() {
    $('.modal-login').addClass('modal-login--active');
  })

  $('.modal-login').on('click', function(e) {
    if(e.target.closest('.modal-login__close') || $(e.target).is('.modal-login--active')) {
      $('.modal-login').removeClass('modal-login--active');
    } else {
      return
    }
  })

  $('.btn-signup').on('click', function(e) {
    $('.modal-signup').addClass('modal-signup--active');
  })

  $('.modal-signup').on('click', function(e) {
    if(e.target.closest('.modal-signup__close') || $(e.target).is('.modal-signup--active')) {
      $('.modal-signup').removeClass('modal-signup--active');
    } else {
      return
    }
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

  $('.btn').on('click', function(e) {
    e.preventDefault();
  })

  // Carousel Home Section
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

  // Carousel Blog Section
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

  // Carousel Banner Section
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
  
})

