document.addEventListener("DOMContentLoaded", function () {
  const imageSlider = $(".image-slider");
  const textSlider = $(".text-slider");
  const textSlides = $(".text-slider h1");

  function setupSlider() {
    if ($(window).width() >= 992) {
      imageSlider.slick({
        arrows: false,
        autoplay: true,
        centerMode: false,
        infinite: true,
        rows: 0,
        slidesToShow: 1,
        autoplaySpeed: 3000,
        speed: 1200,
        vertical: true,
        verticalSwiping: true,
        cssEase: "ease-in-out",
      });

      imageSlider.on("afterChange", function (event, slick, currentSlide) {
        textSlides.each(function (index) {
          if (index === currentSlide) {
            $(this).addClass("active");
          } else {
            $(this).removeClass("active");
          }
        });

        if (currentSlide === 3) {
          textSlider.addClass("hide");
          imageSlider.addClass("ml");
        } else {
          textSlider.removeClass("hide");
          imageSlider.removeClass("ml");
        }
      });

      imageSlider.on("init reInit", function (event, slick) {
        $(".slick-slide").addClass("fade-out");

        setTimeout(function () {
          $(".slick-slide").removeClass("fade-out");
          $(".slick-slide.slick-current").addClass("fade-in");
        }, 500);
      });

      imageSlider.on("afterChange", function (event, slick, currentSlide) {
        $(".slick-slide").addClass("fade-out");

        setTimeout(function () {
          $(".slick-slide").removeClass("fade-out");
          $(".slick-slide.slick-current").addClass("fade-in");
        }, 500);
      });
    } else {
      if (imageSlider.hasClass("slick-initialized")) {
        imageSlider.slick("unslick");
      }

      $(".slick-slide").removeClass("fade-out fade-in slick-current");
      $(".slick-slide").eq(3).addClass("slick-current");
      textSlider.addClass("hide");
      imageSlider.addClass("ml");
    }
  }

  setupSlider();
  $(window).on("resize", setupSlider);

  // Swiper Slider JS Start
  const swiperContainer = document.querySelector(".swiper-container");
  if (swiperContainer) {
    const swiper = new Swiper(".swiper-container", {
      slidesPerView: 3,
      spaceBetween: 20,
      centeredSlides: false,
      slidesOffsetAfter: 100,
      speed: 800,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      grabCursor: true,
      on: {
        touchStart: function () {
          swiperContainer.style.cursor = "grabbing";
        },
        touchEnd: function () {
          swiperContainer.style.cursor = "grab";
        },
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
        },
        576: {
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 1,
        },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
  }
  // Swiper Slider JS End

  //   Team Member Toggle Details Start
  const plusButtons = document.querySelectorAll(".plus");

  plusButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const teamLinks = this.parentElement.querySelector(".team_links");
      if (teamLinks) {
        teamLinks.classList.toggle("active");
      }
    });
  });
  //   Team Member Toggle Details End
});
