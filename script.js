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
//  HERO — mouse parallax effect
// ==============================
const hero = document.querySelector('#hero');
const heroGlow = document.querySelector('.hero-bg-glow');
const heroNameBlock = document.querySelector('.hero-name-block');

if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    if (heroGlow) {
      heroGlow.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
    }
    if (heroNameBlock) {
      heroNameBlock.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
    }
  });
  
  hero.addEventListener('mouseleave', () => {
    if (heroGlow) heroGlow.style.transform = '';
    if (heroNameBlock) heroNameBlock.style.transform = '';
  });
}

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