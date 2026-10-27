/**
 * ==========================================================================
 * GSAP & SCROLLTRIGGER ANIMATION SYSTEM (WITH ROBUST OBSERVER FALLBACK)
 * ==========================================================================
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initAnimations() {
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-init').forEach(el => {
        el.classList.add('reveal-active');
      });
      return;
    }

    // Check if GSAP & ScrollTrigger are available via CDN
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // 1. Hero Content Entrance
      gsap.from('.hero-badge-wrap', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      });

      gsap.from('.hero-title .title-small', {
        opacity: 0,
        y: 15,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.35
      });

      gsap.from('.hero-title .title-main', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
      });

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.65
      });

      gsap.from('.hero-description', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8
      });

      gsap.from('.hero-actions', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.95
      });

      gsap.from('.hero-visual-card', {
        opacity: 0,
        x: 40,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.6
      });

      // 2. Section Headers
      gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 35,
          duration: 0.85,
          ease: 'power3.out'
        });
      });

      // 3. Project Cards Stagger
      gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 45,
          duration: 0.9,
          ease: 'power3.out'
        });
      });

      // 4. Timeline Items
      gsap.utils.toArray('.timeline-item').forEach(item => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          x: -30,
          duration: 0.8,
          ease: 'power3.out'
        });
      });

      // 5. Skills Grid Stagger
      gsap.utils.toArray('.skill-category-card').forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 25,
          duration: 0.6,
          delay: (idx % 3) * 0.1,
          ease: 'power3.out'
        });
      });

      // 6. Approach Cards
      gsap.utils.toArray('.approach-card').forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 30,
          duration: 0.65,
          delay: (idx % 3) * 0.12,
          ease: 'power3.out'
        });
      // 7. Refresh ScrollTrigger when images & fonts are fully loaded
      window.addEventListener('load', function () {
        ScrollTrigger.refresh();
      });
    }

    // Always run native IntersectionObserver to ensure .reveal-active is applied
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal-active');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
      );

      document.querySelectorAll('.reveal-init').forEach(el => {
        observer.observe(el);
      });
    } else {
      document.querySelectorAll('.reveal-init').forEach(el => {
        el.classList.add('reveal-active');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
})();
