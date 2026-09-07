/**
 * Dialect Normalization & Intent Detection Engine
 * Understands English, Hindi, Hinglish, and regional dialects (Bhojpuri/Awadhi/colloquial).
 * Ensures equivalent queries with different wording resolve to the same intent.
 */

class DialectEngine {
  constructor(schemesDb) {
    this.schemes = schemesDb || [];
    this.initLexicon();
  }

  initLexicon() {
    // Dialect, vernacular, and informal spelling dictionary
    this.dialectMapping = {
      // Bhojpuri & regional vernacular
      "khatir": "ke_liye",
      "kauno": "koi",
      "milat": "milta",
      "ba": "hai",
      "baati": "hoon",
      "larkawan": "bachchon",
      "larka": "ladka",
      "larki": "ladki",
      "chahi": "chahiye",
      "banwayek": "banwane",
      "padhawe": "padhane",
      "khetihar": "kisan",

      // Hinglish & informal variations
      "bacche": "bachche",
      "bache": "bachche",
      "bacho": "bachche",
      "bachcho": "bachche",
      "padhai": "education",
      "padhaii": "education",
      "shiksha": "education",
      "vidyalay": "school",
      "chhatravritti": "scholarship",
      "chhatravriti": "scholarship",
      "kisan": "farmer",
      "kheti": "agriculture",
      "krishi": "agriculture",
      "fasal": "crop",
      "bimaari": "health",
      "bimari": "health",
      "ilaj": "treatment",
      "ilaaj": "treatment",
      "dawa": "medicine",
      "dava": "medicine",
      "aspatal": "hospital",
      "aspataal": "hospital",
      "swasthya": "health",
      "makan": "housing",
      "makaan": "housing",
      "ghar": "housing",
      "awas": "housing",
      "aawaas": "housing",
      "chhat": "housing",
      "mahila": "women",
      "aurat": "women",
      "auraton": "women",
      "beti": "girl_child",
      "bitiya": "girl_child",
      "ladki": "girl_child",
      "garbhavastha": "maternity",
      "naukri": "job",
      "rozgar": "employment",
      "rojgar": "employment",
      "kam": "work",
      "kaam": "work",
      "hunnar": "skill",
      "buddhapa": "pension",
      "budhapa": "pension",
      "buzurg": "senior_citizen",
      "vriddh": "senior_citizen",
      "dukan": "business",
      "dukaan": "business",
      "vyapar": "business",
      "karz": "loan",
      "thela": "vendor",
      "rehri": "vendor",
      "gas": "lpg",
      "chulha": "cooking_gas",
      "karigar": "artisan",
      "shilpkar": "artisan"
    };

    // Category profiles for intent classification
    this.intentProfiles = {
      education: [
        "education", "padhai", "shiksha", "student", "students", "bachche", "school",
        "college", "scholarship", "fees", "chhatravritti", "vidyarthi", "study", "exam"
      ],
      agriculture: [
        "kisan", "farmer", "farmers", "kheti", "agriculture", "land", "fasal", "crop",
        "krishi", "seed", "fertilizer", "khet", "pm kisan"
      ],
      healthcare: [
        "health", "healthcare", "swasthya", "bimari", "bimaari", "ilaj", "ilaaj",
        "treatment", "aspatal", "hospital", "medicine", "doctor", "ayushman", "card", "operation"
      ],
      housing: [
        "housing", "awas", "aawaas", "ghar", "makan", "makaan", "home", "shelter",
        "pucca", "kutcha", "chhat", "gramin", "construction", "pmay", "banwayek"
      ],
      "women-welfare": [
        "women", "mahila", "aurat", "auraton", "girl", "beti", "bitiya", "ladki",
        "pregnancy", "maternity", "garbhavastha", "mother", "sukanya", "ujjwala", "gas", "chulha"
      ],
      "financial-assistance": [
        "business", "loan", "karz", "dukan", "dukaan", "vyapar", "startup", "mudra",
        "vendor", "thela", "rehri", "artisan", "karigar", "vishwakarma", "svanidhi", "financial", "credit"
      ],
      "senior-citizen": [
        "pension", "buddhapa", "budhapa", "old", "buzurg", "vriddh", "senior",
        "retirement", "monthly", "atal pension", "varishth", "60 saal"
      ],
      employment: [
        "employment", "naukri", "job", "skill", "training", "hunnar", "rozgar",
        "rojgar", "yuva", "work", "pmkvy", "placement"
      ]
    };

    // Ambiguous / Vague queries requiring conversational follow-up (Section 12)
    this.vaguePhrases = [
      "mujhe government scheme chahiye",
      "mujhe koi sarkari scheme chahiye",
      "government scheme chahiye",
      "sarkari scheme batao",
      "koi yojana batao",
      "koi scheme batao",
      "sarkari madad chahiye",
      "tell me government scheme",
      "kuch scheme bataiye",
      "sarkar se madad chahiye"
    ];

    // Out of scope / absurd queries for anti-hallucination testing
    this.outOfScopeTriggers = [
      "spaceship", "rocket", "iphone", "apple phone", "lamborghini",
      "car kharidne", "gold bar", "lottery", "gambling", "casino"
    ];
  }

