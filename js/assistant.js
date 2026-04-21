// ==========================================
// ASSISTANT.JS – FINAL, STABIL, UPGRADED
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  const assistant = document.getElementById("assistant");
  const toggleBtn = document.getElementById("assistant-toggle");

  if (!assistant || !toggleBtn) {
    console.warn("Assistant: Elemente nicht gefunden – Script beendet.");
    return;
  }

  let enabled = false;

  // 🔥 Cooldown gegen Spam
  let lastSpeakTime = 0;
  const SPEAK_COOLDOWN = 4000;

  // ---------------------------
  // Begrüßung
  // ---------------------------

  function getGreeting() {
    const h = new Date().getHours();

    if (h < 11) return "Guten Morgen. System ist bereit.";
    if (h < 17) return "Guten Tag. Alle Module sind aktiv.";
    return "Guten Abend. System läuft stabil.";
  }

  // ---------------------------
  // Speak (nutzt deine TTS)
  // ---------------------------

  function speakLocal(text) {
    if (!enabled) return;

    const now = Date.now();
    if (now - lastSpeakTime < SPEAK_COOLDOWN) return;

    lastSpeakTime = now;

    if (typeof speak === "function") {
      speak(text);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  }

  // ---------------------------
  // Toggle
  // ---------------------------

  toggleBtn.addEventListener("click", () => {

    enabled = !enabled;
    toggleBtn.textContent = enabled ? "🔇" : "🔊";

    assistant.classList.toggle("enabled", enabled);

    const hint = document.getElementById("assistant-hint");
    if (hint && enabled) {
      hint.style.display = "none";
    }

    // Begrüßung einmal pro Session
    if (enabled && !sessionStorage.getItem("assistant_greeted")) {
      sessionStorage.setItem("assistant_greeted", "yes");
      speakLocal(getGreeting());
    }

  });

  // ---------------------------
  // Navigation Hover
  // ---------------------------

  const navItems = [
    { id: "nav-about", text: "Über mich. Persönlicher Hintergrund und Motivation." },
    { id: "nav-skills", text: "Kompetenzen. Technische Fähigkeiten im Aufbau." },
    { id: "nav-blog", text: "Blog. Dokumentation meines Lernwegs." }
  ];

  navItems.forEach(item => {

    const el = document.getElementById(item.id);
    if (!el) return;

    el.addEventListener("mouseenter", () => {

      const key = "spoken_" + item.id;
      if (sessionStorage.getItem(key)) return;

      sessionStorage.setItem(key, "yes");
      speakLocal(item.text);

    });

  });

  // ---------------------------
  // Scroll Kontext (NEU 🔥)
  // ---------------------------

  const sections = [
    { id: "skills", text: "Kompetenzen geladen. Fortschritt sichtbar." },
    { id: "projects", text: "Projekte geladen. Systemarchitektur verfügbar." },
    { id: "blog-preview", text: "Blogsystem aktiv. Dokumentation verfügbar." }
  ];

  let lastSection = null;

  window.addEventListener("scroll", () => {

    sections.forEach(sec => {

      const el = document.getElementById(sec.id);
      if (!el) return;

      const rect = el.getBoundingClientRect();

      if (rect.top < 200 && rect.bottom > 200) {

        if (lastSection !== sec.id) {
          lastSection = sec.id;
          speakLocal(sec.text);
        }

      }

    });

  });

  // ---------------------------
  // Terminal Hook (NEU 🔥)
  // ---------------------------

  window.addEventListener("terminalCommand", (e) => {

    const cmd = e.detail;

    if (cmd === "hack") {
      speakLocal("Sicherheitsanalyse gestartet.");
    }

    if (cmd === "scan") {
      speakLocal("Systemscan läuft.");
    }

  });

  // ---------------------------
  // Easter Egg
  // ---------------------------

  let clicks = 0;

  assistant.addEventListener("click", () => {

    clicks++;

    if (clicks === 5) {
      speakLocal("Geheimes Feature aktiviert.");
      alert("🎮 Secret unlocked!");
    }

  });

});


// ---------------------------
// Panel Toggle
// ---------------------------

document.getElementById("assistant-toggle")?.addEventListener("click", () => {

  const panel = document.getElementById("assistant-panel");
  if (!panel) return;

  panel.style.display = (panel.style.display === "none") ? "flex" : "none";

});


// ---------------------------
// Debug (clean)
// ---------------------------

document.getElementById("assistant")?.addEventListener("click", () => {
  console.log("Assistant aktiv");
});