(function () {
  "use strict";

  // Dynamic year
  var yearEl = document.querySelector(".year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Entrance animations (IntersectionObserver)
  var animTargets = document.querySelectorAll(".anim-hidden");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.remove("anim-hidden");
            entry.target.classList.add("anim-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animTargets.forEach(function (el) {
      el.classList.remove("anim-hidden");
    });
  }

  // Navbar active section highlight
  var sections = document.querySelectorAll(".section");
  var navLinks = document.querySelectorAll(".nav-links a");

  if (sections.length && navLinks.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute("id");
            navLinks.forEach(function (link) {
              link.classList.remove("active");
              if (link.getAttribute("href") === "#" + id) {
                link.classList.add("active");
              }
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }
})();
