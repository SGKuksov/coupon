svg4everybody(); // иницализация полифила для IE

$(document).ready(function() {

  // вызов обрезания текста
  $('.card__link').truncateText();
  $('.card__place').truncateText();

  // подключение автопоиск
  $('#pageHeaderSearch').autoSearch();
  $('.modal-location__input').autoSearch();
  $('.filter-near__search').autoSearch();

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

  // вызов малого модального при открытии страницы
  setTimeout(function() {
    $(selectCityModal).appendTo(".page-header__container")

    // скрытие modal-select
    $(".modal-select__close").click(function() {
      $(".modal-select").hide();
    });
    $(".modal-select__btn").click(function() {
      $(".modal-select").hide();
    });
  }, 1000);

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

  // открытие и закрытие меню
  $(".menu-btn").click(function(event) {
    $("aside").show();
    $("#modalLocation").removeClass('pushy pushy-left').addClass("modal fade").children().removeClass('pushy-content');
    $("#modalLocation").css("z-index", 2000);
  });

  // modals-panel
  // $('.modals-panel').hide();

  // #callAutorizModal
  $("#callAutorizModal").click(function() {
    $(".modals-panel__warnAutorModal").modal('hide');
    $("#autorizModal").modal('show');
  });

  // #callRegisterModal
  $("#callRegisterModal").click(function() {
    $(".modals-panel__warnAutorModal").modal('hide');
    $(registerModal).appendTo("body");
    $(".modals-panel__registerModal").modal('show');
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
      })
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

  // рейтинг на запись
  // https://github.com/antennaio/jquery-bar-rating
  $('.rating-bar').barrating({
    theme: 'fontawesome-stars',
    deselectable: false,
    showSelectedRating: true
  });

  // рейтинг на чтение
  $('.rating-bar--readonly').barrating('readonly', true); //только чтение

  // tabs
  $('#onMapTab').on('shown.bs.tab', function() {
    if ($(document).width() >= 480) {
      $('.list-of-places__header').show();
      $('.filter__sort').toggle();
    }
  });
  $('#byListTab').on('shown.bs.tab', function() {
    if ($(document).width() >= 480) {
      $('.list-of-places__header').hide();
      $('.filter__sort').toggle();
    }
  });

  // address tab
  $('.coupon__place-btn').click(function() {
    var addressTab = $('#addressTab');
    addressTab.tab('show');

    var id = addressTab.attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 20);
  });

  // modals-panel
  $(".modals-panel__close").click(function() {
    $(this).parent().hide();
  });

  // modals
  $(".modals-panel__selectCityModal").click(function() {
    // $(selectCityModal).appendTo("body");
    $(".modal-select").show();
  });

  $(".modals-panel__ratingModal").click(function() {
    $(ratingModal).appendTo("body");
    $("#ratingModal").modal("show");
  });
  $(".modals-panel__reviewModal").click(function() {
    $(reviewModal).appendTo("body");
    $("#reviewModal").modal("show");
  });

  $(".modals-panel__errorModal").click(function() {
    $(errorModal).appendTo("body");
    $("#errorModal").modal("show");
  });

  $(".modals-panel__modalLocation").click(function() {
    $("#modalLocation").modal("show");
  });

  $(".modals-panel__couponModal").click(function() {
    $('.coupon-modal__text').truncateText();
    $("#couponModal").modal("show");
  });
  $(".card__img-wrap").click(function() {
    if( $(window).width() >= 768 ) {
    $(this).preventDefault();
    $('.coupon-modal__text').truncateText();
    $("#couponModal").modal("show");
    }
  });

  $(".modals-panel__registerModal").click(function() {
    $(registerModal).appendTo("body");
    $("#registerModal").modal("show");
  });

  $(".modals-panel__autorizModal").click(function() {
    $(autorizModal).appendTo("body");
    $("#autorizModal").modal("show");
  });

  $(".modals-panel__warnAutorModal").click(function() {
    $(warnAutorModal).appendTo("body");
    $("#warnAutorModal").modal("show");
  });

  $(".modals-panel__warnDelModal").click(function() {
    $(warnDelModal).appendTo("body");
    $("#warnDelModal").modal("show");
  });

  $(".modals-panel__registerAfterModal").click(function() {
    $(registerAfterModal).appendTo("body");
    $("#registerAfterModal").modal("show");
  });

  // лайтбокс
  $("#placeGallery").click(function() {
    // $("").modal('show');
  });

  // filter-near скрытие блока
  $("body").scroll(function() {

    if ( $(".filter-near__dropdown").hasClass("show") ) {
      $(".filter-near__dropdown").dropdown("toggle");
    }

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
      // $(".filter-near__dropdown").dropdown("toggle");
    }
  });

  // закрытие модального окна при скролле
  // $(window).scroll(function(e) {
  //   var dropdowns = $('.dropdown-toggle');
  //   $.each(dropdowns, function(i, c) {
  //     $(c).parent().removeClass('open');
  //   })
  // });

  // collections
  $(".collections__toggle").html("Все подборки");

  $(".collections__toggle").click(function(e) {
    e.preventDefault();

    if ($(this).hasClass("collections__toggle--active")) {
      $(this).html("Свернуть").addClass("collections__toggle--active");
      $(".collections__list--hide").slideToggle();
    } else {
      $(this).html("Все подборки").removeClass("collections__toggle--active");
      $(".collections__list--hide").slideToggle();
    }

  });

  // конец скрипта
});
