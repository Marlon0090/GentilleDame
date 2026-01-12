// SLIDER COMPLETO COM SETAS + BOLINHAS + AUTO SLIDE

const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicators = document.getElementById("indicators");

let index = 0;
let interval;

// Criar bolinhas
slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.dataset.index = i;
  indicators.appendChild(dot);
});

// Atualizar bolinhas
function updateDots() {
  document.querySelectorAll(".dot").forEach((dot) => {
    dot.classList.remove("active");
  });
  document.querySelector(`.dot[data-index="${index}"]`).classList.add("active");
}

// Ir para slide específico
function goToSlide(i) {
  index = i;
  slider.style.transform = `translateX(${-index * 100}%)`;
  updateDots();
  resetAutoSlide();
}

// Avançar
function nextSlide() {
  index = (index + 1) % totalSlides;
  goToSlide(index);
}

// Voltar
function prevSlide() {
  index = (index - 1 + totalSlides) % totalSlides;
  goToSlide(index);
}

// Auto slide
function startAutoSlide() {
  interval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
  clearInterval(interval);
  startAutoSlide();
}

// Eventos das setas
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Clique nas bolinhas
document.querySelectorAll(".dot").forEach((dot) => {
  dot.addEventListener("click", () => {
    goToSlide(parseInt(dot.dataset.index));
  });
});

// Iniciar slider automático
startAutoSlide();


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
