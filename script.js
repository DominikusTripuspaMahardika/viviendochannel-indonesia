// Navbar hamburger toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector("nav ul.nav-links");
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
const dropdowns = document.querySelectorAll("ul.dropdown");
if (hamburger && navLinks) {
  // Toggle hamburger menu
  hamburger.addEventListener("click", () => {
    const expanded =
      hamburger.getAttribute("aria-expanded") === "true" || false;
    hamburger.setAttribute("aria-expanded", !expanded);
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
    if (!navLinks.classList.contains("open")) {
      dropdowns.forEach((dd) => dd.classList.remove("open"));
      dropdownToggles.forEach((dt) =>
        dt.setAttribute("aria-expanded", "false")
      );
    }
  });
  // Close mobile nav ONLY when clicking normal nav links, NOT dropdown toggles
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      // Kalau link ini adalah dropdown-toggle, jangan tutup menu
      if (link.classList.contains("dropdown-toggle")) {
        e.preventDefault(); // cegah navigasi ke #
        return; // jangan tutup menu
      }
      // Kalau bukan dropdown-toggle, tutup menu dan dropdown
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      dropdowns.forEach((dd) => dd.classList.remove("open"));
      dropdownToggles.forEach((dt) =>
        dt.setAttribute("aria-expanded", "false")
      );
    });
  });
  // Toggle dropdowns for mobile only
  dropdownToggles.forEach((toggle, i) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.innerWidth > 768) return; // desktop: hover saja, no toggle click
      const expanded = toggle.getAttribute("aria-expanded") === "true" || false;
      toggle.setAttribute("aria-expanded", !expanded);
      dropdowns[i].classList.toggle("open");
    });
    toggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle.click();
      }
    });
  });
  // Klik di luar untuk tutup dropdown
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".has-dropdown")) {
      dropdowns.forEach((dd) => dd.classList.remove("open"));
      dropdownToggles.forEach((dt) =>
        dt.setAttribute("aria-expanded", "false")
      );
    }
  });
}

// Scroll progress bar
const progressBar = document.getElementById("loading-progress-bar");
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + "%";
});

// Parallax effect
const heroSection = document.querySelector(".hero-section");
window.addEventListener("scroll", () => {
  if (heroSection) {
    const scrollPos = window.pageYOffset;
    heroSection.style.backgroundPositionY = -(scrollPos * 0.5) + "px";
  }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Scroll arrow buttons
const scrollTopBtn = document.getElementById("scroll-top-btn");
const scrollDownBtn = document.getElementById("scroll-down-btn");

window.addEventListener("scroll", () => {
  if (scrollTopBtn && scrollDownBtn) {
    scrollTopBtn.style.display = window.pageYOffset > 300 ? "block" : "none";

    const atBottom =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
    scrollDownBtn.style.display = atBottom ? "none" : "block";
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
if (scrollDownBtn) {
  scrollDownBtn.addEventListener("click", () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  });
}

// Matrix Rain Effect
const canvas = document.getElementById("matrixRain");
if (canvas) {
  const ctx = canvas.getContext("2d");

  // Set canvas full screen
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
    initMatrix();
  });

  resizeCanvas();

  const chars =
    "アァイィウヴエカキクケコサシスセソタチツテトナニネノハヒフヘホマミムメモヤユヨラリルレロワンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const matrixChars = chars.split("");

  let columns;
  let drops = [];

  function initMatrix() {
    columns = Math.floor(canvas.width / 16);
    drops = [];

    for (let i = 0; i < columns; i++) {
      drops.push({
        y: Math.random() * canvas.height,
        speed: 1 + Math.random() * 3, // Kecepatan acak
        fontSize: 14 + Math.floor(Math.random() * 4), // Ukuran font acak
      });
    }
  }

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < drops.length; i++) {
      const drop = drops[i];
      const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];

      // Gradasi warna hijau (terang di awal)
      const gradient = ctx.createLinearGradient(
        0,
        drop.y,
        0,
        drop.y + drop.fontSize
      );
      gradient.addColorStop(0, "#00ff00");
      gradient.addColorStop(1, "#00ff00");

      ctx.fillStyle = gradient;
      ctx.font = `${drop.fontSize}px monospace`;
      ctx.fillText(text, i * 16, drop.y);

      drop.y += drop.speed * drop.fontSize;

      // Reset jika sudah keluar dari canvas
      if (drop.y > canvas.height + drop.fontSize) {
        drop.y = 0;
        drop.speed = 1 + Math.random() * 3;
        drop.fontSize = 14 + Math.floor(Math.random() * 4);
      }
    }
  }

  initMatrix();
  setInterval(drawMatrix, 50); // frame rate lebih lambat agar lebih halus
}

