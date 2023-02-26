window.addEventListener("DOMContentLoaded", () => {
  const slider = tns({
    container: ".section-carousel__slider",
    items: 1,
    slideBy: "page",
    autoplay: false,
    controls: false,
    navPosition: "bottom",
    responsive: {
      1: {
        nav: true,
      },
      992: {
        nav: false,
      },
    },
  });

  document
    .querySelector(".section-carousel__prev")
    .addEventListener("click", function () {
      slider.goTo("prev");
    });
  document
    .querySelector(".section-carousel__next")
    .addEventListener("click", function () {
      slider.goTo("next");
    });

  $("ul.section-catalog__list").on(
    "click",
    "li:not(.section-catalog__item_active)",
    function () {
      $(this)
        .addClass("section-catalog__item_active")
        .siblings()
        .removeClass("section-catalog__item_active")
        .closest("div.container")
        .find("div.section-catalog__content")
        .removeClass("section-catalog__content_active")
        .eq($(this).index())
        .addClass("section-catalog__content_active");
    }
  );

  function toggleCardContent(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".section-catalog__card-content")
          .eq(i)
          .toggleClass("section-catalog__card-content_active");
        $(".section-catalog__list-description")
          .eq(i)
          .toggleClass("section-catalog__list-description_active");
      });
    });
  }

  toggleCardContent(".section-catalog__list-description-link");
  toggleCardContent(".section-catalog__card-link");

  // Modal
  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("fast");
  });
  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #order, #thanks").fadeOut("fast");
  });
  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__description").text(
        $(".section-catalog__card-title").eq(i).text()
      );
      $(".overlay, #order").fadeIn("fast");
    });
  });

  function validateForms(objectForValidate) {
    $(objectForValidate).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: "Пожалуйста, введите своё имя",
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты",
        },
      },
      errorClass: "validate-error",
    });
  }

  validateForms("#consultation form");
  validateForms(".section-consultation__form");
  validateForms("#order form");

  $("input[name=phone]").mask("+7 (999) 999-99-99");

  $("form").submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("fast");
      $("form").trigger("reset");
    });
    return false;
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() >= 1130) {
      $(".block-up").fadeIn();
    } else {
      $(".block-up").fadeOut();
    }
  });

  const smoothLinks = document.querySelectorAll('a[href^="#up"]');
  for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener("click", function (e) {
      e.preventDefault();
      const id = smoothLink.getAttribute("href");

      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
});
