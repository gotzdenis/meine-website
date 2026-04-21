document.addEventListener("DOMContentLoaded", () => {

  // =============================
  // ELEMENTE
  // =============================

  const log = document.getElementById("sec-log");
  const attackEl = document.getElementById("sec-attacks");
  const unauthEl = document.getElementById("sec-unauth");
  const firewallEl = document.getElementById("sec-firewall");
  const systemEl = document.getElementById("sec-system");
  const threatEl = document.getElementById("sec-threat");

  if (!log || !attackEl || !unauthEl || !firewallEl || !systemEl || !threatEl) {
    console.warn("Security Dashboard: Elemente nicht gefunden");
    return;
  }

  // =============================
  // STATE
  // =============================

  let attacks = 0;
  let unauth = 0;

  // =============================
  // HELPER
  // =============================

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
    if (type === "ok") line.style.color = "#00ffcc";

    line.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;

    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
  }

  // =============================
  // THREAT LEVEL SYSTEM
  // =============================

  function updateThreatLevel() {

    if (attacks < 5) {
      threatEl.textContent = "LOW";
      threatEl.style.color = "#00ffcc";
      systemEl.textContent = "SECURE";
      firewallEl.textContent = "ACTIVE";
    }

    else if (attacks < 10) {
      threatEl.textContent = "MEDIUM";
      threatEl.style.color = "#ffaa00";
      systemEl.textContent = "MONITORING";
    }

    else if (attacks < 20) {
      threatEl.textContent = "HIGH";
      threatEl.style.color = "#ff6600";
      systemEl.textContent = "WARNING";
    }

    else {
      threatEl.textContent = "CRITICAL";
      threatEl.style.color = "#ff0000";
      systemEl.textContent = "COMPROMISED";
      firewallEl.textContent = "OVERLOAD";
      firewallEl.style.color = "#ff0000";
    }

  }

  // =============================
  // SIMULATION
  // =============================

  function simulate() {

    const ip = randomIP();
    const type = Math.random();

    if (type < 0.6) {
      attacks++;
      attackEl.textContent = attacks;
      addLog(`Blocked intrusion attempt from ${ip}`, "alert");
    } 
    else {
      unauth++;
      unauthEl.textContent = unauth;
      addLog(`Unauthorized login attempt from ${ip}`, "warn");
    }

    updateThreatLevel();

  }

  // =============================
  // START
  // =============================

  addLog("[✔] Security module initialized", "ok");

  setInterval(simulate, 2000);

});