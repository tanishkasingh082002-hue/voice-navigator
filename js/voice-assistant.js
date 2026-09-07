/**
 * Voice Assistant Controller
 * Integrates Web Speech API (SpeechRecognition & SpeechSynthesis)
 * with accessible keyboard triggers and visual audio feedback.
 */

class VoiceAssistant {
  constructor(dialectEngine, onResultCallback) {
    this.engine = dialectEngine;
    this.onResult = onResultCallback;
    this.isListening = false;
    this.isSpeaking = false;
    this.currentLanguage = "hi-IN"; // Default Hindi
    this.lastSpokenText = "";

    this.initSTT();
    this.initTTS();
  }

  initSTT() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.hasSTT = !!SpeechRecognition;

    if (this.hasSTT) {
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = this.currentLanguage;

        this.recognition.onstart = () => {
          this.isListening = true;
          this.updateMicVisuals(true);
        };

        this.recognition.onresult = (event) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
          }

          const inputField = document.getElementById("query-input");
          if (inputField) {
            inputField.value = transcript;
          }

          const liveFeedback = document.getElementById("live-speech-feedback");
          if (liveFeedback) {
            liveFeedback.textContent = `🎙️ Heard: "${transcript}"`;
            liveFeedback.classList.remove("hidden");
          }

          if (event.results[0].isFinal) {
            this.handleQuery(transcript);
          }
        };

        this.recognition.onerror = (event) => {
          this.isListening = false;
          this.updateMicVisuals(false);
          let errorMsg = `Microphone notice: ${event.error}. You can also type your question.`;
          if (event.error === "not-allowed" || event.error === "permission-denied") {
            errorMsg = "Microphone permission denied. Please allow microphone access or type your question below.";
          }
          this.showVoiceNotice(errorMsg);
        };

        this.recognition.onend = () => {
          this.isListening = false;
          this.updateMicVisuals(false);
        };
      } catch (err) {
        console.warn("STT Init Notice:", err);
        this.hasSTT = false;
      }
    }
  }

  initTTS() {
    this.hasTTS = "speechSynthesis" in window;
    if (this.hasTTS) {
      const loadVoices = () => {
        this.voices = window.speechSynthesis.getVoices();
        this.selectVoice();
      };
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }

  selectVoice() {
    if (!this.voices || this.voices.length === 0) return;
    if (this.currentLanguage.startsWith("hi")) {
      this.activeVoice = this.voices.find(v => v.lang.includes("hi")) || this.voices.find(v => v.lang.includes("en-IN")) || this.voices[0];
    } else {
      this.activeVoice = this.voices.find(v => v.lang.includes("en-IN") || v.lang.includes("en-US")) || this.voices[0];
    }
  }

  setLanguage(langCode) {
    this.currentLanguage = langCode;
    if (this.recognition) {
      this.recognition.lang = langCode;
    }
    this.selectVoice();
  }

  startListening() {
    if (!this.hasSTT) {
      this.showVoiceNotice("Speech Recognition is not supported by your current browser. Please type or use Demo queries.");
      return;
    }

    if (this.isSpeaking) {
      this.stopSpeaking();
    }

    try {
      this.recognition.lang = this.currentLanguage;
      this.recognition.start();
    } catch (err) {
      try { this.recognition.stop(); } catch(e) {}
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try { this.recognition.stop(); } catch(e) {}
    }
    this.isListening = false;
    this.updateMicVisuals(false);
  }

  speak(text) {
    if (!this.hasTTS || !text) return;
    this.stopSpeaking();
    this.lastSpokenText = text;

    const utterance = new SpeechSynthesisUtterance(text.replace(/[*_#`]/g, "").trim());
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    if (this.activeVoice) {
      utterance.voice = this.activeVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.updateSpeakerVisuals(true);
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.updateSpeakerVisuals(false);
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.updateSpeakerVisuals(false);
    };

    window.speechSynthesis.speak(utterance);
  }

  replayLastSpeech() {
    if (this.lastSpokenText) {
      this.speak(this.lastSpokenText);
    }
  }

  stopSpeaking() {
    if (this.hasTTS && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.updateSpeakerVisuals(false);
  }

  handleQuery(text) {
    if (!text || text.trim().length === 0) return;
    const result = this.engine.processQuery(text, this.currentLanguage);
    if (this.onResult) {
      this.onResult(result);
    }
    if (result.speechResponse) {
      this.speak(result.speechResponse);
    }
  }

  updateMicVisuals(isActive) {
    const micBtn = document.getElementById("mic-btn");
    const waves = document.getElementById("mic-waves");
    const statusLabel = document.getElementById("mic-status-label");

    if (micBtn) {
      if (isActive) {
        micBtn.classList.add("recording-active");
        micBtn.setAttribute("aria-pressed", "true");
        if (statusLabel) statusLabel.textContent = "Listening... बोलिए";
        if (waves) waves.classList.remove("hidden");
      } else {
        micBtn.classList.remove("recording-active");
        micBtn.setAttribute("aria-pressed", "false");
        if (statusLabel) statusLabel.textContent = "Press to Speak / बोलें";
        if (waves) waves.classList.add("hidden");
      }
    }
  }

  updateSpeakerVisuals(isActive) {
    const speakerBanner = document.getElementById("global-speaker-status");
    if (speakerBanner) {
      speakerBanner.classList.toggle("hidden", !isActive);
    }
  }

  showVoiceNotice(msg) {
    const banner = document.getElementById("voice-error-banner");
    if (banner) {
      banner.textContent = msg;
      banner.classList.remove("hidden");
      setTimeout(() => banner.classList.add("hidden"), 5000);
    }
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { VoiceAssistant };
}
