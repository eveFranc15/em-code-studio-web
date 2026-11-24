/* =============================================
   SCRIPT.JS — EM Code Studio
   Funcionalidad general
   Curso: Animaciones para la Web
   Docente: Ing. Walter Quispe Pretel
============================================= */

// 1. INTRO — ocultar después de 4.5s
window.addEventListener('load', () => {
  const intro = document.getElementById('introScreen');
  if (!intro) return;
  setTimeout(() => {
    intro.classList.add('hide');
    setTimeout(() => intro.remove(), 800);
  }, 4500);
});

// 2. CURSOR PERSONALIZADO
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
if (cursor && cursorRing) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });
  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();
  document.querySelectorAll('a, button, .service-card, .portfolio-card, .tech-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('active'); cursorRing.classList.add('active'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('active'); cursorRing.classList.remove('active'); });
  });
}

// 3. MENÚ HAMBURGUESA
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');
if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMobile.classList.toggle('open');
  });
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMobile.classList.remove('open');
    });
  });
}

// 4. HEADER AL HACER SCROLL
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// 5. SCROLL SUAVE (RF06)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// 6. ACTIVE LINK (scroll spy)
const secciones = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  secciones.forEach(sec => {
    const top = sec.offsetTop - 130;
    const bottom = top + sec.offsetHeight;
    const id = sec.getAttribute('id');
    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${id}`) a.classList.add('active');
      });
    }
  });
}, { passive: true });

// 7. BOTÓN VOLVER ARRIBA
const backBtn = document.getElementById('backToTop');
if (backBtn) {
  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// 8. TYPEWRITER (RF04 — escritura al scroll)
function initTypewriter() {
  const el = document.getElementById('typewriterText');
  if (!el) return;
  const fullText = el.dataset.text || '';
  el.textContent = '';
  let i = 0, started = false;
  function escribir() {
    if (i < fullText.length) {
      el.textContent += fullText[i];
      i++;
      const c = fullText[i - 1];
      setTimeout(escribir, (c === '.' || c === ',') ? 180 : 28);
    } else {
      el.classList.add('done');
    }
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        setTimeout(escribir, 400);
        obs.disconnect();
      }
    });
  }, { threshold: 0.4 });
  obs.observe(el);
}

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
});

// 9. LIGHTBOX DE PROYECTOS (galería + tarjetas de portafolio como "Braza y Sabor")
(function () {
  const galleryItems  = document.querySelectorAll('.gallery-item');
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc  = document.getElementById('lightboxDesc');
  const lightboxTags  = document.getElementById('lightboxTags');
  if (!lightbox || !galleryItems.length) return;

  // Se arma la lista de proyectos leyendo la propia galería, así el índice de
  // abrirLightbox(n) siempre coincide con el orden real de .gallery-item en el HTML.
  const proyectos = Array.from(galleryItems).map(item => {
    const p = item.querySelector('.gallery-overlay-content p');
    return {
      img:   item.querySelector('img')?.getAttribute('src') || '',
      title: item.querySelector('h4')?.textContent.trim() || '',
      desc:  p ? p.textContent.trim() : '',
      tags:  p ? p.textContent.split('·').map(t => t.trim()).filter(Boolean) : []
    };
  });

  let current = 0;

  function render(index) {
    const proyecto = proyectos[index];
    if (!proyecto) return;
    current = index;
    lightboxImg.innerHTML = `<img src="${proyecto.img}" alt="${proyecto.title}">`;
    lightboxTitle.textContent = proyecto.title;
    lightboxDesc.textContent  = proyecto.desc;
    lightboxTags.innerHTML    = proyecto.tags.map(t => `<span>${t}</span>`).join('');
  }

  window.abrirLightbox = function (index) {
    render(index);
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  window.cerrarLightbox = function () {
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  window.lightboxNav = function (dir) {
    const next = (current + dir + proyectos.length) % proyectos.length;
    render(next);
  };

  document.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') !== 'false') return;
    if (e.key === 'Escape')     window.cerrarLightbox();
    if (e.key === 'ArrowLeft')  window.lightboxNav(-1);
    if (e.key === 'ArrowRight') window.lightboxNav(1);
  });
})();

/* ==========================================================
   10. MODO CLARO / OSCURO (theme toggle)
   El tema ya se aplica al cargar (script inline en el <head>,
   antes de pintar, para evitar el parpadeo). Aquí solo se
   maneja el clic del botón y se guarda la preferencia.
========================================================== */
(function () {
  const btn = document.getElementById('themeToggle');
  const root = document.documentElement;
  if (!btn) return;

  function actualizarAria() {
    const esClaro = root.getAttribute('data-theme') === 'light';
    btn.setAttribute('aria-label', esClaro ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
  }
  actualizarAria();

  btn.addEventListener('click', () => {
    const esClaro = root.getAttribute('data-theme') === 'light';
    if (esClaro) {
      root.removeAttribute('data-theme');
      localStorage.setItem('em-code-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('em-code-theme', 'light');
    }
    actualizarAria();
  });
})();
