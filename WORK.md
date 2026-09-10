# WORK.md — Project Documentation

## Project: Personal Portfolio Website

**Built with:** Vanilla HTML5, CSS3, JavaScript (ES6+)  
**Author:** S Tarunhiga  
**Submitted for:** First Year Web Development Assignment

---

## Overview

A fully functional, responsive personal portfolio website built from scratch using only HTML, CSS, and JavaScript — no frameworks, no libraries, no build tools. The portfolio includes 6 working sub-projects, each as a standalone page linked from the Projects section.

---

## File Structure

```
web-dev/
├── index.html              — Main portfolio page
├── style.css               — All styling and layout
├── script.js               — All interactivity
├── WORK.md                 — This file
└── projects/
    ├── ecommerce.html      — E-Commerce Landing Page
    ├── taskmanager.html    — Task Manager App
    ├── weather.html        — Weather Dashboard
    ├── blog.html           — Blog Platform UI
    ├── calculator.html     — Scientific Calculator
    └── cssshowcase.html    — CSS Animation Showcase
```

---

## Main Portfolio — `index.html`

### Sections

- **Navbar** — logo, navigation links, dark mode toggle, hamburger menu for mobile
- **Hero** — name, static role text, bio, CTA buttons, avatar graphic
- **About** — personal bio, quick-info card (degree, location, email, languages)
- **Skills** — progress bars for HTML/CSS/JS/Responsive Design; tag pills for tools
- **Projects** — 6 cards with category filter (All / Web / Tools / UI), each with a working Live Demo link
- **Contact** — contact info links + validated contact form
- **Footer** — nav links and back-to-top button

### `style.css`

- CSS custom properties for the full design system (colors, shadows, spacing, typography)
- Light and dark themes via `[data-theme="dark"]` on the root element
- CSS Grid for hero, about, skills, and contact layouts
- Flexbox for navbar, buttons, tags, and footer
- `clamp()` for fluid font sizes; `minmax()` + `auto-fill` for responsive project grid
- Responsive breakpoints at 900px (tablet) and 640px (mobile)
- No animations or transitions — clean, static styling throughout

### `script.js`

1. **Dark Mode Toggle** — reads/saves preference in `localStorage`, toggles `data-theme` on `<html>`
2. **Navbar Active Link** — highlights the current section's nav link on scroll using `offsetTop`
3. **Mobile Hamburger Menu** — toggles nav open/close, closes on link click and `Escape` key
4. **Project Filter** — shows/hides cards by toggling `.hidden` based on `data-category`
5. **Contact Form Validation** — validates all 4 fields with per-field errors and live clearing; simulated async submit
6. **Back to Top Button** — appears after 400px scroll, smooth scrolls to top
7. **Smooth Scroll** — all anchor links offset-corrected for the fixed navbar height
8. **Keyboard Accessibility** — `Escape` closes the mobile menu

---

## Sub-Projects

### 1. E-Commerce Landing Page (`projects/ecommerce.html`)

A product listing page for a fictional store called ShopZone.

**Features:**
- 8 products across 3 categories (Clothing, Electronics, Accessories)
- Category filter chips
- Add to Cart functionality with live cart count in the navbar
- Slide-in cart sidebar with quantity controls (+ / −) and item removal
- Checkout simulation with toast notification
- NEW / SALE badges on product cards
- Fully responsive grid

**Concepts:** DOM manipulation, array state management, dynamic rendering, event delegation

---

### 2. Task Manager App (`projects/taskmanager.html`)

A to-do app with `localStorage` persistence.

**Features:**
- Add tasks with title, priority (High / Medium / Low), and optional due date
- Edit existing tasks inline
- Mark tasks as done (strikethrough + opacity)
- Delete tasks
- Filter by All / Active / Done / High priority
- Live search
- Overdue date detection (highlighted in red)
- Progress bar showing % of tasks completed
- Stats counter (total / done / pending)
- Seeded with 3 sample tasks on first load

**Concepts:** localStorage, CRUD operations, date comparison, IntersectionObserver-free state rendering