  tokenize(text) {
    if (!text || typeof text !== "string") return [];
    return text
      .toLowerCase()
      .replace(/[.,?!:;'"()\/\\#@_~`%^*\[\]{}]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .filter(t => t.length > 0);
  }

  detectLanguage(text) {
    const raw = text.toLowerCase();
    const hindiScriptRegex = /[\u0900-\u097F]/;

    if (hindiScriptRegex.test(raw)) {
      return { code: "hi", name: "Hindi (हिन्दी)" };
    }

    const bhojpuriMarkers = ["khatir", "kauno", "milat", "baati", "larkawan", "banwayek", "chahi"];
    for (const marker of bhojpuriMarkers) {
      if (raw.includes(marker)) {
        return { code: "bhojpuri", name: "Bhojpuri Dialect (भोजपुरी प्रभाव)" };
      }
    }

    const hinglishMarkers = ["madad", "sarkar", "bachche", "padhai", "kisan", "kheti", "chahiye", "batao", "sarkari", "ghar", "yojana"];
    for (const marker of hinglishMarkers) {
      if (raw.includes(marker)) {
        return { code: "hinglish", name: "Hinglish (बोलचाल)" };
      }
    }

    return { code: "en", name: "English" };
  }

  normalizeQuery(text) {
    const tokens = this.tokenize(text);
    const normalizedTokens = [];
    const substitutions = [];

    for (const token of tokens) {
      if (this.dialectMapping[token]) {
        const replacement = this.dialectMapping[token];
        normalizedTokens.push(replacement);
        substitutions.push({ original: token, standardized: replacement });
      } else {
        normalizedTokens.push(token);
      }
    }

    return {
      originalTokens: tokens,
      normalizedTokens: normalizedTokens,
      normalizedString: normalizedTokens.join(" "),
      substitutions: substitutions
    };
  }

  isVague(cleanText) {
    const trimmed = cleanText.toLowerCase().trim();
    for (const phrase of this.vaguePhrases) {
      if (trimmed === phrase || trimmed === phrase.replace(/\s+/g, "")) {
        return true;
      }
    }

    const tokens = this.tokenize(trimmed);
    const genericWords = ["mujhe", "koi", "sarkari", "government", "govt", "scheme", "yojana", "batao", "chahiye", "madad", "help", "sarkar", "se", "hai"];
    const nonGeneric = tokens.filter(t => !genericWords.includes(t));

    if (tokens.length <= 5 && nonGeneric.length === 0) {
      return true;
    }

    return false;
  }

  classifyIntent(normalizedData) {
    const text = normalizedData.normalizedString;
    const tokens = normalizedData.normalizedTokens;

    const scores = {};
    for (const cat of Object.keys(this.intentProfiles)) {
      scores[cat] = 0;
    }

    // Direct scheme matching
    for (const scheme of this.schemes) {
      const schemeTokens = this.tokenize(scheme.name + " " + scheme.id + " " + scheme.tags.join(" "));
      for (const token of tokens) {
        if (schemeTokens.includes(token)) {
          scores[scheme.category] = (scores[scheme.category] || 0) + 2.5;
        }
      }
    }

    // Keyword matches
    for (const [cat, keywords] of Object.entries(this.intentProfiles)) {
      for (const kw of keywords) {
        if (tokens.includes(kw) || text.includes(kw)) {
          scores[cat] += 1.5;
        }
      }
    }

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const top = sorted[0];

    return {
      topCategory: top && top[1] > 0 ? top[0] : null,
      confidence: top && top[1] > 0 ? Math.min(top[1] / 3, 1) : 0,
      scores: scores
    };
  }

  matchSchemes(query, intentCategory) {
    const tokens = this.tokenize(query);
    const results = [];

    for (const scheme of this.schemes) {
      let score = 0;

      if (scheme.category === intentCategory) {
        score += 40;
      }

      const allText = [
        scheme.name,
        scheme.hindiName,
        scheme.badge,
        scheme.shortDescription,
        ...scheme.tags
      ].join(" ").toLowerCase();

      for (const token of tokens) {
        if (token.length > 2 && allText.includes(token)) {
          score += 10;
        }
      }

      if (score >= 30) {
        results.push({ scheme, score });
      }
    }

    results.sort((a, b) => b.score - a.score);
    return results.map(r => r.scheme);
  }

  /**
   * Main Pipeline
   */
  processQuery(rawQuery, selectedLang = "auto") {
    // 1. Empty input validation
    if (!rawQuery || rawQuery.trim().length === 0) {
      return {
        status: "EMPTY_INPUT",
        originalQuery: "",
        speechResponse: "Kripya apna prashna boliye ya type kijiye. Please enter or speak a question.",
        displayMessage: "Please enter or speak a question.",
        needsDisambiguation: false,
        matchedSchemes: []
      };
    }

    const clean = rawQuery.trim();
    const lang = this.detectLanguage(clean);
    const normalized = this.normalizeQuery(clean);

    // 2. Anti-hallucination out-of-scope check
    for (const trigger of this.outOfScopeTriggers) {
      if (clean.toLowerCase().includes(trigger)) {
        return {
          status: "OUT_OF_SCOPE",
          originalQuery: clean,
          language: lang,
          normalized: normalized,
          speechResponse: "Maaf kijiye, is vishay par koi sarkari scheme uplabdh nahi hai. Verified information is not available.",
          displayMessage: `No official government welfare scheme exists for "${trigger}". Information is not available.`,
          needsDisambiguation: false,
          matchedSchemes: [],
          isSafe: true
        };
      }
    }

    // 3. Conversational Follow-up on Vague Queries (Section 12)
    if (this.isVague(clean)) {
      return {
        status: "AMBIGUOUS",
        originalQuery: clean,
        language: lang,
        normalized: normalized,
        needsDisambiguation: true,
        speechResponse: "Aap kis type ki madad chahte hain — education, health, housing, employment ya financial assistance?",
        displayMessage: "Aap kis type ki madad chahte hain — education, health, housing, employment ya financial assistance?",
        followUpOptions: [
          { label: "Education (शिक्षा/छात्रवृत्ति)", category: "education", query: "Students ke liye government scheme batao." },
          { label: "Agriculture (किसान सहायता)", category: "agriculture", query: "Kisan ke liye scheme batao." },
          { label: "Healthcare (अस्पताल इलाज)", category: "healthcare", query: "Healthcare ke liye koi government scheme hai?" },
          { label: "Housing (पक्का मकान)", category: "housing", query: "Mujhe ghar banane ke liye koi government scheme batao." },
          { label: "Women Welfare (महिला कल्याण)", category: "women-welfare", query: "Women ke liye government assistance batao." },
          { label: "Financial Assistance (व्यापार ऋण)", category: "financial-assistance", query: "Chhota business shuru karne ke liye loan." }
        ],
        matchedSchemes: []
      };
    }

    // 4. Intent Classification
    const intent = this.classifyIntent(normalized);

    // 5. Scheme Matching
    let matched = [];
    if (intent.topCategory) {
      matched = this.matchSchemes(clean + " " + normalized.normalizedString, intent.topCategory);
    }

    // Fallback tag match if category match is empty
    if (matched.length === 0) {
      const tokens = normalized.normalizedTokens;
      for (const scheme of this.schemes) {
        for (const token of tokens) {
          if (token.length > 2 && scheme.tags.includes(token)) {
            matched.push(scheme);
            break;
          }
        }
      }
    }

    matched = [...new Map(matched.map(item => [item.id, item])).values()];

    // 6. Natural Language Response Generation
    let speechResponse = "";
    let displayMessage = "";

    if (matched.length > 0) {
      const top = matched[0];
      const count = matched.length;

      if (lang.code === "bhojpuri") {
        speechResponse = `Rauwa khatir ${top.name} sabse badiya ba. Eme ${top.badge} milela. Kul ${count} yojana milal ba.`;
      } else if (lang.code === "hi" || lang.code === "hinglish") {
        speechResponse = `Aapke liye ${top.name} uplabdh hai. Isme ${top.badge} milta hai. Kul ${count} yojanaayein mili hain.`;
      } else {
        speechResponse = `Found ${count} matching schemes for you. Top recommendation is ${top.name}, offering ${top.badge}.`;
      }

      displayMessage = `Found ${count} verified public welfare scheme${count > 1 ? 's' : ''} for your requirement.`;
    } else {
      speechResponse = "Maaf kijiye, aapki query se milti-julti koi sarkari scheme nahi mili. No matching scheme was found.";
      displayMessage = "No matching scheme was found. Please try asking about education, health, farming, housing, or business loans.";
    }

    return {
      status: matched.length > 0 ? "SUCCESS" : "NO_MATCH",
      originalQuery: clean,
      language: lang,
      normalized: normalized,
      intentCategory: intent.topCategory,
      confidence: intent.confidence,
      needsDisambiguation: false,
      speechResponse: speechResponse,
      displayMessage: displayMessage,
      matchedSchemes: matched
    };
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { DialectEngine };
}
