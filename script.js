/* =============================================
   SCRIPT.JS — Full Site Interactivity
   ============================================= */

// ── Utility: query helpers ──────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/* =============================================
   1. DARK MODE TOGGLE
   ============================================= */
const themeToggle = $('#theme-toggle');
const themeIcon   = themeToggle.querySelector('.theme-icon');

// Load saved preference, default to light
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeIcon.textContent = next === 'dark' ? '☀️' : '🌙';
});

/* =============================================
   2. NAVBAR — scroll effect + active link
   ============================================= */
const navbar = $('#navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNavLink();
  toggleBackToTop();
});

function updateActiveNavLink() {
  const sections = $$('section[id]');
  const scrollY  = window.scrollY + 100;

  sections.forEach((section) => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = $(`.nav-links a[href="#${id}"]`);

    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

/* =============================================
   3. MOBILE HAMBURGER MENU
   ============================================= */
const hamburger = $('#hamburger');
const navLinks  = $('#nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

/* =============================================
   4. TYPEWRITER EFFECT (Hero roles)
   ============================================= */
const roles    = ['Frontend Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Open Source Fan'];
const roleEl   = $('#role-text');
let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;
let typingPaused = false;

function typeWriter() {
  if (typingPaused) return;

  const current = roles[roleIndex];

  if (isDeleting) {
    roleEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    roleEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === current.length) {
    // Pause at end of word
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex  = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  setTimeout(typeWriter, delay);
}

typeWriter();

/* =============================================
   5. SCROLL REVEAL ANIMATION
   ============================================= */
const revealEls = $$('.section-title, .section-subtitle, .about-grid, .about-facts, .skills-categories, .project-card, .contact-grid, .about-card');

// Add reveal class to all target elements
revealEls.forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => revealObserver.observe(el));

/* =============================================
   6. SKILL BAR ANIMATION
   ============================================= */
const skillBars = $$('.skill-bar-fill');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute('data-width');
        entry.target.style.width = targetWidth + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

skillBars.forEach((bar) => skillObserver.observe(bar));

/* =============================================
   7. PROJECT FILTER
   ============================================= */
const filterBtns   = $$('.filter-btn');
const projectCards = $$('.project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const show     = filter === 'all' || category === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

/* =============================================
   8. CONTACT FORM — Validation & Submission
   ============================================= */
const form        = $('#contact-form');
const formSuccess = $('#form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fields = [
    { id: 'name',    errorId: 'name-error',    label: 'Name',    validate: (v) => v.trim().length >= 2 },
    { id: 'email',   errorId: 'email-error',   label: 'Email',   validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    { id: 'subject', errorId: 'subject-error', label: 'Subject', validate: (v) => v.trim().length >= 3 },
    { id: 'message', errorId: 'message-error', label: 'Message', validate: (v) => v.trim().length >= 10 },
  ];

  let isValid = true;

  fields.forEach(({ id, errorId, label, validate }) => {
    const input    = $(`#${id}`);
    const errorEl  = $(`#${errorId}`);
    const value    = input.value;

    if (!value.trim()) {
      showError(input, errorEl, `${label} is required.`);
      isValid = false;
    } else if (!validate(value)) {
      const msg = id === 'email'
        ? 'Please enter a valid email address.'
        : `${label} is too short.`;
      showError(input, errorEl, msg);
      isValid = false;
    } else {
      clearError(input, errorEl);
    }
  });

  if (!isValid) return;

  // Simulate form submission
  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled    = true;

  setTimeout(() => {
    form.reset();
    formSuccess.classList.add('show');
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled    = false;

    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});

function showError(input, errorEl, message) {
  input.classList.add('error');
  errorEl.textContent = message;
}

function clearError(input, errorEl) {
  input.classList.remove('error');
  errorEl.textContent = '';
}

// Clear error on input
$$('.contact-form input, .contact-form textarea').forEach((input) => {
  input.addEventListener('input', () => {
    input.classList.remove('error');
    const errorEl = $(`#${input.id}-error`);
    if (errorEl) errorEl.textContent = '';
  });
});

/* =============================================
   9. BACK TO TOP BUTTON
   ============================================= */
const backToTopBtn = $('#back-to-top');

function toggleBackToTop() {
  backToTopBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
  backToTopBtn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
}

// Initial state
backToTopBtn.style.opacity = '0';
backToTopBtn.style.transition = 'opacity 0.3s ease';
backToTopBtn.style.pointerEvents = 'none';

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =============================================
   10. SMOOTH SCROLL for anchor links
   ============================================= */
$$('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = $(targetId);
    if (!target) return;

    e.preventDefault();
    const offset = target.offsetTop - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || 70);
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});

/* =============================================
   11. ANIMATE FACT NUMBERS (count up)
   ============================================= */
const factNumbers = $$('.fact-number');

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el  = entry.target;
        const raw = el.textContent.trim();

        // Only animate pure numbers
        const num = parseInt(raw);
        if (isNaN(num)) return;

        const suffix = raw.replace(String(num), '');
        let current  = 0;
        const step   = Math.ceil(num / 30);

        const counter = setInterval(() => {
          current += step;
          if (current >= num) {
            el.textContent = num + suffix;
            clearInterval(counter);
          } else {
            el.textContent = current + suffix;
          }
        }, 40);

        countObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

factNumbers.forEach((el) => countObserver.observe(el));

/* =============================================
   12. KEYBOARD ACCESSIBILITY
   ============================================= */
// Close mobile menu on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  }
});
