/* ============================================================
   Casmotology — Main JavaScript
   main.js
   ============================================================ */

// ── Nav scroll shadow ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Hamburger / Mobile Menu ────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Scroll Reveal ──────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// ── Contact Form Submit ────────────────────────────────────
function submitForm() {
  const fname = document.getElementById('fname').value.trim();
  const email = document.getElementById('email').value.trim();
  if (!fname || !email) {
    alert('Please fill in your name and email.');
    return;
  }
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

// ── Before / After Sliders ─────────────────────────────────
document.querySelectorAll('.ba-slider').forEach(slider => {
  const beforeWrap = slider.querySelector('.ba-before-wrap');
  const handle     = slider.querySelector('.ba-handle');
  let dragging = false;

  function setPosition(x) {
    const rect = slider.getBoundingClientRect();
    let pct = (x - rect.left) / rect.width;
    pct = Math.min(Math.max(pct, 0.02), 0.98);
    beforeWrap.style.width = (pct * 100) + '%';
    handle.style.left      = (pct * 100) + '%';
  }

  // Mouse
  slider.addEventListener('mousedown',  e => { dragging = true; setPosition(e.clientX); });
  window.addEventListener('mousemove',  e => { if (dragging) setPosition(e.clientX); });
  window.addEventListener('mouseup',    ()  => { dragging = false; });

  // Touch
  slider.addEventListener('touchstart', e => { dragging = true; setPosition(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('touchmove',  e => { if (dragging) setPosition(e.touches[0].clientX); },  { passive: true });
  window.addEventListener('touchend',   ()  => { dragging = false; });
});