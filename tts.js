// ===============================
// TTS – BLOG / PROJEKTE (STABIL)
// ===============================

let ttsUtterance = null;
let ttsPaused = false;
let ttsInterval = null;

function ttsPlayPause() {
  const textEl = document.getElementById("ttsText");
  const playBtn = document.getElementById("ttsPlay");
  const bar = document.getElementById("ttsBar");

  if (!textEl || !playBtn) {
    console.warn("TTS: Benötigte Elemente fehlen");
    return;
  }

  const text = textEl.innerText;

  // Pause / Weiter
  if (speechSynthesis.speaking) {
    if (ttsPaused) {
      speechSynthesis.resume();
      ttsPaused = false;
      playBtn.textContent = "⏸️ Pause";
    } else {
      speechSynthesis.pause();
      ttsPaused = true;
      playBtn.textContent = "▶️ Weiter";
    }
    return;
  }

  // Neu starten
  speechSynthesis.cancel();

  ttsUtterance = new SpeechSynthesisUtterance(text);
  ttsUtterance.lang = "de-DE";

  playBtn.textContent = "⏸️ Pause";
  ttsPaused = false;

  startProgress(bar, text);

  ttsUtterance.onend = resetTTS;

  speechSynthesis.speak(ttsUtterance);
}

function ttsStop() {
  speechSynthesis.cancel();
  resetTTS();
}

function startProgress(bar, text) {
  if (!bar) return;

  const duration = text.length * 40;
  const start = Date.now();

  clearInterval(ttsInterval);

  ttsInterval = setInterval(() => {
    if (!speechSynthesis.speaking) {
      clearInterval(ttsInterval);
      return;
    }
    const elapsed = Date.now() - start;
    bar.style.width = Math.min((elapsed / duration) * 100, 100) + "%";
  }, 200);
}

function resetTTS() {
  const playBtn = document.getElementById("ttsPlay");
  const bar = document.getElementById("ttsBar");

  if (playBtn) playBtn.textContent = "🔊 Vorlesen";
  if (bar) bar.style.width = "0%";

  ttsPaused = false;
  clearInterval(ttsInterval);
}
