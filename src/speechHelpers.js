// src/speechHelpers.js
export function speak(text, lang = "en-IN") {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  const voices = speechSynthesis.getVoices();
  const v = voices.find(v => v.lang.startsWith("hi")) || voices[0];
  if (v) utter.voice = v;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

export function listen(onResult, lang = "hi-IN") {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("SpeechRecognition not supported. Use Chrome!");
    return;
  }
  const rec = new SpeechRecognition();
  rec.lang = lang;
  rec.interimResults = false;
  rec.maxAlternatives = 1;

  rec.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    onResult(transcript);
  };

  rec.onerror = (e) => {
    console.error("STT error:", e);
    onResult("");
  };

  rec.start();
}
