document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     SLIDER
  ========================================================= */

  const slider = document.getElementById("slider");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const indicators = document.getElementById("indicators");

  let currentIndex = 0;
  let sliderInterval = null;
  let isAnimating = false;

  if (
    slider &&
    slides.length > 0 &&
    prevBtn &&
    nextBtn &&
    indicators
  ) {

    /* CRIA OS INDICADORES */

    slides.forEach((_, index) => {

      const dot = document.createElement("button");

      dot.classList.add("dot");
      dot.setAttribute("aria-label", `Ir para o slide ${index + 1}`);
      dot.dataset.index = index;

      if (index === 0) {
        dot.classList.add("active");
      }

      indicators.appendChild(dot);
    });


    /* ATUALIZA INDICADORES */

    function updateIndicators() {

      const dots = indicators.querySelectorAll(".dot");

      dots.forEach((dot, index) => {

        dot.classList.toggle(
          "active",
          index === currentIndex
        );

      });
    }


    /* ATUALIZA SLIDE */

    function updateSlider(index) {

      if (isAnimating) return;

      isAnimating = true;

      currentIndex = index;

      slider.style.transform =
        `translateX(-${currentIndex * 100}%)`;

      updateIndicators();

      setTimeout(() => {
        isAnimating = false;
      }, 800);
    }


    /* PRÓXIMO */

    function nextSlide() {

      const nextIndex =
        (currentIndex + 1) % slides.length;

      updateSlider(nextIndex);
    }


    /* ANTERIOR */

    function previousSlide() {

      const previousIndex =
        (currentIndex - 1 + slides.length) %
        slides.length;

      updateSlider(previousIndex);
    }


    /* AUTO SLIDE */

    function startAutoSlide() {

      clearInterval(sliderInterval);

      sliderInterval = setInterval(() => {

        nextSlide();

      }, 5500);
    }


    function stopAutoSlide() {

      clearInterval(sliderInterval);

    }


    function restartAutoSlide() {

      stopAutoSlide();
      startAutoSlide();

    }


    /* BOTÕES */

    nextBtn.addEventListener("click", () => {

      nextSlide();
      restartAutoSlide();

    });


    prevBtn.addEventListener("click", () => {

      previousSlide();
      restartAutoSlide();

    });


    /* INDICADORES */

    indicators.addEventListener("click", (event) => {

      const dot = event.target.closest(".dot");

      if (!dot) return;

      const index =
        Number(dot.dataset.index);

      updateSlider(index);

      restartAutoSlide();

    });


    /* PAUSA AO PASSAR O MOUSE */

    slider.addEventListener(
      "mouseenter",
      stopAutoSlide
    );

    slider.addEventListener(
      "mouseleave",
      startAutoSlide
    );


    /* SWIPE MOBILE */

    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener("touchstart", (event) => {

      touchStartX =
        event.changedTouches[0].screenX;

    }, { passive: true });


    slider.addEventListener("touchend", (event) => {

      touchEndX =
        event.changedTouches[0].screenX;

      const difference =
        touchStartX - touchEndX;

      if (Math.abs(difference) < 50) return;

      if (difference > 0) {

        nextSlide();

      } else {

        previousSlide();

      }

      restartAutoSlide();

    }, { passive: true });


    /* TECLADO */

    document.addEventListener("keydown", (event) => {

      if (event.key === "ArrowRight") {

        nextSlide();
        restartAutoSlide();

      }

      if (event.key === "ArrowLeft") {

        previousSlide();
        restartAutoSlide();

      }

    });


    startAutoSlide();

  }


  /* =========================================================
     MENU MOBILE
  ========================================================= */

  const menuToggle =
    document.getElementById("menuToggle");

  const mobileMenu =
    document.getElementById("mobileMenu");


  if (menuToggle && mobileMenu) {

    function openMenu() {

      mobileMenu.classList.add("open");

      menuToggle.classList.add("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "true"
      );

      document.body.classList.add(
        "menu-open"
      );

    }


    function closeMenu() {

      mobileMenu.classList.remove("open");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      document.body.classList.remove(
        "menu-open"
      );

    }


    function toggleMenu() {

      const isOpen =
        mobileMenu.classList.contains("open");

      if (isOpen) {

        closeMenu();

      } else {

        openMenu();

      }

    }


    menuToggle.addEventListener(
      "click",
      (event) => {

        event.preventDefault();
        event.stopPropagation();

        toggleMenu();

      }
    );


    /* FECHA AO CLICAR EM UM LINK */

    mobileMenu
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener(
          "click",
          () => {

            closeMenu();

          }
        );

      });


    /* FECHA CLICANDO FORA */

    document.addEventListener(
      "click",
      (event) => {

        if (
          !mobileMenu.contains(event.target) &&
          !menuToggle.contains(event.target)
        ) {

          closeMenu();

        }

      }
    );


    /* ESC */

    document.addEventListener(
      "keydown",
      (event) => {

        if (event.key === "Escape") {

          closeMenu();

        }

      }
    );


    /* FECHA SE REDIMENSIONAR PARA DESKTOP */

    window.addEventListener(
      "resize",
      () => {

        if (window.innerWidth > 700) {

          closeMenu();

        }

      }
    );

  }


  /* =========================================================
     REVEAL DOS ELEMENTOS AO ENTRAR NA TELA
  ========================================================= */

  const animatedElements =
    document.querySelectorAll(
      ".grupo-produto, .card, .produtos h1, .produtos > p"
    );


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px"
        }
      );


    animatedElements.forEach((element) => {

      element.classList.add("reveal");

      observer.observe(element);

    });

  } else {

    animatedElements.forEach((element) => {

      element.classList.add(
        "is-visible"
      );

    });

  }


  /* =========================================================
     EFEITO 3D SUAVE NOS CARDS
  ========================================================= */

  const cards =
    document.querySelectorAll(".card");


  cards.forEach((card) => {

    card.addEventListener(
      "mousemove",
      (event) => {

        if (window.innerWidth <= 700) return;

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;

        const rotateX =
          ((y - centerY) / centerY) * -2;

        const rotateY =
          ((x - centerX) / centerX) * 2;


        card.style.transform =
          `translateY(-6px)
           perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform = "";

      }
    );

  });


  /* =========================================================
     EFEITO PARALLAX LEVE NO SLIDER
  ========================================================= */

  const sliderContainer =
    document.querySelector(
      ".slider-container"
    );


  if (
    sliderContainer &&
    window.innerWidth > 700
  ) {

    sliderContainer.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          sliderContainer.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const moveX =
          ((x / rect.width) - 0.5) * 8;

        const moveY =
          ((y / rect.height) - 0.5) * 5;


        slider.style.transform =
          `translateX(-${currentIndex * 100}%)
           translate(${moveX}px, ${moveY}px)`;

      }
    );


    sliderContainer.addEventListener(
      "mouseleave",
      () => {

        slider.style.transform =
          `translateX(-${currentIndex * 100}%)`;

      }
    );

  }


  /* =========================================================
     LINKS EXTERNOS — ANIMAÇÃO DE CLIQUE
  ========================================================= */

  const externalLinks =
    document.querySelectorAll(
      'a[target="_blank"]'
    );


  externalLinks.forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        link.classList.add(
          "clicked"
        );

        setTimeout(() => {

          link.classList.remove(
            "clicked"
          );

        }, 400);

      }
    );

  });


  /* =========================================================
     BOTÕES — EFEITO DE RIPPLE
  ========================================================= */

  const buttons =
    document.querySelectorAll(
      ".btn-cardapio, .slider-btn"
    );


  buttons.forEach((button) => {

    button.addEventListener(
      "click",
      function (event) {

        const ripple =
          document.createElement("span");

        ripple.classList.add(
          "ripple"
        );

        const rect =
          button.getBoundingClientRect();

        const size =
          Math.max(
            rect.width,
            rect.height
          );

        ripple.style.width =
          `${size}px`;

        ripple.style.height =
          `${size}px`;

        ripple.style.left =
          `${event.clientX - rect.left - size / 2}px`;

        ripple.style.top =
          `${event.clientY - rect.top - size / 2}px`;

        button.appendChild(ripple);

        setTimeout(() => {

          ripple.remove();

        }, 600);

      }
    );

  });


  /* =========================================================
     LINK SUAVE PARA ÂNCORAS
  ========================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) return;

          const target =
            document.querySelector(
              targetId
            );

          if (!target) return;

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* =========================================================
     ANO AUTOMÁTICO
  ========================================================= */

  const yearElements =
    document.querySelectorAll(
      ".current-year"
    );


  yearElements.forEach((element) => {

    element.textContent =
      new Date().getFullYear();

  });

});


/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener(
  "load",
  () => {

    const preloader =
      document.querySelector(
        ".preloader"
      );


    if (!preloader) return;


    setTimeout(() => {

      preloader.classList.add(
        "hide"
      );


      setTimeout(() => {

        preloader.remove();

      }, 600);

    }, 700);

  }
);


/* =========================================================
   REDUZ ANIMAÇÕES SE O USUÁRIO PREFERIR
========================================================= */

const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );


if (prefersReducedMotion.matches) {

  document.documentElement.style
    .scrollBehavior = "auto";

}