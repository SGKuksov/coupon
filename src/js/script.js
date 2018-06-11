svg4everybody(); // иницализация полифила для IE

(function($) {
  var spliter = function(el) {
      var str = el.html();

      str = str.split(",").join("<br />\n");
      el.html(str);
  };

  $.fn.splitText = function() {
      return this.each(function () {
          spliter($(this));
      });
  };
}(jQuery));

$(document).ready(function() {

  // вызов обрезания текста
  $('.card__link').truncateText();
  $('.card__place').truncateText();

  // Подстановка разметки в номера телефонов
  $(".coupon__contacts-phone").splitText();
  $(".coupon__address-meta-phone").splitText();

  // подключение автопоиск
  $('#pageHeaderSearch').autoSearch(0);
  $('.modal-location__input').autoSearch(2);
  $('.filter-near__search').autoSearch(2);

  // скрытие блока подписки
  $(".subscribe__close").click(function() {
    $(this).parent().hide();
  });

  // rss
  $(".rss").click(function() {
    var subscribedText = "Вы подписаны";
    var subscribeText = "Подписаться на обновления";

    $(this).toggleClass("rss--checked");

    if ($(this).hasClass("rss--checked")) {
      $(this).find("span").html(subscribedText)
    } else {
      $(this).find("span").html(subscribeText)
    }
  });

  // favorite
  $(".favorite").click(function() {
    var favoritedText = "Добавлено в избранное";
    var favoriteText = "Добавить в избранное";

    $(this).toggleClass("favorite--checked");

    if ($(this).hasClass("favorite--checked")) {
      $(this).find("span").html(favoritedText)
    } else {
      $(this).find("span").html(favoriteText)
    }
  });

  // открытие и закрытие меню
  $(".menu-btn").click(function(event) {
    $("aside").show();
    $("#modalLocation").removeClass('pushy pushy-left').addClass("modal fade").children().removeClass('pushy-content');
    $("#modalLocation").css("z-index", 2000);
  });

  $(".page-header__search-icon").click(function() {
    // показ строки поиска
    var doc_w = $(window).width();

    if (doc_w <= 768) {
      $("form.page-header__search").addClass("page-header__search--show").parent().parent().css("padding", 0);
      $(".page-header__input").attr({
        "placeholder": "Поиск",
        "autofocus": ""
      })
      $(".page-header__cancel").addClass("page-header__cancel--show");
      $(".page-header__submit").addClass("page-header__submit--show");
      $(".overlay").addClass("overlay--show").removeClass("site-overlay");

      $(".page-header__menu").toggle();
      $(".page-header__logo-wrap").toggle();
      $(".page-header__login").toggle();
    }
  });

  // показ строки поиска в мобильном меню
  $(document).mouseup(function(e) {
    var pageHeaderSearch = $(".page-header__search");
    var pageHeaderCancel = $(".page-header__cancel");
    var doc_w = $(window).width();

    if (doc_w <= 768) {

      if ((!pageHeaderSearch.is(e.target) && pageHeaderSearch.has(e.target).length === 0) || (pageHeaderCancel.is(e.target))) {
        $(".overlay").removeClass("overlay--show");
        $("form.page-header__search").removeClass("page-header__search--show").parent().parent().css("padding", "8px");
        $(".page-header__input").attr({
          "placeholder": "",
          "autofocus": ""
        })
        $(".page-header__cancel").removeClass("page-header__cancel--show");
        $(".page-header__submit").removeClass("page-header__submit--show");
        $(".overlay").removeClass("overlay--show").addClass("site-overlay").hide();

        $(".page-header__menu").show();
        $(".page-header__logo-wrap").show();
        $(".page-header__login").show();
      }
    }
  });

  // скрытие строки поиска в мобильном меню
  $(".page-header__cancel--show").click(function() {
    var doc_w = $(window).width();

    if (doc_w <= 768) {
      $(".overlay").removeClass("site-overlay");
      $("form.page-header__search").removeClass("page-header__search--show").parent().parent().css("padding", "8px");
      $(".page-header__input").attr({
        "placeholder": "",
        "autofocus": ""
      });
      $(".page-header__cancel").removeClass("page-header__cancel--show");
      $(".page-header__submit").removeClass("page-header__submit--show");
      $(".overlay").removeClass("overlay--show").addClass("site-overlay").hide();

      $(".page-header__menu").show();
      $(".page-header__logo-wrap").show();
      $(".page-header__login").show();
    }
  });

  // слайдер купонов
  $('.coupon-gallery__inner').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 2,
    variableWidth: true
  });

  // лайтбокс
  $("#placeGallery").click(function() {
    var doc_w = $(window).width();

    if (doc_w >= 768) {
      $("#lightboxModal").modal('show');

      $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        fade: true,
        asNavFor: '.slider-nav'
      });

      $('.slider-nav').slick({
        slidesToShow: 8,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        arrows: false,
        focusOnSelect: true,
        infinite: false
      });
    }
  });


  // рейтинг на запись
  // https://github.com/antennaio/jquery-bar-rating
  $('.rating-bar').barrating({
    theme: 'fontawesome-stars',
    deselectable: false,
    showSelectedRating: true,
    allowEmpty: null
  });

  // рейтинг на чтение
  $('.rating-bar--readonly').barrating('readonly', true).barrating('set', 4); //только чтение

  // #onMapTab
  $('#onMapTab').on('shown.bs.tab', function() {
    if ($(document).width() >= 480) {
      $('.list-of-places__header').show();
      $('.filter__sort').toggle();
    }
  });

  // #byListTab
  $('#byListTab').on('shown.bs.tab', function() {
    if ($(document).width() >= 480) {
      $('.list-of-places__header').hide();
      $('.filter__sort').toggle();
    }
  });

  // address tab
  $('.coupon__place-btn').click(function() {
    var addressTab = $('#addressTab');

    var id = addressTab.attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 50);
    addressTab.tab('show');
  });

  // reviewtab
  $('.coupon-modal__btn').click(function() {
    var reviewtab = $('#reviewTab');
    reviewtab.tab('show');

    var id = reviewtab.attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 50);
  });
