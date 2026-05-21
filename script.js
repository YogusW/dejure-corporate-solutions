/* ═══════════════════════════════════════════════════════
   DEJURE CORPORATE SOLUTION — script.js
   Works across index.html · about.html · team.html
                · practice.html · industries.html
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════
   NAV SCROLL EFFECT
══════════════════════ */
const navbar = document.getElementById('navbar');

function handleNavScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

const currentPage = document.body.dataset.page || 'home';
if (currentPage === 'home') {
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();
}


/* ══════════════════════
   HAMBURGER / MOBILE MENU
══════════════════════ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function closeMobileMenu() {
  if (hamburger)  hamburger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});


/* ══════════════════════
   SMOOTH SCROLL for same-page anchors
══════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = link.getAttribute('href');
    const el = document.querySelector(target);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    }
  });
});


/* ══════════════════════
   INTERSECTION OBSERVER — REVEAL
══════════════════════ */
function observeReveals() {
  const revealEls = document.querySelectorAll('.reveal:not(.visible)');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}
observeReveals();


/* ══════════════════════
   HERO CARDS — staggered entrance (index.html only)
══════════════════════ */
const heroCards = document.querySelectorAll('.hero-card');
if (heroCards.length) {
  heroCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      card.style.opacity    = '1';
      card.style.transform  = 'translateY(0)';
    }, 600 + i * 100);
  });
}


/* ══════════════════════
   WHY CARDS — staggered entrance
══════════════════════ */
const whyGrid = document.querySelector('.why-grid');
if (whyGrid) {
  const whyCards = whyGrid.querySelectorAll('.why-card');
  whyCards.forEach(card => {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.35s, background 0.35s';
  });

  const whyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.why-card');
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.style.opacity   = '1';
            card.style.transform = 'translateY(0)';
          }, i * 90);
        });
        whyObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  whyObserver.observe(whyGrid);
}


/* ══════════════════════
   SERVICES LIST — slide-in entrance
══════════════════════ */
const srvList = document.querySelector('.services-list');
if (srvList) {
  const srvObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('li');
        items.forEach((item, i) => {
          item.style.opacity    = '0';
          item.style.transform  = 'translateX(-16px)';
          item.style.transition = `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`;
          setTimeout(() => {
            item.style.opacity   = '1';
            item.style.transform = 'translateX(0)';
          }, 50);
        });
        srvObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  srvObserver.observe(srvList);
}


/* ══════════════════════
   INDUSTRY CARDS — subtle 3D tilt (home page)
══════════════════════ */
document.querySelectorAll('.ind-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x    = (e.clientX - rect.left)  / rect.width  - 0.5;
    const y    = (e.clientY - rect.top)   / rect.height - 0.5;
    card.style.transform = `perspective(400px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
    setTimeout(() => { card.style.transition = ''; }, 400);
  });
});


/* ══════════════════════
   PRACTICE ITEM — hover bg tint (home page)
══════════════════════ */
document.querySelectorAll('.practice-item').forEach(item => {
  item.addEventListener('mouseenter', () => { item.style.background = 'rgba(182,62,61,0.02)'; });
  item.addEventListener('mouseleave', () => { item.style.background = ''; });
});


/* ══════════════════════
   TEAM / FT CARD — hover border tint
══════════════════════ */
document.querySelectorAll('.tp-card, .ft-card').forEach(card => {
  card.addEventListener('mouseenter', () => { card.style.borderColor = 'rgba(182,62,61,0.25)'; });
  card.addEventListener('mouseleave', () => { card.style.borderColor = ''; });
});


/* ══════════════════════
   CONTACT FORM SUBMIT — generic handler
══════════════════════ */
function attachFormHandler(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn          = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent   = 'Sending…';
    btn.disabled      = true;
    btn.style.opacity = '0.7';

    setTimeout(() => {
      btn.textContent      = '✓ Enquiry Received';
      btn.style.background = '#8a2d2d';

      let successMsg = form.querySelector('.form-success');
      if (!successMsg) {
        successMsg             = document.createElement('p');
        successMsg.className   = 'form-success';
        successMsg.textContent = 'Thank you for your enquiry. Our team will be in touch within one business day.';
        form.appendChild(successMsg);
      }
      successMsg.classList.add('show');

      setTimeout(() => {
        form.reset();
        btn.textContent      = originalText;
        btn.disabled         = false;
        btn.style.opacity    = '';
        btn.style.background = '';
        successMsg.classList.remove('show');
      }, 4000);
    }, 1200);
  });
}

attachFormHandler('contactForm');
attachFormHandler('aboutContactForm');
attachFormHandler('practiceContactForm');


/* ══════════════════════
   SCROLL-BASED NAV HIGHLIGHT (index.html)
══════════════════════ */
if (currentPage === 'home') {
  const observedSections = ['home', 'practice', 'contact'];
  const sectionObserver  = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id         = entry.target.id;
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) {
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  observedSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });
}


/* ══════════════════════
   COUNTER ANIMATION (index.html stat cards)
══════════════════════ */
function animateCounter(el, target, suffix = '', duration = 1800) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
      return;
    }
    el.textContent = Math.floor(start) + suffix;
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const val    = el.dataset.val;
      const suffix = el.dataset.suffix || '';
      if (val) animateCounter(el, parseInt(val), suffix);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-val]').forEach(el => statObserver.observe(el));


/* ══════════════════════
   INDUSTRIES PAGE — sidebar active state on scroll
══════════════════════ */
if (currentPage === 'industries') {
  const sidebarLinks = document.querySelectorAll('.ind-sidebar-nav a');
  const sidebar      = document.querySelector('.ind-sidebar');
  const sectorIds    = ['it-sector', 'real-estate', 'health-medical', 'food-hospitality', 'fmcg', 'financial', 'cosmetics'];

  const sectorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sidebarLinks.forEach(a => a.classList.remove('active'));
        const match = document.querySelector(`.ind-sidebar-nav a[href="#${entry.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sectorIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) sectorObserver.observe(el);
  });

  // Fade sidebar out when contact section enters view
  const contactSection = document.getElementById('contact');
  if (contactSection && sidebar) {
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        sidebar.style.opacity       = entry.isIntersecting ? '0' : '1';
        sidebar.style.pointerEvents = entry.isIntersecting ? 'none' : '';
      });
    }, { threshold: 0.05 });
    contactObserver.observe(contactSection);
  }
}


/* ══════════════════════
   PRACTICE PAGE — PA card entrance animation
══════════════════════ */
if (currentPage === 'practice') {
  const paCards = document.querySelectorAll('.pa-card');
  if (paCards.length) {
    const paObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          paObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

    paCards.forEach((card, i) => {
      card.style.opacity    = '0';
      card.style.transform  = 'translateY(32px)';
      card.style.transition = `opacity 0.65s ease ${i * 0.08}s, transform 0.65s ease ${i * 0.08}s`;
      paObserver.observe(card);
    });
  }
}

/* ══════════════════════
   CONTACT PAGE — contact.html
   Attach form handler for the full contact page form
══════════════════════ */
attachFormHandler('contactPageForm');
 
 
/* ══════════════════════
   CONTACT PAGE  (contact.html)
══════════════════════ */
attachFormHandler('contactPageForm');