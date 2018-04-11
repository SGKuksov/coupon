svg4everybody(); // иницализация полифила для IE

$(document).ready(function(){
  var doc_w = $(document).width();

  // Обрезание многострочного текста
  (function($) {
    var truncate = function(el) {
        var text = el.text(),
            height = el.height(),
            clone = el.clone();

    clone.css({
            position: 'absolute',
            visibility: 'hidden',
            height: 'auto'
        });
        el.after(clone);

        var l = text.length - 1;
        for (; l >= 0 && clone.height() > height; --l) {
            clone.text(text.substring(0, l) + '...');
        }

        el.text(clone.text());
        clone.remove();
    };

    $.fn.truncateText = function() {
        return this.each(function () {
            truncate($(this));
        });
    };
  }(jQuery));

  // вызов обрезания текста
  $('.card__link').truncateText();
  $('.card__place').truncateText();

  //вызов малого модального окна при клике на город
  $("#modalsBtnCancel").click(function() {
    $("#selectCityModal").modal('hide');
    $("#modalLocation").modal('show');
  });

  //вызов большого модального окна выбора города при клике на "НЕТ"
  $("#callModalLocation").click(function() {

    if (doc_w >= 1024 ) {
      $("#selectCityModal").modal('show');
    }
  });

  $(".btn").click(function() {
    // $("#errorModal").modal('show');
  });

  $(".subscribe__close").click(function() {
    // скрытие блока подписки
    $(this).parent().hide();
  });

  $(".filter__btn").click(function() {
    // кнопка переключения
    $(".filter__btn").removeClass("filter__btn--active");
    $(this).addClass("filter__btn--active");
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

  // rss
  $(".top-panel__rss").click(function() {
    var rss = $(this);

    if ( rss.hasClass("top-panel__rss--active") ) {
      rss.removeClass("top-panel__rss--active");
    } else {
      rss.addClass("top-panel__rss--active");
    }
  });



















});
