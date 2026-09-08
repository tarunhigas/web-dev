# WORK.md — Project Documentation

## Project: Personal Portfolio Website

**Built with:** Vanilla HTML5, CSS3, JavaScript (ES6+)  
**Author:** Alex Chen  
**Submitted for:** First Year Web Development Assignment

---

## Overview

A fully functional, responsive personal portfolio website built from scratch using only HTML, CSS, and JavaScript — no frameworks, no libraries, no build tools. The goal was to demonstrate a strong understanding of core web development fundamentals across three domains: structure, styling, and interactivity.

---

## File Structure

```
web-dev/
├── index.html    — Page structure and content
├── style.css     — All styling, layout, and animations
├── script.js     — All interactivity and dynamic behaviour
└── WORK.md       — This file
```

---

## What Was Built

### 1. `index.html` — Semantic Page Structure

- **Navbar** with logo, navigation links, dark mode toggle, and hamburger menu for mobile
- **Hero section** with name, animated typewriter role text, bio, CTA buttons, floating avatar, and animated badges
- **About section** with bio text, quick-info card, and animated fact counters
- **Skills section** with animated progress bars (frontend skills) and tag pills (tools)
- **Projects section** with 6 project cards and a category filter bar (All / Web / Tools / UI)
- **Contact section** with contact info links and a validated contact form
- **Footer** with nav links and a back-to-top button
- Proper semantic tags used throughout: `<nav>`, `<section>`, `<footer>`, `<form>`, `<label>`, `<main>`
- `aria-label` and `aria-expanded` attributes added for accessibility

---

### 2. `style.css` — Responsive Design & Animations

#### Design System
- CSS custom properties (variables) used for the entire design system — colors, shadows, spacing, typography, border-radius, and transitions
- Two complete themes defined: **light mode** and **dark mode**, toggled via `[data-theme="dark"]` on the root element

#### Layout
- CSS Grid used for hero, about, skills, and contact sections
- Flexbox used for navbar, buttons, tags, footer, and inline components
- `clamp()` used for fluid font sizes that scale with viewport width
- `minmax()` and `auto-fill` used for the responsive project card grid

#### Responsive Breakpoints
- **≤ 900px (tablet):** Hero switches to single column, about/skills/contact stack vertically, floating badges hidden
- **≤ 640px (mobile):** Hamburger menu replaces nav links, avatar shrinks, project grid goes single column

#### Animations & Effects
- `@keyframes` animations: `fadeInLeft`, `fadeInRight`, `fadeInUp`, `fadeIn`, `float`, `scrollBounce`, `blink`
- `.reveal` class + `.visible` toggled by IntersectionObserver for scroll-triggered entrance animations
- Skill bars animate width from 0 to target percentage when scrolled into view
- Floating hero badges use staggered `animation-delay` for a natural feel
- Hover effects on cards, buttons, tags, nav links, and contact items
- Gradient text on the hero name using `background-clip: text`

---

### 3. `script.js` — JavaScript Features

#### 1. Dark Mode Toggle
- Reads saved preference from `localStorage` on page load
- Toggles `data-theme` attribute on `<html>` and saves new preference
- Icon switches between 🌙 and ☀️

#### 2. Navbar Scroll Behaviour
- Adds `.scrolled` class (background + shadow) after scrolling 50px
- Highlights the correct nav link as the user scrolls through sections using `offsetTop` calculations

#### 3. Mobile Hamburger Menu
- Toggles `.open` class on nav links and hamburger icon
- Animates hamburger spans into an × icon using CSS transforms
- Closes automatically when a nav link is clicked
- Closes on `Escape` key press (keyboard accessibility)

#### 4. Typewriter Effect
- Cycles through an array of role strings
- Uses a recursive `setTimeout` state machine with separate type/delete speeds
- Pauses at the end of each word before deleting
- Blinking cursor implemented with a CSS `@keyframes` animation

#### 5. Scroll Reveal (IntersectionObserver)
- All major section elements start invisible (`opacity: 0`, `translateY(30px)`)
- `IntersectionObserver` watches each element and adds `.visible` when 12% is in view
- Each element animates once then is unobserved (no re-triggering)

#### 6. Skill Bar Animation
- `IntersectionObserver` triggers CSS width transition on `.skill-bar-fill` elements
- Width value read from `data-width` attribute, applied via JavaScript when in viewport

#### 7. Project Filter
- Filter buttons read `data-filter` attribute
- Cards are shown/hidden by toggling a `.hidden` class based on their `data-category`
- Active button state managed by removing/adding `.active` class

#### 8. Contact Form Validation
- Client-side validation on all four fields (name, email, subject, message)
- Email validated with a regex pattern
- Per-field error messages displayed beneath each input
- Errors cleared as the user types (live feedback)
- On valid submit: button shows "Sending..." state for 1.2s (simulated async), then form resets and a success banner appears

#### 9. Back to Top Button
- Opacity and `pointer-events` toggled based on scroll position (appears after 400px)
- Smooth scroll to top on click

#### 10. Smooth Scroll
- All `<a href="#...">` anchor links use `scrollTo` with `behavior: 'smooth'`
- Offset calculated to account for the fixed navbar height using CSS variable value

#### 11. Count-Up Animation (Fact Numbers)
- `IntersectionObserver` triggers a `setInterval` counter on each `.fact-number`
- Counts from 0 to the target number, then stops cleanly
- Non-numeric values (like "1st") are skipped

#### 12. Keyboard Accessibility
- `Escape` key closes the mobile menu
- All interactive elements are natively focusable
- `aria-label` on icon-only buttons, `aria-expanded` on hamburger toggle

---

## Key Concepts Demonstrated

| Concept | Where Used |
|---|---|
| CSS Variables | Entire design system, dark mode |
| CSS Grid | Hero, About, Skills, Contact layouts |
| Flexbox | Navbar, buttons, footer, tags |
| Responsive Design | Media queries at 900px and 640px |
| CSS Animations | Hero float, scroll reveal, typewriter cursor |
| IntersectionObserver API | Scroll reveal, skill bars, count-up |
| localStorage | Dark mode persistence |
| DOM Manipulation | Filter, form, nav, theme |
| Event Listeners | scroll, click, keydown, input, submit |
| Form Validation | Contact form with regex + live feedback |
| Accessibility | ARIA attributes, keyboard navigation |

---

## Improvements Over a Basic Implementation

1. **No frameworks** — everything built with native browser APIs to show deep understanding
2. **Performance** — `IntersectionObserver` used instead of scroll event listeners for animations (far more efficient)
3. **Accessibility** — ARIA roles, keyboard support, and semantic HTML throughout
4. **Dark mode** with persistence — not just a visual trick, state survives page reload
5. **Form UX** — per-field validation with live clearing, not just a single alert on submit
6. **Responsive at every breakpoint** — tested at mobile, tablet, and desktop widths
7. **CSS custom properties** — makes theming and maintenance clean and scalable
