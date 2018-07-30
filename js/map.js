ymaps.ready(function () {

  // инициализируем экземпляры карт
  var mapSetup = {
    center: [55.76, 37.64],
    zoom: 10,
    controls: []
  },
  couponMap = new ymaps.Map('couponMap', mapSetup),
  placeMap  = new ymaps.Map('placeMap', mapSetup);


  // задаем параметры контролов карты
  var zoomControl = new ymaps.control.ZoomControl({
    options: {
      position: {
        bottom: 55,
        left: 'auto',
        right: 20,
        top: 'auto'
      }
    }
  });
  couponMap.controls.add(zoomControl);
  placeMap.controls.add(zoomControl);


  // Задаем настройки менеджеров объектов
  var objectManagerSetup = {
    clusterize: true,
    gridSize: 32,
    clusterDisableClickZoom: true,
    clusterHideIconOnBalloonOpen: false,
    geoObjectHideIconOnBalloonOpen: false,
    clusterIcons: [{
      href: '../img/map__cluster.svg',
      size: [44, 44],
      offset: [-22, -22]
    }],
    clusterIconContentLayout: ymaps.templateLayoutFactory.createClass(
      '<span style="color: #969696;">{{ properties.geoObjects.length }}</span>'
    ),
    balloonContentLayoutHeight: 400,
    balloonContentLayoutWidth: 400
  },
  couponObjectManager = new ymaps.ObjectManager(objectManagerSetup);
  placeObjectManager  = new ymaps.ObjectManager(objectManagerSetup);


  // создаем текстовое меню
  var menu = $('<ul class="menu"></ul>');

  if ($(".main-content__address-menu .menu").length == 0) {
    menu.appendTo($('.main-content__address-menu'));
  }
  function createMenu(item) {
    var menuItem = $('<li><a class="menu__item" href="#" data-id="' + item.id + '">' + item.properties.clusterCaption + '</a></li>');
    menuItem.appendTo(menu);

    menuItem.click(function(e) {
      var objectId = e.target.parentNode.dataset.id;
      couponObjectManager.objects.balloon.open(objectId);
    });
  }


  // вывод точек для couponMap на карту из json
  var coupon_groups = [];
  $.ajax({
    url: "https://api.myjson.com/bins/13uqei"
  }).done(function(data) {
    couponObjectManager.add(data);

    coupon_groups = data.features;

    for (var i = 0, l = coupon_groups.length; i < l; i++) {
      createMenu(coupon_groups[i]);
    }
  });
  couponMap.geoObjects.add(couponObjectManager);

  // вывод точек для placeMap на карту из json
  var place_groups = [];
  $.ajax({
    url: "https://api.myjson.com/bins/ghvhq"
  }).done(function(data) {
    placeObjectManager.add(data);

    // place_groups = data.features;

    // for (var i = 0, l = place_groups.length; i < l; i++) {
    //   createMenu(place_groups[i]);
    // }
  });
  placeMap.geoObjects.add(placeObjectManager);


  // задаем стили точкам и кластерам
  var pointSetup = {
        'iconLayout': 'default#image',
        'iconImageHref': '../img/map__placemark.svg',
        'iconImageSize': [44, 44],
        'iconImageOffset': [-22, -22]
      },
      pointHoverSetup = {
        'iconLayout': 'default#image',
        'iconImageHref': '../img/map__placemark_hovered.svg',
        'iconImageSize': [80, 80],
        'iconImageOffset': [-40, -40]
      },
      clusterSetup = {
        clusterIcons: [{
          href: '../img/map__cluster.svg',
          size: [44, 44],
          offset: [-22, -22]
        }],
        clusterIconContentLayout: ymaps.templateLayoutFactory.createClass(
          '<span style="color: #969696;">{{ properties.geoObjects.length }}</span>'
        )
      },
      clusterHoverSetup = {
        clusterIcons: [{
          href: '../img/map__cluster_hovered.svg',
          size: [80, 80],
          offset: [-40, -40]
        }],
        clusterIconContentLayout: ymaps.templateLayoutFactory.createClass(
          '<span style="color: #ff1e1e; font-weight: bold;">{{ properties.geoObjects.length }}</span>'
        )
      };
  couponObjectManager.objects.options.set(pointSetup);
  placeObjectManager.objects.options.set(pointSetup);


  // навешиваем события на точки и кластеры
  function onObjectEvent (e) {
    var objectId = e.get('objectId');

    if (e.get('type') == 'mouseenter') {
      couponObjectManager.objects.setObjectOptions(objectId, {
        'iconLayout': 'default#image',
        'iconImageHref': '../img/map__placemark_hovered.svg',
        'iconImageSize': [80, 80],
        'iconImageOffset': [-40, -40]
      });
      console.log(objectId);
    } else {
      couponObjectManager.objects.setObjectOptions(objectId, {
        'iconLayout': 'default#image',
        'iconImageHref': '../img/map__placemark.svg',
        'iconImageSize': [44, 44],
        'iconImageOffset': [-22, -22]
      });
    }

    if (e.get('type') == 'click') {
      console.log('click');
    }
  }
  function onClusterEvent (e) {
    var objectId = e.get('objectId');

    if (e.get('type') == 'mouseenter') {
      couponObjectManager.clusters.setClusterOptions(objectId, clusterHoverSetup);
      console.log(objectId);
    } else {
      couponObjectManager.clusters.setClusterOptions(objectId, clusterSetup);
    }

    if (e.get('type') == 'click') {
      console.log('click');
    }
  }
  couponObjectManager.objects.events.add(['mouseenter', 'mouseleave', 'click'], onObjectEvent);
  couponObjectManager.clusters.events.add(['mouseenter', 'mouseleave', 'click'], onClusterEvent);




































});
