# Accessible Personal Portfolio Website

A modern, fully responsive, multi-page Personal Portfolio Website for NItesh Mangtani. This project strictly follows semantic HTML5 standards, WCAG 2.1 accessibility guidelines, and search engine optimization (SEO) best practices. Built from the ground up using only HTML5, CSS3, and JavaScript, the website features a rich visual design, smooth micro-animations, and complete keyboard/screen-reader compatibility.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Pages Included](#pages-included)
3. [Key Features](#key-features)
4. [Technologies Used](#technologies-used)
5. [Accessibility Implementation (WCAG 2.1)](#accessibility-implementation-wcag-21)
6. [SEO Implementation](#seo-implementation)
7. [Setup & Running Locally](#setup--running-locally)
8. [Folder Structure](#folder-structure)

---

## Project Overview

This portfolio is designed to showcase the work, skills, and resume of NItesh Mangtani, a Front-End Developer and Computer Science student. It is built as a lightweight, high-performance static website without external UI frameworks or heavy libraries.

### Design Aesthetics:
- **HSL Colors**: Built with a curated color system tailored for light and dark modes.
- **Glassmorphism**: Soft shadows, rounded borders, and frosted-glass card overlays.
- **Micro-Animations**: Shimmer progress bars, float animation rings, active counter systems, and typing animation loops.

---

## Pages Included

1. **Home (`index.html`)**:
   - Hero section with availability badge and dynamic typing animation.
   - Profile picture with a spinning gradient outline and floating tech icons.
   - Quick stats counters (e.g., Projects Built, Skills Mastered, Years Learning).
   - Social media connection panel.
   - Featured projects preview.
2. **About Me (`about.html`)**:
   - Detailed biography.
   - Interactive sticky sidebar with quick facts.
   - Education and professional experience timeline.
   - Core career goals and personal interest tags.
3. **Skills (`skills.html`)**:
   - Progress bars displaying proficiency ratings for HTML5, CSS3, JS, Java, Python, and MySQL.
   - Skill fills animate dynamically when they enter the viewport using intersection observers.
   - Grid showing the tools and ecosystems used (VS Code, Git, GitHub, Figma, DevTools).
4. **Projects (`projects.html`)**:
   - Project cards displaying:
     1. **AI Assistant** (Python, MySQL, JS, CSS, HTML)
     2. **Notes Tracker** (MySQL, JS, CSS, HTML)
     3. **Medication Adherence Assistant** (MySQL, JS, CSS, HTML)
   - Dynamic tag search filter ("All", "Web Apps", "Healthcare", "Python") supporting smooth transitions and ARIA accessibility updates.
5. **Resume (`resume.html`)**:
   - Complete digital CV layout.
   - Education and work details.
   - Technical certifications and soft skills cards.
   - Accessible download button for the PDF resume.
6. **Contact Me (`contact.html`)**:
   - Personal email, phone, and location widgets.
   - Validation-ready form matching custom regular expressions for email and string lengths.
   - Real-time blur validation and screen-reader accessible error messages.

---

## Key Features

- **Dark/Light Mode Toggle**: High-contrast theme options saved to the user's Local Storage for persistence.
- **Sticky Navigation**: Slim navbar that collapses, adds a blur filter, and darkens slightly as the user scrolls.
- **Mobile Menu**: Responsive sliding sidebar with full keyboard trap support (closes with the Escape key or clicks outside).
- **Typing Animation**: Cyclic typing effect representing role descriptors, configured to not interrupt screen reader accessibility.
- **Scroll-to-Top Button**: Smooth scroll back to top button with fade-in visibility thresholds.
- **Scroll Reveal**: Entrance animations that trigger when content enters the viewport (deactivated automatically for users with `prefers-reduced-motion` enabled).
- **Active Navigation Highlighting**: Links indicate the current active page using the `aria-current="page"` attribute.

---

## Technologies Used

- **Markup**: Semantic HTML5
- **Styling**: Vanilla CSS3 (Variables, Flexbox, Grid, Keyframes, Backdrop Filters)
- **Scripting**: Vanilla ECMAScript 6+ (IntersectionObserver, LocalStorage, Custom Animations)
- **Font Face**: Google Fonts (Poppins & Inter)

---

## Accessibility Implementation (WCAG 2.1)

- **Skip Link**: A "Skip to main content" link is positioned at the top of every page for keyboard-only and screen reader users to skip headers.
- **Semantic Structure**: Proper nested heading hierarchy (`h1` through `h6`) and appropriate landmark tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<address>`).
- **Keyboard Interactivity**: Complete site can be navigated using `Tab` and `Shift + Tab`.
- **Visible Focus States**: High-contrast `:focus-visible` outline styles are applied to all links, buttons, and form inputs.
- **ARIA Attributes**:
  - Main nav lists use `role="list"`.
  - Social media and filter links open external sites with meaningful descriptions (e.g., `aria-label="GitHub profile (opens in new tab)"`).
  - Mobile toggles utilize `aria-expanded` and `aria-controls`.
  - Project filters utilize `aria-selected` and update `aria-hidden` attributes on filtered cards.
- **Accessible Forms**: Form inputs use matching `<label>` elements rather than relying solely on placeholders.
- **Live Regions**: Form validation errors and submission notifications use `role="alert"` and `aria-live="assertive"`. Focus is automatically shifted to error or success states on trigger.
- **Color Contrast**: Complies with the WCAG AA minimum contrast ratio of 4.5:1 for body text.

---

## SEO Implementation

- **Descriptive Titles**: Unique, context-relevant titles for every page.
- **Meta Descriptions**: Targeted descriptions outlining what the user will find on each specific page.
- **Structured Meta Data**: Includes viewport tags, keywords, author references, and search robot directives (`index, follow`).
- **Canonical URLs**: Canonical link tags point search engine indexes to the authoritative version of the page.
- **Open Graph (OG)**: Configuration tags (image, description, site name, URL) for structured rendering on Facebook, Slack, and Discord.
- **Twitter Cards**: Summary card configuration for link presentation on Twitter.

---

## Setup & Running Locally

The website does not require an installer, build tools, or packages. You can run it locally in three simple ways:

### Option A: Open Files Directly
1. Download the repository folder.
2. Navigate to the project root.
3. Double-click `index.html` to open it in your web browser.

### Option B: Node.js (Simple Local Server)
If you have Node.js installed, you can serve the pages using `npx`:
```bash
# Serve files from the project directory
npx http-server ./
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

### Option C: Python Server
Serve pages using Python's built-in module:
```bash
# Serve on port 8000
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

---

## Folder Structure

```text
├── assets/
│   ├── css/
│   │   ├── animations.css     # Entrance, floating, and typing keyframes
│   │   ├── components.css     # Styles for hero, cards, forms, and modans
│   │   └── style.css          # Design tokens, variables, resets, and layout
│   ├── images/
│   │   ├── profile.png        # Profile picture
│   │   ├── project-ai.png     # AI Assistant card visual
│   │   ├── project-notes.png  # Notes Tracker card visual
│   │   └── project-meds.png   # Medication Adherence card visual
│   ├── js/
│   │   ├── contact.js         # Accessible client-side form validation
│   │   └── main.js            # Menu, theme toggle, animation observers, and filtering
│   └── resume.pdf             # Valid minimal resume PDF download file
├── index.html                 # Home Page
├── about.html                 # About Page
├── skills.html                # Skills Page
├── projects.html              # Projects Page
├── resume.html                # Resume Page
├── contact.html               # Contact Page
└── README.md                  # Project Documentation
```
