// ==============================
//  PREMIUM ANIMATIONS
// ==============================
const animateOnScroll = (selector, options = {}) => {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = options.stagger ? i * (options.staggerDelay || 80) : 0;
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
    observer.observe(el);
  });
};

// Cards reveal
animateOnScroll('.skill-card', { stagger: true, staggerDelay: 80 });
animateOnScroll('.tl-item', { stagger: true, staggerDelay: 120 });
animateOnScroll('.formation-card', { stagger: true, staggerDelay: 100 });

// Hero text reveal (immediate on load)
window.addEventListener('DOMContentLoaded', () => {
  const heroElements = document.querySelectorAll('.hero-right > *');
  heroElements.forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 120);
  });
});

// ==============================
//  NAVBAR — shadow on scroll
// ==============================
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ==============================
//  HERO — parallax effect
// ==============================
const heroGlow = document.querySelector('.hero-bg-glow');
window.addEventListener('scroll', () => {
  if (heroGlow) {
    const scrolled = window.scrollY;
    heroGlow.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0005})`;
  }
}, { passive: true });

// ==============================
//  ACTIVE NAV LINK highlight
// ==============================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 90) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });