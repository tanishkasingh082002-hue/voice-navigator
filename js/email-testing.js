/**
 * AI Email Assistant - Comprehensive 12-Case Testing Suite
 * Validates frontend inputs, backend API validation, AI response structure, error handling, and security.
 */

class EmailTestingSuite {
  constructor(analyzerFn) {
    this.analyzeFn = analyzerFn || analyzeEmailWithAI;
    this.results = [];
    this.lastRunTimestamp = null;
    this.testCases = this.buildTestCases();
  }

  buildTestCases() {
    return [
      // 1. Empty email input
      {
        id: "test-01",
        name: "1. Empty email input",
        description: "Validates that submitting empty text returns 'Email content is required.'",
        inputSnippet: "'' (empty string)",
        inputSample: "",
        expected: "Error: Email content is required.",
        execute: async () => {
          try {
            await this.analyzeFn("");
            return { passed: false, actual: "Analysis succeeded unexpectedly with empty input." };
          } catch (err) {
            const passed = err.message === "Email content is required." || err.message.includes("content is required");
            return {
              passed,
              actual: `Threw Error: "${err.message}" (Status: ${err.status || 400})`
            };
          }
        }
      },

      // 2. Invalid email input type
      {
        id: "test-02",
        name: "2. Invalid email input type",
        description: "Validates that submitting non-string data (e.g. number/null) returns HTTP 400 Bad Request.",
        inputSnippet: "12345 (number / non-string)",
        inputSample: 12345,
        expected: "HTTP 400 Bad Request / Invalid email input type",
        execute: async () => {
          try {
            await this.analyzeFn(12345);
            return { passed: false, actual: "Analysis succeeded unexpectedly on non-string input." };
          } catch (err) {
            const passed = err.status === 400 && err.message.includes("Invalid email input type");
            return {
              passed,
              actual: `Returned Status ${err.status}: "${err.message}"`
            };
          }
        }
      },

      // 3. Very large email
      {
        id: "test-03",
        name: "3. Very large email",
        description: "Rejects emails exceeding the configured maximum length (15,000 characters).",
        inputSnippet: "Repeated string > 16,000 chars",
        inputSample: "Critical project email content. ".repeat(600),
        expected: "Reject email above maximum configured length (Status 413)",
        execute: async () => {
          const oversizedEmail = "A".repeat(16000);
          try {
            await this.analyzeFn(oversizedEmail, { maxLength: 15000 });
            return { passed: false, actual: "Oversized email was accepted instead of rejected." };
          } catch (err) {
            const passed = err.status === 413 || err.message.includes("maximum allowed length");
            return {
              passed,
              actual: `Rejected successfully with Status ${err.status}: "${err.message.substring(0, 70)}..."`
            };
          }
        }
      },

      // 4. Normal email analysis
      {
        id: "test-04",
        name: "4. Normal email analysis",
        description: "Verifies AI returns complete schema: summary, priority, category, tasks, deadlines, security, and reply.",
        inputSnippet: "Standard project sprint email",
        inputSample: SAMPLE_EMAILS[0].content,
        expected: "All 7 schema properties populated with valid types",
        execute: async () => {
          const res = await this.analyzeFn(SAMPLE_EMAILS[0].content);
          const hasSummary = typeof res.summary === "string" && res.summary.length > 20;
          const hasPriority = ["High", "Medium", "Low"].includes(res.priority);
          const hasCategory = typeof res.category === "string" && res.category.length > 0;
          const hasTasks = Array.isArray(res.tasks) && res.tasks.length > 0;
          const hasDeadlines = Array.isArray(res.deadlines) && res.deadlines.length > 0;
          const hasSecurity = res.security && typeof res.security.isPhishing === "boolean";
          const hasReply = typeof res.suggestedReply === "string" && res.suggestedReply.length > 20;

          const passed = hasSummary && hasPriority && hasCategory && hasTasks && hasDeadlines && hasSecurity && hasReply;
          return {
            passed,
            actual: passed
              ? `Valid: Priority=${res.priority}, Category='${res.category}', Tasks=${res.tasks.length}, Deadlines=${res.deadlines.length}`
              : "Missing one or more required schema fields."
          };
        }
      },

      // 5. High-priority email
      {
        id: "test-05",
        name: "5. High-priority email",
        description: "Correctly identifies High priority based on urgent escalation and pressing deadline keywords.",
        inputSnippet: "URGENT escalation deliverables needed by Friday",
        inputSample: SAMPLE_EMAILS[0].content,
        expected: "priority === 'High'",
        execute: async () => {
          const res = await this.analyzeFn(SAMPLE_EMAILS[0].content);
          const passed = res.priority === "High";
          return {
            passed,
            actual: `Priority: ${res.priority} (Score: ${res.priorityScore}%, Reason: ${res.priorityReason})`
          };
        }
      },

      // 6. Low-priority email
      {
        id: "test-06",
        name: "6. Low-priority email",
        description: "Correctly identifies Low priority for informational newsletters with no pending actions.",
        inputSnippet: "Happy Monday newsletter, no action required",
        inputSample: SAMPLE_EMAILS[3].content,
        expected: "priority === 'Low'",
        execute: async () => {
          const res = await this.analyzeFn(SAMPLE_EMAILS[3].content);
          const passed = res.priority === "Low";
          return {
            passed,
            actual: `Priority: ${res.priority} (Score: ${res.priorityScore}%, Category: ${res.category})`
          };
        }
      },

      // 7. Deadline extraction
      {
        id: "test-07",
        name: "7. Deadline extraction",
        description: "Detects dates and deadlines from email content (e.g. 'Thursday 2 PM', 'Friday at 5:00 PM').",
        inputSnippet: "Deliverables due by Thursday 2 PM and Friday 5:00 PM EST",
        inputSample: SAMPLE_EMAILS[0].content,
        expected: "Extracts >= 2 deadline timestamps",
        execute: async () => {
          const res = await this.analyzeFn(SAMPLE_EMAILS[0].content);
          const passed = Array.isArray(res.deadlines) && res.deadlines.length >= 2;
          const deadlineTexts = res.deadlines.map(d => d.text).join(", ");
          return {
            passed,
            actual: `Extracted ${res.deadlines.length} deadlines: [${deadlineTexts}]`
          };
        }
      },

      // 8. Task extraction
      {
        id: "test-08",
        name: "8. Task extraction",
        description: "Detects actionable tasks from numbered items or action-oriented sentences.",
        inputSnippet: "1. Sarah: Review PRs... 2. David: Run tests... 3. Alex...",
        inputSample: SAMPLE_EMAILS[0].content,
        expected: "Extracts >= 3 distinct action tasks",
        execute: async () => {
          const res = await this.analyzeFn(SAMPLE_EMAILS[0].content);
          const passed = Array.isArray(res.tasks) && res.tasks.length >= 3;
          return {
            passed,
            actual: `Extracted ${res.tasks.length} tasks: "${res.tasks[0]?.text.substring(0, 45)}..."`
          };
        }
      },

      // 9. Spam/phishing email
      {
        id: "test-09",
        name: "9. Spam/phishing email",
        description: "Correctly flags suspicious content threatening account suspension and requesting passwords.",
        inputSnippet: "Immediate account verification, enter password at .ru link",
        inputSample: SAMPLE_EMAILS[2].content,
        expected: "isPhishing === true, High Risk or Critical Threat",
        execute: async () => {
          const res = await this.analyzeFn(SAMPLE_EMAILS[2].content);
          const passed = res.security.isPhishing === true && res.security.riskScore >= 70;
          return {
            passed,
            actual: `Flagged: ${res.security.isPhishing ? 'YES' : 'NO'}, Risk: ${res.security.riskLevel} (${res.security.riskScore}%), Flags: ${res.security.flags.length}`
          };
        }
      },

      // 10. Reply generation
      {
        id: "test-10",
        name: "10. Reply generation",
        description: "Generates a relevant context-aware draft reply acknowledging sender requirements.",
        inputSnippet: "Client invoice #INV-2024-889 adjustment request",
        inputSample: SAMPLE_EMAILS[1].content,
        expected: "Contextual reply referencing billing / meeting",
        execute: async () => {
          const res = await this.analyzeFn(SAMPLE_EMAILS[1].content);
          const reply = res.suggestedReply;
          const passed = typeof reply === "string" && reply.length > 50 && (reply.includes("invoice") || reply.includes("billing") || reply.includes("Elena"));
          return {
            passed,
            actual: `Generated ${reply.length} chars: "${reply.substring(0, 65).replace(/\n/g, ' ')}..."`
          };
        }
      },

      // 11. AI/API failure
      {
        id: "test-11",
        name: "11. AI/API failure",
        description: "Simulates upstream AI provider 503 outage and displays friendly error message without crashing.",
        inputSnippet: "Simulated upstream 503 Service Unavailable",
        inputSample: "Any valid email",
        expected: "Graceful error catch: 'AI Service is temporarily unavailable.'",
        execute: async () => {
          try {
            await this.analyzeFn("Valid email content", { simulateFailure: true });
            return { passed: false, actual: "Failed to catch simulated outage." };
          } catch (err) {
            const passed = err.message.includes("temporarily unavailable") || err.status === 503;
            return {
              passed,
              actual: `Caught safely: "${err.message}" (Status: ${err.status})`
            };
          }
        }
      },

      // 12. Long but valid email
      {
        id: "test-12",
        name: "12. Long but valid email",
        description: "Successfully analyzes long email (~4,000 chars) within the allowed 15,000 character limit.",
        inputSnippet: "Comprehensive multi-section enterprise email (~4,000 chars)",
        inputSample: SAMPLE_EMAILS[0].content.repeat(6),
        expected: "Status 200 OK, full analysis returned within limit",
        execute: async () => {
          const longValidEmail = SAMPLE_EMAILS[0].content.repeat(6);
          const res = await this.analyzeFn(longValidEmail);
          const passed = res.status === 200 && res.characterCount === longValidEmail.length;
          return {
            passed,
            actual: `Success (Status 200): Analyzed ${res.characterCount} chars, ${res.wordCount} words.`
          };
        }
      }
    ];
  }

