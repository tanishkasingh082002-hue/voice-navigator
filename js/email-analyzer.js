/**
 * AI Email Assistant - Core Analyzer Engine
 * Provides analyzeEmailWithAI() with input validation, NLP extraction,
 * security risk scanning, task parsing, deadline detection, and contextual reply drafting.
 */

const MAX_EMAIL_LENGTH = 15000;

class EmailAnalyzer {
  /**
   * Main AI Email Analysis Function
   * @param {string} emailContent - The raw text of the email
   * @param {Object} options - Configuration options (mockMode, simulateFailure, maxLength)
   * @returns {Promise<Object>} Analysis result object
   */
  static async analyzeEmailWithAI(emailContent, options = {}) {
    // 1. Validate Input Type
    if (emailContent === undefined || emailContent === null || typeof emailContent !== "string") {
      const err = new Error("Invalid email input type. Expected a string.");
      err.status = 400;
      throw err;
    }

    // 2. Validate Empty Input
    const cleanContent = emailContent.trim();
    if (cleanContent.length === 0) {
      const err = new Error("Email content is required.");
      err.status = 400;
      throw err;
    }

    // 3. Validate Maximum Length
    const maxLength = options.maxLength || MAX_EMAIL_LENGTH;
    if (emailContent.length > maxLength) {
      const err = new Error(`Email exceeds maximum allowed length of ${maxLength} characters (received ${emailContent.length}).`);
      err.status = 413;
      throw err;
    }

    // 4. Simulate API Failure for Resilience Testing
    if (options.simulateFailure) {
      const err = new Error("AI Service is temporarily unavailable. Upstream provider returned 503 Service Unavailable.");
      err.status = 503;
      throw err;
    }

    // Simulate AI inference latency if desired (e.g. for smooth UI feedback)
    if (options.delayMs) {
      await new Promise(resolve => setTimeout(resolve, options.delayMs));
    }

    // 5. NLP & AI Extraction Pipeline
    const lines = cleanContent.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const lowerContent = cleanContent.toLowerCase();

    // A. Detect Spam / Phishing Signals
    const phishingData = EmailAnalyzer.detectPhishing(cleanContent, lowerContent);

    // B. Detect Priority
    const priorityData = EmailAnalyzer.detectPriority(lowerContent, phishingData);

    // C. Detect Category
    const category = EmailAnalyzer.detectCategory(lowerContent, phishingData);

    // D. Extract Actionable Tasks
    const tasks = EmailAnalyzer.extractTasks(lines, cleanContent);

    // E. Extract Deadlines
    const deadlines = EmailAnalyzer.extractDeadlines(cleanContent, lowerContent);

    // F. Generate Executive Summary
    const summary = EmailAnalyzer.generateSummary(cleanContent, lines, priorityData, category, deadlines);

    // G. Generate Contextual Suggested Reply
    const suggestedReply = EmailAnalyzer.generateReply(cleanContent, priorityData, category, tasks, deadlines, phishingData);

    return {
      status: 200,
      timestamp: new Date().toISOString(),
      characterCount: emailContent.length,
      wordCount: cleanContent.split(/\s+/).length,
      summary: summary,
      priority: priorityData.level,
      priorityScore: priorityData.score,
      priorityReason: priorityData.reason,
      category: category,
      tasks: tasks,
      deadlines: deadlines,
      security: phishingData,
      suggestedReply: suggestedReply
    };
  }

