svg4everybody(); // иницализация полифила для IE

$(document).ready(function(){

  //при нажатию на любую кнопку, имеющую класс .btn
  $("#callModalLocation").click(function() {
    //открыть модальное окно с id="myModal"
    $("#modalLocation").modal('show');
  });

  $(".subscribe .subscribe__close").click(function() {
    // скрывает окно подписки
    $(this).parent().hide();
  });

  $(".filter__btn").click(function() {
    // кнопка переключения
    $(".filter__btn").removeClass("filter__btn--active");
    $(this).addClass("filter__btn--active");
  });
















});
