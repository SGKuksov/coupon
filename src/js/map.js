ymaps.ready(function () {

  var myMap = new ymaps.Map("couponMap", {
        center: [55.76, 37.64],
        zoom: 10,
        controls: []
      }),
      objectManager = new ymaps.ObjectManager({
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
        balloonContentLayoutHeight: 300,
        balloonContentLayoutWidth: 500
      }),
      zoomControl = new ymaps.control.ZoomControl({
        options: {
          position: {
            bottom: 55,
            left: 'auto',
            right: 20,
            top: 'auto'
          }
        }
      });

  myMap.controls.add(zoomControl);


  // вывод точек на карту из json
  $.ajax({
    url: "https://api.myjson.com/bins/13uqei"
  }).done(function(data) {
    objectManager.add(data);
  });
  myMap.geoObjects.add(objectManager);


  // задаем стили точкам и кластерам
  objectManager.objects.options.set({
    'iconLayout': 'default#image',
    'iconImageHref': '../img/map__placemark.svg',
    'iconImageSize': [44, 44],
    'iconImageOffset': [-22, -22],
    balloonContentLayoutWidth: 300
  });


  // навешиваем события на точки и кластеры
  function onObjectEvent (e) {
    var objectId = e.get('objectId');

    if (e.get('type') == 'mouseenter') {
      objectManager.objects.setObjectOptions(objectId, {
        'iconLayout': 'default#image',
        'iconImageHref': '../img/map__placemark_hovered.svg',
        'iconImageSize': [80, 80],
        'iconImageOffset': [-40, -40]
      });
    } else {
      objectManager.objects.setObjectOptions(objectId, {
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
      objectManager.clusters.setClusterOptions(objectId, {
        'clusterIcons': [{
          href: '../img/map__cluster_hovered.svg',
          size: [80, 80],
          offset: [-40, -40]
        }],
        'clusterIconContentLayout': ymaps.templateLayoutFactory.createClass(
          '<span style="color: #ff1e1e; font-weight: bold;">{{ properties.geoObjects.length }}</span>'
        )
      });
    } else {
      objectManager.clusters.setClusterOptions(objectId, {
        'clusterIcons': [{
          href: '../img/map__cluster.svg',
          size: [44, 44],
          offset: [-22, -22]
        }],
        'clusterIconContentLayout': ymaps.templateLayoutFactory.createClass(
          '<span style="color: #969696;">{{ properties.geoObjects.length }}</span>'
        )
      });
    }
  }
  objectManager.objects.events.add(['mouseenter', 'mouseleave'], onObjectEvent);
  objectManager.clusters.events.add(['mouseenter', 'mouseleave'], onClusterEvent);




































});