//  рпааааааааааааааааааааааааааааааа
  var cur;

  var enableTab = function(id) {
    $('#tabs .tab').removeClass('active').eq(id).addClass('active');
      $('#content div').removeClass('active').eq(id).addClass('active');
  };

  var params = location.search;
  params = params.slice(1, location.search.length);
  params = params.split('&').map(function(el) {
    el = el.split('=');
      if(el[0] == 'tab') cur = el[1];
  });

  switch(cur * 1) {
      case 1:
          enableTab(1);
          break;
      case 2:
          enableTab(2);
          break;
      default:
          enableTab(0);
  }

  $('#tabs .tab').click(function() {
    enableTab($(this).index());
  });

  // filter-near скрытие блока
  $("body").scroll(function() {

    if ( $(".filter-near__dropdown").hasClass("show") ) {
      $(".filter-near__dropdown").dropdown("toggle");
    }

    // Скрытие выпадающего меню при скролле.
    // Работает нестабильно
    // if ( $(".filter-near__dropdown").hasClass("show") && $(".filter-near__search-group").find( $(".autoFillBar") ).css("display") == "none" ) {
    //   $(".filter-near__dropdown").dropdown("toggle");
    // }
  });

  // filter-near ввод значение
  $(".filter-near__submit").click(function() {
    var filterNearSearchValue = $(".filter-near__search").val();
    var filterNearLink = $(".filter-near__link").find("span");

    if ( filterNearSearchValue !== "" ) {
      filterNearLink.html(filterNearSearchValue);
    }
  });

  // Скрытый элементы списка collections
  $(".collections__toggle").html("Все подборки");

  $(".collections__toggle").click(function(e) {
    e.preventDefault();

    if ( !$(this).hasClass("collections__toggle--active") ) {

      $(this).html("Свернуть").addClass("collections__toggle--active");
      $(".collections__list--hide").slideToggle();
    } else {
      $(this).html("Все подборки").removeClass("collections__toggle--active");
      $(".collections__list--hide").slideToggle();
    }
  });

  // Скрытый блок текста coupon
  $(".coupon__toggle").html("Читать далее");

  $(".coupon__toggle").click(function(e) {
    e.preventDefault();

    if ( !$(this).hasClass("coupon__toggle--active") ) {
      $(this).html("Свернуть").addClass("coupon__toggle--active");
      $(".coupon__text--hide").slideToggle();
    } else {
      $(this).html("Читать далее").removeClass("coupon__toggle--active");
      $(".coupon__text--hide").slideToggle();
    }
  });

  // вызов modal-select при открытии страницы
  setTimeout(function() {
    var doc_w = $(window).width();

    if (doc_w >=768) {
      $("#modalSelect").show();
    }
  }, 1000);

  // скрытие modal-select
  $(".modal-select__close").click(function() {
    $("#modalSelect").hide();
  });
  $(".modal-select__btn").click(function() {
    $("#modalSelect").hide();
  });

  //вызов большого модального окна при клике на "Нет"
  $("#modalsBtnCancel").click(function() {
    // var doc_w = $(window).width();

    // if (doc_w > 768 ) {
    $("#selectCityModal").modal('hide');
    $("#modalLocation").modal('show');
    // }
  });

  //вызов большого модального окна выбора города при клике на городе
  $(".callModalLocation").click(function(e) {
    e.preventDefault();
    var doc_w = $(window).width();

    $("body").data("modalIsOpen", false);

    if (doc_w > 1023) {
      $("#modalLocation").modal('show');
      $("#modalLocation").removeClass('pushy pushy-left').addClass("modal fade").children().removeClass('pushy-content').css("z-index", 2000);
      $("aside").show();
      $(".modal-location__btn").html("Это мой город");
    } else {

      // боковое меню выбора города
      $("#modalLocation").addClass('pushy pushy-left').removeClass("modal fade").children().addClass('pushy-content');
      $("body").removeClass('pushy-open-left');
      $("aside").hide();
      $("#modalLocation").show().css("z-index", 1050);
      $("body").addClass('pushy-open-left');
      $(".modal-location__btn").html("Найти");
    }
  });

  // вызов купона по клику на фото
  $(".card__img-wrap").click(function() {
    var modal = $("#couponModal");
    modal.modal("show");
    modal.find('.coupon-modal__text').truncateText();
  });

  // скрытие окна при изменении ширины
  $(window).resize(function() {
    var doc_w = $(window).width();

    if (doc_w <= 992) {
      $("#couponModal").modal("hide");
    }
  });

  // вызов окна авторизации по иконке в шапке
  $("#callAuthModal, .callAuthModal").click(function() {
    $("#warnAuthModal").modal("hide");
    $("#registerModal").modal("hide");
    $("#autorizModal").modal("show");
  });

  // вызов окна регистрации по клику на регистрация в модальном окне
  $("#callRegisterModal, .callRegisterModal").click(function() {
    $("#warnAuthModal").modal("hide");
    $("#autorizModal").modal("hide");
    $("#registerModal").modal("show");
  });

  // вызов окна после регистрации по клику на регистрация в модальном окне
  $("#callRegisterAfterModal").click(function() {
    $("#registerModal").modal("hide");
    $("#registerAfterModal").modal("show");
  });

  // warnAuthModal
  $(".modals-panel__warnAutorModal").click(function() {
    $("#warnAuthModal").modal("show");
  });

  // errorModal
  $("#callErrorModal, .callErrorModal").click(function() {
    $("#errorModal").modal("show");
  });

  // #ratingModal
  // $("#ratingModal").modal("show");
  // $("#reviewModal").modal("show");
  // $("#warnDelModal").modal("show");

  // конец скрипта
  $("#hideAside").hide();
});
