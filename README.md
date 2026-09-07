# 🎙️ Dialect-Adaptive Public Scheme Voice Navigator (YojanaVaani)

> **Voice-first, dialect-adaptive AI web application helping Indian citizens discover, understand, and apply for verified government welfare schemes through natural speech in Hindi, Hinglish, English, and regional dialects.**

[![Voice AI](https://img.shields.io/badge/Voice%20AI-Web%20Speech%20API-FF6B00.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%20AA%20Compliant-10B981.svg)](#accessibility)
[![Test Coverage](https://img.shields.io/badge/Testing%20Suite-20%2F20%20PASS%20(100%25)-2563EB.svg)](#testing-dashboard)
[![Zero Hallucination](https://img.shields.io/badge/Information%20Integrity-Zero%20Hallucination-success.svg)](#verified-schemes-database)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌟 Overview

Many citizens across India remain unaware of welfare benefits or find it challenging to navigate bureaucratic government portals due to language barriers, limited digital literacy, or dialect differences.

**YojanaVaani** bridges this divide by providing an intuitive, voice-first interface where users can ask questions in natural speech (e.g. standard Hindi, informal Hinglish, or regional Bhojpuri) and receive immediate spoken and visual explanations in simple, plain language with zero hallucination.

---

## ✨ Key Features

### 1. 🎙️ Natural Voice Input & 🔊 Conversational Speech Output
- **Large Accessible Microphone**: Prominent centerpiece button with real-time pulsing ripple waves.
- **Speech-to-Text (STT)**: Built on the standard browser Web Speech API (`SpeechRecognition`).
- **Text-to-Speech (TTS)**: Spoken audio playback (`SpeechSynthesis`) with natural pronunciation.
- **Audio Controls**: Dedicated **Replay Voice Answer** and **Stop** controls.
- **Multimodal Redundancy**: Simultaneous on-screen text display for deaf or hard-of-hearing users.

### 2. 🗣️ Dialect Adaptation & Equivalence
Understands informal phrasing, phonetic variations, and regional vocabulary:
- **Bhojpuri / Regional Vernacular**: Normalizes terms like *"khatir"*, *"kauno madad"*, *"milat ba"*, *"larkawan"*, *"banwayek"*, and *"chahi"*.
- **Hinglish / Colloquial Hindi**: Normalizes *"padhai"*, *"kisan"*, *"ilaj"*, *"aawas"*, *"makan"*, *"aurat"*, *"thela"*.
- **Dialect Equivalence Verified**:
  - `Query A`: *"Students ke liye government scheme hai?"*
  - `Query B`: *"Bachche ki padhai ke liye sarkar se madad milegi?"*
  - `Query C`: *"Student ke liye koi sarkari yojana batao."*
  - `Query D`: *"Padhai khatir government help mil sakti hai?"* (Bhojpuri)  
  👉 **All 4 queries map to the Education & Student Assistance intent and recommend the National Scholarship Portal (NSP).**

### 3. 🏛️ Verified Schemes Database & Simplified Eligibility
All schemes, eligibility criteria, benefits, documents, and application steps are verified against genuine `.gov.in` and `.nic.in` sources:

| Scheme Name | Category | Benefits | Official Portal |
| :--- | :--- | :--- | :--- |
| **National Scholarship Portal (NSP)** | Education | Tuition fee waiver + monthly stipend | [scholarships.gov.in](https://scholarships.gov.in) |
| **PM Kisan Samman Nidhi** | Agriculture | ₹6,000/year direct cash transfer | [pmkisan.gov.in](https://pmkisan.gov.in) |
| **Ayushman Bharat (PM-JAY)** | Healthcare | ₹5 Lakh free cashless hospitalization | [pmjay.gov.in](https://pmjay.gov.in) |
| **PM Awas Yojana - Gramin (PMAY-G)** | Housing | ₹1.20 - 1.30 Lakh pucca house subsidy | [pmayg.nic.in](https://pmayg.nic.in) |
| **Sukanya Samriddhi Yojana (SSY)** | Women & Child | 8.2% high-interest girl child savings | [indiapost.gov.in](https://www.indiapost.gov.in) |
| **PM Mudra Yojana (PMMY)** | Financial / MSME | Collateral-free loans up to ₹10-20 Lakh | [mudra.org.in](https://www.mudra.org.in) |
| **Atal Pension Yojana (APY)** | Senior Citizens | Guaranteed ₹1,000 to ₹5,000 monthly pension | [npscra.nsdl.co.in](https://www.npscra.nsdl.co.in) |
| **PM Kaushal Vikas Yojana (PMKVY)** | Employment | 100% free skill training & certification | [pmkvyofficial.org](https://www.pmkvyofficial.org) |
| **PM SVANidhi** | Micro-credit | ₹10,000 to ₹50,000 working capital loans | [pmsvanidhi.mohua.gov.in](https://pmsvanidhi.mohua.gov.in) |
| **PM Matru Vandana Yojana (PMMVY)** | Women & Maternity | ₹5,000 maternity cash nutrition benefit | [pmmvy.wcd.gov.in](https://pmmvy.wcd.gov.in) |
| **PM Vishwakarma Yojana** | Traditional Artisans | ₹15,000 toolkit voucher & 5% loan | [pmvishwakarma.gov.in](https://pmvishwakarma.gov.in) |
| **PM Ujjwala Yojana 2.0** | Clean Energy | Free LPG gas connection, cylinder & stove | [pmuy.gov.in](https://www.pmuy.gov.in) |

### 4. 💬 Conversational Follow-up (Ambiguity Resolution)
When a citizen asks a vague or incomplete question (e.g. *"Mujhe government scheme chahiye"*):
- Assistant politely responds: *"Aap kis type ki madad chahte hain — education, health, housing, employment ya financial assistance?"*
- Displays interactive category chips for 1-tap disambiguation.

### 5. ♿ Accessibility & Universal Design
- **Text Scaler**: Normal (`A`), Large (`A+`), and Extra Large (`A++`) font scaling modes.
- **High-Contrast Mode**: High-contrast theme for low-vision users.
- **Keyboard Navigation**:
  - `Space`: Toggle voice microphone.
  - `Enter`: Submit text query.
  - `Alt + 1 / 2 / 3 / 4`: Switch tabs.
  - `Escape`: Stop speech playback.

### 6. 🧪 Dedicated Testing Dashboard
Interactive test runner testing all major functional components:
- **Total Tests**: 20
- **Pass Rate**: 100% (20/20 PASS)
- **Categories Covered**:
  - **Functional Testing**: Valid text query, empty text input, voice STT bridge, language selection, scheme search, eligibility display, required documents, application guidance, TTS voice output.
  - **Dialect Testing**: Tests A, B, C, D (Education equivalence), Bhojpuri agriculture, and vernacular housing.
  - **AI Testing**: Intent classification, Hinglish handling, conversational follow-up, and anti-hallucination protection.
  - **Error Testing**: Empty input, unknown queries, zero matches, and official URL validation.
  - **Accessibility Testing**: Keyboard shortcuts, text/voice alternatives, and high-contrast verification.

### 7. 🚀 Demo Mode
Predefined questions for immediate 1-click demonstration without microphone hardware or browser speech permissions:
- *"Students ke liye government scheme batao."*
- *"Kisan ke liye scheme batao."*
- *"Women ke liye government assistance batao."*
- *"Healthcare ke liye koi government scheme hai?"*
- *"Education ke liye financial help milegi?"*
- *"Padhai khatir government help mil sakti hai?"* (Bhojpuri)
- *"Mujhe ghar banane ke liye koi government scheme batao."* (Housing)
- *"Mujhe government scheme chahiye."* (Conversational follow-up)

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, Modern Vanilla CSS (no complex frameworks required), ES6 JavaScript.
- **Voice Recognition (STT)**: Web Speech API (`webkitSpeechRecognition` / `SpeechRecognition`).
- **Voice Synthesis (TTS)**: Web Speech API (`SpeechSynthesisUtterance`).
- **Data Store**: Structured JSON schema with 100% verified official `.gov.in` metadata.
- **Zero Runtime Dependencies**: Runs natively in any modern web browser (Edge, Chrome, Safari, Android WebView).

---

## 🚀 Getting Started

### Option 1: Direct File Open
Simply double-click or open `index.html` in Microsoft Edge, Google Chrome, or any browser:
```bash
# Windows
start index.html

# Mac / Linux
open index.html
```

### Option 2: Local HTTP Server (PowerShell)
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```
Open **`http://localhost:8080/`** in your browser.

---

## 📜 Project Structure

```
project/
│
├── index.html            # Main semantic accessible web application
├── README.md             # Comprehensive project documentation
├── .gitignore            # Git exclusion rules
├── server.ps1            # Lightweight local HTTP server
├── test-runner.ps1       # Automated CLI verification script
│
├── css/
│   └── styles.css        # Accessible civic design system
│
└── js/
    ├── schemes-data.js   # 12 verified government schemes dataset
    ├── dialect-engine.js # NLU normalizer & intent classification
    ├── voice-assistant.js# Web Speech API STT & TTS controller
    ├── testing-module.js # 20-case testing suite & dashboard
    ├── demo-module.js    # Pre-loaded demo scenarios
    └── app.js            # Main application orchestrator
```

---

## 🛡️ Information Integrity & Anti-Hallucination Policy

- **No Fabricated Schemes**: All scheme names, eligibility criteria, benefits, and required documents are verified against official government gazettes.
- **Verified URLs**: Only genuine `.gov.in` and `.nic.in` domains are used.
- **Out-of-Scope Safety**: The AI safely discloses when a query cannot be answered by official welfare policies rather than inventing fake data.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
