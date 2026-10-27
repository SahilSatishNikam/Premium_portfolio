/**
 * ==========================================================================
 * THREE.JS 3D SCENE - INTERACTIVE CYBERNETIC ARCHITECTURE
 * ==========================================================================
 * Renders an abstract 3D geometric network representing clean software
 * architecture, Spring Boot service nodes, and distributed data connections.
 * Includes smooth mouse-parallax, scroll velocity reaction, responsive
 * camera positioning for mobile/laptop/desktop, and reduced-motion fallback.
 */

(function () {
  'use strict';

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const container = document.getElementById('hero-canvas-container');

  if (!container || typeof THREE === 'undefined') {
    return;
  }

  let scene, camera, renderer;
  let coreGroup, outerGroup, particleSystem;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let mouseX = 0;
  let mouseY = 0;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;
  let animationFrameId = null;

  // Kinetic scroll velocity integration
  let lastScrollY = window.scrollY || 0;
  let scrollVelocity = 0;
  let clock = new THREE.Clock();

  function getResponsiveParams() {
    const w = window.innerWidth;
    if (w < 480) {
      return { cameraZ: 38, scale: 0.72, particles: 100, offsetY: 1.5 };
    } else if (w < 768) {
      return { cameraZ: 34, scale: 0.82, particles: 140, offsetY: 1.0 };
    } else if (w < 1200) {
      return { cameraZ: 29, scale: 0.92, particles: 180, offsetY: 0 };
    } else {
      return { cameraZ: 26, scale: 1.0, particles: 240, offsetY: 0 };
    }
  }

  function initThree() {
    try {
      const params = getResponsiveParams();

      // 1. Scene
      scene = new THREE.Scene();

      // 2. Perspective Camera with Responsive Distance
      camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = params.cameraZ;
      camera.position.y = params.offsetY;

      // 3. WebGL Renderer with High-Performance Settings
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // 4. Volumetric Lighting System
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0x3b82f6, 4.5, 70);
      pointLight1.position.set(14, 14, 16);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0x8b5cf6, 3.5, 70);
      pointLight2.position.set(-16, -12, 12);
      scene.add(pointLight2);

      const pointLight3 = new THREE.PointLight(0x06b6d4, 2.5, 50);
      pointLight3.position.set(0, -18, -10);
      scene.add(pointLight3);

      // 5. Core Geometry (Software Architecture Wireframe)
      coreGroup = new THREE.Group();
      coreGroup.scale.set(params.scale, params.scale, params.scale);

      // Inner Icosahedron (Core logic node)
      const coreGeo = new THREE.IcosahedronGeometry(6.5, 1);
      const wireframeMat = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.48,
        roughness: 0.2,
        metalness: 0.8
      });
      const coreWireframe = new THREE.Mesh(coreGeo, wireframeMat);
      coreGroup.add(coreWireframe);

      // Inner glowing point nodes at vertices
      const pointGeo = new THREE.IcosahedronGeometry(6.5, 1);
      const pointMat = new THREE.PointsMaterial({
        color: 0x60a5fa,
        size: 0.35,
        transparent: true,
        opacity: 0.9
      });
      const points = new THREE.Points(pointGeo, pointMat);
      coreGroup.add(points);

      // Floating Orbital Concentric Rings
      outerGroup = new THREE.Group();
      outerGroup.scale.set(params.scale, params.scale, params.scale);

      const ring1Geo = new THREE.TorusGeometry(9.6, 0.045, 16, 100);
      const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45 });
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
      ring1.rotation.x = Math.PI / 3;
      outerGroup.add(ring1);

      const ring2Geo = new THREE.TorusGeometry(12.2, 0.04, 16, 120);
      const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.35 });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.rotation.y = Math.PI / 4;
      outerGroup.add(ring2);

      const ring3Geo = new THREE.TorusGeometry(14.8, 0.03, 16, 140);
      const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.25 });
      const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
      ring3.rotation.z = Math.PI / 6;
      outerGroup.add(ring3);

      // Ambient Background Particle Cloud (Data Packets)
      const particleCount = params.particles;
      const particlesGeo = new THREE.BufferGeometry();
      const posArray = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 50;
        posArray[i + 1] = (Math.random() - 0.5) * 40;
        posArray[i + 2] = (Math.random() - 0.5) * 35;
      }

      particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particlesMat = new THREE.PointsMaterial({
        color: 0x93c5fd,
        size: 0.18,
        transparent: true,
        opacity: 0.55
      });
      particleSystem = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particleSystem);

      scene.add(coreGroup);
      scene.add(outerGroup);

      // Event Listeners
      window.addEventListener('resize', onWindowResize, false);
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });

      // Start animation loop if not reduced motion
      if (!prefersReducedMotion) {
        animate();
      } else {
        renderer.render(scene, camera);
      }
    } catch (e) {
      console.warn('WebGL / Three.js initialization fallback: ', e);
    }
  }

  function onWindowResize() {
    if (!renderer || !camera || !container) return;
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    const params = getResponsiveParams();
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.position.z = params.cameraZ;
    camera.position.y = params.offsetY;
    camera.updateProjectionMatrix();

    if (coreGroup && outerGroup) {
      coreGroup.scale.set(params.scale, params.scale, params.scale);
      outerGroup.scale.set(params.scale, params.scale, params.scale);
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.0006;
    mouseY = (event.clientY - windowHalfY) * 0.0006;
  }

  function onScroll() {
    const currentScrollY = window.scrollY || 0;
    const delta = currentScrollY - lastScrollY;
    scrollVelocity += delta * 0.0004;
    lastScrollY = currentScrollY;
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Decay scroll momentum smoothly
    scrollVelocity *= 0.94;

    // Smooth rotational inertia with scroll kinetic boost
    targetRotationY += 0.003 + scrollVelocity;
    targetRotationX += 0.001 + Math.abs(scrollVelocity) * 0.5;

    coreGroup.rotation.y += (targetRotationY + mouseX - coreGroup.rotation.y) * 0.05;
    coreGroup.rotation.x += (targetRotationX + mouseY - coreGroup.rotation.x) * 0.05;

    // Gentle vertical levitation pulse
    coreGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.45;
    outerGroup.position.y = coreGroup.position.y;

    outerGroup.rotation.y += 0.0025 + scrollVelocity * 0.8;
    outerGroup.rotation.z += 0.0018;

    particleSystem.rotation.y -= 0.0009;

    renderer.render(scene, camera);
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThree);
  } else {
    initThree();
  }
})();
