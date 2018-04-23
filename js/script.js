svg4everybody(); // иницализация полифила для IE

$(document).ready(function(){
  var doc_w = $(document).width();

  // вызов обрезания текста
  $('.card__link').truncateText();
  $('.card__place').truncateText();

  // подключение автопоиск
  // $('#superSearch').autoSearch();

  //вызов малого модального окна при клике на город
  $("#modalsBtnCancel").click(function() {
    $("#selectCityModal").modal('hide');
    $("#modalLocation").modal('show');
  });

  if (doc_w >= 1024 ) {
    // вызов малого модального при открытии страницы
  setTimeout($("#selectCityModal").modal('show'), 10000);
  }



  //вызов большого модального окна выбора города при клике на "НЕТ"
  $(".callModalLocation").click(function() {

      $("#modalLocation").modal('show');
    }
  });

  // скрытие блока подписки
  $(".subscribe__close").click(function() {
    $(this).parent().hide();
  });

  // кнопка переключения
  $(".filter__btn").click(function() {
    $(".filter__btn").removeClass("filter__btn--active");
    $(this).addClass("filter__btn--active");
  });

  // rss
  $(".top-panel__rss").click(function() {
    var rss = $(this);

    if ( rss.hasClass("top-panel__rss--active") ) {
      rss.removeClass("top-panel__rss--active");
    } else {
      rss.addClass("top-panel__rss--active");
    }
  });

  $(".page-header__search-icon").click(function() {
    // показ строки поиска
    if (doc_w <= 768 ) {
      $("form.page-header__search").addClass("page-header__search--show").parent().parent().css("padding", 0);
      $(".page-header__input").attr({"placeholder": "Поиск", "autofocus":""})
      $(".page-header__cancel").addClass("page-header__cancel--show");
      $(".page-header__submit").addClass("page-header__submit--show");
      $(".overlay").addClass("overlay--show").removeClass("site-overlay");

      $(".page-header__menu").toggle();
      $(".page-header__logo-wrap").toggle();
      $(".page-header__login").toggle();
    }
  });


  $(document).mouseup(function (e){
    var pageHeaderSearch = $(".page-header__search");
    var pageHeaderCancel = $(".page-header__cancel");
    if (doc_w <= 768 ) {

      if (!pageHeaderSearch.is(e.target) && pageHeaderSearch.has(e.target).length === 0) {
        $(".overlay").removeClass("overlay--show");
        $("form.page-header__search").removeClass("page-header__search--show").parent().parent().css("padding", "8px");
        $(".page-header__input").attr({"placeholder": "", "autofocus":""})
        $(".page-header__cancel").removeClass("page-header__cancel--show");
        $(".page-header__submit").removeClass("page-header__submit--show");
        $(".overlay").removeClass("overlay--show").addClass("site-overlay").hide();

        $(".page-header__menu").show();
        $(".page-header__logo-wrap").show();
        $(".page-header__login").show();
  ;
      }
    }
  });

  $(".page-header__cancel--show").click(function() {
    if (doc_w <= 768 ) {

      $(".overlay").removeClass("site-overlay");
      $("form.page-header__search").removeClass("page-header__search--show").parent().parent().css("padding", "8px");
      $(".page-header__input").attr({"placeholder": "", "autofocus":""})
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

  // рейтинг
  // $('#rating_1').rating({
  //   fx: 'full',
  //   image: 'img/sprite-02559127368214036.png',
  //   loader: 'img/ajax-loader.gif',
  //   url: 'rating.php',
  //   callback: function(responce){
  //     this.vote_success.fadeOut(2000);
  //   }
  // });

});
