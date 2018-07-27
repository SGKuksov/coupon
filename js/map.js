$(document).ready(function() {

  ymaps.ready(init);

  // #onMapTab
  // $('#onMapTab').on('shown.bs.tab', function() {
    // Инициализация карты
    // ymaps.ready(init);
  // });

  // #addressTab
  // $('#addressTab').on('shown.bs.tab', function() {
    // Инициальзация карты
    // ymaps.ready(init);
  // });

  // карта init
  function init() {

    var placeMap = new ymaps.Map('placeMap', {
      center: [55.76, 37.64],
      zoom: 10,
        controls: []
    });

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
      placeObjectManager = new ymaps.ObjectManager({
        clusterize: true,
        clusterDisableClickZoom: true
      }),
      couponObjectManager = new ymaps.ObjectManager({
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

    var place_groups =[];
    $.ajax({
      url: "https://api.myjson.com/bins/ghvhq"
    }).done(function(data) {
      placeObjectManager.add(data)

      // place_groups = data.features;


      // for (var i = 0, l = place_groups.length; i < l; i++) {
      //   createMenu(place_groups[i]);
      // }
    });

    // создаем текстовое меню
    // var menu = $('<ul class="menu"></ul>');

    // if ($(".main-content__address-menu .menu").length == 0) {
    //   menu.appendTo($('.main-content__address-menu'));
    // }
    // if ($('.menu ul').length ==0 ) {
    //   // $('.menu').hide();
    // }

    // function createMenu (item) {
    //   // Пункт меню.
    //   var menuItem = $('<li><a href="#">' + item.properties.clusterCaption + '</a></li>');

    //   // Добавляем подменю.
    //   menuItem
    //     // Добавляем пункт в меню.
    //     .appendTo(menu)
    //     // При клике по пункту подменю открываем/закрываем баллун у метки.
    //     .find('a')
    //     .bind('click', function () {
    //       // if (!placemark.balloon.isOpen()) {
    //       //   placemark.balloon.open();
    //       // } else {
    //       //   placemark.balloon.close();
    //       // }

    //       placeMap.setCenter(
    //         item.geometry.coordinates
    //       );
    //       return false;
    //     });
    // }

    // Добавляем контролы на карту
    placeMap.controls.add(zoomControl);

    placeObjectManager.objects.options.set(myPlacemark);
    placeObjectManager.clusters.options.set('preset', 'islands#redClusterIcons');

    // Добавить события на карту
    // myGeoObjects.events.add(['mouseenter', 'mouseleave'], onObjectEvent);
    // myClusterer.events.add(['mouseenter', 'mouseleave'], onClusterEvent);

    placeMap.geoObjects.add(placeObjectManager);

    var coupon_groups =[];
    $.ajax({
      url: "https://api.myjson.com/bins/ghvhq"
    }).done(function(data) {
      couponObjectManager.add(data)

      coupon_groups = data.features;

      // for (var i = 0, l = coupon_groups.length; i < l; i++) {
      //   createMenu(coupon_groups[i]);
      // }
    });

    // // создаем текстовое меню
    // var menu = $('<ul class="menu"></ul>');

    // if ($(".main-content__address-menu .menu").length == 0) {
    //   menu.appendTo($('.main-content__address-menu'));
    // }
    // if ($('.menu ul').length ==0 ) {
    //   // $('.menu').hide();
    // }

    // function createMenu (item) {
    //   // Пункт меню.
    //   var menuItem = $('<li><a href="#">' + item.properties.clusterCaption + '</a></li>');

    //   // Добавляем подменю.
    //   menuItem
    //     // Добавляем пункт в меню.
    //     .appendTo(menu)
    //     // При клике по пункту подменю открываем/закрываем баллун у метки.
    //     .find('a')
    //     .bind('click', function () {
    //       // if (!placemark.balloon.isOpen()) {
    //       //   placemark.balloon.open();
    //       // } else {
    //       //   placemark.balloon.close();
    //       // }

    //       couponMap.setCenter(
    //         item.geometry.coordinates
    //       );
    //       return false;
    //     });
    // }

    couponMap.controls.add(zoomControl);

    // Добавить события на карту
    // myGeoObjects.events.add(['mouseenter', 'mouseleave'], onObjectEvent);
    // myClusterer.events.add(['mouseenter', 'mouseleave'], onClusterEvent);

    couponObjectManager.objects.options.set(myPlacemark);
    couponObjectManager.clusters.options.set('preset', 'islands#redClusterIcons');

    // Добавить события на карту
    couponObjectManager.objects.events.add(['mouseenter', 'mouseleave'], onObjectEvent);
    couponObjectManager.clusters.events.add(['mouseenter', 'mouseleave'], onClusterEvent);
    
    // выводим точки на карту
    couponMap.geoObjects.add(couponObjectManager);
  }
});
