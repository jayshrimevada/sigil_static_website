document.addEventListener("DOMContentLoaded", function () {
  // Header position JS Start
  const headerSection = document.querySelector(".header-section");
  const scrollThreshold = 150;

  function handleHeaderScroll() {
    if (window.innerWidth >= 992) {
      if (window.scrollY > scrollThreshold) {
        headerSection.classList.add("sticky-header");
      } else {
        headerSection.classList.remove("sticky-header");
      }
    } else {
      headerSection.classList.remove("sticky-header");
    }
  }

  window.addEventListener("scroll", handleHeaderScroll);
  window.addEventListener("resize", handleHeaderScroll);
  handleHeaderScroll();
  // Header position JS End

  // Nav Links JS Start
  const navLinksMenu = document.querySelectorAll(".navbar-nav .nav-link");

  navLinksMenu.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.getAttribute("href").startsWith("#")) {
        // Check if it's an anchor link
        e.preventDefault();

        navLinksMenu.forEach((otherLink) => {
          otherLink.classList.remove("active");
        });

        this.classList.add("active");
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      scrollToSection(targetId);
    });
  });

  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    scrollToSection(targetId);
  }

  function scrollToSection(targetId) {
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const topOffset = -80;
      const targetPosition =
        targetSection.getBoundingClientRect().top +
        window.pageYOffset +
        topOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }
  // Nav Links JS End

  // Navmenu link click JS Start
  const navLinks = document.querySelectorAll("#navbarTogglerDemo03 .nav-link");
  const navbarCollapse = document.getElementById("navbarTogglerDemo03");
  const navbarToggler = document.querySelector(".navbar-toggler"); // Select the toggler button

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
        if (navbarToggler) {
          navbarToggler.setAttribute("aria-expanded", "false"); // Set aria-expanded to false
        }
      }
    });
  });
  // Navmenu link click JS End

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

  // Contact Form Validation Start
  const form = document.querySelector(".contact_form form");
  const emailInput = form.querySelector("input[type='email']");
  const subjectInput = form.querySelector("input[type='text']");
  const messageInput = form.querySelector("textarea");
  const sendButton = form.querySelector("button.btn");
  const formSuccessMessage = document.createElement("div");
  formSuccessMessage.classList.add("form-success-message");

  function validateEmail() {
    if (emailInput.value.trim() === "") {
      setError(emailInput, "Email address is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      setError(emailInput, "Invalid email address");
      return false;
    } else {
      setSuccess(emailInput);
      return true;
    }
  }

  function validateSubject() {
    if (subjectInput.value.trim() === "") {
      setError(subjectInput, "Subject is required");
      return false;
    } else {
      setSuccess(subjectInput);
      return true;
    }
  }

  function validateMessage() {
    if (messageInput.value.trim() === "") {
      setError(messageInput, "Message is required");
      return false;
    } else {
      setSuccess(messageInput);
      return true;
    }
  }

  emailInput.addEventListener("input", validateEmail);
  subjectInput.addEventListener("input", validateSubject);
  messageInput.addEventListener("input", validateMessage);

  sendButton.addEventListener("click", function (e) {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    if (isEmailValid && isSubjectValid && isMessageValid) {
      form.appendChild(formSuccessMessage);
      formSuccessMessage.textContent = "Form submitted successfully!";

      // Clear form fields
      emailInput.value = "";
      subjectInput.value = "";
      messageInput.value = "";

      // Clear success and error styles
      clearStyles(emailInput);
      clearStyles(subjectInput);
      clearStyles(messageInput);
    } else {
      if (form.contains(formSuccessMessage)) {
        form.removeChild(formSuccessMessage);
      }
    }
  });

  function setError(input, message) {
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("error-message");
    errorDiv.textContent = message;

    // Remove existing error message if present
    const existingError = input.nextElementSibling;
    if (existingError && existingError.classList.contains("error-message")) {
      existingError.remove();
    }

    input.classList.add("error");
    input.classList.remove("success");
    input.parentNode.insertBefore(errorDiv, input.nextSibling); // Insert error after input
  }

  function setSuccess(input) {
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains("error-message")) {
      errorDiv.remove();
    }
    input.classList.remove("error");
    input.classList.add("success");
  }

  function clearStyles(input) {
    input.classList.remove("error");
    input.classList.remove("success");
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains("error-message")) {
      errorDiv.remove();
    }
  }
  // Contact Form Validation End
});
