svg4everybody(); // иницализация полифила для IE

$(document).ready(function(){

  //при нажатию на любую кнопку, имеющую класс .btn
  // $("#callModalLocation").click(function() {
  //   var doc_w = $(document).width();

  //   if (doc_w >= 1024 ) {
  //     //открыть модальное окно с id="myModal"
  //     $("#modalLocation").modal('show');
  //   }
  // });

  //при нажатию на любую кнопку, имеющую класс .btn
  $("#callModalLocation").click(function() {
    var doc_w = $(document).width();

    if (doc_w >= 1024 ) {
      //открыть модальное окно с id="myModal"
      $("#selectCityModal").modal('show');
    }
  });

  $(".subscribe__close").click(function() {
    // скрытие блока подписки
    $(this).parent().hide();
  });

  $(".filter__btn").click(function() {
    // кнопка переключения
    $(".filter__btn").removeClass("filter__btn--active");
    $(this).addClass("filter__btn--active");
  });

  $(".page-header__search-icon").click(function() {
    // показ строки поиска
    $("form.page-header__search").addClass("page-header__search--show").parent().parent().css("padding", 0);
    $(".page-header__input").attr({"placeholder": "Поиск", "autofocus":""})
    $(".page-header__cancel").addClass("page-header__cancel--show");
    $(".page-header__submit").addClass("page-header__submit--show");
    $(".overlay").addClass("overlay--show").removeClass("site-overlay");
  });

  $(".page-header__cancel").click(function() {
    // показ строки поиска

  });

  var pageHeaderSearch = $(".page-header__search");
  var pageHeaderCancel = $(".page-header__cancel");

  $(document).mouseup(function (e){
    if ((!pageHeaderSearch.is(e.target) && pageHeaderSearch.has(e.target).length === 0) || pageHeaderCancel.is(e.target)) {
      $(".overlay").removeClass("overlay--show");
      $("form.page-header__search").removeClass("page-header__search--show").parent().parent().css("padding", "8px");
      $(".page-header__input").attr({"placeholder": "", "autofocus":""})
      $(".page-header__cancel").removeClass("page-header__cancel--show");
      $(".page-header__submit").removeClass("page-header__submit--show");
      $(".overlay").removeClass("overlay--show").addClass("site-overlay").hide();
;
    }
  });

  // $(document).resize(function() {
  //   // скрывает строку поиска при ресайзе
  //   $("form.page-header__search").hide();
  //   $(".page-header__cancel").hide();
  //   $(".page-header__submit").removeClass("page-header__submit--show")
  // });

















});
