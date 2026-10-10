document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const BREAKPOINT = 600; 
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!navToggle || !navLinks) return;

  const isOpen = () => navLinks.classList.contains('open');

  const setOpen = (open, { returnFocus = false } = {}) => {
    navLinks.classList.toggle('open', open);
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (!open && returnFocus) navToggle.focus();
  };

  setOpen(false);

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!isOpen());
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('click', (e) => {
    if (isOpen() && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      setOpen(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) setOpen(false, { returnFocus: true });
  });

  const mq = window.matchMedia(`(min-width: ${BREAKPOINT + 1}px)`);
  const onChange = (e) => { if (e.matches) setOpen(false); };
  if (mq.addEventListener) mq.addEventListener('change', onChange);
  else if (mq.addListener) mq.addListener(onChange); // older Safari

  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  navLinks.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (/^https?:/i.test(href) || href.startsWith('mailto:')) return;
    if (href.split('#')[0].toLowerCase() === current) {
      link.setAttribute('aria-current', 'page');
    }
  });
});