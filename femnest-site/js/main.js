/* ==========================================================================
   FemNEST — main.js
   --------------------------------------------------------------------------
   Vanilla JS, no build step. Jobs on this page:
   1. Mobile nav toggle
   2. Footer "current year" stamp
   3. Native form handling (RSVP form on the event page) — inline
      confirmation, no page reload. The waitlist itself currently links out
      to the live tool at campsite.bio/femnest (see README.md "Waitlist"
      section for how to switch to a native form later).
   4. Scroll-reveal animation on [data-reveal] elements
   5. Count-up animation on the "Why now" stat numbers, triggered the
      moment their card is revealed
   6. A light parallax drift on the decorative hero blobs
   7. Cookie consent banner (see README.md "Cookies & analytics") —
      injected on every page, not just written into each HTML file
   All motion (4-6) is skipped outright under prefers-reduced-motion —
   see the isReducedMotion() check each one starts with.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  initMobileNav();
  stampFooterYear();
  initNativeForms();
  initScrollReveal();
  initParallax();
  initCookieBanner();
});

function isReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Fades/slides in any element marked [data-reveal] as it enters the
 * viewport (see the [data-reveal] rules in css/styles.css). Skips itself
 * entirely under prefers-reduced-motion — those elements are just shown,
 * no animation, no observer needed. Also kicks off the number count-up
 * (see animateStatNumber) the moment a stat card is revealed.
 */
function initScrollReveal() {
  var targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  if (isReducedMotion() || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) {
      el.classList.add('is-revealed');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          var numberEl = entry.target.querySelector('.stat-card__number[data-value]');
          if (numberEl) {
            animateStatNumber(numberEl);
          }
          var currencyEl = entry.target.querySelector('.problem-stat__figure[data-value]');
          if (currencyEl) {
            animateCurrencyNumber(currencyEl);
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
}

/**
 * Counts a stat number up from 0 to its real value (e.g. "29%", "24.5%",
 * "700M") over ~1.1s. The real value lives in data-value so the number is
 * still correct in the HTML source (and for no-JS / reduced-motion cases)
 * — this only rewrites the displayed text while the page is live.
 */
function animateStatNumber(el) {
  var target = el.getAttribute('data-value') || el.textContent.trim();
  var match = target.match(/^([\d.]+)(.*)$/);
  if (!match) return;

  var endValue = parseFloat(match[1]);
  var suffix = match[2];
  var decimals = (match[1].split('.')[1] || '').length;
  var duration = 1100;
  var startTime = null;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function frame(timestamp) {
    if (startTime === null) startTime = timestamp;
    var elapsed = timestamp - startTime;
    var progress = Math.min(elapsed / duration, 1);
    var current = endValue * easeOutCubic(progress);
    el.textContent = current.toFixed(decimals) + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(frame);
    } else {
      el.textContent = target;
    }
  }

  window.requestAnimationFrame(frame);
}

/**
 * Counts a euro figure up from &euro;0 to its real value (e.g. "&euro;436,437"),
 * formatting the thousands separator as it goes. Same "hold the real value
 * in data-value" pattern as animateStatNumber, just for currency figures
 * with commas rather than a percent/letter suffix.
 */
function animateCurrencyNumber(el) {
  var endValue = parseInt(el.getAttribute('data-value'), 10);
  if (isNaN(endValue)) return;

  var duration = 1400;
  var startTime = null;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function frame(timestamp) {
    if (startTime === null) startTime = timestamp;
    var elapsed = timestamp - startTime;
    var progress = Math.min(elapsed / duration, 1);
    var current = Math.round(endValue * easeOutCubic(progress));
    el.textContent = '€' + current.toLocaleString('en-US');
    if (progress < 1) {
      window.requestAnimationFrame(frame);
    } else {
      el.textContent = '€' + endValue.toLocaleString('en-US');
    }
  }

  window.requestAnimationFrame(frame);
}

/**
 * Subtle parallax drift on the decorative .blob elements: each one shifts
 * vertically at a slightly different rate as the page scrolls, so the
 * gradient backdrops feel alive rather than static. Purely decorative —
 * skipped entirely under prefers-reduced-motion, and the blobs are
 * aria-hidden so this never affects screen reader users.
 */
function initParallax() {
  if (isReducedMotion()) return;

  var blobs = document.querySelectorAll('.blob');
  if (!blobs.length) return;

  var ticking = false;

  function update() {
    var scrollY = window.scrollY;
    blobs.forEach(function (blob, index) {
      var speed = 0.06 + (index % 3) * 0.04;
      blob.style.transform = 'translateY(' + (scrollY * speed).toFixed(1) + 'px)';
    });
    ticking = false;
  }

  window.addEventListener(
    'scroll',
    function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  update();
}

function initMobileNav() {
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  var header = document.querySelector('.site-header');

  if (!toggle || !links || !header) return;

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('is-open');
    header.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

function stampFooterYear() {
  var yearEls = document.querySelectorAll('[data-current-year]');
  var year = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = year;
  });
}

/**
 * Any <form data-native-form> on the page gets inline "submitted" handling
 * instead of a real page navigation. Right now this is used for the event
 * RSVP form.
 *
 * TO GO LIVE: this currently only shows the inline confirmation locally —
 * it does not send the data anywhere. Point the form at a real endpoint by:
 *   1. Signing up for Formspree (or Google Forms / Mailchimp) and getting
 *      a form endpoint URL.
 *   2. Setting the `action` attribute on the <form> in the HTML to that
 *      URL (see the commented placeholder in event.html).
 *   3. Replacing the "TODO: wire to form service" block below with a
 *      real fetch() POST to `form.action` (Formspree's own JS snippet
 *      works too — see https://formspree.io/docs/).
 */
function initNativeForms() {
  var forms = document.querySelectorAll('[data-native-form]');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var panel = form.closest('.form-panel');
      var success = panel ? panel.querySelector('.form-success') : null;

      // TODO: wire to form service (Formspree / Google Form / Mailchimp).
      // Placeholder endpoint lives on the <form action="..."> attribute —
      // swap it for the real one, then replace this block with a fetch()
      // POST so submissions actually go somewhere.

      if (panel) {
        panel.classList.add('is-submitted');
      }
      if (success) {
        success.classList.add('is-visible');
        success.setAttribute('tabindex', '-1');
        success.focus();
      }
    });
  });
}