---

### 3. Weather Dashboard (`projects/weather.html`)

A weather UI with simulated data for 5 Indian cities (no API key required).

**Features:**
- Current conditions: temperature, feels like, humidity, wind, visibility
- 5-day forecast with weather emoji and high/low temps
- UV index, atmospheric pressure, sunrise/sunset
- City search by name
- Quick-switch city chips
- Dark glassmorphism UI with gradient background

**Cities:** Hyderabad, Mumbai, Delhi, Bangalore, Chennai

**Concepts:** Data-driven rendering, conditional styling, search filtering

---

### 4. Blog Platform UI (`projects/blog.html`)

A blog UI with readable sample articles.

**Features:**
- Featured post card + grid of remaining posts
- 5 sample articles on JavaScript, CSS, Git, HTML, and career topics
- Tag-based filtering (JavaScript / CSS / Git / HTML / Career)
- Live search across titles and excerpts
- Click-to-read modal with full article content
- Sidebar with trending posts and tag cloud
- Dark mode toggle (independent from portfolio)

**Concepts:** Modal UI, search + filter composition, dynamic rendering, theme toggling

---

### 5. Scientific Calculator (`projects/calculator.html`)

A fully functional calculator with scientific functions.

**Features:**
- Basic operations: +, −, ×, ÷, %
- Scientific: sin, cos, tan, log, ln, √, |x|, xʸ, π, e
- DEG / RAD mode toggle
- Live expression preview in the display
- Calculation history panel (last 20, clickable to reuse)
- Clear history button
- Full keyboard support (0–9, operators, Enter, Backspace, Escape)
- Expression evaluated using `Function()` with safe symbol substitution

**Concepts:** Expression parsing, `Function()` eval pattern, keyboard events, state history

---

### 6. CSS Animation Showcase (`projects/cssshowcase.html`)

A visual demo of pure CSS techniques, with minimal JS only for particle spawning.

**Sections:**

| Category | Demos |
|---|---|
| Loading Animations | Spinner, Bouncing Dots, Progress Bar, Skeleton Screen, Pulse Ring, SVG Ring |
| Button Hover Effects | Lift + Shadow, Background Fill, Neon Glow, Slide Background, Scale Pop, Animated Gradient Border |
| Card Effects | 3D Tilt, Flip Card (front/back), Reveal Overlay |
| Text Effects | Gradient Text, Glitch on Hover, Typewriter Loop, Pulsing Neon |
| Animated Backgrounds | Shifting Gradient, Scrolling Stripes, Floating Particles |

**Concepts:** `@keyframes`, CSS transforms, `::before`/`::after` pseudo-elements, `animation-delay`, SVG stroke animation, `perspective`/`rotateY` for 3D, `background-clip: text`

---

## Key Concepts Demonstrated Across All Files

| Concept | Where Used |
|---|---|
| CSS Variables | Full design system, dark mode |
| CSS Grid | Portfolio layout, product grid, forecast grid |
| Flexbox | Navbar, buttons, footer, tags, form rows |
| Responsive Design | Media queries at 900px and 640px throughout |
| localStorage | Dark mode persistence, task manager data |
| DOM Manipulation | Filter, form, nav, cart, tasks, calculator |
| Event Listeners | scroll, click, keydown, input, submit |
| Form Validation | Contact form + task inputs with live feedback |
| Accessibility | ARIA attributes, keyboard navigation, semantic HTML |
| CSS Animations | Showcase page — loaders, hovers, cards, text, backgrounds |
| Expression Evaluation | Calculator using `Function()` with safe substitution |
| Data-driven Rendering | Products, tasks, weather, blog posts all rendered from JS arrays |

---

## Notes

- No frameworks, no libraries, no build tools anywhere in the project
- All 6 sub-projects are self-contained single HTML files
- Each sub-project includes a "← Back to Portfolio" link
- Weather dashboard uses mock data — no API key or network request needed
- Task manager data persists across page reloads via `localStorage`
