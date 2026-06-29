// ==============================================
//  GESTION DE LA NAVIGATION (Changement au Scroll)
// ==============================================
const nav = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ==============================================
//  EFFET PARALLAX INTERACTIF (Section Hero)
// ==============================================
const heroSection = document.getElementById('hero');
const glowBg = document.querySelector('.hero-bg-glow');

if (heroSection && glowBg) {
  heroSection.addEventListener('mousemove', (e) => {
    const bounds = heroSection.getBoundingClientRect();
    // Calcul de la position relative de la souris (-0.5 à 0.5)
    const relativeX = (e.clientX - bounds.left) / bounds.width - 0.5;
    const relativeY = (e.clientY - bounds.top) / bounds.height - 0.5;
    
    // Déplacement fluide de l'effet lumineux en arrière-plan
    glowBg.style.transform = `translate(${relativeX * 60}px, ${relativeY * 60}px)`;
  });
  
  // Réinitialisation de la position lorsque la souris quitte la zone
  heroSection.addEventListener('mouseleave', () => {
    glowBg.style.transform = 'translate(0px, 0px)';
  });
}

// ==============================================
//  MISE EN VALEUR DES LIENS ACTIFS DANS LE MENU
// ==============================================
const trackedSections = document.querySelectorAll('section[id]');
const menuLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let currentSectionId = '';
  
  trackedSections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    // On considère la section active lorsqu'on se trouve à son tiers supérieur
    if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
      currentSectionId = section.getAttribute('id');
    }
  });

  menuLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
});