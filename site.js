/* Mahmoud Abdel Wahab — motion system V4
   Native Web Animations + IntersectionObserver; no external CDN required.
   All content remains visible if JS fails, motion is disabled, or an animation errors. */
(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.replace('no-js', 'js');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });

  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const closeMenu = () => {
    if (!menu || !nav) return;
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.innerHTML = 'Menu <span>+</span>';
  };
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const opened = nav.classList.toggle('is-open');
      menu.setAttribute('aria-expanded', String(opened));
      menu.innerHTML = opened ? 'Close <span>×</span>' : 'Menu <span>+</span>';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeMenu(); });
  }

  const filters = [...document.querySelectorAll('[data-filter]')];
  const items = [...document.querySelectorAll('.project-item[data-kind]')];
  if (filters.length && items.length) {
    filters.forEach(button => button.addEventListener('click', () => {
      const kind = button.dataset.filter;
      filters.forEach(btn => {
        const active = btn === button;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
      });
      items.forEach(item => {
        const show = kind === 'all' || item.dataset.kind === kind;
        item.classList.toggle('is-hidden', !show);
        if (show) item.removeAttribute('aria-hidden'); else item.setAttribute('aria-hidden', 'true');
      });
      const grid = document.getElementById('selected-grid');
      const note = document.querySelector('.filtered-empty');
      if (grid && note) note.hidden = !!grid.querySelector('.project-item:not(.is-hidden)');
    }));
  }

  const dialog = document.getElementById('lightbox');
  if (dialog && typeof dialog.showModal === 'function') {
    const img = dialog.querySelector('figure img');
    const caption = dialog.querySelector('figcaption');
    const prev = dialog.querySelector('.lightbox-prev');
    const next = dialog.querySelector('.lightbox-next');
    let current = -1, buttons = [];
    function openAt(index) {
      buttons = [...document.querySelectorAll('[data-full-src]')];
      if (!buttons.length) return;
      current = (index + buttons.length) % buttons.length;
      const button = buttons[current];
      img.src = button.dataset.fullSrc;
      img.alt = button.dataset.alt || '';
      caption.textContent = button.dataset.caption || '';
      if (!dialog.open) dialog.showModal();
      prev.hidden = next.hidden = buttons.length < 2;
    }
    document.addEventListener('click', e => {
      const button = e.target.closest('[data-full-src]');
      if (button) openAt([...document.querySelectorAll('[data-full-src]')].indexOf(button));
    });
    dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
    prev.addEventListener('click', () => openAt(current - 1));
    next.addEventListener('click', () => openAt(current + 1));
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
    document.addEventListener('keydown', e => {
      if (!dialog.open) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault(); openAt(current + (e.key === 'ArrowRight' ? 1 : -1));
      }
    });
    dialog.addEventListener('close', () => { img.removeAttribute('src'); current = -1; });
  }

  const canAnimate = !reduced.matches && typeof Element.prototype.animate === 'function';
  const isSmall = matchMedia('(max-width: 700px)').matches;
  const duration = isSmall ? 430 : 660;
  const easing = 'cubic-bezier(0.16, 1, 0.3, 1)';
  const animate = (el, frames, options) => {
    try { const effect = el.animate(frames, { duration, easing, fill: 'both', ...options }); effect.onfinish = () => effect.cancel(); return effect; }
    catch (_) { return null; }
  };

  if (canAnimate) {
    const hero = document.querySelector('.hero');
    const intro = hero ? [
      hero.querySelector('.hero-kicker'), hero.querySelector('h1'),
      hero.querySelector('.hero-signature'), hero.querySelector('.hero-aside'),
      hero.querySelector('.hero-bottomline')
    ].filter(Boolean) : [];
    intro.forEach((el, index) => animate(el,
      [{ opacity: 0, transform: `translate3d(0,${isSmall ? 16 : 34}px,0)` }, { opacity: 1, transform: 'translate3d(0,0,0)' }],
      { delay: 90 + index * (isSmall ? 65 : 115), duration: isSmall ? 480 : 760 }));

    const candidates = document.querySelectorAll([
      '.section-head', '.section-kicker', '.capabilities-heading', '.capability',
      '.work-card', '.archive-row', '.about-label', '.about-content',
      '.contact-section > h2', '.contact-option', '.direct-contact',
      '.case-topline', '.case-intro', '.case-info-row', '.gallery-heading',
      '.gallery-item', '.case-contact', '.project-pagination'
    ].join(','));
    const seen = new WeakSet();
    const reveal = el => {
      if (seen.has(el) || el.classList.contains('is-hidden')) return;
      seen.add(el);
      const gallery = el.classList.contains('gallery-item');
      const imageCard = el.classList.contains('work-card');
      const row = el.classList.contains('archive-row');
      const y = isSmall ? 16 : (gallery ? 25 : row ? 18 : 38);
      const delay = gallery ? 0 : (imageCard ? 60 : 0);
      animate(el, [
        { opacity: 0, transform: `translate3d(0,${y}px,0)` },
        { opacity: 1, transform: 'translate3d(0,0,0)' }
      ], { duration: gallery ? 510 : duration, delay });
      const img = el.querySelector('.work-image img');
      if (img && !isSmall) animate(img,
        [{ clipPath: 'inset(0 0 12% 0)', transform: 'scale(1.065)' },
         { clipPath: 'inset(0 0 0 0)', transform: 'scale(1)' }],
        { duration: 820, delay: 70 });
    };
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -36px 0px', threshold: 0.08 });
      candidates.forEach(el => observer.observe(el));
    } else candidates.forEach(reveal);

    const progress = document.createElement('div');
    progress.className = 'reading-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.append(progress);
    let scheduled = false;
    const updateProgress = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      progress.style.transform = `scaleX(${Math.min(1, Math.max(0, scrollY / max))})`;
      scheduled = false;
    };
    addEventListener('scroll', () => {
      if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); }
    }, { passive: true });
    addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }
})();