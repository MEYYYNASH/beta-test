/* ==========================================================================
   PAGE TRANSITIONS SCRIPT — liquid-glass-portfolio
   Works for both root/index.html and cybertools/index.html
   ========================================================================== */
(function () {
  'use strict';

  const DURATION = 540;
  const EASE     = 'cubic-bezier(0.76, 0, 0.24, 1)';

  const bar     = document.getElementById('pt-bar');
  const curtain = document.getElementById('pt-curtain');
  const panel   = document.getElementById('pt-panel');
  const logo    = document.getElementById('pt-logo');

  if (!curtain || !panel) return;

  /* ── Progress bar ── */
  let _barTimer = null;
  function barStart() {
    bar.style.transition = 'none';
    bar.style.width = '0%';
    bar.style.opacity = '1';
    let p = 0;
    clearInterval(_barTimer);
    _barTimer = setInterval(() => {
      p += Math.random() * 15;
      bar.style.transition = 'width 0.22s ease';
      bar.style.width = Math.min(p, 80) + '%';
    }, 170);
  }
  function barDone() {
    clearInterval(_barTimer);
    bar.style.transition = 'width 0.18s ease, opacity 0.4s ease 0.12s';
    bar.style.width = '100%';
    setTimeout(() => { bar.style.opacity = '0'; }, 250);
  }

  /* ── Show / hide curtain ── */
  function show(instant) {
    curtain.style.visibility = 'visible';
    curtain.style.pointerEvents = 'all';
    if (instant) {
      panel.style.transition = 'none';
      if (logo) logo.style.transition = 'none';
    }
  }
  function hide() {
    curtain.style.pointerEvents = 'none';
    panel.style.transition = 'none';
    panel.style.transform = 'translateY(110%)';
    if (logo) logo.style.opacity = '0';
    curtain.style.visibility = 'hidden';
  }

  /* ── Slide panel in (exit: covers page) ── */
  function slideIn(cb) {
    panel.style.transition = `transform ${DURATION}ms ${EASE}`;
    panel.style.transform = 'translateY(0%)';
    if (logo) {
      logo.style.transition = 'opacity 0.2s ease 0.2s';
      logo.style.opacity = '1';
    }
    setTimeout(cb, DURATION + 30);
  }

  /* ── Slide panel out (entrance: uncovers page) ── */
  function slideOut(cb) {
    panel.style.transition = `transform ${DURATION}ms ${EASE}`;
    panel.style.transform = 'translateY(-110%)';
    if (logo) {
      logo.style.transition = 'opacity 0.15s ease';
      logo.style.opacity = '0';
    }
    setTimeout(() => { hide(); if (cb) cb(); }, DURATION + 30);
  }

  /* ── Navigate away (exit animation) ── */
  function exit(url) {
    barStart();
    show(false);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      slideIn(() => {
        try { sessionStorage.setItem('__pt2', '1'); } catch (_) {}
        location.href = url;
      });
    }));
  }

  /* ── New page entrance ── */
  function entrance() {
    show(true);
    panel.style.transform = 'translateY(0%)';
    if (logo) logo.style.opacity = '1';
    barStart(); barDone();
    requestAnimationFrame(() => requestAnimationFrame(() => slideOut()));
  }

  /* ── Intercept clicks ── */
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (
      href.startsWith('#')       ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')    ||
      a.target === '_blank'      ||
      a.hasAttribute('download')
    ) return;
    try {
      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return;
      // same page (hash-only change)
      if (url.pathname === location.pathname && url.search === location.search) return;
      e.preventDefault();
      exit(url.href);
    } catch (_) {}
  }, true);

  /* ── Init on load ── */
  function init() {
    let enter = false;
    try {
      if (sessionStorage.getItem('__pt2') === '1') {
        sessionStorage.removeItem('__pt2');
        enter = true;
      }
    } catch (_) {}
    if (enter) { entrance(); } else { hide(); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
