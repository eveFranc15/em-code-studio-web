/* =============================================
   ANIMACIONES.JS — EM Code Studio
   GSAP + requestAnimationFrame
   Curso: Animaciones para la Web
   Docente: Ing. Walter Quispe Pretel
============================================= */

// 1. PARTÍCULAS INTRO
function crearParticulasIntro() {
  const cont = document.getElementById('introParticles');
  if (!cont) return;
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.classList.add('intro-particle');
    const size  = Math.random() * 6 + 2;
    const x     = Math.random() * 100;
    const dur   = Math.random() * 8 + 5;
    const delay = Math.random() * 5;
    const color = Math.random() > 0.5 ? 'rgba(51,255,153,0.15)' : 'rgba(179,136,255,0.12)';
    p.style.cssText = `width:${size}px;height:${size}px;left:${x}%;bottom:-10px;background:${color};animation-duration:${dur}s;animation-delay:${delay}s;`;
    cont.appendChild(p);
  }
}

// 2. PARTÍCULAS HERO
function crearParticulasHero() {
  const cont = document.getElementById('heroParticles');
  if (!cont) return;
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    p.classList.add('hero-particle');
    const size  = Math.random() * 8 + 3;
    const x     = Math.random() * 100;
    const dur   = Math.random() * 10 + 8;
    const delay = Math.random() * 8;
    p.style.cssText = `width:${size}px;height:${size}px;left:${x}%;bottom:-10px;animation-duration:${dur}s;animation-delay:${delay}s;`;
    cont.appendChild(p);
  }
}

// 3. TILT 3D EN TARJETAS (GSAP)
function initTilt() {
  document.querySelectorAll('.service-card, .portfolio-card, .tech-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const rotY =  ((e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2)) * 8;
      const rotX = -((e.clientY - rect.top   - rect.height / 2) / (rect.height / 2)) * 8;
      if (typeof gsap !== 'undefined') {
        gsap.to(card, { rotateY: rotY, rotateX: rotX, transformPerspective: 800, duration: 0.3, ease: 'power2.out' });
      }
    });
    card.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
      }
    });
  });
}

// 4. RIPPLE EN BOTONES
function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rect   = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.classList.add('btn-ripple');
      ripple.style.cssText = `left:${e.clientX - rect.left}px;top:${e.clientY - rect.top}px;width:10px;height:10px;margin:-5px;`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// 5. CONTADOR ANIMADO (requestAnimationFrame — RF04)
function animarContador(el, target, duration) {
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}
function initContadores() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animarContador(el, parseInt(el.dataset.target) || 0, 1800);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.hstat-num').forEach(n => obs.observe(n));
}

// 6. BARRAS DE HABILIDADES (RF03 — scroll)
function initSkillBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('animated'), 200);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-fill').forEach(b => obs.observe(b));
}

// 7. BOTÓN MAGNÉTICO (GSAP)
function initMagneticButtons() {
  if (window.innerWidth < 768) return;
  document.querySelectorAll('.btn-primary, .btn-nav').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const dx   = e.clientX - (rect.left + rect.width  / 2);
      const dy   = e.clientY - (rect.top  + rect.height / 2);
      if (typeof gsap !== 'undefined') {
        gsap.to(btn, { x: dx * 0.25, y: dy * 0.25, duration: 0.3, ease: 'power2.out' });
      }
    });
    btn.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' });
      }
    });
  });
}

// INIT
document.addEventListener('DOMContentLoaded', () => {
  crearParticulasIntro();
  crearParticulasHero();

  // AOS inmediato
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
  }

  initTilt();
  initRipple();
  initContadores();
  initSkillBars();
  initMagneticButtons();
});

/* =============================================
   ANIMACIONES CINEMATOGRÁFICAS
   Estilo Velar Estates adaptado a EM Code Studio
============================================= */