// WhatsApp Form
const whatsappForm = document.getElementById("whatsappForm");

if (whatsappForm) {
  whatsappForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameField = document.getElementById("name");
    const messageField = document.getElementById("message");

    const name = nameField.value.trim();
    const message = messageField.value.trim();

    // Validasi tanpa alert — menggunakan placeholder feedback
    if (!name) {
      nameField.value = "";
      nameField.placeholder = "Silakan masukkan nama Anda";
      nameField.focus();
      return;
    }

    if (!message) {
      messageField.value = "";
      messageField.placeholder = "Silakan masukkan pesan Anda";
      messageField.focus();
      return;
    }

    const phoneNumber = "6285706800428";
    const encodedMessage = encodeURIComponent(
      `Halo, nama saya adalah ${name}.\n\n${message}`
    );

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");

    // Reset form (opsional)
    whatsappForm.reset();
  });
}

// Toast Notification
function showToast() {
  const toast = document.getElementById("toastNotification");
  if (toast) {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
}
function closeToast() {
  const toast = document.getElementById("toastNotification");
  if (toast) {
    toast.classList.remove("show");
  }
}
setTimeout(showToast, 1000);

// Countdown Download Button
const downloadLink =
  "https://dominikustripuspamahardika.github.io/sub2unlock-indonesia/";
function startCountdown(event) {
  event.preventDefault();
  const btn = document.getElementById("countdownDownload");
  if (!btn) return;

  let countdown = 15;
  btn.textContent = `Silakan tunggu... (${countdown})`;
  btn.style.pointerEvents = "none";

  const interval = setInterval(() => {
    countdown--;
    btn.textContent = `Silakan tunggu... (${countdown})`;
    if (countdown <= 0) {
      clearInterval(interval);
      window.location.href = downloadLink;
      btn.textContent = "Mengunduh...";
    }
  }, 1000);
}

// WhatsApp Premium Button
function changeButtonText(event) {
  event.preventDefault();
  const btn = document.getElementById("whatsappBtn");
  if (!btn) return;

  btn.textContent = "Ditujukan kepada Admin WhatsApp";
  setTimeout(() => {
    window.location.href =
      "https://wa.me/6285706800428?text=Halo%20admin%2C%20saya%20tertarik%20untuk%20membeli%20Premium%20Plan.%20Tolong%20kirimkan%20informasi%20detail%20cara%20pembayarannya ";
  }, 500);
}

// Effect Preloader
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

const swiper = new Swiper(".testimonial-slider", {
  loop: true,
  spaceBetween: 20,
  grabCursor: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

// Fungsi untuk format tanggal dengan nama bulan bahasa Inggris, misal "May 31, 2025"
function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

// Set tanggal hari ini di elemen dengan id "changelog-date"
document.getElementById("changelog-date").textContent = formatDate(new Date());

const APP_VERSION = "1.5.0"; // cukup ubah versi di sini saja

// Update semua tempat yang menampilkan versi
document.addEventListener("DOMContentLoaded", function () {
  const footerVersion = document.getElementById("app-version");
  const changelogVersion = document.getElementById("app-version-changelog");

  if (footerVersion) footerVersion.textContent = APP_VERSION;
  if (changelogVersion) changelogVersion.textContent = APP_VERSION;

  // Tahun otomatis juga tetap diatur
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
