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
    initScrollProgress();
    initCursorGlow();
    initCard3DTilt();
    initTerminalSimulation();
    initBackToTop();
    initSectionRouter();
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

    // Smooth anchor navigation
    document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const hashIdx = href.indexOf('#');
        if (hashIdx === -1) return;
        const targetId = href.substring(hashIdx + 1);
        if (!targetId) return;
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
          if (history.pushState) {
            history.pushState(null, null, '/#' + targetId);
          }
        }
      });
    });

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
            const href = link.getAttribute('href');
            if (href === `#${id}` || href === `/#${id}`) {
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

  /* ==========================================================================
     5. SCROLL READING PROGRESS BAR
     ========================================================================== */
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    function update() {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = height > 0 ? (scrollY / height) * 100 : 0;
      bar.style.width = Math.min(Math.max(progress, 0), 100) + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ==========================================================================
     6. AMBIENT CURSOR SPOTLIGHT GLOW
     ========================================================================== */
  function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow || window.matchMedia('(hover: none) or (pointer: coarse)').matches) return;

    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;
    let isMoving = false;

    window.addEventListener('mousemove', function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        glow.style.opacity = '1';
        requestAnimationFrame(renderGlow);
      }
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
      glow.style.opacity = '0';
    });

    function renderGlow() {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      glow.style.left = currentX + 'px';
      glow.style.top = currentY + 'px';

      if (Math.abs(targetX - currentX) > 0.2 || Math.abs(targetY - currentY) > 0.2) {
        requestAnimationFrame(renderGlow);
      } else {
        isMoving = false;
      }
    }
  }

  /* ==========================================================================
     7. 3D CARD PERSPECTIVE TILT & SPECULAR REFLECTION
     ========================================================================== */
  function initCard3DTilt() {
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return;

    const cards = document.querySelectorAll(
      '.project-card, .skill-category-card, .credential-card, .approach-card, .about-card, .timeline-card, .feature-box, .tilt-card'
    );

    cards.forEach(card => {
      card.classList.add('tilt-card');

      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px)`;
        card.style.setProperty('--tilt-x', `${x}px`);
        card.style.setProperty('--tilt-y', `${y}px`);
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
          card.style.transition = '';
        }, 500);
      });

      card.addEventListener('mouseenter', function () {
        card.style.transition = 'none';
      });
    });
  }

  /* ==========================================================================
     8. SECTION ROUTER & AUTO-SCROLL
     ========================================================================== */
  function initSectionRouter() {
    let sectionId = window.location.hash ? window.location.hash.substring(1) : '';
    if (!sectionId) {
      const cleanPath = window.location.pathname.replace(/^\/|\/$/g, '');
      if (cleanPath && cleanPath !== 'home') {
        sectionId = cleanPath;
      }
    }

    if (sectionId) {
      const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        setTimeout(function () {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 350);
      }
    }
  }
})();
