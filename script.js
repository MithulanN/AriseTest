/* ═══════════════════════════════════════════
   ARISE — script.js  (v4 minimalist / light)
═══════════════════════════════════════════ */
(function () {
  'use strict';

  const qs  = (s, c = document) => c.querySelector(s);
  const qsa = (s, c = document) => [...c.querySelectorAll(s)];


  /* ─────────────────────────────────────────
     LOADER
     Waits for fonts + hero image, then fades.
  ───────────────────────────────────────── */
  const loader    = qs('#loader');
  const loaderFill = qs('#loaderFill');
  const loaderLbl  = qs('#loaderLabel');

  function setProgress(pct, label) {
    if (loaderFill) loaderFill.style.width = pct + '%';
    if (loaderLbl)  loaderLbl.textContent  = label;
  }

  function dismissLoader() {
    loader.classList.add('loader--out');
    loader.addEventListener('transitionend', () => {
      loader.classList.add('loader--gone');
    }, { once: true });
  }

  function runLoader() {
    if (!loader) { initAll(); return; }

    setProgress(10, 'Loading fonts…');

    const fontReady = document.fonts ? document.fonts.ready : Promise.resolve();

    fontReady.then(() => {
      setProgress(50, 'Loading assets…');

      const heroSrc = qs('#heroBgImg')?.getAttribute('src');
      if (heroSrc) {
        const img = new Image();
        img.onload  = () => { setProgress(90, 'Almost there…'); finishLoader(); };
        img.onerror = () => { setProgress(90, 'Almost there…'); finishLoader(); };
        img.src = heroSrc;
      } else {
        setProgress(90, 'Almost there…');
        finishLoader();
      }
    });
  }

  function finishLoader() {
    setTimeout(() => {
      setProgress(100, 'Ready');
      setTimeout(() => {
        dismissLoader();
        initAll();
      }, 300);
    }, 150);
  }


  /* ─────────────────────────────────────────
     CUSTOM CURSOR
     Lerped translate3d only — no top/left.
  ───────────────────────────────────────── */
  function initCursor() {
    const cursor    = qs('#cursor');
    const cursorDot = qs('#cursorDot');
    if (!cursor || !cursorDot) return;

    const isPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isPointer) {
      cursor.style.display    = 'none';
      cursorDot.style.display = 'none';
      return;
    }

    const R  = 18;  // cursor radius  (36 / 2)
    const DR = 2;   // dot radius     ( 4 / 2)

    let mx = -200, my = -200;
    let cx = -200, cy = -200;
    let dx = -200, dy = -200;
    let lastCX, lastCY, lastDX, lastDY;

    const lerp = (a, b, t) => a + (b - a) * t;

    document.addEventListener('mousemove',  e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    document.addEventListener('mouseleave', () => { mx = -200; my = -200; });

    document.addEventListener('mouseover', e => {
      if (e.target.closest('a, button, [data-cursor]')) cursor.classList.add('expanded');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest('a, button, [data-cursor]')) cursor.classList.remove('expanded');
    });

    function tick() {
      cx = lerp(cx, mx, 0.10);
      cy = lerp(cy, my, 0.10);
      dx = lerp(dx, mx, 0.28);
      dy = lerp(dy, my, 0.28);

      const ncx = Math.round(cx * 100) / 100;
      const ncy = Math.round(cy * 100) / 100;
      const ndx = Math.round(dx * 100) / 100;
      const ndy = Math.round(dy * 100) / 100;

      if (ncx !== lastCX || ncy !== lastCY) {
        cursor.style.transform = `translate3d(${ncx - R}px, ${ncy - R}px, 0)`;
        lastCX = ncx; lastCY = ncy;
      }
      if (ndx !== lastDX || ndy !== lastDY) {
        cursorDot.style.transform = `translate3d(${ndx - DR}px, ${ndy - DR}px, 0)`;
        lastDX = ndx; lastDY = ndy;
      }

      requestAnimationFrame(tick);
    }
    tick();
  }


  /* ─────────────────────────────────────────
     NAVBAR — scroll state + active link
  ───────────────────────────────────────── */
  function initNav() {
    const navbar = qs('#navbar');
    if (!navbar) return;

    const page = window.location.pathname.split('/').pop() || 'index.html';
    qsa('.navLink').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === page);
    });
  }


  /* ─────────────────────────────────────────
     HAMBURGER / MOBILE DRAWER
  ───────────────────────────────────────── */
  function initMobileMenu() {
    const hamburger  = qs('#hamburger');
    const mobileMenu = qs('#mobileMenu');
    const mobileClose = qs('#mobileClose');
    if (!hamburger || !mobileMenu) return;

    function open() {
      hamburger.classList.add('open');
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () =>
      hamburger.classList.contains('open') ? close() : open()
    );
    if (mobileClose) mobileClose.addEventListener('click', close);
    qsa('.mobileLink').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }


  /* ─────────────────────────────────────────
     INTERSECTION OBSERVER — simple reveals
  ───────────────────────────────────────── */
  function initReveals() {
    // Immediately show everything if IO not supported
    if (!('IntersectionObserver' in window)) {
      qsa('[data-reveal]').forEach(el => el.classList.add('visible'));
      qsa('.figureVal').forEach(el => {
        el.textContent = el.dataset.count + (el.dataset.suffix || '');
        el.closest('.figureCell')?.classList.add('counted');
      });
      return;
    }

    // Generic reveal (fade / rise)
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revObs.unobserve(entry.target);
      });
    }, { threshold: 0.14 });

    qsa('[data-reveal]').forEach(el => revObs.observe(el));

    // Stat count-up
    const countObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const cell  = entry.target;
        const valEl = qs('.figureVal', cell);
        if (!valEl) return;

        const target   = parseInt(valEl.dataset.count, 10);
        const suffix   = valEl.dataset.suffix || '';
        const duration = 1300;
        const start    = performance.now();

        function step(now) {
          const p = Math.min((now - start) / duration, 1);
          const e = 1 - Math.pow(1 - p, 3);
          valEl.textContent = Math.round(e * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
          else { valEl.textContent = target + suffix; cell.classList.add('counted'); }
        }
        requestAnimationFrame(step);
        countObs.unobserve(cell);
      });
    }, { threshold: 0.25 });

    qsa('.figureCell').forEach(el => countObs.observe(el));
  }


  /* ─────────────────────────────────────────
     INIT ALL
  ───────────────────────────────────────── */
  function initAll() {
    initCursor();
    initNav();
    initMobileMenu();
    initReveals();
  }

  /* ── Kick off ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runLoader);
  } else {
    runLoader();
  }

})();