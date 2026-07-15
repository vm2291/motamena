// MATH OLYMPIAD TRAINER ACADEMY — interaction script

(() => {
  // ===== Theme toggle =====
  const root = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);

  const sunIcon =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  const moonIcon =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  const renderToggle = () => {
    if (!toggle) return;
    toggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  };
  renderToggle();
  toggle?.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    renderToggle();
  });

  // ===== Sticky header shadow =====
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Keep the home hero within the viewport after accounting for the
  // announcement bar and navigation, including when either wraps on mobile.
  const hero = document.querySelector('.hero');
  const announce = document.querySelector('.announce');
  if (hero) {
    const updateTopChromeHeight = () => {
      const announcementHeight = announce?.getBoundingClientRect().height ?? 0;
      const headerHeight = header?.getBoundingClientRect().height ?? 0;
      root.style.setProperty(
        '--top-chrome-height',
        `${Math.ceil(announcementHeight + headerHeight)}px`
      );
    };

    updateTopChromeHeight();
    window.addEventListener('load', updateTopChromeHeight);
    window.addEventListener('resize', updateTopChromeHeight, { passive: true });

    if ('ResizeObserver' in window) {
      const topChromeObserver = new ResizeObserver(updateTopChromeHeight);
      if (announce) topChromeObserver.observe(announce);
      if (header) topChromeObserver.observe(header);
    }
  }

  // ===== Mobile menu =====
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('.nav');
  menuToggle?.addEventListener('click', () => {
    nav?.classList.toggle('is-open');
    const expanded = nav?.classList.contains('is-open');
    menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });
  // close on link click (mobile)
  nav?.querySelectorAll('.nav__link').forEach((a) =>
    a.addEventListener('click', () => nav.classList.remove('is-open'))
  );

  // ===== Reveal on scroll =====
  // Any element already inside (or above) the viewport is revealed immediately.
  // The observer then handles anything the user scrolls into.
  const targets = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((t) => t.classList.add('is-visible'));
  } else if (targets.length) {
    // Reveal anything already at or above the fold on load, so tall elements
    // whose top is above the observation margin don't stay invisible forever.
    const viewportH = window.innerHeight;
    targets.forEach((t) => {
      const top = t.getBoundingClientRect().top;
      if (top < viewportH * 0.95) t.classList.add('is-visible');
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -5% 0px' }
    );
    targets.forEach((t) => {
      if (!t.classList.contains('is-visible')) io.observe(t);
    });
  }

  // ===== Current year in footer =====
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  // ===== Explore dropdown (grouped nav) =====
  // Desktop (>880px): the button toggles the flyout; hover/focus-within also
  //   opens it via CSS. Keyboard: Enter/Space toggles, Arrow Up/Down move
  //   between sub-links, Esc closes and returns focus, click-outside closes.
  // Mobile (<=880px, inside .nav.is-open drawer): the button acts as an
  //   accordion toggle that expands the sub-links inline.
  const dropdown = document.querySelector('.nav__item--dropdown');
  if (dropdown) {
    const dToggle = dropdown.querySelector('.nav__dropdown-toggle');
    const dMenu = dropdown.querySelector('.nav__dropdown-menu');
    const dLinks = Array.from(dropdown.querySelectorAll('.nav__dropdown-link'));
    const isMobile = () => window.matchMedia('(max-width: 880px)').matches;

    const openDropdown = (focusFirst) => {
      dropdown.classList.add('is-open');
      dToggle.setAttribute('aria-expanded', 'true');
      if (focusFirst && dLinks.length) dLinks[0].focus();
    };
    const closeDropdown = (returnFocus) => {
      dropdown.classList.remove('is-open');
      dToggle.setAttribute('aria-expanded', 'false');
      if (returnFocus) dToggle.focus();
    };
    const isOpen = () => dropdown.classList.contains('is-open');

    dToggle.addEventListener('click', (e) => {
      e.preventDefault();
      isOpen() ? closeDropdown(false) : openDropdown(false);
    });

    dToggle.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        openDropdown(true);
      } else if (e.key === 'Escape' && isOpen()) {
        e.preventDefault();
        closeDropdown(true);
      }
    });

    // Arrow navigation + Esc within the submenu
    dMenu.addEventListener('keydown', (e) => {
      const idx = dLinks.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        dLinks[(idx + 1) % dLinks.length].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        dLinks[(idx - 1 + dLinks.length) % dLinks.length].focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        dLinks[0].focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        dLinks[dLinks.length - 1].focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeDropdown(true);
      }
    });

    // Click outside closes (desktop)
    document.addEventListener('click', (e) => {
      if (isOpen() && !dropdown.contains(e.target)) closeDropdown(false);
    });

    // Focus leaving the whole dropdown closes it (desktop keyboard/Tab)
    dropdown.addEventListener('focusout', (e) => {
      if (!isMobile() && !dropdown.contains(e.relatedTarget)) closeDropdown(false);
    });

    // Sub-links close the mobile drawer on tap (mirrors .nav__link behaviour)
    dLinks.forEach((a) =>
      a.addEventListener('click', () => {
        if (nav) nav.classList.remove('is-open');
        closeDropdown(false);
      })
    );

    // Reset state when crossing the mobile/desktop boundary
    window.addEventListener('resize', () => {
      if (isOpen()) closeDropdown(false);
    });
  }
})();
