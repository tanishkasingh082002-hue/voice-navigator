/**
 * Sample Email Templates for Demonstration & Testing
 */

const SAMPLE_EMAILS = [
  {
    id: "urgent-project",
    name: "Urgent Project Deadline (High Priority)",
    badge: "High Priority",
    badgeType: "danger",
    category: "Project Management",
    subject: "URGENT: Q3 Client Deliverables & Final Sign-off Needed by Friday 5 PM",
    content: `Hi Team,

I hope you're having a productive week.

We have received an urgent escalation from the client regarding the Q3 product deliverables. The steering committee meeting has been moved forward to next Monday morning, which means we must finalize all release documentation and API integration testing before the end of this week.

Please ensure the following items are completed:
1. Sarah: Review and merge the payment gateway pull requests by Thursday 2 PM.
2. David: Run end-to-end regression tests on staging and provide the QA summary report.
3. Alex: Update the user documentation and security compliance checklist.
4. Everyone: Submit your final sign-off before Friday at 5:00 PM EST.

This is a critical milestone for our enterprise renewal. Please let me know immediately if there are any blocking dependencies.

Best regards,
Marcus Vance
Director of Product Engineering`
  },
  {
    id: "client-inquiry",
    name: "Client Invoicing & Meeting Request (Medium Priority)",
    badge: "Medium Priority",
    badgeType: "warning",
    category: "Client Inquiry",
    subject: "Question regarding Invoice #INV-2024-889 and scheduling a sync",
    content: `Dear Support & Accounts Team,

Thank you for sending over the invoice #INV-2024-889 for our annual subscription.

While reviewing the line items, our finance department noticed an unexpected charge of $450 for additional seat licenses that we believe were deprecated last month. Could you please review the attached bill and issue an updated invoice?

Also, our CTO would like to schedule a 30-minute sync next Tuesday at 3:00 PM EST to discuss our upcoming cloud migration plan. Please let us know if your solutions architect is available.

Payment for the base subscription will be processed by next Friday, October 18th once the adjustment is confirmed.

Sincerely,
Elena Rostova
Head of Operations, Apex Digital`
  },
  {
    id: "phishing-scam",
    name: "Suspicious Phishing Scam Alert (Security Threat)",
    badge: "Phishing / Security Alert",
    badgeType: "danger",
    category: "Security & Phishing",
    subject: "CRITICAL: Immediate Account Verification Required - Access Suspended within 24 Hours",
    content: `ATTENTION EMPLOYEE,

Your corporate Microsoft Office 365 and IT payroll credentials have expired as of today. 

Failure to verify your identity immediately will result in total termination of your corporate email access and delay in your direct deposit salary.

Please click the secure link below right now and re-enter your current corporate password and two-factor authentication code:
http://internal-secure-verify-auth-portal-update88921.ru/login.php

Do not contact your IT helpdesk as this is an automated security audit. You have exactly 12 hours before your account is permanently purged.

IT Security Administration Team
Global Enterprise Infrastructure`
  },
  {
    id: "casual-newsletter",
    name: "Weekly Design Team Newsletter (Low Priority)",
    badge: "Low Priority",
    badgeType: "success",
    category: "Newsletter",
    subject: "Design Pulse #42: Modern UI trends, typography tips, and team wins",
    content: `Hey everyone!

Happy Monday! Here is your weekly digest of what the design systems team has been up to:

- We just published the new 2026 SaaS UI icon set on Figma. Feel free to explore the library.
- Great article on micro-interactions and accessible color palettes by Smashing Magazine: well worth a quick read with your morning coffee.
- Kudos to Maya for leading the onboarding workshop last week!

No action items required from your end—just sharing some inspiration for the week ahead. Have a wonderful week!

Cheers,
Liam
Design Systems Lead`
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { SAMPLE_EMAILS };
}
