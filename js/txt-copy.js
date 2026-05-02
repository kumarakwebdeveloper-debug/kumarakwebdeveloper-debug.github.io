document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]'),
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

function copyWalletSpan(event, span, walletId) {
  event.preventDefault();
  event.stopPropagation();

  const walletText = document.getElementById(walletId).innerText.trim();
  copyWithTooltip(walletText, span);
}

function copyWallet(event, button, walletId) {
  event.preventDefault();
  event.stopPropagation();

  const walletText = document.getElementById(walletId).innerText.trim();
  copyWithTooltip(walletText, button);
}

function copyWithTooltip(text, element) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(function () {
        showCopiedTooltip(element);
      })
      .catch(function () {
        fallbackCopyTooltip(text, element);
      });
    return;
  }

  fallbackCopyTooltip(text, element);
}

function fallbackCopyTooltip(text, element) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  const successful = document.execCommand("copy");
  document.body.removeChild(textArea);

  if (successful) {
    showCopiedTooltip(element);
  }
}

function showCopiedTooltip(element) {
  const tooltip = bootstrap.Tooltip.getInstance(element);
  const originalTitle =
    element.getAttribute("data-original-title") ||
    element.getAttribute("title");

  if (!element.getAttribute("data-original-title")) {
    element.setAttribute("data-original-title", originalTitle);
  }

  element.title = "✅ Text Copied!";
  tooltip.show();

  element.style.background = "rgba(81, 207, 102, 0.3)";
  element.style.transform = "scale(1.03)";

  setTimeout(function () {
    element.title = element.getAttribute("data-original-title");
    element.style.background = "";
    element.style.transform = "";
    tooltip.hide();
  }, 2500);
}