/**
 * Cookie consent banner — injected into every page (not hand-written into
 * each HTML file). No cookies/tracking actually fire yet (GA4/Hotjar are
 * commented out in every page's <head> pending real IDs — see README.md
 * "Analytics"), but the consent choice is captured now so that gate is
 * ready the moment analytics goes live: real init code should check
 * localStorage('femnest_cookie_consent') === 'accepted' (or listen for the
 * 'femnest:cookie-consent' event this dispatches) before loading anything.
 * A footer link with [data-cookie-settings] re-opens the banner so a
 * visitor can change their mind later.
 */
function initCookieBanner() {
  var STORAGE_KEY = 'femnest_cookie_consent';

  function currentChoice() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setChoice(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* private browsing / storage blocked — banner just won't persist */
    }
    document.dispatchEvent(
      new CustomEvent('femnest:cookie-consent', { detail: { choice: value } })
    );
  }

  function showBanner() {
    if (document.querySelector('.cookie-banner')) return;

    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie notice');
    banner.innerHTML =
      '<div class="cookie-banner__inner">' +
      '<p>We use essential cookies to run this site, and — once enabled — analytics cookies to understand how it’s used. See our <a href="privacy.html">Privacy Policy</a>.</p>' +
      '<div class="cookie-banner__actions">' +
      '<button type="button" class="btn btn-secondary" data-cookie-decline>Decline</button>' +
      '<button type="button" class="btn btn-primary" data-cookie-accept>Accept</button>' +
      '</div>' +
      '</div>';
    document.body.appendChild(banner);

    banner.querySelector('[data-cookie-accept]').addEventListener('click', function () {
      setChoice('accepted');
      banner.remove();
    });
    banner.querySelector('[data-cookie-decline]').addEventListener('click', function () {
      setChoice('declined');
      banner.remove();
    });
  }

  if (!currentChoice()) {
    showBanner();
  }

  document.addEventListener('click', function (event) {
    if (event.target.closest('[data-cookie-settings]')) {
      event.preventDefault();
      showBanner();
    }
  });
}
