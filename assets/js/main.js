/**
 * ACCESSIBLE PERSONAL PORTFOLIO — Main JavaScript
 * Author: Portfolio Owner
 * Description: Theme toggle, sticky nav, mobile menu,
 *              typing animation, scroll-to-top, smooth scroll,
 *              active nav highlighting, scroll reveal init.
 */

'use strict';

/* =========================================================
   1. DOM READY
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  initMobileMenu();
  initScrollTop();
  initTypingAnimation();
  initScrollReveal();
  initActiveNav();
  initSkillBars();
  initCountUp();
  initProjectsFilter();
});

/* =========================================================
   2. THEME TOGGLE (Dark / Light Mode)
   ========================================================= */
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  // Read saved preference, fall back to system preference
  const saved = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');

  applyTheme(initial);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('portfolio-theme', next);
  });
}

/**
 * Apply a theme to the root element and update toggle icon.
 * @param {string} theme - 'dark' or 'light'
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const iconEl = toggle.querySelector('.theme-icon');
  if (iconEl) {
    iconEl.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // Update ARIA label for screen readers
  toggle.setAttribute(
    'aria-label',
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  );
  toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
}

/* =========================================================
   3. STICKY NAVIGATION
   ========================================================= */
function initNav() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run on load
}

/* =========================================================
   4. MOBILE MENU
   ========================================================= */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);

    // Accessibility
    toggle.setAttribute('aria-expanded', String(isOpen));
    navLinks.setAttribute('aria-hidden', String(!isOpen));

    // Prevent body scroll when menu open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      navLinks.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && toggle.classList.contains('open')) {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      navLinks.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });
}

/* =========================================================
   5. SCROLL-TO-TOP BUTTON
   ========================================================= */
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =========================================================
   6. TYPING ANIMATION
   ========================================================= */
function initTypingAnimation() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  // Roles to cycle through
  const roles = [
    'Front-End Developer',
    'Python Enthusiast',
    'Java Developer',
    'UI/UX Designer',
    'Full-Stack Learner',
  ];

  let roleIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;
  let isPaused   = false;

  const TYPE_SPEED   = 90;   // ms per character (typing)
  const DELETE_SPEED = 50;   // ms per character (deleting)
  const PAUSE_AFTER  = 2000; // ms to pause after fully typed

  function type() {
    const currentRole = roles[roleIndex];

    if (isPaused) {
      isPaused = false;
      isDeleting = true;
      setTimeout(type, 500);
      return;
    }

    if (isDeleting) {
      el.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 400);
      } else {
        setTimeout(type, DELETE_SPEED);
      }
    } else {
      el.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        isPaused = true;
        setTimeout(type, PAUSE_AFTER);
      } else {
        setTimeout(type, TYPE_SPEED);
      }
    }
  }

  // Set ARIA attributes so screen readers read the final text, not each keystroke
  el.setAttribute('aria-live', 'off');
  el.setAttribute('aria-label', 'Developer roles cycling animation');

  type();
}

/* =========================================================
   7. SCROLL REVEAL (Intersection Observer)
   ========================================================= */
function initScrollReveal() {
  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Show all elements immediately
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Animate only once
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('[data-reveal]').forEach(el => {
    observer.observe(el);
  });
}

/* =========================================================
   8. ACTIVE NAV LINK HIGHLIGHTING
   ========================================================= */
function initActiveNav() {
  const links = document.querySelectorAll('.nav-link[data-page]');
  if (!links.length) return;

  // Get current page filename
  const pathname = window.location.pathname;
  const page     = pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    const target = link.getAttribute('data-page');
    if (target === page || (page === '' && target === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* =========================================================
   9. SKILL BARS (Intersection Observer)
   ========================================================= */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill[data-width]');
  if (!bars.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bars.forEach(bar => {
      bar.style.width = bar.getAttribute('data-width') + '%';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width');
          // Short delay for visual effect
          setTimeout(() => {
            bar.style.width = width + '%';
          }, 200);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach(bar => observer.observe(bar));
}

/* =========================================================
   10. COUNT-UP ANIMATION
   ========================================================= */
function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    counters.forEach(el => {
      el.textContent = el.getAttribute('data-count');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el      = entry.target;
          const target  = parseInt(el.getAttribute('data-count'), 10);
          const suffix  = el.getAttribute('data-suffix') || '';
          const duration = 1500; // ms
          const start    = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + suffix;

            if (progress < 1) {
              requestAnimationFrame(update);
            }
          }

          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

/* =========================================================
   11. UTILITY: SMOOTH SCROLL FOR ANCHOR LINKS
   ========================================================= */
document.addEventListener('click', e => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;

  const id = anchor.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (!target) return;

  e.preventDefault();
  const top = target.getBoundingClientRect().top + window.scrollY
            - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10);

  window.scrollTo({ top, behavior: 'smooth' });
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
});

/* =========================================================
   12. PROJECT FILTERING
   ========================================================= */
function initProjectsFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-card');
  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Set active class
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const isMatch = filter === 'all' || category === filter;

        // Ensure transition properties exist
        card.style.transition = 'opacity 300ms ease, transform 300ms ease';

        if (isMatch) {
          card.style.display = 'flex';
          // Force reflow
          void card.offsetHeight;
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
          card.removeAttribute('aria-hidden');
          card.querySelectorAll('a, button').forEach(el => el.removeAttribute('tabindex'));
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          card.setAttribute('aria-hidden', 'true');
          card.querySelectorAll('a, button').forEach(el => el.setAttribute('tabindex', '-1'));
          
          // Wait for transition to complete before setting display: none
          const handleTransitionEnd = (e) => {
            if (e.propertyName === 'opacity' && card.style.opacity === '0') {
              card.style.display = 'none';
              card.removeEventListener('transitionend', handleTransitionEnd);
            }
          };
          card.addEventListener('transitionend', handleTransitionEnd);
        }
      });
    });
  });
}

