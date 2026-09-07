/**
 * Demo Mode Module
 * Predefined questions for 1-click execution without microphone access.
 */

const DEMO_QUESTIONS = [
  {
    id: "demo-students",
    title: "Student Government Schemes",
    icon: "🎓",
    badge: "Students / Hinglish",
    query: "Students ke liye government scheme batao.",
    expectedCategory: "Education & Students",
    expectedScheme: "National Scholarship Portal (NSP)",
    description: "Demonstrates standard Hinglish student query matching to scholarships."
  },
  {
    id: "demo-kisan",
    title: "Farmer Welfare & Income Support",
    icon: "🌾",
    badge: "Farmers / Agriculture",
    query: "Kisan ke liye scheme batao.",
    expectedCategory: "Agriculture & Farmers",
    expectedScheme: "PM Kisan Samman Nidhi Yojana",
    description: "Demonstrates farmer query matching to ₹6,000/year PM-Kisan scheme."
  },
  {
    id: "demo-women",
    title: "Women Assistance & Empowerment",
    icon: "👩",
    badge: "Women Welfare",
    query: "Women ke liye government assistance batao.",
    expectedCategory: "Women & Child Welfare",
    expectedScheme: "Sukanya Samriddhi & PM Matru Vandana",
    description: "Demonstrates multi-scheme recommendation for women and maternity support."
  },
  {
    id: "demo-healthcare",
    title: "Free Hospitalization & Health Card",
    icon: "🩺",
    badge: "Healthcare",
    query: "Healthcare ke liye koi government scheme hai?",
    expectedCategory: "Healthcare & Medical",
    expectedScheme: "Ayushman Bharat - PM-JAY",
    description: "Demonstrates health query matching to ₹5 Lakh free cashless treatment."
  },
  {
    id: "demo-education-fin",
    title: "Education Financial Help",
    icon: "📚",
    badge: "Education Help",
    query: "Education ke liye financial help milegi?",
    expectedCategory: "Education & Students",
    expectedScheme: "National Scholarship Portal (NSP)",
    description: "Demonstrates education loan/scholarship intent detection."
  },
  {
    id: "demo-bhojpuri",
    title: "Regional Bhojpuri Dialect: Education",
    icon: "🗣️",
    badge: "Bhojpuri Dialect",
    query: "Padhai khatir government help mil sakti hai?",
    expectedCategory: "Education & Students",
    expectedScheme: "National Scholarship Portal (NSP)",
    description: "Demonstrates normalization of rural Bhojpuri phrase 'padhai khatir' to Education."
  },
  {
    id: "demo-housing",
    title: "Housing & Shelter Support",
    icon: "🏠",
    badge: "Housing",
    query: "Mujhe ghar banane ke liye koi government scheme batao.",
    expectedCategory: "Housing & Shelter",
    expectedScheme: "PM Awas Yojana - Gramin",
    description: "Demonstrates house construction grant matching to PMAY-G."
  },
  {
    id: "demo-vague",
    title: "Conversational Follow-up on Vague Query",
    icon: "💬",
    badge: "Follow-up Clarification",
    query: "Mujhe government scheme chahiye.",
    expectedCategory: "Requires Clarification",
    expectedScheme: "Asks follow-up question with choice chips",
    description: "Demonstrates assistant politely asking: 'Aap kis type ki madad chahte hain...?'"
  }
];

class DemoManager {
  constructor(onTriggerDemo) {
    this.onTrigger = onTriggerDemo;
    this.questions = DEMO_QUESTIONS;
  }

  getQuestions() {
    return this.questions;
  }

  trigger(id) {
    const item = this.questions.find(q => q.id === id);
    if (item && this.onTrigger) {
      this.onTrigger(item);
    }
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { DEMO_QUESTIONS, DemoManager };
}
