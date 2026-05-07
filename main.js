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

// ── Before / After Flip ────────────────────────────────────
function flipCard(btn, direction) {
  const flip   = btn.closest('.ba-flip');
  const images = flip.querySelectorAll('.ba-img');
  const label  = flip.querySelector('.ba-current-label');
  const labels = ['Before', 'After'];

  let current = [...images].findIndex(img => img.classList.contains('active'));
  images[current].classList.remove('active');

  let next = (current + direction + images.length) % images.length;
  images[next].classList.add('active');

  label.textContent = labels[next];
}

reveals.forEach(el => el.classList.add('visible'));