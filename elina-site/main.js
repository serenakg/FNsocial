/* ==========================================================================
   Elina · small site script
   1. Mobile navigation toggle
   2. Sticky header state
   3. Subtle scroll reveal
   All text lives in the HTML. This file only adds behaviour.
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");

  /* 1. Mobile navigation toggle
     ---------------------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    // Close with the Escape key and return focus to the button
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        toggle.focus();
      }
    });

    // Close when a menu link is chosen
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });

    // Reset if the window grows to desktop width
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 960) closeNav();
    });
  }

  /* 2. Sticky header state
     ---------------------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* 3. Subtle scroll reveal (skipped if the visitor prefers reduced motion)
     ---------------------------------------------------------------------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");

  if (!reduceMotion && "IntersectionObserver" in window && items.length) {
    root.classList.add("reveal-ready");
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    items.forEach(function (item) { observer.observe(item); });
  }
})();
