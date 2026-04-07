(function () {
  "use strict";

  // DOM References
  const getLocBtn = document.getElementById("getloc");
  const btnText = getLocBtn.querySelector(".btn-text");
  const statusEl = document.getElementById("status");
  const statusMsg = statusEl.querySelector(".status-msg");
  const resultGrid = document.getElementById("resultGrid");
  const latValue = document.getElementById("latValue");
  const latUnit = document.getElementById("latUnit");
  const lngValue = document.getElementById("lngValue");
  const lngUnit = document.getElementById("lngUnit");
  const accValue = document.getElementById("accValue");
  const accUnit = document.getElementById("accUnit");
  const searchForm = document.getElementById("searchForm");
  const yearEl = document.querySelector(".year");

  // Dynamic year
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Geolocation options
  const geoOptions = {
    enableHighAccuracy: true,
    timeout: 8000,
    maximumAge: 0
  };

  // Set status display
  function setStatus(state, message) {
    statusEl.className = "status-indicator " + state;
    statusMsg.textContent = message;
  }

  // Set button loading state
  function setButtonLoading(isLoading) {
    if (isLoading) {
      getLocBtn.classList.add("loading");
      btnText.textContent = "Locating...";
    } else {
      getLocBtn.classList.remove("loading");
      btnText.textContent = "Get Location";
    }
  }

  // Format coordinate value
  function formatCoord(value, positive, negative) {
    const direction = value >= 0 ? positive : negative;
    return {
      value: Math.abs(value).toFixed(6) + "\u00B0",
      unit: direction
    };
  }

  // Show result with animation
  function showResults(lat, lng, accuracy) {
    const latFormatted = formatCoord(lat, "N", "S");
    const lngFormatted = formatCoord(lng, "E", "W");

    latValue.textContent = latFormatted.value;
    latUnit.textContent = latFormatted.unit;
    lngValue.textContent = lngFormatted.value;
    lngUnit.textContent = lngFormatted.unit;
    accValue.textContent = "\u00B1" + accuracy.toFixed(1);
    accUnit.textContent = "meters";

    resultGrid.classList.remove("hidden");

    const items = resultGrid.querySelectorAll(".coord-item");
    items.forEach(function (item) {
      item.classList.remove("show");
      void item.offsetWidth;
      item.classList.add("show");
    });
  }

  // Geolocation success
  function onLocationSuccess(pos) {
    const coords = pos.coords;
    setButtonLoading(false);
    setStatus("success", "Location acquired");
    showResults(coords.latitude, coords.longitude, coords.accuracy);
  }

  // Geolocation error
  function onLocationError(err) {
    setButtonLoading(false);

    const messages = {
      1: "Permission denied. Please allow location access in your browser.",
      2: "Position unavailable. Please try again.",
      3: "Request timed out. Please try again."
    };

    const message = messages[err.code] || "An unknown error occurred.";
    setStatus("error", message);
    console.warn("Geolocation error (" + err.code + "): " + err.message);
  }

  // Request location
  function requestLocation() {
    setButtonLoading(true);
    setStatus("loading", "Acquiring position...");
    navigator.geolocation.getCurrentPosition(
      onLocationSuccess,
      onLocationError,
      geoOptions
    );
  }

  // Entrance animations (IntersectionObserver)
  function initAnimations() {
    const targets = document.querySelectorAll(".anim-hidden");

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
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

      targets.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      targets.forEach(function (el) {
        el.classList.remove("anim-hidden");
      });
    }
  }

  // Init
  function init() {
    // Check Geolocation API support
    if (!navigator.geolocation) {
      getLocBtn.disabled = true;
      setStatus("error", "Your browser does not support geolocation.");
      return;
    }

    getLocBtn.addEventListener("click", requestLocation);

    // Prevent search form from refreshing the page
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
    });

    initAnimations();
  }

  init();
})();
