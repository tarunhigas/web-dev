/* =============================================
   SCRIPT.JS — Site Interactivity
   ============================================= */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/* =============================================
   1. DARK MODE TOGGLE
   ============================================= */
const themeToggle = $('#theme-toggle');
const themeIcon   = themeToggle.querySelector('.theme-icon');

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
   2. NAVBAR — active link on scroll
   ============================================= */
const navbar = $('#navbar');

window.addEventListener('scroll', () => {
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

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

/* =============================================
   4. PROJECT FILTER
   ============================================= */
const filterBtns   = $$('.filter-btn');
const projectCards = $$('.project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      card.classList.toggle('hidden', filter !== 'all' && category !== filter);
    });
  });
});

/* =============================================
   5. CONTACT FORM — Validation & Submission
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
    const input   = $(`#${id}`);
    const errorEl = $(`#${errorId}`);
    const value   = input.value;

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

$$('.contact-form input, .contact-form textarea').forEach((input) => {
  input.addEventListener('input', () => {
    input.classList.remove('error');
    const errorEl = $(`#${input.id}-error`);
    if (errorEl) errorEl.textContent = '';
  });
});

/* =============================================
   6. BACK TO TOP BUTTON
   ============================================= */
const backToTopBtn = $('#back-to-top');

backToTopBtn.style.opacity        = '0';
backToTopBtn.style.pointerEvents  = 'none';

function toggleBackToTop() {
  backToTopBtn.style.opacity       = window.scrollY > 400 ? '1' : '0';
  backToTopBtn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
}

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =============================================
   7. SMOOTH SCROLL for anchor links
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
   8. KEYBOARD ACCESSIBILITY
   ============================================= */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  }
});
