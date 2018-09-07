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
      // console.log(objectId);
    } else {
      couponObjectManager.objects.setObjectOptions(objectId, {
        'iconLayout': 'default#image',
        'iconImageHref': '../img/map__placemark.svg',
        'iconImageSize': [44, 44],
        'iconImageOffset': [-22, -22]
      });
    }
  }
  function onClusterEvent (e) {
    var objectId = e.get('objectId');

    if (e.get('type') == 'mouseenter') {
      couponObjectManager.clusters.setClusterOptions(objectId, clusterHoverSetup);
      // console.log(objectId);
    } else {
      couponObjectManager.clusters.setClusterOptions(objectId, clusterSetup);
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
      // console.log(objectId);
    } else {
      placeObjectManager.objects.setObjectOptions(objectId, {
        'iconLayout': 'default#image',
        'iconImageHref': '../img/map__placemark.svg',
        'iconImageSize': [44, 44],
        'iconImageOffset': [-22, -22]
      });
    }
  }
  function onClusterEvent (e) {
    var objectId = e.get('objectId');

    if (e.get('type') == 'mouseenter') {
      placeObjectManager.clusters.setClusterOptions(objectId, clusterHoverSetup);
      // console.log(objectId);
    } else {
      placeObjectManager.clusters.setClusterOptions(objectId, clusterSetup);
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
      let saleContent,
          priceContent,
          timeContent,
          phoneContent,
          addressContent = '';
      let dataFeatures = data.features[i].properties.data;

      if (dataFeatures.sale && dataFeatures.sale !== undefined) {
        saleContent = `<span class='main-content__sale'>до <span>${dataFeatures.sale} %</span></span>`;
      } else {
        saleContent = '';
      }

      if (dataFeatures.price && dataFeatures.price !== undefined) {
        priceContent =`<span class='main-content__price'>от <span>${dataFeatures.price} руб.</span></span>`;
      } else {
        priceContent = '';
      }

      if (dataFeatures.time && dataFeatures.time !== undefined) {
        timeContent = `
          <div class='main-content__address-meta'>
            <svg class='main-content__address-meta-icon' width='14' height='14'><use xlink:href='img/sprite-svg.svg#coupon__address-clock-icon'></use></svg>
            <span class='main-content__address-meta-desc'>${dataFeatures.time}</span>
          </div>`;
      } else {
        timeContent = '';
      }

      if (dataFeatures.phone && dataFeatures.phone !== undefined) {
        phoneContent = `
          <div class='main-content__address-meta'>
            <svg class='main-content__address-meta-icon' width='14' height='14'><use xlink:href='img/sprite-svg.svg#coupon__address-phone-icon'></use></svg>
            <span class='main-content__address-meta-desc'>${dataFeatures.phone}</span>
          </div>`;
      } else {
        phoneContent = '';
      }

      if (dataFeatures.address && dataFeatures.address !== undefined) {
        addressContent = `
          <div class='main-content__address-meta'>
            <svg class='main-content__address-meta-icon' width='13' height='18'><use xlink:href='img/sprite-svg.svg#coupon__address-map-icon'></use></svg>
            <span class='main-content__address-meta-desc'>${dataFeatures.address}</span>
          </div>`;
      } else {
        addressContent = '';
      }

      data.features[i].properties.balloonContentBody = `
        <div class='main-content__address-block'>
          <div class='main-content__address-img-wrap'>
            <img class='main-content__address-img' src='${dataFeatures.imgUrl}' alt='img' width='212' height='88' />
          </div>
          ${saleContent}
          ${priceContent}
          <h2 class='main-content__address-title'>${dataFeatures.title}</h2>
          <a class='btn main-content__address-btn' href='#'>Подробнее о купоне</a>
          <a href='#' class='main-content__address-title'>${dataFeatures.category}</a>
          ${timeContent}
          ${phoneContent}
          ${addressContent}
        </div>`;

        data.features[i].properties.clusterCaption = "<span class='main-content__address-item'>" + data.features[i].properties.clusterCaption + "</span>";
      }

    return data;
  }


  function coverPlaceData(data) {

    for (var i=0; i < data.features.length; i++) {
      let timeContent,
          phoneContent,
          addressContent = '';
      let dataFeatures = data.features[i].properties.data;

      if (dataFeatures.time) {
        timeContent =`
          <div class='main-content__address-meta'>
            <svg class='main-content__address-meta-icon' width='14' height='14'><use xlink:href='img/sprite-svg.svg#coupon__address-clock-icon'></use></svg>
            <span class='main-content__address-meta-desc'>${dataFeatures.time}</span>
          </div>`;
      } else {
        timeContent = '';
      }

      if (dataFeatures.phone) {
        phoneContent =`
          <div class='main-content__address-meta'>
            <svg class='main-content__address-meta-icon' width='14' height='14'><use xlink:href='img/sprite-svg.svg#coupon__address-phone-icon'></use></svg>
            <span class='main-content__address-meta-desc'>${dataFeatures.phone}</span>
          </div>`;
      } else {
        phoneContent = '';
      }

      if (dataFeatures.address) {
        addressContent =`
          <div class='main-content__address-meta'>
            <svg class='main-content__address-meta-icon' width='13' height='18'><use xlink:href='img/sprite-svg.svg#coupon__address-map-icon'></use></svg>
            <span class='main-content__address-meta-desc'>${dataFeatures.address}</span>
          </div>`;
      } else {
        addressContent = '';
      }

      data.features[i].properties.balloonContentBody = `
        <div class='main-content__address-block'>
          <div class='main-content__address-img-wrap'>
            <img class='main-content__address-img' src='${dataFeatures.imgUrl}' alt='img' width='212' height='88' />
          </div>
          <h2 class='main-content__address-title'>${dataFeatures.title}</h2>
          <a class='btn main-content__address-btn' href='#'>Подробнее о месте</a>
          ${timeContent}
          ${phoneContent}
          ${addressContent}
        </div>`;

      data.features[i].properties.clusterCaption = "<span class='main-content__address-item'>" + data.features[i].properties.clusterCaption + "</span>";
    }

    return data;
  }


  // Создание и заполнение селекта купона
  function selectBlockCoupon(data) {
    let options = '';
    let selectBar = $('.js-coupon-select');
    let selectBlockCouponContent = '';
    let selectBar = $('.js-coupon-select');


    for (let i=0; i < data.features.length; i++) {
      options += '<option value="' + data.features[i].id + '">' + data.features[i].properties.clusterCaption + '</option>'
    }
    $(options).appendTo(selectBar);

    $("#selectBlock .main-content__address-item span").html(data.features.length);

    if (data.features[0].properties.data.sale) {
      $("#selectBlock .main-content__sale span").html(data.features[0].properties.data.sale);
    }

    if (data.features[0].properties.data.price) {
      $("#selectBlock .main-content__price span").html(data.features[0].properties.data.price);
    }

    if (data.features[0].properties.data.title) {
      $("#selectBlock h2.main-content__address-title").html(data.features[0].properties.data.title);
    }

    if (data.features[0].properties.data.category) {
      $("#selectBlock a.main-content__address-title").html(data.features[0].properties.data.category);
    }

    if (data.features[0].properties.data.time) {
      $("#selectBlock .js-time").html(data.features[0].properties.data.time);
    }

    if (data.features[0].properties.data.phone) {
      $("#selectBlock .js-phone").html(data.features[0].properties.data.phone);
    }

    if (data.features[0].properties.data.address) {
      $("#selectBlock .js-address").html(data.features[0].properties.data.address);
    }

    // $(selectBlockCouponContent).appendTo(selectBar);

    // Заполняем блок по изменению селекта
    selectBar.change(function() {
      var objectId = Number( selectBar.val() )

      for (var i=0; i < data.features.length; i++) {

        if ( data.features[i].id === objectId) {
          // Заполняем блок селекта
          $("#selectBlock .main-content__sale span").html(data.features[i].properties.data.sale);
          $("#selectBlock .main-content__price span").html(data.features[i].properties.data.price);
          $("#selectBlock h2.main-content__address-title").html(data.features[i].properties.data.title);
          $("#selectBlock a.main-content__address-title").html(data.features[i].properties.data.category);
          $("#selectBlock .js-time").html(data.features[i].properties.data.time);
          $("#selectBlock .js-phone").html(data.features[i].properties.data.phone);
          $("#selectBlock .js-address").html(data.features[i].properties.data.address);

          // центруем карту
          couponMap.setCenter(data.features[i].geometry.coordinates, 12, {
            checkZoomRange: true
          });
        }
      }
    });
  }


  // Создание и заполнение селекта места
  function selectBlockPlace(data) {
    var options = '';
    var selectBar = $('.js-place-select');

    for (var i=0; i < data.features.length; i++) {
      options += '<option value="' + data.features[i].id + '">' + data.features[i].properties.clusterCaption + '</option>'
    }

    $(options).appendTo(selectBar);

    $("#selectBlock .main-content__address-item span").html(data.features.length);
    $("#selectBlock h2.main-content__address-title").html(data.features[0].properties.data.title);
    $("#selectBlock .js-time").html(data.features[0].properties.data.time);
    $("#selectBlock .js-phone").html(data.features[0].properties.data.phone);
    $("#selectBlock .js-address").html(data.features[0].properties.data.address);

    selectBar.change(function() {
      var objectId = Number( selectBar.val() )

      for (var i=0; i < data.features.length; i++) {

        if ( data.features[i].id === objectId) {
          $("#selectBlock h2.main-content__address-title").html(data.features[i].properties.data.title);
          $("#selectBlock .js-time").html(data.features[i].properties.data.time);
          $("#selectBlock .js-phone").html(data.features[i].properties.data.phone);
          $("#selectBlock .js-address").html(data.features[i].properties.data.address);

          // центруем карту
          placeMap.setCenter(data.features[i].geometry.coordinates, 12, {
            checkZoomRange: true
          });
        }
      }
    });
  }

  // вывод точек для couponMap на карту из json
  $.ajax({
    // url: "https://api.myjson.com/bins/vvfw8"
    url: "js/coupon.json"
  }).done(function(data) {
    var couponGroups = coverCouponData(data);
    couponObjectManager.add(couponGroups);
    createMenuCoupon(couponGroups);
    selectBlockCoupon(data);
  });
  couponMap.geoObjects.add(couponObjectManager);


  // вывод точек для placeMap на карту из json
  $.ajax({
    // url: "https://api.myjson.com/bins/bkk60"
    url: "js/place.json"
  }).done(function(data) {
    var placeGroups = coverPlaceData(data);
    placeObjectManager.add(placeGroups);
    createMenuPlace(placeGroups);
    selectBlockPlace(data);
  });
  placeMap.geoObjects.add(placeObjectManager);


  if (doc_w <= 576) {
    placeObjectManager.options.set('geoObjectOpenBalloonOnClick', false);
    couponObjectManager.options.set('geoObjectOpenBalloonOnClick', false);
  } else {
    placeObjectManager.options.set('geoObjectOpenBalloonOnClick', true);
    couponObjectManager.options.set('geoObjectOpenBalloonOnClick', true);
  }
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
