$(document).ready(function(){
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
                gridSize: 32
                // clusterDisableClickZoom: true
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

        // Чтобы задать опции одиночным объектам и кластерам,
        // обратимся к дочерним коллекциям ObjectManager.
        objectManager.objects.options.set('preset', 'islands#redDotIcon');
        objectManager.clusters.options.set('preset', 'islands#redClusterIcons');
        myMap.geoObjects.add(objectManager);
        myMap.controls.add(zoomControl);

        $.ajax({
            url: "js/data.json"
        }).done(function(data) {
            objectManager.add(data);
        });

    }
});
