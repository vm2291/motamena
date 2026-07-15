(function () {
  "use strict";

  var config = window.MOTA_APPLICATION || {};
  var link = document.getElementById("interest-form-link");
  var status = document.getElementById("interest-form-status");

  if (!link || !status) return;

  var validGoogleForm = /^https:\/\/docs\.google\.com\/forms\//.test(config.formUrl || "");
  if (config.isOpen === true && validGoogleForm) {
    link.href = config.formUrl;
    link.hidden = false;
    link.target = "_blank";
    link.rel = "noopener";
    status.textContent = "Applications are collected through the dedicated " +
      config.academicYear + " expression-of-interest form.";
  } else {
    link.hidden = true;
    status.textContent = "The " + (config.academicYear || "AY 2026–2027") +
      " expression-of-interest form will appear here as soon as its verified Google Form link is activated. " +
      "Application information is not accepted by email.";
  }
})();
