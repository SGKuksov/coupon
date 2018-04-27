svg4everybody(); // иницализация полифила для IE

$(document).ready(function(){
  var doc_w = $(document).width();

  var selectCityModal = $(`<div class="modal fade modals" id="selectCityModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modals__dialog modals__dialog--md">
          <div class="modal-content modals__content">
            <div class="modal-header modals__header">
              <h5 class="modal-title modals__title">Выбран ваш город ?</h5>
              <a class="close modals__close" href="#" data-dismiss="modal" aria-label="Close">
                <svg class="modals__close-icon" width="14" height="14">
                  <use xlink:href="img/sprite-svg.svg#modals__close"></use>
                </svg>
              </a>
            </div>
            <div class="modal-body modals__body">
              <div class="modals__location">
                <svg class="modals__location-icon" width="11" height="16">
                  <use xlink:href="img/sprite-svg.svg#page-header__location"></use>
                </svg><span class="modals__location-info">Город</span><a class="modals__location-city callModalLocation" href="#">Москва</a></div>
              <div class="modals__btn-block"><button class="modals__btn" data-dismiss="modal" aria-label="Close">Да</button><button class="modals__btn modals__btn--gray" id="modalsBtnCancel">Нет</button></div>
            </div>
          </div>
        </div>
      </div>`);
  var ratingModal = $(`<div class="modal fade modals" id="ratingModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modals__dialog modals__dialog--md">
        <div class="modal-content modals__content">
          <div class="modal-header modals__header">
            <h5 class="modal-title modals__title">Спасибо за вашу оценку!</h5>
            <a class="close modals__close" href="#" data-dismiss="modal" aria-label="Close">
              <svg class="modals__close-icon" width="14" height="14">
                <use xlink:href="img/sprite-svg.svg#modals__close"></use>
              </svg>
            </a>
          </div>
          <div class="modal-body modals__body">
            <p class="modals__text">Вы можете поделиться данным купоном со своими друзьями в социальных сетях!</p>
            <div class="socials modals__socials">
              <ul class="socials__list">
                <li class="socials__item">
                  <a class="socials__link" href="#" title="facebook">
                    <svg class="socials__icon" width="26" height="26">
                      <use xlink:href="img/sprite-svg.svg#socials__fb"></use>
                    </svg>
                  </a>
                </li>
                <li class="socials__item">
                  <a class="socials__link" href="#" title="instagram">
                    <svg class="socials__icon" width="26" height="26">
                      <use xlink:href="img/sprite-svg.svg#socials__inst"></use>
                    </svg>
                  </a>
                </li>
                <li class="socials__item socials__item-fb">
                  <a class="socials__link" href="#" title="vkontakte">
                    <svg class="socials__icon" width="26" height="26">
                      <use xlink:href="img/sprite-svg.svg#socials__vk"></use>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div class="modals__btn-block"><button class="modals__btn modals__btn-close" data-dismiss="modal" aria-label="Close">Закрыть</button></div>
          </div>
        </div>
      </div>
    </div>`);
  var reviewModal = $(`<div class="modal fade modals" id="reviewModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modals__dialog modals__dialog--md">
        <div class="modal-content modals__content">
          <div class="modal-header modals__header">
            <h5 class="modal-title modals__title">Спасибо за ваш отзыв!</h5>
            <a class="close modals__close" href="#" data-dismiss="modal" aria-label="Close">
              <svg class="modals__close-icon" width="14" height="14">
                <use xlink:href="img/sprite-svg.svg#modals__close"></use>
              </svg>
            </a>
          </div>
          <div class="modal-body modals__body">
            <p class="modals__text">Вы можете поделиться данным купоном со своими друзьями в социальных сетях!</p>
            <div class="socials modals__socials">
              <ul class="socials__list">
                <li class="socials__item">
                  <a class="socials__link" href="#" title="facebook">
                    <svg class="socials__icon" width="26" height="26">
                      <use xlink:href="img/sprite-svg.svg#socials__fb"></use>
                    </svg>
                  </a>
                </li>
                <li class="socials__item">
                  <a class="socials__link" href="#" title="instagram">
                    <svg class="socials__icon" width="26" height="26">
                      <use xlink:href="img/sprite-svg.svg#socials__inst"></use>
                    </svg>
                  </a>
                </li>
                <li class="socials__item socials__item-fb">
                  <a class="socials__link" href="#" title="vkontakte">
                    <svg class="socials__icon" width="26" height="26">
                      <use xlink:href="img/sprite-svg.svg#socials__vk"></use>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div class="modals__btn-block"><button class="modals__btn modals__btn-close" data-dismiss="modal" aria-label="Close">Закрыть</button></div>
          </div>
        </div>
      </div>
    </div>`);
  var errorModal = $(`<div class="modal fade modals" id="errorModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modals__dialog modals__dialog--md">
        <div class="modal-content modals__content">
          <div class="modal-header modals__header">
            <h5 class="modal-title modals__title">Купон не сработал?</h5>
            <a class="close modals__close" href="#" data-dismiss="modal" aria-label="Close">
              <svg class="modals__close-icon" width="14" height="14">
                <use xlink:href="img/sprite-svg.svg#modals__close"></use>
              </svg>
            </a>
          </div>
          <form class="modal-body modals__body" action="">
            <p class="modals__text">Нашли ошибку? Расскажите нам!</p>
            <div class="el-radio modals__radio"><input class="modals__radio-input" id="r-conditions" type="radio" name="error" value="option1" checked="" /><label class="el-radio-style" for="r-conditions"></label><label class="modals__label" for="r-conditions">Ошибка в условиях</label></div>
            <div class="el-radio modals__radio"><input class="modals__radio-input" id="r-disconts" type="radio" name="error" value="option2" checked="" /><label class="el-radio-style" for="r-disconts"></label><label class="modals__label" for="r-disconts">Не удалось получить скидку</label></div>
            <div class="el-radio modals__radio"><input class="modals__radio-input" id="r-other" type="radio" name="error" value="option3" checked="" /><label class="el-radio-style" for="r-other"></label><label class="modals__label" for="r-other">Другое</label></div><textarea class="modals__textarea" name="msg"></textarea>
            <div class="modals__btn-block"><button class="modals__btn modals__btn-input" type="submit">Отправить</button></div>
          </form>
        </div>
      </div>
    </div>`);
  var registerModal = $(`<div class="modal fade modals" id="registerModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modals__dialog modals__dialog--widescreen">
        <div class="modal-content modals__content modals__content--widescreen">
          <div class="modal-header modals__header modals__header--widescreen">
            <h5 class="modal-title modals__title">Регистрация</h5>
            <a class="close modals__close" href="#" data-dismiss="modal" aria-label="Close">
              <svg class="modals__close-icon" width="14" height="14">
                <use xlink:href="img/sprite-svg.svg#modals__close"></use>
              </svg>
            </a>
          </div>
          <form class="modal-body modals__body" action="">
            <div class="modals__input-block"><label class="modals__input-label" for="mail">Электронная почта</label><input class="modals__input-txt" id="mail" type="email" name="mail" required="required" /></div>
            <div class="modals__input-block"><label class="modals__input-label" for="login">Логин</label><input class="modals__input-txt" id="login" type="text" name="login" required="required" /></div>
            <div class="modals__input-block"><label class="modals__input-label" for="pass">Пароль</label><input class="modals__input-pass" id="pass" type="password" name="pass" required="required" /></div>
            <div class="modals__input-btn-block"><button class="modals__input-btn btn" type="submit">Регистрация</button></div>
          </form>
          <div class="modal-body modals__footer">
            <p class="modals__text">Зарегистрироваться через<br> соцсети</p>
            <div class="modals__input-btn-block"><button class="modals__btn"><svg class="modals__fb-icon" width="14" height="14"><use xlink:href="img/sprite-svg.svg#modals__fb"></use></svg><span>Facebook</span></button><button class="modals__btn"><svg class="modals__vk-icon" width="20" height="10"><use xlink:href="img/sprite-svg.svg#modals__vk"></use></svg><span>Вконтакте</span></button></div>
          </div>
        </div>
      </div>
    </div>`);
  var autorizModal = $(`<div class="modal fade modals" id="autorizModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modals__dialog modals__dialog--widescreen">
        <div class="modal-content modals__content modals__content--widescreen">
          <div class="modal-header modals__header modals__header--widescreen">
            <h5 class="modal-title modals__title">Авторизация</h5>
            <a class="close modals__close" href="#" data-dismiss="modal" aria-label="Close">
              <svg class="modals__close-icon" width="14" height="14">
                <use xlink:href="img/sprite-svg.svg#modals__close"></use>
              </svg>
            </a>
          </div>
          <form class="modal-body modals__body" action="">
            <div class="modals__input-block"><label class="modals__input-label" for="login">Логин</label><input class="modals__input-txt" id="login" type="text" name="login" required="required" /></div>
            <div class="modals__input-block"><label class="modals__input-label" for="pass">Пароль</label><input class="modals__input-pass" id="pass" type="password" name="pass" required="required" /></div>
            <div class="modals__btn-block modals__btn-block--column"><button class="modals__input-btn btn" type="submit">Войти</button>
              <p class="modals__text">или</p><button class="modals__btn modals__btn--gray" type="submit">Зарегистрироваться</button></div>
          </form>
          <div class="modal-body modals__footer">
            <p class="modals__text">Авторизация через</p>
            <div class="modals__input-btn-block"><button class="modals__btn"><svg class="modals__fb-icon" width="14" height="14"><use xlink:href="img/sprite-svg.svg#modals__fb"></use></svg><span>Facebook</span></button><button class="modals__btn"><svg class="modals__vk-icon" width="20" height="10"><use xlink:href="img/sprite-svg.svg#modals__vk"></use></svg><span>Вконтакте</span></button></div>
          </div>
        </div>
      </div>
    </div>`);
  var warnAutorModal = $(`<div class="modal fade modals" id="warnAutorModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modals__dialog modals__dialog--md">
        <div class="modal-content modals__content">
          <div class="modal-header modals__header">
            <h5 class="modal-title modals__title">Для продолжения вам необходимо авторизоваться</h5>
            <a class="close modals__close" href="#" data-dismiss="modal" aria-label="Close">
              <svg class="modals__close-icon" width="14" height="14">
                <use xlink:href="img/sprite-svg.svg#modals__close"></use>
              </svg>
            </a>
          </div>
          <div class="modal-body modals__body">
            <div class="modals__btn-block"><button class="modals__btn" id="callAutorizModal">Войти</button><button class="modals__btn modals__btn--gray" id="callRegisterModal">Регистрация</button></div>
          </div>
        </div>
      </div>
    </div>`);
  var warnDelModal = $(`<div class="modal fade modals" id="warnDelModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modals__dialog modals__dialog--md">
        <div class="modal-content modals__content">
          <div class="modal-header modals__header">
            <h5 class="modal-title modals__title">Вы уверены, что хотите удалить данный купон из избранного ?</h5>
            <a class="close modals__close" href="#" data-dismiss="modal" aria-label="Close">
              <svg class="modals__close-icon" width="14" height="14">
                <use xlink:href="img/sprite-svg.svg#modals__close"></use>
              </svg>
            </a>
          </div>
          <div class="modal-body modals__body">
            <div class="modals__btn-block"><button class="modals__btn">Да</button><button class="modals__btn modals__btn--gray" data-dismiss="modal" aria-label="Close">Отмена</button></div>
          </div>
        </div>
      </div>
    </div>`);

  // вызов обрезания текста
  $('.card__link').truncateText();
  $('.card__place').truncateText();

  // подключение автопоиск
  $('#pageHeaderSearch').autoSearch();
  $('.modal-location__input').autoSearch();

  //вызов большого модального окна при клике на город
  $("#modalsBtnCancel").click(function() {
    $("#selectCityModal").modal('hide');
    $("#modalLocation").modal('show');
  });

  if (doc_w >= 1024 ) {
    // вызов малого модального при открытии страницы
    // setTimeout($("#selectCityModal").modal('show'), 10000);
  }

  //вызов большого модального окна выбора города при клике на "НЕТ"
  $(".callModalLocation").click(function() {
    $("#modalLocation").modal('show');
  });

  // #callAutorizModal
  $("#callAutorizModal").click(function() {
    $(".modals-panel__warnAutorModal").modal('hide');
    $("#autorizModal").modal('show');
  });

  // #callRegisterModal
  $("#callRegisterModal").click(function() {
    $(".modals-panel__warnAutorModal").modal('hide');
    registerModal.appendTo("body");
    $(".modals-panel__registerModal").modal('show');
  });

  // скрытие блока подписки
  $(".subscribe__close").click(function() {
    $(this).parent().hide();
  });

  // кнопка переключения
  $(".filter__btn").click(function() {
    $(".filter__btn").removeClass("filter__btn--active");
    $(this).addClass("filter__btn--active");
  });

  // rss
  $(".top-panel__rss").click(function() {
    var rss = $(this);

    if ( rss.hasClass("top-panel__rss--active") ) {
      rss.removeClass("top-panel__rss--active");
    } else {
      rss.addClass("top-panel__rss--active");
    }
  });

  $(".page-header__search-icon").click(function() {
    // показ строки поиска
    doc_w = $(document).width();
    if (doc_w <= 768 ) {
      $("form.page-header__search").addClass("page-header__search--show").parent().parent().css("padding", 0);
      $(".page-header__input").attr({"placeholder": "Поиск", "autofocus":""})
      $(".page-header__cancel").addClass("page-header__cancel--show");
      $(".page-header__submit").addClass("page-header__submit--show");
      $(".overlay").addClass("overlay--show").removeClass("site-overlay");

      $(".page-header__menu").toggle();
      $(".page-header__logo-wrap").toggle();
      $(".page-header__login").toggle();
    }
  });

  $(document).mouseup(function (e){
    var pageHeaderSearch = $(".page-header__search");
    var pageHeaderCancel = $(".page-header__cancel");

    doc_w = $(document).width();
    if (doc_w <= 768 ) {

      if ((!pageHeaderSearch.is(e.target) && pageHeaderSearch.has(e.target).length === 0) || (pageHeaderCancel.is(e.target))) {
        $(".overlay").removeClass("overlay--show");
        $("form.page-header__search").removeClass("page-header__search--show").parent().parent().css("padding", "8px");
        $(".page-header__input").attr({"placeholder": "", "autofocus":""})
        $(".page-header__cancel").removeClass("page-header__cancel--show");
        $(".page-header__submit").removeClass("page-header__submit--show");
        $(".overlay").removeClass("overlay--show").addClass("site-overlay").hide();

        $(".page-header__menu").show();
        $(".page-header__logo-wrap").show();
        $(".page-header__login").show();
  ;
      }
    }
  });

  $(".page-header__cancel--show").click(function() {
    doc_w = $(document).width();
    if (doc_w <= 768) {

      $(".overlay").removeClass("site-overlay");
      $("form.page-header__search").removeClass("page-header__search--show").parent().parent().css("padding", "8px");
      $(".page-header__input").attr({"placeholder": "", "autofocus":""})
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

  // рейтинг
  // $('#rating_1').rating({
  //   fx: 'full',
  //   image: 'img/sprite-02559127368214036.png',
  //   loader: 'img/ajax-loader.gif',
  //   url: 'rating.php',
  //   callback: function(responce){
  //     this.vote_success.fadeOut(2000);
  //   }
  // });

  // $("#placeGallery").slick({
  //   infinite: false,
  //   slidesToShow: 3,
  //   slidesToScroll: 2,
  //   variableWidth: true
  // });

  // лайтбокс
  $("#placeGallery").click(function() {
    // $("#modalLocation").modal('show');
  });

  // modals-panel
  $(".modals-panel__close").click(function() {
    $(this).parent().hide();
  });

  $(".modals-panel__selectCityModal").click(function() {
    selectCityModal.appendTo("body");
    $("#selectCityModal").modal("show");
  });

  $(".modals-panel__ratingModal").click(function() {
    ratingModal.appendTo("body");
    $("#ratingModal").modal("show");
  });
  $(".modals-panel__reviewModal").click(function() {
    reviewModal.appendTo("body");
    $("#reviewModal").modal("show");
  });

  $(".modals-panel__errorModal").click(function() {
    errorModal.appendTo("body");
    $("#errorModal").modal("show");
  });

  $(".modals-panel__modalLocation").click(function() {
    $("#modalLocation").modal("show");
  });
  $(".modals-panel__couponModal").click(function() {
    $("#couponModal").modal("show");
  });

  $(".modals-panel__registerModal").click(function() {
    registerModal.appendTo("body");
    $("#registerModal").modal("show");
  });

  $(".modals-panel__autorizModal").click(function() {
    autorizModal.appendTo("body");
    $("#autorizModal").modal("show");
  });

  $(".modals-panel__warnAutorModal").click(function() {
    warnAutorModal.appendTo("body");
    $("#warnAutorModal").modal("show");
  });

  $(".modals-panel__warnDelModal").click(function() {
    warnDelModal.appendTo("body");
    $("#warnDelModal").modal("show");
  });
});
