$(document).ready(function() {

    ymaps.ready(init);

    function init () {
        var myMap = new ymaps.Map('map', {
                center: [55.76, 37.64],
                zoom: 10,
                controls: []
            }),
            objectManager = new ymaps.ObjectManager({
                // Чтобы метки начали кластеризоваться, выставляем опцию.
                clusterize: true,
                // ObjectManager принимает те же опции, что и кластеризатор.
                gridSize: 32,
                clusterDisableClickZoom: true,
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false
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
            }),
            clusterer = new ymaps.Clusterer({
                clusterDisableClickZoom: true,
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false
            });

        var MyPlaceMark = {
          'iconLayout': 'default#image',
          'iconImageHref': '../img/map__placemark.svg',
          'iconImageSize': [45, 45],
          'iconImageOffset': [-22, -22],
          'iconShape': {
              'type': 'Rectangle',
              'coordinates': [[-22, -22], [22, 22]]
          }
        },
        MyCluster = {
          'iconContentLayout': 'cluster#iconContent' ,
          'iconLayout': 'default#image',
          'iconImageHref': '../img/map__cluster.svg',
          'iconImageSize': [56, 56],
          'iconImageOffset': [-28, -28],
          'iconShape': {
            'type': 'Rectangle',
            'coordinates': [[-28, -28], [28, 28]]
          }
        };

        objectManager.objects.options.set(MyPlaceMark);
        objectManager.clusters.options.set(MyCluster);

        function onObjectEvent (e) {
            var objectId = e.get('objectId');

            if (e.get('type') == 'mouseenter') {
                // Метод setObjectOptions позволяет задавать опции объекта "на лету".
                objectManager.objects.setObjectOptions(objectId, {
                    'iconLayout': 'default#image',
                    'iconImageHref': '../img/map__placemark_hovered.svg',
                    'iconImageSize': [79, 79],
                    'iconImageOffset': [-40, -40],
                    'iconShape': {
                        type: 'Rectangle',
                        coordinates: [[-40, -40], [40, 40]]
                    }
                });
            } else {
                objectManager.objects.setObjectOptions(objectId, MyPlaceMark);
            }
        }

        function onClusterEvent (e) {
            var objectId = e.get('objectId');

            if (e.get('type') == 'mouseenter') {
                objectManager.clusters.setClusterOptions(objectId, {
                  'iconLayout': 'default#image',
                  'iconImageHref': '../img/map__cluster_hovered.svg',
                  'iconImageSize': [79, 79],
                    'iconImageOffset': [-40, -40],
                    'iconShape': {
                        type: 'Rectangle',
                        coordinates: [[-40, -40], [40, 40]]
                    }
                });
            } else {
                objectManager.clusters.setClusterOptions(objectId, {
                  'iconLayout': 'default#image',
                  'iconImageHref': '../img/map__cluster.svg',
                  'iconImageSize': [56, 56],
                  'iconImageOffset': [-28, -28],
                  'iconShape': {
                    'type': 'Rectangle',
                    'coordinates': [[-28, -28], [28, 28]]
                  }
                });
            }
        }

        objectManager.objects.events.add(['mouseenter', 'mouseleave'], onObjectEvent);
        objectManager.clusters.events.add(['mouseenter', 'mouseleave'], onClusterEvent);

        myMap.controls.add(zoomControl);

        // Загружаем GeoJSON файл с описанием объектов.
          $.getJSON('js/data.json')
                  .done(function (geoJson) {
                  // Добавляем описание объектов в формате JSON в менеджер объектов.
                  objectManager.add(geoJson);
                  // Добавляем объекты на карту.
                  myMap.geoObjects.add(objectManager);
                  myMap.geoObjects.add(clusterer);
              });
        }

});


