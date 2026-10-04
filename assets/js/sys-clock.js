(function () {
  var timeEl = document.getElementById('clockTime');
  var dateEl = document.getElementById('clockDate');
  if (!timeEl || !dateEl) return;

  function tick() {
    var now = new Date();
    timeEl.textContent = now.toLocaleTimeString('de-DE', { hour12: false });
    dateEl.textContent = now.toLocaleDateString('de-DE');
  }

  tick();
  window.setInterval(tick, 1000);
})();
