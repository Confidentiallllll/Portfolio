/**
 * Ashish Kumar - High-Performance 60 FPS 3D Portfolio Engine
 * Built with Three.js, GSAP, Lenis, and RAF-Batched Hardware Transforms
 */

// ---------------- 1. FIRMWARE BOOT SPLASH LOADER ----------------
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderStatus = document.getElementById('loader-status');

  const bootSteps = [
    { progress: 35, status: 'Initializing Aptos typography engine...' },
    { progress: 70, status: 'Setting up high-performance 3D canvas...' },
    { progress: 100, status: 'System Core Ready.' }
  ];

  let currentStep = 0;
  const stepInterval = setInterval(() => {
    if (currentStep < bootSteps.length) {
      const step = bootSteps[currentStep];
      if (loaderBar) loaderBar.style.width = `${step.progress}%`;
      if (loaderStatus) loaderStatus.textContent = step.status;
      currentStep++;
    } else {
      clearInterval(stepInterval);
      setTimeout(() => {
        if (loader) loader.classList.add('loaded');
        initScrollAnimations();
      }, 200);
    }
  }, 100);
});

// ---------------- 2. OPTIMIZED THREE.JS 3D HARDWARE SCENE ----------------
let scene, camera, renderer, microchipGroup, particleSystem;
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;
let isCanvasVisible = true;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

function initThreeScene() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Visibility Observer to pause rendering when offscreen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isCanvasVisible = entry.isIntersecting;
    });
  }, { threshold: 0.05 });
  observer.observe(canvas);

  // Scene setup
  scene = new THREE.Scene();

  // Camera setup
  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 28;

  // Renderer setup with capped pixel ratio (max 1.5 for high performance)
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  // --- STUDIO 3D STM32 MICROCONTROLLER HARDWARE MODEL ---
  microchipGroup = new THREE.Group();

  // Ceramic IC Body
  const chipGeometry = new THREE.BoxGeometry(6.5, 6.5, 0.8);
  const chipMaterial = new THREE.MeshPhongMaterial({
    color: 0x141517,
    emissive: 0x08090a,
    specular: 0xd6a85f,
    shininess: 65,
    transparent: true,
    opacity: 0.96
  });
  const chipMesh = new THREE.Mesh(chipGeometry, chipMaterial);
  microchipGroup.add(chipMesh);

  // Metallic Bevel Border
  const bevelGeo = new THREE.BoxGeometry(6.65, 6.65, 0.75);
  const bevelMat = new THREE.MeshStandardMaterial({
    color: 0x2a2d32,
    metalness: 0.9,
    roughness: 0.25,
    transparent: true,
    opacity: 0.75
  });
  const bevelMesh = new THREE.Mesh(bevelGeo, bevelMat);
  microchipGroup.add(bevelMesh);

  // Inner Silicon Die Grid
  const dieGeo = new THREE.BoxGeometry(2.8, 2.8, 0.85);
  const dieMat = new THREE.MeshBasicMaterial({
    color: 0xd6a85f,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const dieMesh = new THREE.Mesh(dieGeo, dieMat);
  microchipGroup.add(dieMesh);

  // Polished Metallic Champagne Gold Pins
  const pinMat = new THREE.MeshStandardMaterial({
    color: 0xd6a85f,
    metalness: 0.95,
    roughness: 0.15
  });
  const pinPositions = [-2.4, -1.2, 0, 1.2, 2.4];

  pinPositions.forEach(pos => {
    const pinTopGeo = new THREE.BoxGeometry(0.35, 1.2, 0.2);
    const pinTop = new THREE.Mesh(pinTopGeo, pinMat);
    pinTop.position.set(pos, 3.75, 0);
    microchipGroup.add(pinTop);

    const pinBottom = pinTop.clone();
    pinBottom.position.set(pos, -3.75, 0);
    microchipGroup.add(pinBottom);

    const pinSideGeo = new THREE.BoxGeometry(1.2, 0.35, 0.2);
    const pinLeft = new THREE.Mesh(pinSideGeo, pinMat);
    pinLeft.position.set(-3.75, pos, 0);
    microchipGroup.add(pinLeft);

    const pinRight = pinLeft.clone();
    pinRight.position.set(3.75, pos, 0);
    microchipGroup.add(pinRight);
  });

  // Initial Position & Angle (Positioned strictly on the right side for text safety)
  if (window.innerWidth < 995) {
    microchipGroup.position.set(0, 4.5, -8);
    microchipGroup.scale.set(0.65, 0.65, 0.65);
  } else {
    microchipGroup.position.set(10.5, 0.5, -2);
    microchipGroup.scale.set(1.05, 1.05, 1.05);
  }

  microchipGroup.rotation.set(0.35, -0.45, 0.1);
  scene.add(microchipGroup);

  // --- LOW-DENSITY AMBIENT DEPTH DUST (WARM GOLD) ---
  const particleCount = isTouchDevice ? 35 : 80;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 60;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 40;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.25,
    color: 0xd6a85f,
    transparent: true,
    opacity: 0.15
  });

  particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);

  // --- WARM GOLDEN LIGHTING ---
  const ambientLight = new THREE.AmbientLight(0xfff8ee, 0.7);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xe0b86a, 2.2);
  keyLight.position.set(15, 15, 20);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x8a7352, 0.9);
  fillLight.position.set(-15, -10, 10);
  scene.add(fillLight);

  // Throttled Event Listeners
  window.addEventListener('resize', onWindowResize, { passive: true });
  document.addEventListener('mousemove', onMouseMove, { passive: true });

  // Render Loop
  animateThreeScene();
}

