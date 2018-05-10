svg4everybody(); // иницализация полифила для IE

$(document).ready(function() {

  var selectCityModal = [
    '<div class="modal-select">',

    '<div class="modal-select__header">',
    '<h5 class="modal-select__title">Выбран ваш город ?</h5>',
    '<a class="modal-select__close" href="#" data-dismiss="modal" aria-label="Close">',
    '<svg class="close-icon" width="14" height="14"><use xlink:href="img/sprite-svg.svg#modals__close"></use></svg>',
    '</a>',
    '</div>',

    '<div class="modal-select__body">',
    '<div class="modal-select__location">',
    '<svg class="modal-select__location-icon" width="11" height="16"><use xlink:href="img/sprite-svg.svg#page-header__location"></use></svg>',
    '<span class="modal-select__location-info">Город</span>',
    '<a class="modal-select__location-city callModalLocation" href="#">Москва</a>',
    '</div>',
    '<div class="modal-select__btn-block">',
    '<button class="modal-select__btn btn" data-dismiss="modal" aria-label="Close">Да</button>',
    '<button class="modal-select__btn btn btn--gray" id="modalsBtnCancel">Нет</button>',
    '</div>',
    '</div>',

    '</div>'
  ].join('');

  var ratingModal = [
    '<div class="modal fade modals" id="ratingModal" tabindex="-1" role="dialog" aria-hidden="true">',
    '<div class="modal-dialog modal-dialog-centered modals__dialog modals__dialog--md">',
    '<div class="modal-content modals__content">',
    '<div class="modal-header modals__header">',
    '<h5 class="modal-title modals__title">Спасибо за вашу оценку!</h5>',
    '<a class="close modals__close" href="#" data-dismiss="modal" aria-label="Close">',
    '<svg class="modals__close-icon" width="14" height="14"><use xlink:href="img/sprite-svg.svg#modals__close"></use></svg>',
    '</a>',
    '</div>',
    '<div class="modal-body modals__body">',
    '<p class="modals__text">Вы можете поделиться данным купоном со своими друзьями в социальных сетях!</p>',
    '<div class="socials modals__socials">',
    '<ul class="socials__list">',
    '<li class="socials__item">',
    '<a class="socials__link" href="#" title="facebook">',
    '<svg class="socials__icon" width="26" height="26"><use xlink:href="img/sprite-svg.svg#socials__fb"></use></svg>',
    '</a>',
    '</li>',
    '<li class="socials__item">',
    '<a class="socials__link" href="#" title="instagram">',
    '<svg class="socials__icon" width="26" height="26"><use xlink:href="img/sprite-svg.svg#socials__inst"></use></svg>',
    '</a>',
    '</li>',
    '<li class="socials__item socials__item-fb">',
    '<a class="socials__link" href="#" title="vkontakte">',
    '<svg class="socials__icon" width="26" height="26"><use xlink:href="img/sprite-svg.svg#socials__vk"></use></svg>',
    '</a>',
    '</li>',
    '</ul>',
    '</div>',
    '<div class="modals__btn-block">',
    '<button class="modals__btn modals__btn-close" data-dismiss="modal" aria-label="Close">Закрыть</button>',
    '</div>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var reviewModal = [
    '<div class="modal fade modals" id="reviewModal" tabindex="-1" role="dialog" aria-hidden="true">',
    '<div class="modal-dialog modal-dialog-centered modals__dialog modals__dialog--md">',
    '<div class="modal-content modals__content">',
    '<div class="modal-header modals__header">',
    '<h5 class="modal-title modals__title">Спасибо за ваш отзыв!</h5>',
    '<a class="close modals__close" href="#" data-dismiss="modal" aria-label="Close">',
    '<svg class="modals__close-icon" width="14" height="14"><use xlink:href="img/sprite-svg.svg#modals__close"></use></svg>',
    '</a>',
    '</div>',
    '<div class="modal-body modals__body">',
    '<p class="modals__text">Вы можете поделиться данным купоном со своими друзьями в социальных сетях!</p>',
    '<div class="socials modals__socials">',
    '<ul class="socials__list">',
    '<li class="socials__item">',
    '<a class="socials__link" href="#" title="facebook">',
    '<svg class="socials__icon" width="26" height="26"><use xlink:href="img/sprite-svg.svg#socials__fb"></use></svg>',
    '</a>',
    '</li>',
    '<li class="socials__item">',
    '<a class="socials__link" href="#" title="instagram">',
    '<svg class="socials__icon" width="26" height="26"><use xlink:href="img/sprite-svg.svg#socials__inst"></use></svg>',
    '</a>',
    '</li>',
    '<li class="socials__item socials__item-fb">',
    '<a class="socials__link" href="#" title="vkontakte">',
    '<svg class="socials__icon" width="26" height="26"><use xlink:href="img/sprite-svg.svg#socials__vk"></use></svg>',
    '</a>',
    '</li>',
    '</ul>',
    '</div>',
    '<div class="modals__btn-block">',
    '<button class="modals__btn modals__btn-close" data-dismiss="modal" aria-label="Close">Закрыть</button>',
    '</div>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var errorModal = [
    '<div class="modal fade modals" id="errorModal" tabindex="-1" role="dialog" aria-hidden="true">',
    '<div class="modal-dialog modal-dialog-centered modals__dialog modals__dialog--md">',
    '<div class="modal-content modals__content">',
    '<div class="modal-header modals__header">',
    '<h5 class="modal-title modals__title">Купон не сработал?</h5>',
    '<a class="close modals__close" href="#" data-dismiss="modal" aria-label="Close">',
    '<svg class="modals__close-icon" width="14" height="14"><use xlink:href="img/sprite-svg.svg#modals__close"></use></svg>',
    '</a>',
    '</div>',
    '<form class="modal-body modals__body" action="">',
    '<p class="modals__text">Нашли ошибку? Расскажите нам!</p>',
    '<div class="el-radio modals__radio">',
    '<input class="modals__radio-input" id="r-conditions" type="radio" name="error" value="option1" checked="" />',
    '<label class="el-radio-style" for="r-conditions"></label>',
    '<label class="modals__label" for="r-conditions">Ошибка в условиях</label>',
    '</div>',
    '<div class="el-radio modals__radio">',
    '<input class="modals__radio-input" id="r-disconts" type="radio" name="error" value="option2" checked="" />',
    '<label class="el-radio-style" for="r-disconts"></label>',
    '<label class="modals__label" for="r-disconts">Не удалось получить скидку</label>',
    '</div>',
    '<div class="el-radio modals__radio">',
    '<input class="modals__radio-input" id="r-other" type="radio" name="error" value="option3" checked="" />',
    '<label class="el-radio-style" for="r-other"></label>',
    '<label class="modals__label" for="r-other">Другое</label>',
    '</div>',
    '<textarea class="modals__textarea" name="msg"></textarea>',
    '<div class="modals__btn-block">',
    '<button class="modals__btn modals__btn-input" type="submit">Отправить</button>',
    '</div>',
    '</form>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var registerModal = [
    '<div class="modal fade modals" id="registerModal" tabindex="-1" role="dialog" aria-hidden="true">',
    '<div class="modal-dialog modal-dialog-centered modals__dialog modals__dialog--widescreen">',
    '<div class="modal-content modals__content modals__content--widescreen">',
    '<div class="modal-header modals__header modals__header--widescreen">',
    '<h5 class="modal-title modals__title">Регистрация</h5>',
    '<a class="close modals__close" href="#" data-dismiss="modal" aria-label="Close">',
    '<svg class="modals__close-icon" width="14" height="14"><use xlink:href="img/sprite-svg.svg#modals__close"></use></svg>',
    '</a>',
    '</div>',
    '<form class="modal-body modals__body" action="">',
    '<div class="modals__input-block">',
    '<label class="modals__input-label" for="mail">Электронная почта</label>',
    '<input class="modals__input-txt" id="mail" type="email" name="mail" required="required" placeholder="personal@hotkupon.ru" />',
    '</div>',
    '<div class="modals__input-block">',
    '<label class="modals__input-label" for="login">Логин</label>',
    '<input class="modals__input-txt" id="login" type="text" name="login" required="required" placeholder="harold1" />',
    '</div>',
    '<div class="modals__input-block">',
    '<label class="modals__input-label" for="pass">Пароль</label>',
    '<input class="modals__input-pass" id="pass" type="password" name="pass" required="required" placeholder="********" />',
    '</div>',
    '<div class="modals__input-btn-block">',
    '<button class="modals__input-btn btn" type="submit">Регистрация</button>',
    '</div>',
    '</form>',
    '<div class="modal-body modals__footer">',
    '<p class="modals__desc">Зарегистрироваться через<br> соцсети</p>',
    '<div class="modals__input-btn-block">',
    '<button class="modals__btn">',
    '<svg class="modals__fb-icon" width="14" height="14"><use xlink:href="img/sprite-svg.svg#modals__fb"></use></svg>',
    '<span>Facebook</span>',
    '</button>',
    '<button class="modals__btn">',
    '<svg class="modals__vk-icon" width="20" height="10"><use xlink:href="img/sprite-svg.svg#modals__vk"></use></svg>',
    '<span>Вконтакте</span>',
    '</button>',
    '</div>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var autorizModal = [
    '<div class="modal fade modals" id="autorizModal" tabindex="-1" role="dialog" aria-hidden="true">',
    '<div class="modal-dialog modal-dialog-centered modals__dialog modals__dialog--widescreen">',
    '<div class="modal-content modals__content modals__content--widescreen">',
    '<div class="modal-header modals__header modals__header--widescreen">',
    '<h5 class="modal-title modals__title">Авторизация</h5>',
    '<a class="close modals__close" href="#" data-dismiss="modal" aria-label="Close">',
    '<svg class="modals__close-icon" width="14" height="14"><use xlink:href="img/sprite-svg.svg#modals__close"></use></svg>',
    '</a>',
    '</div>',
    '<form class="modal-body modals__body" action="">',
    '<div class="modals__input-block">',
    '<label class="modals__input-label" for="login">Логин</label>',
    '<input class="modals__input-txt" id="login" type="text" name="login" required="required" placeholder="harold1" />',
    '</div>',
    '<div class="modals__input-block">',
    '<label class="modals__input-label" for="pass">Пароль</label>',
    '<input class="modals__input-pass" id="pass" type="password" name="pass" required="required" placeholder="********" />',
    '</div>',
    '<div class="modals__btn-block modals__btn-block--column">',
    '<button class="modals__input-btn btn" type="submit">Войти</button>',
    '<p class="modals__desc">или</p>',
    '<button class="modals__btn modals__btn--gray" type="submit">Зарегистрироваться</button>',
    '</div>',
    '</form>',
    '<div class="modal-body modals__footer">',
    '<p class="modals__desc">Авторизация через</p>',
    '<div class="modals__input-btn-block">',
    '<button class="modals__btn">',
    '<svg class="modals__fb-icon" width="14" height="14"><use xlink:href="img/sprite-svg.svg#modals__fb"></use></svg>',
    '<span>Facebook</span>',
    '</button>',
    '<button class="modals__btn">',
    '<svg class="modals__vk-icon" width="20" height="10"><use xlink:href="img/sprite-svg.svg#modals__vk"></use></svg>',
    '<span>Вконтакте</span>',
    '</button>',
    '</div>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var warnAutorModal = [
    '<div class="modal fade modals" id="warnAutorModal" tabindex="-1" role="dialog" aria-hidden="true">',
    '<div class="modal-dialog modal-dialog-centered modals__dialog modals__dialog--md">',
    '<div class="modal-content modals__content">',
    '<div class="modal-header modals__header">',
    '<h5 class="modal-title modals__title">Для продолжения вам необходимо авторизоваться</h5>',
    '<a class="close modals__close" href="#" data-dismiss="modal" aria-label="Close">',
    '<svg class="modals__close-icon" width="14" height="14"><use xlink:href="img/sprite-svg.svg#modals__close"></use></svg>',
    '</a>',
    '</div>',
    '<div class="modal-body modals__body">',
    '<div class="modals__btn-block">',
    '<button class="modals__btn" id="callAutorizModal">Войти</button>',
    '<button class="modals__btn modals__btn--gray" id="callRegisterModal">Регистрация</button>',
    '</div>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var warnDelModal = [
    '<div class="modal fade modals" id="warnDelModal" tabindex="-1" role="dialog" aria-hidden="true">',
    '<div class="modal-dialog modal-dialog-centered modals__dialog modals__dialog--md">',
    '<div class="modal-content modals__content">',
    '<div class="modal-header modals__header">',
    '<h5 class="modal-title modals__title">Вы уверены, что хотите удалить данный купон из избранного ?</h5>',
    '<a class="close modals__close" href="#" data-dismiss="modal" aria-label="Close">',
    '<svg class="modals__close-icon" width="14" height="14"><use xlink:href="img/sprite-svg.svg#modals__close"></use></svg>',
    '</a>',
    '</div>',
    '<div class="modal-body modals__body">',
    '<div class="modals__btn-block">',
    '<button class="modals__btn">Да</button>',
    '<button class="modals__btn modals__btn--gray" data-dismiss="modal" aria-label="Close">Отмена</button>',
    '</div>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var registerAfterModal = [
    '<div class="modal fade modals" id="registerAfterModal" tabindex="-1" role="dialog" aria-hidden="true">',
    '<div class="modal-dialog modal-dialog-centered modals__dialog modals__dialog--lg">',
    '<div class="modal-content modals__content">',
    '<div class="modal-header modals__header">',
    '<h5 class="modal-title modals__title">Спасибо за регистрацию!</h5>',
    '<a class="close modals__close" href="#" data-dismiss="modal" aria-label="Close">',
    '<svg class="modals__close-icon" width="14" height="14"><use xlink:href="img/sprite-svg.svg#modals__close"></use></svg>',
    '</a>',
    '</div>',
    '<div class="modal-body modals__body">',
    '<p class="modals__text">В течение 3 минут вам на почту будет выслано письмо для подтверждения регистрации, после чего вы сможете авторизоваться на сайте</p>',
    '<div class="modals__input-btn-block">',
    '<button class="modals__btn  modals__btn--red" data-dismiss="modal" aria-label="Close">Продолжить поиск купонов</button>',
    '<a class="modals__btn" href="https://mail.google.com/">',
    '<svg class="modals__fb-icon" width="19" height="13"><use xlink:href="img/sprite-svg.svg#modals__mail-icon"></use></svg>',
    '<span>Проверить почту</span>',
    '</a>',
    '</div>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  // вызов обрезания текста
  $('.card__link').truncateText();
  $('.card__place').truncateText();

  // подключение автопоиск
  $('#pageHeaderSearch').autoSearch();
  $('.modal-location__input').autoSearch();

  // скрытие блока подписки
  $(".subscribe__close").click(function() {
    $(this).parent().hide();
  });

  // rss
  $(".rss").click(function() {
    var subscribedText = "Вы подписаны";
    var subscribeText = "Подписаться на обновления";

    $(this).toggleClass("rss--checked");

    if ($(this).hasClass("rss--checked")) {
      $(this).find("span").html(subscribedText)
    } else {
      $(this).find("span").html(subscribeText)
    }
  });

  // favorite
  $(".favorite").click(function() {
    var favoritedText = "Добавлено в избранное";
    var favoriteText = "Добавить в избранное";

    $(this).toggleClass("favorite--checked");

    if ($(this).hasClass("favorite--checked")) {
      $(this).find("span").html(favoritedText)
    } else {
      $(this).find("span").html(favoriteText)
    }
  });

  // закрытие модального окна при скролле
  // $(window).scroll(function(e) {
  //   var dropdowns = $('.dropdown-toggle');
  //   $.each(dropdowns, function(i, c) {
  //     $(c).parent().removeClass('open');
  //   })
  // });

  // вызов малого модального при открытии страницы
  setTimeout([
    $(selectCityModal).appendTo(".page-header__container")
  ], 10000);

  // скрытие modal-select
  $(".modal-select__close").click(function() {
    $(".modal-select").hide();
  });
  $(".modal-select__btn").click(function() {
    $(".modal-select").hide();
  });

  //вызов большого модального окна при клике на "Нет"
  $("#modalsBtnCancel").click(function() {
    // var doc_w = $(window).width();

    // if (doc_w > 768 ) {
    $("#selectCityModal").modal('hide');
    $("#modalLocation").modal('show');
    // }
  });

  //вызов большого модального окна выбора города при клике на городе
  $(".callModalLocation").click(function(e) {
    e.preventDefault();
    var doc_w = $(window).width();
    $("body").data("modalIsOpen", false);

    if (doc_w > 1023) {
      $("#modalLocation").modal('show');
      $("#modalLocation").removeClass('pushy pushy-left').addClass("modal fade").children().removeClass('pushy-content').css("z-index", 2000);
      $("aside").show();
      $(".modal-location__btn").html("Это мой город");
    } else {

      // боковое меню выбора города
      $("#modalLocation").addClass('pushy pushy-left').removeClass("modal fade").children().addClass('pushy-content');
      $("body").removeClass('pushy-open-left');
      $("aside").hide();
      $("#modalLocation").show().css("z-index", 1050);
      $("body").addClass('pushy-open-left');
      $(".modal-location__btn").html("Найти");
    }
  });

  $(".menu-btn").click(function(event) {
    $("aside").show();
    $("#modalLocation").removeClass('pushy pushy-left').addClass("modal fade").children().removeClass('pushy-content');
    $("#modalLocation").css("z-index", 2000);
  });

  // modals-panel
  // $('.modals-panel').hide();

  // #callAutorizModal
  $("#callAutorizModal").click(function() {
    $(".modals-panel__warnAutorModal").modal('hide');
    $("#autorizModal").modal('show');
  });

  // #callRegisterModal
  $("#callRegisterModal").click(function() {
    $(".modals-panel__warnAutorModal").modal('hide');
    $(registerModal).appendTo("body");
    $(".modals-panel__registerModal").modal('show');
  });

  $(".page-header__search-icon").click(function() {
    // показ строки поиска
    var doc_w = $(window).width();

    if (doc_w <= 768) {
      $("form.page-header__search").addClass("page-header__search--show").parent().parent().css("padding", 0);
      $(".page-header__input").attr({
        "placeholder": "Поиск",
        "autofocus": ""
      })
      $(".page-header__cancel").addClass("page-header__cancel--show");
      $(".page-header__submit").addClass("page-header__submit--show");
      $(".overlay").addClass("overlay--show").removeClass("site-overlay");

      $(".page-header__menu").toggle();
      $(".page-header__logo-wrap").toggle();
      $(".page-header__login").toggle();
    }
  });

  $(document).mouseup(function(e) {
    var pageHeaderSearch = $(".page-header__search");
    var pageHeaderCancel = $(".page-header__cancel");
    var doc_w = $(window).width();

    if (doc_w <= 768) {

      if ((!pageHeaderSearch.is(e.target) && pageHeaderSearch.has(e.target).length === 0) || (pageHeaderCancel.is(e.target))) {
        $(".overlay").removeClass("overlay--show");
        $("form.page-header__search").removeClass("page-header__search--show").parent().parent().css("padding", "8px");
        $(".page-header__input").attr({
          "placeholder": "",
          "autofocus": ""
        })
        $(".page-header__cancel").removeClass("page-header__cancel--show");
        $(".page-header__submit").removeClass("page-header__submit--show");
        $(".overlay").removeClass("overlay--show").addClass("site-overlay").hide();

        $(".page-header__menu").show();
        $(".page-header__logo-wrap").show();
        $(".page-header__login").show();
      }
    }
  });

  $(".page-header__cancel--show").click(function() {
    var doc_w = $(window).width();

    if (doc_w <= 768) {
      $(".overlay").removeClass("site-overlay");
      $("form.page-header__search").removeClass("page-header__search--show").parent().parent().css("padding", "8px");
      $(".page-header__input").attr({
        "placeholder": "",
        "autofocus": ""
      })
      $(".page-header__cancel").removeClass("page-header__cancel--show");
      $(".page-header__submit").removeClass("page-header__submit--show");
      $(".overlay").removeClass("overlay--show").addClass("site-overlay").hide();

      $(".page-header__menu").show();
      $(".page-header__logo-wrap").show();
      $(".page-header__login").show();
    }
  });

  // слайдер купонов
  $('.coupon-gallery__inner').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 2,
    variableWidth: true
  });

  // рейтинг на запись
  // https://github.com/antennaio/jquery-bar-rating
  $('.rating-bar').barrating({
    theme: 'fontawesome-stars',
    deselectable: false,
    showSelectedRating: true
  });

  // рейтинг на чтение
  $('.rating-bar--readonly').barrating('readonly', true); //только чтение

  // скролл
  $("body").scroll(function() {

    $(".filter-near__dropdown").hide();
    // $("#filterNearLink").dropdown("toggle");
    console.log('scroll');
  });

  // лайтбокс
  $("#placeGallery").click(function() {
    // $("").modal('show');
  });

  // modals-panel
  $(".modals-panel__close").click(function() {
    $(this).parent().hide();
  });

  // modals
  $(".modals-panel__selectCityModal").click(function() {
    // $(selectCityModal).appendTo("body");
    $(".modal-select").show();
  });

  $(".modals-panel__ratingModal").click(function() {
    $(ratingModal).appendTo("body");
    $("#ratingModal").modal("show");
  });
  $(".modals-panel__reviewModal").click(function() {
    $(reviewModal).appendTo("body");
    $("#reviewModal").modal("show");
  });

  $(".modals-panel__errorModal").click(function() {
    $(errorModal).appendTo("body");
    $("#errorModal").modal("show");
  });

  $(".modals-panel__modalLocation").click(function() {
    $("#modalLocation").modal("show");
  });
  $(".modals-panel__couponModal").click(function() {
    $('.coupon-modal__text').truncateText();
    $("#couponModal").modal("show");
  });

  $(".modals-panel__registerModal").click(function() {
    $(registerModal).appendTo("body");
    $("#registerModal").modal("show");
  });

  $(".modals-panel__autorizModal").click(function() {
    $(autorizModal).appendTo("body");
    $("#autorizModal").modal("show");
  });

  $(".modals-panel__warnAutorModal").click(function() {
    $(warnAutorModal).appendTo("body");
    $("#warnAutorModal").modal("show");
  });

  $(".modals-panel__warnDelModal").click(function() {
    $(warnDelModal).appendTo("body");
    $("#warnDelModal").modal("show");
  });

  $(".modals-panel__registerAfterModal").click(function() {
    $(registerAfterModal).appendTo("body");
    $("#registerAfterModal").modal("show");
  });
});
