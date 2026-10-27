/**
 * ==========================================================================
 * SECURE CONTACT FORM HANDLER - ASYNCHRONOUS SPRING BOOT INTEGRATION
 * ==========================================================================
 */

(function () {
  'use strict';

  function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit-btn');

    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Reset previous error indicators
      clearFieldErrors();

      // Extract field values
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');
      const hpInput = document.getElementById('contact-company-hp');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';
      const companyUrl = hpInput ? hpInput.value.trim() : '';

      // Client-side validation checks
      let hasError = false;

      if (!name || name.length < 2) {
        showFieldError('contact-name', 'Please enter your name (minimum 2 characters).');
        hasError = true;
      }

      if (!email || !isValidEmail(email)) {
        showFieldError('contact-email', 'Please provide a valid email address.');
        hasError = true;
      }

      if (!subject || subject.length < 3) {
        showFieldError('contact-subject', 'Please enter a subject (minimum 3 characters).');
        hasError = true;
      }

      if (!message || message.length < 10) {
        showFieldError('contact-message', 'Message must be at least 10 characters.');
        hasError = true;
      }

      if (hasError) return;

      // Loading state
      setButtonLoading(true);

      const payload = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        companyUrl: companyUrl
      };

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && data.success) {
          showToast(data.message || 'Your message has been sent successfully!', 'success');
          form.reset();
        } else if (response.status === 429) {
          showToast(data.message || 'Too many submissions. Please wait a few minutes.', 'error');
        } else {
          showToast(data.message || 'Failed to send message. Please try again.', 'error');
        }
      } catch (err) {
        console.error('Contact form submission error:', err);
        showToast('Network error. Please check your connection and try again.', 'error');
      } finally {
        setButtonLoading(false);
      }
    });

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFieldError(fieldId, errorMsg) {
      const field = document.getElementById(fieldId);
      if (field) {
        field.classList.add('input-error');
        const errContainer = document.getElementById(fieldId + '-error');
        if (errContainer) {
          errContainer.textContent = errorMsg;
        }
      }
    }

    function clearFieldErrors() {
      document.querySelectorAll('.form-input, .form-textarea').forEach(el => {
        el.classList.remove('input-error');
      });
      document.querySelectorAll('.form-field-error').forEach(el => {
        el.textContent = '';
      });
    }

    function setButtonLoading(isLoading) {
      if (!submitBtn) return;
      if (isLoading) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      } else {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    }
  }

  // Toast Notification System
  window.showToast = function (message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'alert');

    const icon = type === 'success'
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 350);
    }, 4500);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
})();