function onMouseMove(event) {
  targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
  targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
  if (!renderer || !camera) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  if (microchipGroup) {
    if (window.innerWidth < 995) {
      microchipGroup.position.set(0, 4.5, -8);
      microchipGroup.scale.set(0.65, 0.65, 0.65);
    } else {
      microchipGroup.position.set(10.5, 0.5, -2);
      microchipGroup.scale.set(1.05, 1.05, 1.05);
    }
  }
}

function animateThreeScene() {
  requestAnimationFrame(animateThreeScene);

  if (!isCanvasVisible) return; // Pause rendering when canvas is not visible

  mouseX += (targetMouseX - mouseX) * 0.025;
  mouseY += (targetMouseY - mouseY) * 0.025;

  if (microchipGroup) {
    microchipGroup.rotation.y += 0.003;
    microchipGroup.rotation.x = 0.3 + mouseY * 0.12;
    microchipGroup.rotation.y = -0.4 + mouseX * 0.15;
  }

  if (particleSystem) {
    particleSystem.rotation.y += 0.0003;
  }

  camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.02;
  camera.position.y += (-mouseY * 1.2 - camera.position.y) * 0.02;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

// ---------------- 3. MINIMALIST CURSOR & MAGNETIC EFFECT ----------------
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower || isTouchDevice) return;

  let posX = 0, posY = 0;
  let mouseXPos = 0, mouseYPos = 0;

  document.addEventListener('mousemove', (e) => {
    mouseXPos = e.clientX;
    mouseYPos = e.clientY;
    cursor.style.transform = `translate3d(${mouseXPos}px, ${mouseYPos}px, 0) translate(-50%, -50%)`;
  }, { passive: true });

  function renderCursor() {
    posX += (mouseXPos - posX) * 0.12;
    posY += (mouseYPos - posY) * 0.12;

    follower.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover states on interactive elements
  const hoverables = document.querySelectorAll('a, button, .tilt-card, [data-magnetic]');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hovered'), { passive: true });
    el.addEventListener('mouseleave', () => follower.classList.remove('hovered'), { passive: true });
  });

  // Magnetic Pull
  const magnetics = document.querySelectorAll('[data-magnetic]');
  magnetics.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate3d(${x * 0.15}px, ${y * 0.15}px, 0)`;
    }, { passive: true });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate3d(0px, 0px, 0px)`;
      btn.style.transition = 'transform 0.3s ease';
    }, { passive: true });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'none';
    }, { passive: true });
  });
}

// ---------------- 4. RAF-BATCHED 3D CARD PERSPECTIVE TILT (5° MAX) ----------------
function init3DTiltCards() {
  if (isTouchDevice) return;

  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach(card => {
    let cachedRect = null;
    let ticking = false;

    card.addEventListener('mouseenter', () => {
      cachedRect = card.getBoundingClientRect();
      card.style.transition = 'none';
    }, { passive: true });

    card.addEventListener('mousemove', (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!cachedRect) cachedRect = card.getBoundingClientRect();
          const x = e.clientX - cachedRect.left;
          const y = e.clientY - cachedRect.top;

          const centerX = cachedRect.width / 2;
          const centerY = cachedRect.height / 2;

          const tiltX = (y - centerY) / centerY * -5;
          const tiltY = (x - centerX) / centerX * 5;

          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
          card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`;

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      cachedRect = null;
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      card.style.transition = 'transform 0.4s ease';
    }, { passive: true });
  });
}

// ---------------- 5. GSAP & LENIS SCROLL ANIMATIONS ----------------
function initScrollAnimations() {
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    gsap.from('.animate-hero', {
      y: 25,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.1
    });

    gsap.from('.home-img', {
      scale: 0.92,
      opacity: 0,
      duration: 0.9,
      ease: 'power2.out'
    });

    // Section title reveals
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 85%'
        },
        y: 20,
        opacity: 0,
        duration: 0.6
      });
    });

    // Reveal cards stagger (including restored skills cards)
    const revealSections = document.querySelectorAll('.reveal-section');
    revealSections.forEach(section => {
      const cards = section.querySelectorAll('.tilt-card, .skill-card, .timeline-item, .contact-card');
      if (cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: section,
            start: 'top 82%'
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out'
        });
      }
    });

    // Timeline progress filling
    const eduSection = document.getElementById('education');
    if (eduSection) {
      gsap.to('#edu-progress', {
        scrollTrigger: {
          trigger: eduSection,
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: true
        },
        height: '100%',
        ease: 'none'
      });
    }

    const expSection = document.getElementById('experience');
    if (expSection) {
      gsap.to('#exp-progress', {
        scrollTrigger: {
          trigger: expSection,
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: true
        },
        height: '100%',
        ease: 'none'
      });
    }
  }

  // Active section tracker
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    const header = document.querySelector('header');
    if (header) {
      if (scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ---------------- 6. TYPING TEXT EFFECT ----------------
function initTypingText() {
  const words = ["Firmware Engineer", "Embedded Software Engineer"];
  let wordIdx = 0, charIdx = 0, isDeleting = false;
  const textSpan = document.querySelector(".typing-text span");
  if (!textSpan) return;

  const typeSpeed = 100;

  function type() {
    const currentWord = words[wordIdx];
    if (isDeleting) {
      textSpan.textContent = currentWord.substring(0, charIdx--);
      if (charIdx < 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
      }
    } else {
      textSpan.textContent = currentWord.substring(0, charIdx++);
      if (charIdx === currentWord.length + 1) {
        isDeleting = true;
        setTimeout(type, 1600);
        return;
      }
    }
    setTimeout(type, isDeleting ? typeSpeed / 2 : typeSpeed);
  }
  type();
}

// ---------------- 7. MOBILE NAVIGATION MENU ----------------
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// Initialize on window load
window.addEventListener('load', () => {
  initThreeScene();
  initCustomCursor();
  init3DTiltCards();
  initTypingText();
  initMobileNav();
});
