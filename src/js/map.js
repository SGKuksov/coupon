$(document).ready(function() {

  // на разные типы страниц вызываем карты по их id

  // типы карт
  // 1тип
  // index, category
  // много точек + кластеры.
  // балун со скроллом
  //

  // 2тип страница купона, места,
  // много точек + кластеры.
  // нет скролла
  //

  // 3тип Список мест, Категория мест
  // много точек + кластеры.
  // балун со скроллом
  //

  ymaps.ready(init);
    // #onMapTab
    $('#onMapTab').on('shown.bs.tab', function() {
      // Инициализация карты
    });

    // address tab
    $('#addressTab').on('shown.bs.tab', function() {
      // Инициальзация карты
      // ymaps.ready(init);
    });

  // карта
  function init() {


    var myMap1 = new ymaps.Map('map', {
      center: [55.76, 37.64],
      zoom: 10,
        controls: []
      }),

    var myMap2 = new ymaps.Map('map2', {
        center: [55.76, 37.64],
        zoom: 10,
          controls: []
      }),

    var myMap3 = new ymaps.Map('map3', {
        center: [55.76, 37.64],
        zoom: 10,
          controls: []
      }),

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

    // Загружаем GeoJSON файл с описанием объектов.
    // https://api.myjson.com/bins/1gggfi
    $.getJSON('https://api.myjson.com/bins/1gggfi').done(function(data) {
      console.log(data);
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
    myMap1.controls.add(zoomControl);
    myMap2.controls.add(zoomControl);
    myMap3.controls.add(zoomControl);

    // Добавляем геообъекты в кластеры
    myClusterer.add(myGeoObjects);
    myClusterer.events.add(['mouseenter', 'mouseleave'], onClusterEvent);

    // Добавляем кластеры на карту
    myMap1.geoObjects.add(myClusterer);
    myMap2.geoObjects.add(myClusterer);
    myMap3.geoObjects.add(myClusterer);
  }

});
