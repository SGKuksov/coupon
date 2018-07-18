$(document).ready(function() {

  // на разные типы страниц вызываем карты по их id

  // типы карт
  // 1тип
  // index, category, Список мест, Категория мест
  // много точек + кластеры.
  // балун со скроллом
  //

  // 2тип страница купона, места,
  // много точек + кластеры.
  // нет скролла
  //


  // #onMapTab
  $('#onMapTab').on('shown.bs.tab', function() {
    // Инициализация карты
    ymaps.ready(initPlaceMap);
  });

  // #addressTab
  $('#addressTab').on('shown.bs.tab', function() {
    // Инициальзация карты
    ymaps.ready(initCouponMap);
  });

  // карта initPlaceMap
  function initPlaceMap() {

    var placeMap = new ymaps.Map('placeMap', {
      center: [55.76, 37.64],
      zoom: 10,
        controls: []
      });

    // Настраиваем контролы на карте
    var zoomControl = new ymaps.control.ZoomControl({
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

      // Создаем собственный макет с информацией о выбранном геообъекте.
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
      },
      objectManager = new ymaps.ObjectManager({
        clusterize: true,
        clusterDisableClickZoom: true
      });

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

    // Загружаем JSON файл с описанием объектов.
    // https://api.myjson.com/bins/1gggfi
    // https://api.myjson.com/bins/ghvhq

    var groups =[];
    $.ajax({
      url: "https://api.myjson.com/bins/ghvhq"
    }).done(function(data) {
      objectManager.add(data)

      groups = data.features;


      for (var i = 0, l = groups.length; i < l; i++) {
        createMenu(groups[i]);
        // console.log(groups[i].geometry.coordinates);
      }
    });

    // создаем текстовое меню
    var menu = $('<ul class="menu"></ul>');

    if ($(".main-content__address-menu .menu").length == 0) {
      menu.appendTo($('.main-content__address-menu'));
    }
    if ($('.menu ul').length ==0 ) {
      // $('.menu').hide();
    }

    function createMenu (item) {
      // Пункт меню.
      var menuItem = $('<li><a href="#">' + item.properties.clusterCaption + '</a></li>');

      // Добавляем подменю.
      menuItem
        // Добавляем пункт в меню.
        .appendTo(menu)
        // При клике по пункту подменю открываем/закрываем баллун у метки.
        .find('a')
        .bind('click', function () {
          // if (!placemark.balloon.isOpen()) {
          //   placemark.balloon.open();
          // } else {
          //   placemark.balloon.close();
          // }

          placeMap.setCenter(
            item.geometry.coordinates
          );
          return false;
        });
    }

    // Добавляем контролы на карту
    placeMap.controls.add(zoomControl);

    objectManager.objects.options.set(myPlacemark);
    objectManager.clusters.options.set('preset', 'islands#redClusterIcons');

    // Добавить события на карту
    // myGeoObjects.events.add(['mouseenter', 'mouseleave'], onObjectEvent);
    // myClusterer.events.add(['mouseenter', 'mouseleave'], onClusterEvent);

    placeMap.geoObjects.add(objectManager);
  }

  // карта initPlaceMap
  function initCouponMap() {

    var couponMap = new ymaps.Map('couponMap', {
      center: [55.76, 37.64],
      zoom: 10,
        controls: []
      });

    // Настраиваем контролы на карте
    var zoomControl = new ymaps.control.ZoomControl({
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

      // Создаем собственный макет с информацией о выбранном геообъекте.
      // customItemContentLayout = ymaps.templateLayoutFactory.createClass(
      // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
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
      },
      objectManager = new ymaps.ObjectManager({
        clusterize: true,
        clusterDisableClickZoom: true
      });

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

    // Загружаем JSON файл с описанием объектов.
    $.ajax({
      url: "https://api.myjson.com/bins/ghvhq"
    }).done(function(data) {
      objectManager.add(data)
    });

    // Добавляем контролы на карту
    couponMap.controls.add(zoomControl);

    objectManager.objects.options.set(myPlacemark);
    objectManager.clusters.options.set('preset', 'islands#redClusterIcons');

    // Добавить события на карту
    // myGeoObjects.events.add(['mouseenter', 'mouseleave'], onObjectEvent);
    // myClusterer.events.add(['mouseenter', 'mouseleave'], onClusterEvent);

    // выводим точки на карту
    couponMap.geoObjects.add(objectManager);
  }

});
