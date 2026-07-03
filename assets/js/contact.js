/**
 * ACCESSIBLE PERSONAL PORTFOLIO — Contact Form Validation
 * Author: Portfolio Owner
 * Description: Client-side form validation with accessible
 *              ARIA error messages and success/error feedback.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  initContactForm(form);
});

/* =========================================================
   CONTACT FORM VALIDATION
   ========================================================= */
function initContactForm(form) {
  const fields = {
    name:    { el: form.querySelector('#name'),    rules: [required, minLen(2), maxLen(80)]  },
    email:   { el: form.querySelector('#email'),   rules: [required, validEmail]              },
    subject: { el: form.querySelector('#subject'), rules: [required, minLen(3), maxLen(120)] },
    message: { el: form.querySelector('#message'), rules: [required, minLen(10), maxLen(2000)] },
  };

  const submitBtn    = form.querySelector('#submit-btn');
  const successAlert = document.getElementById('form-success');
  const errorAlert   = document.getElementById('form-error');

  /* -------------------------------------------------------
     Live validation on blur (not on every keystroke)
     ------------------------------------------------------- */
  Object.values(fields).forEach(({ el, rules }) => {
    if (!el) return;

    el.addEventListener('blur', () => {
      validateField(el, rules);
    });

    el.addEventListener('input', () => {
      // Clear error styling while typing after blur
      if (el.getAttribute('aria-invalid') === 'true') {
        clearFieldError(el);
      }
    });
  });

  /* -------------------------------------------------------
     Submit handler
     ------------------------------------------------------- */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Hide previous alerts
    hideAlert(successAlert);
    hideAlert(errorAlert);

    // Validate all fields
    let isValid = true;
    const firstInvalidField = null;

    for (const [, { el, rules }] of Object.entries(fields)) {
      if (!el) continue;
      const fieldValid = validateField(el, rules);
      if (!fieldValid && isValid) {
        isValid = false;
        // Focus the first invalid field
        el.focus();
      }
    }

    if (!isValid) {
      showAlert(errorAlert, '❌ Please fix the errors above before submitting.');
      return;
    }

    // Simulate submission (loading state)
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Sending…';
    submitBtn.setAttribute('aria-busy', 'true');

    try {
      // Simulate network delay (replace with real fetch() call)
      await simulateSend({
        name:    fields.name.el.value.trim(),
        email:   fields.email.el.value.trim(),
        subject: fields.subject.el.value.trim(),
        message: fields.message.el.value.trim(),
      });

      // Success
      form.reset();
      Object.values(fields).forEach(({ el }) => {
        if (el) {
          el.classList.remove('success', 'error');
          el.removeAttribute('aria-invalid');
          el.removeAttribute('aria-describedby');
        }
      });

      showAlert(
        successAlert,
        '✅ Your message has been sent successfully! I\'ll get back to you soon.'
      );

      // Move focus to success message for screen readers
      successAlert.setAttribute('tabindex', '-1');
      successAlert.focus();

    } catch (err) {
      showAlert(errorAlert, `❌ Something went wrong: ${err.message}. Please try again.`);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      submitBtn.removeAttribute('aria-busy');
    }
  });
}

/* =========================================================
   VALIDATION HELPERS
   ========================================================= */

/**
 * Validate a single field against its rules.
 * @param {HTMLElement} el
 * @param {Function[]} rules
 * @returns {boolean} isValid
 */
function validateField(el, rules) {
  const value = el.value;

  for (const rule of rules) {
    const error = rule(value);
    if (error) {
      showFieldError(el, error);
      return false;
    }
  }

  clearFieldError(el);
  el.classList.add('success');
  return true;
}

/**
 * Show an error message for a field.
 */
function showFieldError(el, message) {
  el.classList.remove('success');
  el.classList.add('error');
  el.setAttribute('aria-invalid', 'true');

  const errorId = el.id + '-error';
  el.setAttribute('aria-describedby', errorId);

  let errorEl = document.getElementById(errorId);
  if (!errorEl) {
    errorEl = document.createElement('p');
    errorEl.id = errorId;
    errorEl.className = 'form-error';
    errorEl.setAttribute('role', 'alert');
    el.parentNode.appendChild(errorEl);
  }

  errorEl.textContent = message;
  errorEl.classList.add('visible');
}

/**
 * Clear field error state.
 */
function clearFieldError(el) {
  el.classList.remove('error');
  el.removeAttribute('aria-invalid');

  const errorId = el.id + '-error';
  const errorEl = document.getElementById(errorId);
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  }
}

/* =========================================================
   VALIDATION RULES
   ========================================================= */

/** Required field */
function required(value) {
  return value.trim().length === 0 ? 'This field is required.' : null;
}

/** Minimum length factory */
function minLen(min) {
  return (value) =>
    value.trim().length < min
      ? `Must be at least ${min} characters.`
      : null;
}

/** Maximum length factory */
function maxLen(max) {
  return (value) =>
    value.trim().length > max
      ? `Must be no more than ${max} characters.`
      : null;
}

/** Email format validator */
function validEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailRegex.test(value.trim())
    ? 'Please enter a valid email address.'
    : null;
}

/* =========================================================
   ALERT HELPERS
   ========================================================= */

function showAlert(el, message) {
  if (!el) return;
  el.textContent = message;
  el.classList.add('visible');
}

function hideAlert(el) {
  if (!el) return;
  el.classList.remove('visible');
}

/* =========================================================
   SIMULATE SEND (Replace with real API call)
   ========================================================= */

/**
 * Simulates a form submission.
 * Replace this with a real fetch() to a backend endpoint.
 * @param {Object} data - Form data
 * @returns {Promise}
 */
function simulateSend(data) {
  console.log('Form data to be sent:', data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success 90% of the time
      if (Math.random() > 0.1) {
        resolve({ ok: true });
      } else {
        reject(new Error('Network error'));
      }
    }, 1500);
  });
}
