/* Uganda Game Developers Association — site behaviour.
   No dependencies; every page loads this one file. */
(function () {
  'use strict';

  /* --- mobile navigation ------------------------------------------------ */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* --- mark the current page in the nav --------------------------------- */
  /* Home is linked as "./" so the canonical URL is the bare domain; treat
     "", "./" and "index.html" as the same page. */
  var pageOf = function (path) {
    var last = path.split('/').pop();
    return (!last || last === '.') ? 'index.html' : last;
  };
  var here = pageOf(location.pathname);
  document.querySelectorAll('.nav__list > li > a').forEach(function (link) {
    var target = link.getAttribute('href');
    if (!target || target.charAt(0) === '#') return;
    if (pageOf(target) === here) {
      link.parentElement.classList.add('nav__item--active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* --- back to top ------------------------------------------------------ */
  var toTop = document.querySelector('.to-top');
  if (toTop) {
    var onScroll = function () {
      toTop.classList.toggle('is-visible', window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- FAQ accordion ---------------------------------------------------- */
  document.querySelectorAll('.faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
    });
  });

  /* --- reveal on scroll ------------------------------------------------- */
  var revealables = document.querySelectorAll('.reveal');
  if (revealables.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -80px 0px', threshold: 0.05 });
      revealables.forEach(function (el) { io.observe(el); });
    } else {
      revealables.forEach(function (el) { el.classList.add('is-in'); });
    }
  }

  /* --- footer year ------------------------------------------------------ */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
