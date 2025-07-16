// Function to handle navigation bar highlighting based on scroll position
function updateActiveSection() {
  const sections = ["location", "planning", "tributes", "photos"];
  let activeSection = "";

  sections.forEach((section) => {
    const element = document.getElementById(section);
    const rect = element.getBoundingClientRect();
    const sectionCenter = rect.top + rect.height / 2;

    // Detect if the center of the section is within the viewport
    if (sectionCenter >= 0 && sectionCenter <= window.innerHeight) {
      activeSection = section;
    }
  });

  // Remove active class from all nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  // Add active class to the current section's nav link
  if (activeSection) {
    document.getElementById(`nav-${activeSection}`).classList.add("active");
  }
}

// Function to calculate days left until the wedding
function calculateDaysLeft() {
  const weddingDate = new Date("2025-08-10");
  const today = new Date();
  const timeDifference = weddingDate - today;
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return daysLeft;
}

// Function to smoothly scroll to a target section
function goto(target) {
  document.getElementById(target).scrollIntoView({ behavior: "smooth" });
}

function fireworks() {
  var duration = 2 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
}

function getWeddingDayStatus() {
  const weddingDate = new Date("2025-08-10");
  const today = new Date();

  if (today < weddingDate) {
    return -1; // Antes del día de la boda
  } else if (
    today.getFullYear() === weddingDate.getFullYear() &&
    today.getMonth() === weddingDate.getMonth() &&
    today.getDate() === weddingDate.getDate()
  ) {
    return 0; // Es el día de la boda
  } else {
    return 1; // Después del día de la boda
  }
}

function updateIntroSections(status) {
  const introBefore = document.getElementById("intro-pre");
  const introDay = document.getElementById("intro-day");
  const introAfter = document.getElementById("intro-post");

  if (status === -1) {
    // Mostrar "Antes de la boda"
    introBefore.style.display = "block";
    introDay.style.display = "none";
    introAfter.style.display = "none";
  } else if (status === 0) {
    // Mostrar "El día de la boda"
    introBefore.style.display = "none";
    introDay.style.display = "block";
    introAfter.style.display = "none";
  } else if (status === 1) {
    // Mostrar "Después de la boda"
    introBefore.style.display = "none";
    introDay.style.display = "none";
    introAfter.style.display = "block";
  }
}

$(document).ready(() => {
  const status = getWeddingDayStatus();

  // Actualizar las secciones de intro según el estado calculado
  updateIntroSections(status);


  // Event listener for scroll to update navigation bar
  document.addEventListener("scroll", updateActiveSection);

  // Initialize countdown text
  document.getElementById(
    "countdown"
  ).innerText = `Faltan ${calculateDaysLeft()} días para nuestra boda.`;

  // Initialize fireworks on page load
  document.getElementById("navbar-title").addEventListener("click", (e) => {
    fireworks();
    e.preventDefault();
  });

  fireworks();

  if(status === 0) {
    // Lanzar 6 fuegos artificiales cada 4 segundos
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          fireworks();
        }, i * 500); // Retraso de 500ms entre cada lanzamiento dentro del grupo
      }
  }
});
