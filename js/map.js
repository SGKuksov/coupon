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
    gridSize: 50,
    clusterHideIconOnBalloonOpen: false,
    geoObjectHideIconOnBalloonOpen: false,
    clusterDisableClickZoom: false,
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


  // навешиваем события на точки и кластеры
  function onObjectEvent (e) {
    var objectId = e.get('objectId');

    if (e.get('type') == 'mouseenter') {
      placeObjectManager.objects.setObjectOptions(objectId, {
        'iconLayout': 'default#image',
        'iconImageHref': '../img/map__placemark_hovered.svg',
        'iconImageSize': [80, 80],
        'iconImageOffset': [-40, -40]
      });
      console.log(objectId);
    } else {
      placeObjectManager.objects.setObjectOptions(objectId, {
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
      placeObjectManager.clusters.setClusterOptions(objectId, clusterHoverSetup);
      console.log(objectId);
    } else {
      placeObjectManager.clusters.setClusterOptions(objectId, clusterSetup);
    }

    if (e.get('type') == 'click') {
      console.log('click');
    }
  }
  placeObjectManager.objects.events.add(['mouseenter', 'mouseleave', 'click'], onObjectEvent);
  placeObjectManager.clusters.events.add(['mouseenter', 'mouseleave', 'click'], onClusterEvent);


  // создаем текстовое меню

  function createMenuCoupon(item) {
    var menuCoupon = $('#couponMenu');

    for (var i = 0, l = item.features.length; i < l; i++) {
      var menuItem = $('<li><a class="menu__item" href="#" data-id="' + item.features[i].id + '">' + item.features[i].properties.clusterCaption + '</a></li>');

      menuItem.appendTo(menuCoupon);

      menuItem.click(function(e) {
        var objectId = e.target.parentNode.dataset.id;
        couponObjectManager.objects.balloon.open(objectId);
      });
    }
  }


  function createMenuPlace(item) {
    var menuPlace = $('#placeMenu');

    for (var i = 0, l = item.features.length; i < l; i++) {
      var menuItem = $('<li><a class="menu__item" href="#" data-id="' + item.features[i].id + '">' + item.features[i].properties.clusterCaption + '</a></li>');

      menuItem.appendTo(menuPlace);

      menuItem.click(function(e) {
        var objectId = e.target.parentNode.dataset.id;
        placeObjectManager.objects.balloon.open(objectId);
      });
    }
  }


  // Подготовка данных для передачу в карту
  function coverCouponData(data) {

    for (var i=0; i < data.features.length; i++) {

      data.features[i].properties.balloonContentBody = `
        <div class='main-content__address-block'>
          <div class='main-content__address-img-wrap'>
            <img class='main-content__address-img' src='`+ data.features[i].properties.data.imgUrl + `' alt='img' width='212' height='88' />
          </div>
          <span class='main-content__sale'>до <span>`+ data.features[i].properties.data.sale + ` %</span></span>
          <span class='main-content__price'>от <span>` + data.features[i].properties.data.price + ` руб.</span></span>
          <h2 class='main-content__address-title'>` + data.features[i].properties.data.title + `</h2>
          <a class='btn main-content__address-btn' href='#'>Подробнее о купоне</a>
          <a href='#' class='main-content__address-title'>` + data.features[i].properties.data.category + `</a>
          <div class='main-content__address-meta'>
            <svg class='main-content__address-meta-icon' width='14' height='14'><use xlink:href='img/sprite-svg.svg#coupon__address-clock-icon'></use></svg>
            <span class='main-content__address-meta-desc'>` + data.features[i].properties.data.time + `</span>
          </div>
          <div class='main-content__address-meta'>
            <svg class='main-content__address-meta-icon' width='14' height='14'><use xlink:href='img/sprite-svg.svg#coupon__address-phone-icon'></use></svg>
            <span class='main-content__address-meta-desc'>` + data.features[i].properties.data.phone + `</span>
          </div>
          <div class='main-content__address-meta'>
            <svg class='main-content__address-meta-icon' width='13' height='18'><use xlink:href='img/sprite-svg.svg#coupon__address-map-icon'></use></svg>
            <span class='main-content__address-meta-desc'>` + data.features[i].properties.data.address + `</span>
          </div>
        </div>`;

        data.features[i].properties.clusterCaption = "<span class='main-content__address-item'>" + data.features[i].properties.clusterCaption + "</span>";
      }

    return data;
  }


  function coverPlaceData(data) {
    var options = '';

    for (var i=0; i < data.features.length; i++) {

      data.features[i].properties.balloonContentBody = `
        <div class='main-content__address-block'>
          <div class='main-content__address-img-wrap'>
            <img class='main-content__address-img' src='`+ data.features[i].properties.data.imgUrl + `' alt='img' width='212' height='88' />
          </div>
          <h2 class='main-content__address-title'>` + data.features[i].properties.data.title + `</h2>
          <a class='btn main-content__address-btn' href='#'>Подробнее о месте</a>
          <div class='main-content__address-meta'>
            <svg class='main-content__address-meta-icon' width='14' height='14'><use xlink:href='img/sprite-svg.svg#coupon__address-clock-icon'></use></svg>
            <span class='main-content__address-meta-desc'>` + data.features[i].properties.data.time + `</span>
          </div>
          <div class='main-content__address-meta'>
            <svg class='main-content__address-meta-icon' width='14' height='14'><use xlink:href='img/sprite-svg.svg#coupon__address-phone-icon'></use></svg>
            <span class='main-content__address-meta-desc'>` + data.features[i].properties.data.phone + `</span>
          </div>
          <div class='main-content__address-meta'>
            <svg class='main-content__address-meta-icon' width='13' height='18'><use xlink:href='img/sprite-svg.svg#coupon__address-map-icon'></use></svg>
            <span class='main-content__address-meta-desc'>` + data.features[i].properties.data.address + `</span>
          </div>
        </div>`;

      data.features[i].properties.clusterCaption = "<span class='main-content__address-item'>" + data.features[i].properties.clusterCaption + "</span>";
    }

    return data;
  }


  // Создание и заполнение селекта
  function options(data) {
    var options = '';
    var selectBar = $('.main-content__select');

    for (var i=0; i < data.features.length; i++) {
      options += '<option value="' + data.features[i].id + '">' + data.features[i].properties.clusterCaption + '</option>'
    }

    $(options).appendTo(selectBar);

    selectBar.change(function() {
      console.log(selectBar.val());

      var objectId = selectBar.val()

      couponObjectManager.objects.balloon.open(objectId);
      placeObjectManager.objects.balloon.open(objectId);
    });
  }


  // вывод точек для couponMap на карту из json
  $.ajax({
    url: "https://api.myjson.com/bins/vvfw8"
    // url: "js/coupon.json"
  }).done(function(data) {
    var couponGroups = coverCouponData(data);
    couponObjectManager.add(couponGroups);

    // создаем и заполняем меню над картой
    createMenuCoupon(couponGroups);

    // создаем и заполняет селект точками
    options(data);
  });
  couponMap.geoObjects.add(couponObjectManager);

  // вывод точек для placeMap на карту из json
  $.ajax({
    url: "https://api.myjson.com/bins/bkk60"
    // url: "js/place.json"
  }).done(function(data) {
    var placeGroups = coverPlaceData(data);
    placeObjectManager.add(placeGroups);

    // создаем и заполняем меню над картой
    createMenuPlace(placeGroups);

    // создаем и заполняет селект точками
    options(data);
  });
  placeMap.geoObjects.add(placeObjectManager);


  // запрет на открытие балунов
  var doc_w = $(window).width();
  $(window).bind('resize', function() {
    if (doc_w <= 576) {
      placeObjectManager.options.set('geoObjectOpenBalloonOnClick', false);
      couponObjectManager.options.set('geoObjectOpenBalloonOnClick', false);
    } else {
      placeObjectManager.options.set('geoObjectOpenBalloonOnClick', true);
      couponObjectManager.options.set('geoObjectOpenBalloonOnClick', true);
    }
  });
});
