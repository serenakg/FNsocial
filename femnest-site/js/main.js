/* ==========================================================================
   FemNEST — main.js
   --------------------------------------------------------------------------
   Vanilla JS, no build step. Three jobs on this page:
   1. Mobile nav toggle
   2. Footer "current year" stamp
   3. Native form handling (RSVP form on the event page) — inline
      confirmation, no page reload. The waitlist itself currently links out
      to the live tool at campsite.bio/femnest (see README.md "Waitlist"
      section for how to switch to a native form later).
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  initMobileNav();
  stampFooterYear();
  initNativeForms();
});

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