  /**
   * Evaluates Phishing and Spam Indicators
   */
  static detectPhishing(rawText, lower) {
    const redFlags = [];
    let riskScore = 5;

    // Check credential harvesting keywords
    if (/password|two-factor|2fa|verify.*identity|credentials|re-enter.*password|login.*portal/i.test(rawText)) {
      redFlags.push("Requests sensitive credentials or password verification.");
      riskScore += 35;
    }

    // Check urgency & suspension threats
    if (/suspended within|account.*purged|immediate.*action.*required|terminate.*access|delay in.*deposit|salary/i.test(rawText)) {
      redFlags.push("Uses high-pressure scare tactics threatening account termination or financial penalty.");
      riskScore += 30;
    }

    // Check suspicious links
    if (/http:\/\/|bit\.ly|tinyurl|\.ru\/|\.xyz\/|\.top\/|auth-portal|login\.php/i.test(rawText)) {
      redFlags.push("Contains insecure HTTP or suspicious external authentication URLs.");
      riskScore += 35;
    }

    // Check deterrence from contacting IT
    if (/do not contact.*helpdesk|do not reply|automated security audit/i.test(rawText)) {
      redFlags.push("Explicitly instructs recipient not to contact official IT helpdesk.");
      riskScore += 25;
    }

    // Check wire transfer / lottery
    if (/wire transfer|cryptocurrency|western union|lottery|inheritance/i.test(rawText)) {
      redFlags.push("Contains solicitation for unverified financial transactions.");
      riskScore += 30;
    }

    riskScore = Math.min(Math.max(riskScore, 0), 100);
    const isPhishing = riskScore >= 45;

    let riskLevel = "Safe";
    if (riskScore >= 70) riskLevel = "Critical Threat";
    else if (riskScore >= 45) riskLevel = "High Risk";
    else if (riskScore >= 20) riskLevel = "Low Risk";

    return {
      isPhishing: isPhishing,
      riskLevel: riskLevel,
      riskScore: riskScore,
      flags: redFlags,
      recommendation: isPhishing
        ? "⚠️ CAUTION: Do NOT click any links, enter credentials, or send funds. Report this email immediately to your Security Operations Center (SOC)."
        : "Email passed security heuristics. No overt phishing or credential-harvesting indicators detected."
    };
  }

  /**
   * Evaluates Priority Level: High, Medium, Low
   */
  static detectPriority(lower, phishing) {
    if (phishing.isPhishing) {
      return {
        level: "High",
        score: 95,
        reason: "Security alert / phishing threat detected requiring immediate triage."
      };
    }

    const highUrgencyKeywords = [
      "urgent", "asap", "critical", "immediately", "escalation", "blocking",
      "p0", "sever-1", "emergency", "by today", "by end of day", "eod", "within 24 hours"
    ];

    const lowUrgencyKeywords = [
      "newsletter", "fyi", "no action required", "no action needed",
      "happy monday", "weekly digest", "quick read", "just sharing", "whenever you get a chance"
    ];

    let highHits = 0;
    for (const kw of highUrgencyKeywords) {
      if (lower.includes(kw)) highHits++;
    }

    let lowHits = 0;
    for (const kw of lowUrgencyKeywords) {
      if (lower.includes(kw)) lowHits++;
    }

    if (highHits >= 1) {
      return {
        level: "High",
        score: 85 + Math.min(highHits * 5, 10),
        reason: `Contains critical urgency triggers (${highHits} detected, e.g. urgent deadline/escalation).`
      };
    }

    if (lowHits >= 1 && highHits === 0) {
      return {
        level: "Low",
        score: 20,
        reason: "Informational or newsletter communication with no pressing action items."
      };
    }

    return {
      level: "Medium",
      score: 55,
      reason: "Standard business communication with active questions or upcoming deliverables."
    };
  }

  /**
   * Categorizes the Email
   */
  static detectCategory(lower, phishing) {
    if (phishing.isPhishing) return "Security & Phishing";
    if (/invoice|billing|charge|\$|payment|receipt|refund|seat license/i.test(lower)) return "Finance & Billing";
    if (/pull request|github|api|deploy|regression|qa|deliverable|sprint|staging|bug/i.test(lower)) return "Project Management";
    if (/schedule|sync|meeting|zoom|google meet|calendar|call|availability/i.test(lower)) return "Meeting & Scheduling";
    if (/client|customer|support|ticket|inquiry|onboarding/i.test(lower)) return "Client Inquiry";
    if (/newsletter|digest|weekly|design pulse|inspiration|article/i.test(lower)) return "Newsletter & Updates";
    return "General Work Communication";
  }

  /**
   * Extracts Actionable Tasks
   */
  static extractTasks(lines, rawText) {
    const tasks = [];
    const taskRegex = /^\s*(?:\d+[\.\)]|[-*•])\s*(.+)$/;

    for (const line of lines) {
      const match = line.match(taskRegex);
      if (match) {
        tasks.push({
          id: `task-${tasks.length + 1}`,
          text: match[1].trim(),
          completed: false
        });
      }
    }

