// ==========================================
// ASSISTANT.JS – FINAL, STABIL, ISOLIERT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  const assistant = document.getElementById("assistant");
  const toggleBtn = document.getElementById("assistant-toggle");

  // Sicherheit: Wenn etwas fehlt, nichts tun
  if (!assistant || !toggleBtn) {
    console.warn("Assistant: Elemente nicht gefunden – Script beendet.");
    return;
  }

  let enabled = false;

  // ---------------------------
  // Hilfsfunktionen
  // ---------------------------

  function getGreeting() {
    const h = new Date().getHours();
    if (h < 11) return "Guten Morgen. Willkommen auf meinem Portfolio.";
    if (h < 17) return "Guten Tag. Willkommen auf meinem Portfolio.";
    return "Guten Abend. Willkommen auf meinem Portfolio.";
  }

  function speak(text) {
    if (!enabled) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.9;

    window.speechSynthesis.speak(utterance);
  }

  // ---------------------------
  // Toggle (Start stumm)
  // ---------------------------

toggleBtn.addEventListener("click", () => {
  enabled = !enabled;
  toggleBtn.textContent = enabled ? "🔇" : "🔊";

  // Klasse setzen
  assistant.classList.toggle("enabled", enabled);

  // Hinweistext explizit ausblenden
  const hint = document.getElementById("assistant-hint");
  if (hint && enabled) {
    hint.style.display = "none";
  }

  // Begrüßung nur einmal pro Besuch
  if (enabled && !sessionStorage.getItem("assistant_greeted")) {
    sessionStorage.setItem("assistant_greeted", "yes");
    speak(getGreeting());
  }
});


  // ---------------------------
  // Navigation – Hover (einmalig)
  // ---------------------------

const navItems = [
  { id: "nav-about",   text: "Über mich. Persönlicher Hintergrund und Motivation." },
  { id: "nav-process", text: "Arbeitsweise. Strukturiertes Vorgehen." },
  { id: "nav-skills",  text: "Kompetenzen. Technische Grundlagen im Aufbau." },
  { id: "nav-blog",    text: "Blog. Dokumentation meines Lernwegs und meiner Projekte." }
];


  navItems.forEach(item => {
    const el = document.getElementById(item.id);
    if (!el) return;

    el.addEventListener("mouseenter", () => {
      const key = "spoken_" + item.id;
      if (sessionStorage.getItem(key)) return;

      sessionStorage.setItem(key, "yes");
      speak(item.text);
    });
  });

});

document.getElementById("assistant-toggle").addEventListener("click", () => {

    const panel = document.getElementById("assistant-panel");

    if (panel.style.display === "none") {
        panel.style.display = "flex";
    } else {
        panel.style.display = "none";
    }

});

window.addEventListener("load", () => {

    setTimeout(() => {
        alert("👋 Willkommen im SYS-PORTFOLIO\n\nTippe im Terminal 'help' für Funktionen.");
    }, 1200);

});

document.getElementById("assistant").addEventListener("click", () => {

    console.log("Assistant aktiviert");

});