// ==============================
//  NAVBAR — shadow on scroll
// ==============================
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ==============================
//  TIMELINE — reveal on scroll
// ==============================
const tlItems = document.querySelectorAll('.tl-item');
if (tlItems.length) {
  const tlObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 130);
        tlObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  tlItems.forEach(el => tlObs.observe(el));
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

// ==============================
//  SKILL CARDS — staggered reveal
// ==============================
const skillCards = document.querySelectorAll('.skill-card');
if (skillCards.length) {
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (i * 60) + 'ms';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        skillObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(18px)';
    card.style.transition = 'opacity .45s, transform .45s';
    skillObs.observe(card);
  });
}