// ===== 1. ESTRELLAS DE FONDO EN INTRO =====
function crearEstrellas() {
  const cont = document.querySelector('.intro-stars');
  if (!cont) return;
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.classList.add('intro-star');
    const size   = Math.random() * 2.5 + 0.5;
    const x      = Math.random() * 100;
    const y      = Math.random() * 100;
    const dur    = Math.random() * 3 + 2;
    const delay  = Math.random() * 4;
    star.style.cssText = `
      width:${size}px; height:${size}px;
      left:${x}%; top:${y}%;
      animation-duration:${dur}s;
      animation-delay:${delay}s;
    `;
    cont.appendChild(star);
  }
}

// ===== 2. CONTADOR DE PORCENTAJE EN INTRO =====
function animarPorcentaje() {
  const el = document.querySelector('.intro-progress-pct');
  if (!el) return;
  let n = 0;
  const timer = setInterval(() => {
    n = Math.min(n + Math.floor(Math.random() * 8) + 2, 100);
    el.textContent = n + '%';
    if (n >= 100) clearInterval(timer);
  }, 50);
}

// ===== 3. LOGO VUELA AL HEADER (GSAP) =====
function logoFlyToHeader() {
  const logoCenter = document.querySelector('.intro-logo-center');
  const headerLogo = document.querySelector('.logo');
  if (!logoCenter || !headerLogo || typeof gsap === 'undefined') return;

  // Obtener posición del logo en el header
  const headerRect = headerLogo.getBoundingClientRect();
  const centerRect = logoCenter.getBoundingClientRect();

  const dx = headerRect.left - centerRect.left;
  const dy = headerRect.top  - centerRect.top;

  gsap.to(logoCenter, {
    x: dx, y: dy,
    scale: 0.35,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.inOut',
    onComplete: () => {
      // Hacer aparecer el logo del header con un destello
      gsap.fromTo(headerLogo, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.4 });
    }
  });
}

