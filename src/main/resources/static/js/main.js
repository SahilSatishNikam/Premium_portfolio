/**
 * ==========================================================================
 * MAIN JAVASCRIPT - NAVIGATION, SCROLLSPY, TERMINAL SIMULATOR
 * ==========================================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initScrollSpy();
    initTerminalSimulation();
    initBackToTop();
  });

  /* ==========================================================================
     1. NAVIGATION & MOBILE DRAWER
     ========================================================================== */
  function initNavigation() {
    const nav = document.getElementById('site-nav');
    const toggleBtn = document.getElementById('mobile-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-menu-list a');

    // Sticky nav on scroll
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });

    // Mobile drawer toggle
    if (toggleBtn && drawer && overlay) {
      function openDrawer() {
        toggleBtn.classList.add('active');
        drawer.classList.add('open');
        overlay.classList.add('active');
        toggleBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }

      function closeDrawer() {
        toggleBtn.classList.remove('active');
        drawer.classList.remove('open');
        overlay.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }

      toggleBtn.addEventListener('click', function () {
        if (drawer.classList.contains('open')) {
          closeDrawer();
        } else {
          openDrawer();
        }
      });

      overlay.addEventListener('click', closeDrawer);

      mobileLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
      });

      // Escape key to close drawer
      window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
          closeDrawer();
        }
      });
    }
  }

  /* ==========================================================================
     2. SCROLLSPY (ACTIVE NAV HIGHLIGHT)
     ========================================================================== */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-item a, .mobile-menu-list a');

    function updateActiveLink() {
      const scrollPos = window.scrollY + 160;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
  }

  /* ==========================================================================
     3. DEVELOPER TERMINAL SIMULATION
     ========================================================================== */
  function initTerminalSimulation() {
    const terminalBody = document.getElementById('hero-terminal-body');
    if (!terminalBody) return;

    const logs = [
      { text: 'java -jar premium-portfolio.jar', cls: 'cmd', delay: 400 },
      { text: '  .   ____          _            __ _ _', cls: 'spring', delay: 800 },
      { text: ' /\\\\ / ___\\\'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\', cls: 'spring', delay: 1100 },
      { text: '( ( )\\___ | \'_ | \'_| | \'_ \\/ _` | \\ \\ \\ \\', cls: 'spring', delay: 1400 },
      { text: ' \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )', cls: 'spring', delay: 1700 },
      { text: '  \'  |____| .__|_| |_|_| |_\\__, | / / / /', cls: 'spring', delay: 2000 },
      { text: '=========[ |_| ]===========[ |___/ ]====', cls: 'spring', delay: 2200 },
      { text: ':: Spring Boot (v3.3.4) ::   Java 21 LTS', cls: 'highlight', delay: 2500 },
      { text: '[INFO] Initializing Spring Framework WebMvc architecture...', cls: '', delay: 2900 },
      { text: '[INFO] Mapping REST endpoints: /api/contact, /api/projects', cls: 'highlight', delay: 3400 },
      { text: '[INFO] Connecting to relational data layer (Spring Data JPA)...', cls: '', delay: 3900 },
      { text: '[INFO] Hibernate: schema validation complete (0 errors)', cls: 'success', delay: 4400 },
      { text: '[READY] Application started on port 8080 (0.842s)', cls: 'success', delay: 4900 },
      { text: '[CODEMETRIC] Software Developer Intern profile active.', cls: 'highlight', delay: 5400 }
    ];

    terminalBody.innerHTML = '';

    logs.forEach(item => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = `terminal-line ${item.cls}`;
        line.textContent = item.text;
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }, item.delay);
    });

    // Append blinking cursor at the end
    setTimeout(() => {
      const cursorLine = document.createElement('div');
      cursorLine.className = 'terminal-line cmd';
      cursorLine.innerHTML = '<span class="terminal-cursor"></span>';
      terminalBody.appendChild(cursorLine);
    }, 5800);
  }

  /* ==========================================================================
     4. BACK TO TOP
     ========================================================================== */
  function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }
})();
