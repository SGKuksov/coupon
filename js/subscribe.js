$(document).ready(function() {

  // скрытие блока подписки
  $(".subscribe__close").click(function() {
    $(this).parent().hide();
  });
  // обработка формы подписки
  $(".subscribe__form").submit(function() {
    $(".error").remove();

    $.ajax({
      url: "js/ok.json",
      data: $(this).serialize()
    }).done(function(data) {
      console.log("done!");
    }).fail(function(data) {
      $(".subscribe__form").append("<span class='error'>Что-то пошло не так. Попробуйте еще раз через пару минут</span>");
    });
    return false;
  });

});