// ===== 4. NUBES SVG — INYECTAR EN EL HERO =====
function crearNubes() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Crear contenedor de nubes de abajo
  const cloudsBottom = document.createElement('div');
  cloudsBottom.classList.add('clouds-container');

  // SVG de nube genérica
  const cloudShape = `
    <svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <linearGradient id="cg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.12)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="90" rx="180" ry="60" fill="url(#cg)"/>
      <ellipse cx="120" cy="70" rx="100" ry="50" fill="url(#cg)"/>
      <ellipse cx="290" cy="75" rx="110" ry="45" fill="url(#cg)"/>
      <ellipse cx="60"  cy="85" rx="70"  ry="40" fill="url(#cg)"/>
      <ellipse cx="340" cy="88" rx="65"  ry="38" fill="url(#cg)"/>
    </svg>`;

  for (let i = 0; i < 4; i++) {
    const cloud = document.createElement('div');
    cloud.classList.add('cloud-svg');
    cloud.innerHTML = cloudShape.replace(/id="cg"/g, `id="cg${i}"`).replace(/url\(#cg\)/g, `url(#cg${i})`);
    cloudsBottom.appendChild(cloud);
  }
  hero.appendChild(cloudsBottom);

  // Línea decorativa del hero
  const heroLine = document.createElement('div');
  heroLine.classList.add('hero-line');
  hero.appendChild(heroLine);
}

// ===== 5. NUBES EN SECCIONES INTERIORES =====
function crearNubesSecciones() {
  const secciones = ['#servicios', '#portafolio'];
  secciones.forEach(sel => {
    const sec = document.querySelector(sel);
    if (!sec) return;
    sec.style.position = 'relative';
    sec.style.overflow = 'hidden';

    const cloudsTop = document.createElement('div');
    cloudsTop.classList.add('clouds-top');

    for (let i = 0; i < 2; i++) {
      const c = document.createElement('div');
      c.classList.add('cloud-top-svg');
      c.innerHTML = `
        <svg viewBox="0 0 500 80" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="250" cy="20" rx="220" ry="30" fill="rgba(255,255,255,0.06)"/>
          <ellipse cx="140" cy="30" rx="130" ry="28" fill="rgba(255,255,255,0.05)"/>
          <ellipse cx="370" cy="25" rx="140" ry="25" fill="rgba(255,255,255,0.04)"/>
        </svg>`;
      cloudsTop.appendChild(c);
    }
    sec.insertBefore(cloudsTop, sec.firstChild);
  });
}

// ===== 6. PARALLAX SUAVE AL HACER SCROLL =====
function initParallax() {
  const hero = document.querySelector('.hero');
  const banner = document.querySelector('.banner-svg');
  if (!hero || !banner) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroH   = hero.offsetHeight;
    if (scrollY < heroH) {
      const pct = scrollY / heroH;
      // Banner se mueve más lento que el scroll (efecto parallax)
      banner.style.transform = `translateY(${scrollY * 0.25}px)`;
      // Hero content se mueve aún más lento
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.12}px)`;
      }
    }
  }, { passive: true });
}

// ===== 7. FLASH DE TRANSICIÓN (como corte de película) =====
function crearFlashTransicion() {
  const flash = document.createElement('div');
  flash.classList.add('film-flash');
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 5000);
}

// ===== 8. INIT =====
document.addEventListener('DOMContentLoaded', () => {
  crearEstrellas();
  crearNubes();
  crearNubesSecciones();
  crearFlashTransicion();

  // Iniciar contador de % después del tiempo del intro
  setTimeout(animarPorcentaje, 2600);

  // Logo vuela al header justo antes de que desaparezca el intro
  setTimeout(logoFlyToHeader, 3800);

  // Parallax (después del intro)
  setTimeout(initParallax, 5000);
});

/* =============================================
   EFECTOS CINEMATOGRÁFICOS MEJORADOS
   Nubes volumétricas + efecto video en hero
============================================= */

// Crear capas cinematográficas en el hero
function initCinemaHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // 1. Grid de puntos animado
  const dotGrid = document.createElement('div');
  dotGrid.classList.add('hero-dot-grid');
  hero.insertBefore(dotGrid, hero.firstChild);

  // 2. Capa de video simulado
  const videoLayer = document.createElement('div');
  videoLayer.classList.add('hero-video-layer');
  hero.appendChild(videoLayer);

  // 3. Luz cenital
  const cineLight = document.createElement('div');
  cineLight.classList.add('cine-light');
  hero.appendChild(cineLight);

  // 4. Nubes volumétricas con SVG
  const cloudWrap = document.createElement('div');
  cloudWrap.classList.add('cloud-layer-wrap');

  // Fondos difusos de nube
  ['cloud-bg cloud-bg-1', 'cloud-bg cloud-bg-2', 'cloud-bg cloud-bg-3'].forEach(cls => {
    const d = document.createElement('div');
    cls.split(' ').forEach(c => d.classList.add(c));
    cloudWrap.appendChild(d);
  });

  // Nubes SVG volumétricas (3 capas)
  const cloudData = [
    { cls:'mega-cloud bottom',  delay:'0s',   dur:'18s', w:'110%', h:'220px', z:2, opacity:0.10 },
    { cls:'mega-cloud bottom-2',delay:'5s',   dur:'25s', w:'120%', h:'160px', z:2, opacity:0.07 },
    { cls:'mega-cloud bottom',  delay:'10s',  dur:'30s', w:'130%', h:'130px', z:2, opacity:0.05 },
  ];
  cloudData.forEach((cd, i) => {
    const c = document.createElement('div');
    cd.cls.split(' ').forEach(cl => c.classList.add(cl));
    c.style.cssText = `width:${cd.w};height:${cd.h};z-index:${cd.z};animation-delay:${cd.delay};animation-duration:${cd.dur};filter:blur(${8+i*4}px);`;
    c.innerHTML = buildCloudSVG(i, cd.opacity);
    cloudWrap.appendChild(c);
  });

  // Línea de horizonte
  const horizon = document.createElement('div');
  horizon.classList.add('horizon-glow');
  cloudWrap.appendChild(horizon);

  hero.appendChild(cloudWrap);

  // 5. Partículas de luz lenta (efecto video)
  for (let i = 0; i < 14; i++) {
    const p = document.createElement('div');
    p.classList.add('slow-light');
    const size  = Math.random() * 5 + 1;
    const x     = Math.random() * 100;
    const y     = Math.random() * 80 + 10;
    const dur   = Math.random() * 14 + 10;
    const delay = Math.random() * 10;
    const lx    = (Math.random() - 0.5) * 100;
    const ly    = -(Math.random() * 100 + 40);
    const color = Math.random() > 0.5
      ? 'rgba(51,255,153,0.6)'
      : 'rgba(179,136,255,0.5)';
    p.style.cssText = `
      width:${size}px;height:${size}px;
      left:${x}%;top:${y}%;
      background:${color};
      animation-duration:${dur}s;
      animation-delay:${delay}s;
      --lx:${lx}px;--ly:${ly}px;
    `;
    hero.appendChild(p);
  }
}

// Constructor de SVG de nube volumétrica
function buildCloudSVG(id, opacity) {
  const op = opacity;
  return `<svg viewBox="0 0 900 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;position:absolute;bottom:0;left:0">
    <defs>
      <radialGradient id="cvg${id}a" cx="50%" cy="40%" r="55%">
        <stop offset="0%"   stop-color="rgba(255,255,255,${op*2})"/>
        <stop offset="60%"  stop-color="rgba(255,255,255,${op})"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
      </radialGradient>
      <radialGradient id="cvg${id}b" cx="50%" cy="40%" r="55%">
        <stop offset="0%"   stop-color="rgba(255,255,255,${op*1.5})"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
      </radialGradient>
      <filter id="cf${id}"><feGaussianBlur stdDeviation="18"/></filter>
    </defs>
    <ellipse cx="450" cy="160" rx="440" ry="80"  fill="url(#cvg${id}a)" filter="url(#cf${id})"/>
    <ellipse cx="220" cy="145" rx="260" ry="65"  fill="url(#cvg${id}b)" filter="url(#cf${id})"/>
    <ellipse cx="680" cy="148" rx="240" ry="60"  fill="url(#cvg${id}b)" filter="url(#cf${id})"/>
    <ellipse cx="90"  cy="165" rx="140" ry="50"  fill="url(#cvg${id}a)" filter="url(#cf${id})"/>
    <ellipse cx="810" cy="162" rx="130" ry="48"  fill="url(#cvg${id}a)" filter="url(#cf${id})"/>
    <ellipse cx="450" cy="135" rx="350" ry="50"  fill="url(#cvg${id}b)" filter="url(#cf${id})"/>
  </svg>`;
}

// Parallax mejorado con GSAP si está disponible
function initParallaxMejorado() {
  const hero        = document.querySelector('.hero');
  const banner      = document.querySelector('.banner-svg');
  const heroContent = document.querySelector('.hero-content');
  const clouds      = document.querySelectorAll('.mega-cloud, .cloud-bg');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const sy   = window.scrollY;
    const heroH = hero.offsetHeight;
    if (sy > heroH) return;

    const pct = sy / heroH;

    if (banner) banner.style.transform = `translateY(${sy * 0.22}px)`;
    if (heroContent) heroContent.style.transform = `translateY(${sy * 0.10}px)`;

    // Nubes se mueven a distintas velocidades (efecto de profundidad)
    clouds.forEach((c, i) => {
      const factor = 0.06 + (i * 0.04);
      c.style.transform = `translateY(${sy * factor}px)`;
    });
  }, { passive: true });
}

// GSAP: entrada dramática del banner al cargar
function initBannerEntrance() {
  if (typeof gsap === 'undefined') return;
  const banner = document.querySelector('.banner-svg');
  if (!banner) return;
  gsap.from(banner, {
    opacity: 0, scale: 0.8, y: 40,
    duration: 1.2, ease: 'power3.out', delay: 0.8
  });
}

// Inicializar todo al cargar
document.addEventListener('DOMContentLoaded', () => {
  initCinemaHero();
  setTimeout(initParallaxMejorado, 200);
  setTimeout(initBannerEntrance, 300);
});
