//вызов большого модального окна при клике на "Нет"
$("#modalsBtnCancel").click(function() {
  $("#selectCityModal").modal('hide');
  $("#modalLocation").modal('show');
});

$(document).ready(function() {
  const aside = $("aside");
  const body = $("body");
  let doc_w = $(window).width();
  const errorBlock = $(".error"); // Сообщение об ошибке

  const modalSelect =   $("#modalSelect");   // Малое модальное окно вызова города
  const modalLocation = $("#modalLocation"); // Большое модальное окно вызова города
  const warnAuthModal = $("#warnAuthModal"); // Окно предупреждения авторизации
  const autorizModal =  $("#autorizModal");  // Окно авторизации
  const registerModal = $("#registerModal"); // Окно регистрации
  const ratingModal =   $("#ratingModal");   // Окно "Спасибо за оценку"
  const couponModal =   $("#couponModal");   // Вызов окна купона
  const errorModal =    $("#errorModal");    // Окно ошибки купона
  const reviewModal =   $("#reviewModal");   // модальное окно "спасибо за отзыв"

  $(window).resize(function() {
    doc_w = $(window).width();
  });

  // открытие и закрытие меню
  $(".menu-btn").click(function(event) {
    aside.show();

    modalLocation
      .removeClass('pushy pushy-left')
      .addClass("modal fade")
      .children()
      .removeClass('pushy-content');

    modalLocation.css("z-index", 2000);
  });

  //вызов большого модального окна выбора города при клике на городе
  $(".callModalLocation").click(function(e) {
    e.preventDefault();

    const modalLocationBtn = $(".modal-location__btn");

    body.data("modalIsOpen", false);

    if (doc_w > 1023) {
      modalLocation
        .modal('show');

      modalLocation
        .removeClass('pushy pushy-left')
        .addClass("modal fade")
        .children()
        .removeClass('pushy-content')
        .css("z-index", 2000);

      aside.show();
      modalLocationBtn.html("Это мой город");

      // Пересчет количества колонок modal-location
      const modalLocationCityLink = $(".modal-location__city-link");
      const modalLocationCityCharList = $(".modal-location__city-char-list");
      const modalDialog = $(".modal-location .modal-dialog");

      if ( modalLocationCityLink.length >= 40 ) {
        modalLocationCityCharList.css("column-count", 5);
        modalDialog.addClass("large");
      } else if ( modalLocationCityLink.length >= 30 && modalLocationCityLink.length < 40  ) {
        modalLocationCityCharList.css("column-count", 4);
        modalDialog.addClass("medium");
      } else {
        modalLocationCityCharList.css("column-count", 3);
        modalDialog.addClass("small");
      }
    } else {

      // боковое меню выбора города
      modalLocation
        .addClass('pushy pushy-left')
        .removeClass("modal fade")
        .children()
        .addClass('pushy-content');

      body.removeClass('pushy-open-left');
      aside.hide();

      modalLocation
        .show()
        .css("z-index", 1050);

      body.addClass('pushy-open-left');
      modalLocationBtn.html("Найти");
    }
  });


  const isAuthorize = body.hasClass("non-authorize");
  if (!isAuthorize) {

    // Кнопка подписаться
    $(".rss").click(function() {
      const that = $(this);
      const subscribedText = "Вы подписаны";
      const subscribeText = "Подписаться на обновления";

      that.toggleClass("rss--checked");

      if ( that.hasClass("rss--checked") ) {
        that.find("span").html(subscribedText)
      } else {
        that.find("span").html(subscribeText)
      }
    });

    // Кнопка добавить в избранное
    $(".favorite").click(function() {
      const that = $(this);
      const favoritedText = "Добавлено в избранное";
      const favoriteText = "Добавить в избранное";

      that.toggleClass("favorite--checked");

      if ( that.hasClass("favorite--checked") ) {
        that.find("span").html(favoritedText)
      } else {
        that.find("span").html(favoriteText)
      }

    });
  } else {
    // Кнопка подписаться
    $("#rss, .rss").click(function() {
      warnAuthModal.modal("show");
    });

    // Кнопка добавить в избранное
    $(".favorite").click(function() {
      warnAuthModal.modal("show");
    });

    // Приобрести купон без авторизации
    $(".coupon__take-btn").click(function() {
      warnAuthModal.modal("show");
    });
  }


  // Модальное окно #warnDelModal
  const warnDelModal = $("#warnDelModal");

  $(".coupon-item__close, .place-item__close").click(function() {
    warnDelModal.modal("show");
  });


  // Подтверждение удаления купона из избранного
  $("#couponDelConfirm").click(function() {
    errorBlock.remove();

    $.ajax({
      type: "POST",
      url: "js/ok.json",
      data: $(this).serialize()
    }).done(function(data) {
      warnDelModal.modal("hide");
    }).fail(function(data) {
      warnDelModal
        .find(".modals__body")
        .append("<span class='error'>Что-то пошло не так. Попробуйте еще раз через пару минут</span>");

      setTimeout(function() {
        warnDelModal.modal("hide");
      }, 3000);
    });
    return false;
  });


  // Спасибо за вашу оценку
  $("#ratingBar").on("change", function() {
    ratingModal.modal("show");

    setTimeout(function() {
      ratingModal.modal("hide");
    }, 5000);
  });

  $(".coupon__take-review-btn--green").click(function() {
    ratingModal.modal("show");

    setTimeout(function() {
      ratingModal.modal("hide");
    }, 5000);
  });


  /* вызов modal-select при открытии страницы */
  if (doc_w >= 992) {
    setTimeout(function() {
      modalSelect.show();
    }, 1000);
  }

  /* вызов modal-select при клике по кнопкам */
  $(".modal-select__btn, .modal-select__close").click(function() {
    modalSelect.hide();
  });


  /* вызов купона по клику на фото */
  $(".card__img-wrap").click(function() {

    if (doc_w >= 992) {
      couponModal
        .modal("show")
        .css("z-index", 2000);
      couponModal
        .find('.coupon-modal__text')
        .truncateText();
    }
  });

  /* скрытие окна при изменении ширины */
  $(window).resize(function() {

    if (doc_w <= 992) {
      couponModal.modal("hide");
    }
    if (doc_w <= 575) {
      modalSelect.modal("hide");
    }

  });


  // вызов окна авторизации по иконке в шапке
  $("#callAuthModal, .callAuthModal").click(function() {
    warnAuthModal.modal("hide");
    registerModal.modal("hide");
    autorizModal.modal("show");
  });

  // отправка окна авторизации
  autorizModal.find("form").submit(function() {
    errorBlock.remove();

    $.ajax({
      url: "js/ok.json",
      data: $(this).serialize()
    }).done(function(data) {
    }).fail(function(data) {
      autorizModal
        .find("form")
        .append("<span class='error'>Что-то пошло не так. Попробуйте еще раз через пару минут</span>");
    });
    return false;
  });

  // вызов окна регистрации по клику на регистрация в модальном окне
  $("#callRegisterModal, .callRegisterModal").click(function() {
    warnAuthModal.modal("hide");
    autorizModal.modal("hide");
    registerModal.modal("show");
  });

  // отправка окна регистрации
  registerModal.find("form").submit(function() {
    errorBlock.remove();

    $.ajax({
      type: "POST",
      url: "js/ok.json",
      data: $(this).serialize()
    }).done(function(data) {

      // вызов окна после регистрации по клику на регистрация в модальном окне
      $("#callRegisterAfterModal").click(function() {
        registerModal.modal("hide");
        $("#registerAfterModal").modal("show");
      });
    }).fail(function(data) {
      registerModal
        .find("form")
        .append("<span class='error'>Что-то пошло не так. Попробуйте еще раз через пару минут</span>");
    });
    return false;
  });

  // errorModal
  $("#callErrorModal, .callErrorModal").click(function() {
    errorModal.modal("show");
  });

  // отправка окна ошибки
  errorModal.find("form").submit(function() {
    errorBlock.remove();

    $.ajax({
      type: "POST",
      url: "js/ok.json",
      data: $(this).serialize()
    }).done(function(data) {

      // модальное окно "спасибо за отзыв"
      errorModal.modal("hide");
      reviewModal.modal("show");

      setTimeout(function() {
        reviewModal.modal("hide");
      }, 5000);
    }).fail(function(data) {
      errorModal
        .find("form")
        .append("<span class='error'>Что-то пошло не так. Попробуйте еще раз через пару минут</span>");
    });
    return false;
  });


  /* отправка поля отзыва */
  $(".coupon__footer-form").submit(function() {
    errorBlock.remove();

    $.ajax({
      type: "POST",
      url: "js/ok.json",
      data: $(this).serialize()
    }).done(function(data) {
      // модальное окно "спасибо за отзыв"
      errorModal.modal("hide");
      reviewModal.modal("show");

      setTimeout(function() {
        reviewModal.modal("hide");
      }, 5000);
    }).fail(function(data) {
      errorModal
        .find("form")
        .append("<span class='error'>Что-то пошло не так. Попробуйте еще раз через пару минут</span>");
    });
    return false;
  });

  /* лайтбокс */
  // $('.js-place-gallery').magnificPopup({
  //   open: function() {
  //     console.log(111);

  //   }
  // });

  if (doc_w >= 768) {
    $('.js-place-gallery').magnificPopup({
      closeOnBgClick: true,
      preloader: true,
      callbacks: {
        open: function() {
          $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
            fade: true,
            asNavFor: '.slider-nav'
          });

          $('.slider-nav').slick({
            slidesToShow: 8,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            arrows: false,
            focusOnSelect: true,
            infinite: false
          });
        },
      }
    });

    $(document).mouseup(function (e){
      var div = $("#lightboxModal");
      if (! $("#lightboxModal").is(e.target)
          &&  $("#lightboxModal").has(e.target).length === 0) {
        $.magnificPopup.close();
      }
    });
  }

});
