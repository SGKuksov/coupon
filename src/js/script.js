svg4everybody(); // иницализация полифила для IE

$(document).ready(function(){
  // весь ваш код c jQuery
  //при нажатию на любую кнопку, имеющую класс .btn
  $(".btn").click(function() {
    //открыть модальное окно с id="myModal"
    $("#myModal").modal('show');
  });

  $(".subscribe .subscribe__close").click(function() {
    $(this).parent().hide();
  });
















});
