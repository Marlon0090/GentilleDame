// SLIDER COMPLETO COM SETAS + BOLINHAS + AUTO SLIDE
document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // SLIDER
  // =========================
  const slider = document.getElementById("slider");
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const indicators = document.getElementById("indicators");

  let index = 0;
  let interval;

  if (slider && slides.length > 0 && prevBtn && nextBtn && indicators) {
    slides.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.dataset.index = i;
      indicators.appendChild(dot);
    });

    function updateDots() {
      document.querySelectorAll(".dot").forEach((dot) => dot.classList.remove("active"));
      const activeDot = document.querySelector(`.dot[data-index="${index}"]`);
      if (activeDot) activeDot.classList.add("active");
    }

    function goToSlide(i) {
      index = i;
      slider.style.transform = `translateX(${-index * 100}%)`;
      updateDots();
      resetAutoSlide();
    }

    function nextSlide() {
      index = (index + 1) % totalSlides;
      goToSlide(index);
    }

    function prevSlide() {
      index = (index - 1 + totalSlides) % totalSlides;
      goToSlide(index);
    }

    function startAutoSlide() {
      interval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
      clearInterval(interval);
      startAutoSlide();
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    document.querySelectorAll(".dot").forEach((dot) => {
      dot.addEventListener("click", () => goToSlide(parseInt(dot.dataset.index, 10)));
    });

    startAutoSlide();
  }

  // =========================
  // MENU HAMBURGUER (MOBILE) - FUNCIONA E NAVEGA + BOTÃO X
  // =========================
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("mobileMenu");

  if (toggle && menu) {
    const closeBtn = menu.querySelector(".mobile-menu__close");

    const openMenu = () => {
      menu.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };

    const isOpen = () => menu.classList.contains("open");

    // Abre/fecha no click do botão (hamburguer)
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      isOpen() ? closeMenu() : openMenu();
    });

    // ✅ Botão X fecha o menu
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
      });
    }

    // Clique dentro do menu não fecha (deixa o link navegar)
    menu.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Fecha ao clicar fora usando pointerdown (não mata o click do link)
    document.addEventListener(
      "pointerdown",
      (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
          closeMenu();
        }
      },
      true
    );

    // Fecha com ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }
});

// PRELOADER
window.addEventListener("load", function () {
  const preloader = document.querySelector(".preloader");

  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hide");
      setTimeout(() => preloader.remove(), 500);
    }, 500);
  }
});
