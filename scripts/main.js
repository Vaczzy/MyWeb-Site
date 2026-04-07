(function () {
  "use strict";

  // Dynamic footer year
  var yearEl = document.querySelector(".year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Intersection Observer for entrance animations
  var animTargets = document.querySelectorAll(".hidden");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.remove("hidden");
            entry.target.classList.add("animate-in");
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
    // Fallback: show all elements immediately
    animTargets.forEach(function (el) {
      el.classList.remove("hidden");
    });
  }

  // Subtle card tilt effect on mouse move
  var cards = document.querySelectorAll(".card");
  var maxRotation = 3;

  cards.forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;
      var percentX = (e.clientX - centerX) / (rect.width / 2);
      var percentY = (e.clientY - centerY) / (rect.height / 2);

      var rotateY = percentX * maxRotation;
      var rotateX = -percentY * maxRotation;

      card.style.transform =
        "translateY(-4px) perspective(800px) rotateX(" +
        rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });
})();
