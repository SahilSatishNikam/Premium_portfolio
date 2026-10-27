/**
 * ==========================================================================
 * THREE.JS 3D SCENE - INTERACTIVE CYBERNETIC ARCHITECTURE
 * ==========================================================================
 * Renders an abstract 3D geometric network representing clean software
 * architecture, Spring Boot service nodes, and distributed data connections.
 * Includes smooth mouse-parallax, volumetric lighting, and reduced-motion fallback.
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

  function initThree() {
    try {
      // 1. Scene
      scene = new THREE.Scene();

      // 2. Camera
      camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 28;

      // 3. WebGL Renderer
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // 4. Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0x3b82f6, 4, 60);
      pointLight1.position.set(12, 12, 14);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0x8b5cf6, 3, 60);
      pointLight2.position.set(-14, -10, 10);
      scene.add(pointLight2);

      // 5. Core Geometry (Abstract Software Architecture Wireframe)
      coreGroup = new THREE.Group();

      // Inner Icosahedron (Core logic node)
      const coreGeo = new THREE.IcosahedronGeometry(6.5, 1);
      const wireframeMat = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
        roughness: 0.2,
        metalness: 0.8
      });
      const coreWireframe = new THREE.Mesh(coreGeo, wireframeMat);
      coreGroup.add(coreWireframe);

      // Inner glowing point nodes at vertices
      const pointGeo = new THREE.IcosahedronGeometry(6.5, 1);
      const pointMat = new THREE.PointsMaterial({
        color: 0x60a5fa,
        size: 0.32,
        transparent: true,
        opacity: 0.85
      });
      const points = new THREE.Points(pointGeo, pointMat);
      coreGroup.add(points);

      // Floating Orbital Concentric Rings
      outerGroup = new THREE.Group();

      const ring1Geo = new THREE.TorusGeometry(9.5, 0.04, 16, 100);
      const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 });
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
      ring1.rotation.x = Math.PI / 3;
      outerGroup.add(ring1);

      const ring2Geo = new THREE.TorusGeometry(12, 0.035, 16, 120);
      const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.3 });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.rotation.y = Math.PI / 4;
      outerGroup.add(ring2);

      // Ambient Background Particle Cloud (Data Packets)
      const particleCount = 220;
      const particlesGeo = new THREE.BufferGeometry();
      const posArray = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 45;
        posArray[i + 1] = (Math.random() - 0.5) * 35;
        posArray[i + 2] = (Math.random() - 0.5) * 30;
      }

      particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particlesMat = new THREE.PointsMaterial({
        color: 0x93c5fd,
        size: 0.16,
        transparent: true,
        opacity: 0.5
      });
      particleSystem = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particleSystem);

      scene.add(coreGroup);
      scene.add(outerGroup);

      // Event Listeners
      window.addEventListener('resize', onWindowResize, false);
      window.addEventListener('mousemove', onMouseMove, { passive: true });

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
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.0006;
    mouseY = (event.clientY - windowHalfY) * 0.0006;
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    // Smooth rotational inertia
    targetRotationY += 0.003;
    targetRotationX += 0.001;

    coreGroup.rotation.y += (targetRotationY + mouseX - coreGroup.rotation.y) * 0.05;
    coreGroup.rotation.x += (targetRotationX + mouseY - coreGroup.rotation.x) * 0.05;

    outerGroup.rotation.y += 0.002;
    outerGroup.rotation.z += 0.0015;

    particleSystem.rotation.y -= 0.0008;

    renderer.render(scene, camera);
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThree);
  } else {
    initThree();
  }
})();
