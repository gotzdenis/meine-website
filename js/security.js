document.addEventListener("DOMContentLoaded", () => {

  const log = document.getElementById("sec-log");
  const attackEl = document.getElementById("sec-attacks");
  const unauthEl = document.getElementById("sec-unauth");

  if (!log || !attackEl || !unauthEl) {
    console.warn("Security Dashboard: Elemente nicht gefunden");
    return;
  }

  let attacks = 0;
  let unauth = 0;

  function rand() {
    return Math.floor(Math.random() * 255);
  }

  function randomIP() {
    return `${rand()}.${rand()}.${rand()}.${rand()}`;
  }

  function addLog(text, type = "normal") {

    const line = document.createElement("div");

    if (type === "alert") line.style.color = "#ff4444";
    if (type === "warn") line.style.color = "#ffaa00";

    line.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;

    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
  }

  function simulate() {

    const ip = randomIP();
    const type = Math.random();

    if (type < 0.6) {
      attacks++;
      attackEl.textContent = attacks;
      addLog(`Blocked intrusion attempt from ${ip}`, "alert");
    } else {
      unauth++;
      unauthEl.textContent = unauth;
      addLog(`Unauthorized login attempt from ${ip}`, "warn");
    }

  }

  // Startlog
  addLog("[✔] Security module initialized");

  setInterval(simulate, 2000);

});