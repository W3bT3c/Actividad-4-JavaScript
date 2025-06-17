
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form[action='gracias.html']");
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  if (!track) return;

  let currentIndex = 0;
  let intervalId;

  function updateSlidePosition() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
  }

  function showPrevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlidePosition();
  }

  nextBtn.addEventListener("click", showNextSlide);
  prevBtn.addEventListener("click", showPrevSlide);

  function startAutoSlide() {
    intervalId = setInterval(showNextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  track.addEventListener("mouseenter", stopAutoSlide);
  track.addEventListener("mouseleave", startAutoSlide);

  startAutoSlide();

  if (form) {
    form.addEventListener("submit", function (e) {
      const mensaje = this.mensaje.value.trim();
      if (mensaje.length < 10) {
        e.preventDefault();
        alert("El mensaje debe tener al menos 10 caracteres.");
        return;
      }
      if (!confirm("¿Deseas enviar este formulario?")) {
        e.preventDefault();
      }
    });
  }

  const botones = document.querySelectorAll("input[type='button'], input[type='submit'], button");
  botones.forEach(btn => {
    btn.addEventListener("mouseover", () => {
      btn.style.backgroundColor = "#94d2bd";
      btn.style.cursor = "pointer";
    });
    btn.addEventListener("mouseout", () => {
      btn.style.backgroundColor = "";
    });
  });

  if (window.location.pathname.includes("gracias.html")) {
    setTimeout(() => {
      window.location.href = "index.html";
    }, 5000);

    const params = new URLSearchParams(window.location.search);
    const nombre = params.get("nombre");
    const email = params.get("email");
    const mensaje = params.get("mensaje");

    const resumen = document.getElementById("resumen");
    resumen.innerHTML = `
      <h3>Resumen de tu mensaje:</h3>
      <p><strong>Nombre:</strong> ${nombre || "No proporcionado"}</p>
      <p><strong>Email:</strong> ${email || "No proporcionado"}</p>
      <p><strong>Mensaje:</strong> ${mensaje || "No proporcionado"}</p>
      <p>Serás redirigido en 5 segundos...</p>
    `;
  }
});
