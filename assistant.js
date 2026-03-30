// ==========================================
// ASSISTANT.JS – FINAL, STABIL, ERWEITERT
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

  // 🔥 nutzt jetzt globale speak() aus tts.js
  function speakLocal(text) {
    if (!enabled) return;

    if (typeof speak === "function") {
      speak(text); // nutzt deine verbesserte TTS
    } else {
      // Fallback (falls tts.js nicht geladen ist)
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }

  // ---------------------------
  // Toggle (Start stumm)
  // ---------------------------

  toggleBtn.addEventListener("click", () => {
    enabled = !enabled;
    toggleBtn.textContent = enabled ? "🔇" : "🔊";

    assistant.classList.toggle("enabled", enabled);

    const hint = document.getElementById("assistant-hint");
    if (hint && enabled) {
      hint.style.display = "none";
    }

    // Begrüßung nur einmal
    if (enabled && !sessionStorage.getItem("assistant_greeted")) {
      sessionStorage.setItem("assistant_greeted", "yes");
      speakLocal(getGreeting());
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
      speakLocal(item.text);
    });
  });

  // ---------------------------
  // 🎮 EASTER EGG (Assistant Klick)
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
// Panel Toggle (bleibt getrennt)
// ---------------------------

document.getElementById("assistant-toggle").addEventListener("click", () => {

  const panel = document.getElementById("assistant-panel");

  if (panel.style.display === "none") {
    panel.style.display = "flex";
  } else {
    panel.style.display = "none";
  }

});


// ---------------------------
// Willkommen Popup (optional)
// ---------------------------

window.addEventListener("load", () => {

  setTimeout(() => {
    console.log("👋 Portfolio geladen");
  }, 1200);

});


// ---------------------------
// Debug Klick (harmlos)
// ---------------------------

document.getElementById("assistant").addEventListener("click", () => {
  console.log("Assistant aktiviert");
});