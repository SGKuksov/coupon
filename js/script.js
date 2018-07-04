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
} (jQuery));

  // скрытие modal-select
  $(".modal-select__close, .modal-select__btn").click(function() {
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

$(document).ready(function() {
  var isAuthorize = $("body").hasClass("non-authorize");

  // Пересчет количества колонок modal-location
  var modalLocationCityLink = $(".modal-location__city-link"),
  modalLocationCityCharList = $(".modal-location__city-char-list");

  if ( modalLocationCityLink.length >= 40 ) {
    modalLocationCityCharList.css("column-count", 5);
    $(".modal-location .modal-dialog").addClass("large");
  } else if ( modalLocationCityLink.length >= 30 && modalLocationCityLink.length < 40  ) {
    modalLocationCityCharList.css("column-count", 4);
    $(".modal-location .modal-dialog").addClass("medium");
  } else {
    modalLocationCityCharList.css("column-count", 3);
    $(".modal-location .modal-dialog").addClass("small");
  }

  // вызов обрезания текста
  $('.card__link, .card__place').truncateText();

  $(".main-content__btn").click(function() {
    $('.card__link, .card__place').truncateText();
  });

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
  // обработка формы подписки
  $(".subscribe__form").submit(function() {
    $(".error").remove();

    $.ajax({
      url: "js/ok.json",
      data: $(this).serialize()
    }).done(function(data) {
      console.log("done!");
    }).fail(function(data) {
      $(".subscribe__form").append("<span class='error'>Что-то пошло не так. Попробуйте еще раз через пару минут</span>");
    });
    return false;
  });

  // Приобрести купон без авторизации
  if (isAuthorize) {
    $(".coupon__take-btn").click(function() {
      $("#warnAuthModal").modal("show");
    });
  }

  // rss
  if (!isAuthorize) {
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
  } else {
    $("#rss, .rss").click(function() {
      $("#warnAuthModal").modal("show");
    });
  }

  // favorite
  if (!isAuthorize) {
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
  } else {
    $(".favorite").click(function() {
      $("#warnAuthModal").modal("show");
    });
  }

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
    slidesToScroll: 1,
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

  // Спасибо за вашу оценку
  $("#ratingBar").on("change", function() {
    $("#ratingModal").modal("show");

    setTimeout(function() {
      $("#ratingModal").modal("hide");
    }, 5000);
  });
  $(".coupon__take-review-btn--green").click(function() {
    $("#ratingModal").modal("show");

    setTimeout(function() {
      $("#ratingModal").modal("hide");
    }, 5000);
  });

  // #onMapTab
  $('#onMapTab').on('shown.bs.tab', function() {
    // Инициальзация карты
    ymaps.ready(init);

    if ($(document).width() >= 480) {
      $('.list-of-places__header').show();
      $('.filter__sort').toggle();
    }
  });
  // #byListTab
  $('#byListTab').on('shown.bs.tab', function() {
    // удаление карты при закрытии вкладки
    // myMap.destroy();

    if ($(document).width() >= 480) {
      $('.list-of-places__header').hide();
      $('.filter__sort').toggle();
    }
  });
  // #byPlitkaTab
  $('#byListTab').on('shown.bs.tab', function() {
    // удаление карты при закрытии вкладки
    // myMap.destroy();
  });

  // address tab
  $('#addressTab').on('shown.bs.tab', function() {
    // Инициальзация карты
    ymaps.ready(init);
  });
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

  // отправка окна авторизации
  $("#autorizModal").find("form").submit(function() {
    $(".error").remove();

    $.ajax({
      url: "js/ok.json",
      data: $(this).serialize()
    }).done(function(data) {
      console.log("done!");
    }).fail(function(data) {
      $("#autorizModal").find("form").append("<span class='error'>Что-то пошло не так. Попробуйте еще раз через пару минут</span>");
    });
    return false;
  });

  // вызов окна регистрации по клику на регистрация в модальном окне
  $("#callRegisterModal, .callRegisterModal").click(function() {
    $("#warnAuthModal").modal("hide");
    $("#autorizModal").modal("hide");
    $("#registerModal").modal("show");
  });

  // отправка окна регистрации
  $("#registerModal").find("form").submit(function() {
    $(".error").remove();

    $.ajax({
      url: "js/ok.json",
      data: $(this).serialize()
    }).done(function(data) {
      console.log("done!");

      // вызов окна после регистрации по клику на регистрация в модальном окне
      $("#callRegisterAfterModal").click(function() {
        $("#registerModal").modal("hide");
        $("#registerAfterModal").modal("show");
      });
    }).fail(function(data) {
      $("#registerModal").find("form").append("<span class='error'>Что-то пошло не так. Попробуйте еще раз через пару минут</span>");
    });
    return false;
  });

  // warnAuthModal
  $(".modals-panel__warnAutorModal").click(function() {
    $("#warnAuthModal").modal("show");
  });

  // errorModal
  $("#callErrorModal, .callErrorModal").click(function() {
    $("#errorModal").modal("show");
  });

  // отправка окна ошибки
  $("#errorModal").find("form").submit(function() {
    $(".error").remove();

    $.ajax({
      url: "js/ok.json",
      data: $(this).serialize()
    }).done(function(data) {
      console.log("done!");

      // модальное окно "спасибо за отзыв"
      $("#errorModal").modal("hide");
      $("#reviewModal").modal("show");
      setTimeout(function() {
        $("#reviewModal").modal("hide");
      }, 5000);
    }).fail(function(data) {
      $("#errorModal").find("form").append("<span class='error'>Что-то пошло не так. Попробуйте еще раз через пару минут</span>");
    });
    return false;
  });

  // отправка поля отзыва
  $(".coupon__footer-form").submit(function() {
    $(".error").remove();

    $.ajax({
      url: "js/ok.json",
      data: $(this).serialize()
    }).done(function(data) {
      console.log("done!");

      // модальное окно "спасибо за отзыв"
      $("#errorModal").modal("hide");
      $("#reviewModal").modal("show");
      setTimeout(function() {
        $("#reviewModal").modal("hide");
      }, 5000);
    }).fail(function(data) {
      $("#errorModal").find("form").append("<span class='error'>Что-то пошло не так. Попробуйте еще раз через пару минут</span>");
    });
    return false;
  });

  // $("#warnDelModal").modal("show");

  // скрытие бокового меню на 404
  $("#hideAside").hide();

  // карта
  function init() {
    var myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 10,
        controls: []
      }),
      // Настраиваем контролы на карте
      zoomControl = new ymaps.control.ZoomControl({
        options: {
          position: {
            bottom: 55,
            left: 'auto',
            right: 20,
            top: 'auto'
          }
        }
      }),
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<span style="color: #969696;">{{ properties.geoObjects.length }}</span>'
      ),
      MyIconContentLayoutHovered = ymaps.templateLayoutFactory.createClass(
        '<span style="color: #ff1e1e; font-weight: bold;">{{ properties.geoObjects.length }}</span>'
      ),
      // // Создаем собственный макет с информацией о выбранном геообъекте.
      // customItemContentLayout = ymaps.templateLayoutFactory.createClass(
      //   // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
      //   '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
      //   '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
      //   '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
      // ),
      // Добавим кластеризацию и зададим опции
      myClusterer = new ymaps.Clusterer({
        clusterIcons: [{
          href: '../img/map__cluster.svg',
          size: [60, 60],
          offset: [-30, -30]
        }],
        clusterDisableClickZoom: true,
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false,
        clusterIconContentLayout: MyIconContentLayout,

        clusterOpenBalloonOnClick: true
        // Устанавливаем режим открытия балуна.
        // В данном примере балун никогда не будет открываться в режиме панели.
        // clusterBalloonPanelMaxMapArea: 0,
        // Устанавливаем размер макета контента балуна (в пикселях).
        // clusterBalloonContentLayoutWidth: 350,
        // Устанавливаем собственный макет.
        // clusterBalloonItemContentLayout: customItemContentLayout,
        // Устанавливаем ширину левой колонки, в которой располагается список всех геообъектов кластера.
        // clusterBalloonLeftColumnWidth: 120
      }),
      // Опции placemark
      myPlacemark = {
        'iconLayout': 'default#image',
        'iconImageHref': '../img/map__placemark.svg',
        'iconImageSize': [45, 45],
        'iconImageOffset': [-22, -22]

        // Устаналиваем данные, которые будут отображаться в балуне.
        // balloonContentHeader: 'Метка №',
        // balloonContentBody: getContentBody(i),
        // balloonContentFooter: 'Мацуо Басё'
      },
      myPlacemarkHovered = {
        'iconLayout': 'default#image',
        'iconImageHref': '../img/map__placemark_hovered.svg',
        'iconImageSize': [80, 80],
        'iconImageOffset': [-40, -40]
      },
      // Опции cluster
      myCluster = {
        'clusterIcons': [{
          href: '../img/map__cluster.svg',
          size: [60, 60],
          offset: [-30, -30]
        }],
        'clusterIconContentLayout': MyIconContentLayout
      },
      myClusterHovered = {
        'clusterIcons': [{
          href: '../img/map__cluster_hovered.svg',
          size: [80, 80],
          offset: [-40, -40]
        }],
        'clusterIconContentLayout': MyIconContentLayoutHovered
      };

    // Событие произошло на геообъекте
    function onObjectEvent(e) {
      var target = e.get('target'),
            type = e.get('type');

      if (e.get('type') == 'mouseenter') {
        target.options.set(myPlacemarkHovered);
      } else {
        target.options.set(myPlacemark);
      }
    }

    // Событие произошло на кластере
    function onClusterEvent(e) {
      var target = e.get('target'),
      type = e.get('type');

      if (e.get('type') == 'mouseenter') {
        target.options.set(myClusterHovered);
      } else {
        target.options.set(myCluster);
      }
    }

    // Группы объектов
    var groups = [
      {
          name: "Известные памятники",
          style: "islands#redIcon",
          items: [
              {
                  center: [50.426472, 30.563022],
                  name: "Монумент &quot;Родина-Мать&quot;"
              },
              {
                  center: [50.45351, 30.516489],
                  name: "Памятник &quot;Богдану Хмельницкому&quot;"
              },
              {
                  center: [50.454433, 30.529874],
                  name: "Арка Дружбы народов"
              }
          ]},
      {
          name: "Покушайки",
          style: "islands#greenIcon",
          items: [
              {
                  center: [50.50955, 30.60791],
                  name: "Ресторан &quot;Калинка-Малинка&quot;"
              },
              {
                  center: [50.429083, 30.521708],
                  name: "Бар &quot;Сало-бар&quot;"
              },
              {
                  center: [50.450843, 30.498271],
                  name: "Абсент-бар &quot;Палата №6&quot;"
              },
              {
                  center: [50.454834, 30.516498],
                  name: "Ресторан &quot;Спотыкач&quot;"
              }
          ]},
      {
          name: "Оригинальные музейчики",
          style: "islands#orangeIcon",
          items: [
              {
                  center: [50.443334, 30.520163],
                  name: "Музей грамзаписи и старинных музыкальных инструментов"
              },
              {
                  center: [50.446977, 30.505269],
                  name: "Музей истории медицины или Анатомический театр"
              },
              {
                  center: [50.452512, 30.530889],
                  name: "Музей воды. Водно-информационный центр"
              }
          ]},
      {
          name: "Красивости",
          style: "islands#blueIcon",
          items: [
              {
                  center: [50.45987, 30.516174],
                  name: "Замок Ричарда-Львиное сердце"
              },
              {
                  center: [50.445049, 30.528598],
                  name: "&quot;Дом с химерами&quot;"
              },
              {
                  center: [50.449156, 30.511809],
                  name: "Дом Рыцаря"
              }
          ]}
    ];

    var menu = $('<ul class="menu"></ul>');

    if ($(".main-content__address-menu .menu").length == 0) {
      menu.appendTo($('.main-content__address-menu'));
    }

    for (var i = 0, l = groups.length; i < l; i++) {
        createMenuGroup(groups[i]);
    }

    function createMenuGroup (group) {
      // Пункт меню.
      var menuItem = $('<li><a href="#">' + group.name + '</a></li>'),
      // Коллекция для геообъектов группы.
      collection = new ymaps.GeoObjectCollection(null, { preset: group.style }),
      // Контейнер для подменю.
      submenu = $('<ul class="submenu"></ul>');

      // Добавляем коллекцию на карту.
      myMap.geoObjects.add(collection);

      // Добавляем подменю.
      menuItem
        .append(submenu)
        // Добавляем пункт в меню.
        .appendTo(menu)

      for (var j = 0, m = group.items.length; j < m; j++) {
        createSubMenu(group.items[j], collection, submenu);
      }
    }

    function createSubMenu (item, collection, submenu) {
      // Пункт подменю.
      var submenuItem = $('<li><a href="#">' + item.name + '</a></li>'),
      // Создаем метку.
      placemark = new ymaps.Placemark(item.center, { balloonContent: item.name });

      // Добавляем метку в коллекцию.
      collection.add(placemark);

      // Добавляем пункт в подменю.
      submenuItem
        .appendTo(submenu)
        // При клике по пункту подменю открываем/закрываем баллун у метки.
        .find('a')
        .bind('click', function () {
          if (!placemark.balloon.isOpen()) {
            placemark.balloon.open();
          } else {
            placemark.balloon.close();
          }
          return false;
        });
    }

    // Загружаем GeoJSON файл с описанием объектов.
    $.getJSON('../js/geoJson.json').done(function(geoJson) {

    });

    var coords = [[55.8, 37.8],
                  [55.75, 37.0],
                  [55.5, 37.8]];
    var myGeoObjects = [];

    // Добавляем геообъекты в массив
    for (var i = 0; i<coords.length; i++) {
      myGeoObjects[i] = new ymaps.GeoObject({
        geometry: {
          type: "Point",
          coordinates: coords[i]
        }
      }, myPlacemark);
      myGeoObjects[i].events.add(['mouseenter', 'mouseleave'], onObjectEvent);
    }

    // Добавляем контролы на карту
    myMap.controls.add(zoomControl);
    // Добавляем геообъекты в кластеры
    myClusterer.add(myGeoObjects);
    myClusterer.events.add(['mouseenter', 'mouseleave'], onClusterEvent);

    // Добавляем кластеры на карту
    myMap.geoObjects.add(myClusterer);
  }

});