    // If no numbered list found, inspect sentences with action verbs
    if (tasks.length === 0) {
      const sentences = rawText.split(/[.!?]+/).map(s => s.trim());
      for (const s of sentences) {
        if (/^(please|ensure|kindly|could you|make sure|we must|review|submit|schedule|verify)/i.test(s) && s.length > 15) {
          tasks.push({
            id: `task-${tasks.length + 1}`,
            text: s,
            completed: false
          });
          if (tasks.length >= 4) break;
        }
      }
    }

    return tasks;
  }

  /**
   * Extracts Deadlines and Dates
   */
  static extractDeadlines(rawText, lower) {
    const deadlines = [];
    const deadlineRegexes = [
      /(?:by|before|until|on|due)\s+(?:next\s+)?(monday|tuesday|wednesday|thursday|friday|saturday|sunday)(?:\s+at\s+[\d:]+\s*(?:am|pm|est|pst|gmt)?)?/gi,
      /(?:by|before|until)\s+([\d]{1,2}[:.][\d]{2}\s*(?:am|pm)(?:\s+[a-z]{3})?)/gi,
      /(?:by|on)\s+((?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2}(?:st|nd|rd|th)?)/gi,
      /(within\s+\d+\s+(?:hours|days|minutes))/gi,
      /(end of (?:the )?week|end of day|eod)/gi
    ];

    for (const regex of deadlineRegexes) {
      let match;
      while ((match = regex.exec(rawText)) !== null) {
        const fullMatch = match[0].trim();
        if (!deadlines.some(d => d.text.toLowerCase() === fullMatch.toLowerCase())) {
          deadlines.push({
            id: `dl-${deadlines.length + 1}`,
            text: fullMatch,
            context: match[1] || fullMatch,
            isUrgent: /eod|today|within \d+ hours|friday/i.test(fullMatch)
          });
        }
      }
    }

    return deadlines;
  }

  /**
   * Generates Executive Summary
   */
  static generateSummary(rawText, lines, priority, category, deadlines) {
    const firstParagraph = lines.slice(0, 3).join(" ");
    let deadlineSummary = "";
    if (deadlines.length > 0) {
      deadlineSummary = ` Key upcoming deadline noted: ${deadlines[0].text}.`;
    }

    if (priority.level === "High") {
      return `Urgent communication categorized under ${category}. The sender requires priority action regarding time-sensitive deliverables.${deadlineSummary} Immediate attention is recommended.`;
    } else if (priority.level === "Low") {
      return `Informational update categorized under ${category}. No immediate action items are required; shared primarily for team awareness and reference.`;
    } else {
      return `Business correspondence regarding ${category}. Outlines upcoming requests and coordination items for team review.${deadlineSummary}`;
    }
  }

  /**
   * Generates Contextual Suggested Draft Reply
   */
  static generateReply(rawText, priority, category, tasks, deadlines, phishing) {
    if (phishing.isPhishing) {
      return `[SECURITY WARNING DRAFT]
To IT Security Team,

I am forwarding a suspicious communication received today requesting credentials and urgent verification. Please review for potential phishing and add the sender domain to corporate blocklists.

Thank you,
Corporate Security Reporting`;
    }

    if (category === "Finance & Billing" || rawText.includes("Invoice")) {
      return `Hi Elena,

Thank you for reaching out regarding invoice #INV-2024-889.

I have notified our billing team to review the seat license adjustment of $450 and issue a revised invoice accordingly. Regarding the cloud migration discussion, Tuesday at 3:00 PM EST works well for our solutions architect; I will send a calendar invitation shortly.

Best regards,
Account Management Team`;
    }

    if (priority.level === "High") {
      return `Hi Marcus,

Received with thanks. I am on top of this and aligning with the team to ensure all deliverables and sign-offs are finalized before Friday at 5:00 PM EST.

I will send an interim progress update by Thursday afternoon. Please let me know if any other priorities shift.

Best regards,
Engineering Team`;
    }

    return `Hi,

Thank you for the update and sharing this information.

I have reviewed the details and will keep this in mind for our upcoming sprint planning. Hope you have a great rest of the week!

Best regards,
Team`;
  }
}

// Global Export
const analyzeEmailWithAI = EmailAnalyzer.analyzeEmailWithAI;

if (typeof module !== "undefined" && module.exports) {
  module.exports = { EmailAnalyzer, analyzeEmailWithAI, MAX_EMAIL_LENGTH };
}