  /**
   * Executes an individual test case
   */
  async runTest(testId) {
    const tc = this.testCases.find(t => t.id === testId);
    if (!tc) return null;

    const startTime = performance.now();
    try {
      const outcome = await tc.execute();
      const elapsed = Math.round(performance.now() - startTime);
      return {
        id: tc.id,
        name: tc.name,
        description: tc.description,
        inputSnippet: tc.inputSnippet,
        inputSample: tc.inputSample,
        expected: tc.expected,
        actual: outcome.actual,
        passed: outcome.passed,
        elapsedMs: elapsed,
        error: null
      };
    } catch (err) {
      const elapsed = Math.round(performance.now() - startTime);
      return {
        id: tc.id,
        name: tc.name,
        description: tc.description,
        inputSnippet: tc.inputSnippet,
        inputSample: tc.inputSample,
        expected: tc.expected,
        actual: `Uncaught Exception: ${err.message}`,
        passed: false,
        elapsedMs: elapsed,
        error: err.message
      };
    }
  }

  /**
   * Runs all 12 test cases in sequence
   */
  async runAllTests(onProgress) {
    this.results = [];
    let passedCount = 0;
    let failedCount = 0;

    for (let i = 0; i < this.testCases.length; i++) {
      const tc = this.testCases[i];
      if (onProgress) {
        onProgress({ id: tc.id, status: "RUNNING", index: i + 1, total: this.testCases.length });
      }

      const res = await this.runTest(tc.id);
      if (res.passed) passedCount++;
      else failedCount++;

      this.results.push(res);
      if (onProgress) {
        onProgress({ id: tc.id, status: res.passed ? "PASS" : "FAIL", result: res, index: i + 1, total: this.testCases.length });
      }
    }

    this.lastRunTimestamp = new Date();
    const total = this.testCases.length;
    const passRate = Math.round((passedCount / total) * 100);

    return {
      total,
      passed: passedCount,
      failed: failedCount,
      passRate,
      timestamp: this.lastRunTimestamp,
      results: this.results
    };
  }

  clearResults() {
    this.results = [];
    this.lastRunTimestamp = null;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { EmailTestingSuite };
}
