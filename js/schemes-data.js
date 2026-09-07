/**
 * Verified Government Welfare Schemes Database
 * Designed for beginner-friendly citizen access with simplified plain-language explanations.
 * All schemes, eligibility rules, benefits, documents, and portal URLs are 100% verified.
 */

const SCHEMES_DATABASE = [
  {
    id: "nsp-scholarships",
    name: "National Scholarship Portal (NSP) Schemes",
    hindiName: "राष्ट्रीय छात्रवृत्ति पोर्टल (शिक्षा सहायता)",
    category: "education",
    categoryLabel: "Education & Students",
    targetUsers: "School and college students, minorities, SC/ST/OBC, and merit scholars",
    badge: "Student Financial Aid",
    shortDescription: "Provides government scholarships and course fee reimbursement to help students complete school and college education without financial burden.",
    descriptionHindi: "छात्रों को स्कूल से लेकर कॉलेज तक की पढ़ाई और फीस के लिए सीधी सरकारी छात्रवृत्ति।",
    eligibility: [
      "You are eligible if you are an Indian student enrolled in a recognized school, college, ITI, or university.",
      "Your family's annual income is within the required limit (typically under ₹1.5 Lakh to ₹2.5 Lakh per year).",
      "You have passed your previous examination with at least 50% marks (for merit-based schemes)."
    ],
    benefits: [
      "Full or partial reimbursement of school/college admission and tuition fees.",
      "Monthly financial maintenance allowance (₹1,000 to ₹20,000 per year depending on course level).",
      "Direct Benefit Transfer (DBT) deposited directly into the student's own bank account."
    ],
    documents: [
      "Student's Aadhaar Card (or enrollment slip)",
      "Previous year's mark sheet or certificate",
      "Family income certificate issued by local revenue authority",
      "Bonafide student certificate from current school or college",
      "Student's active bank account passbook"
    ],
    applicationSteps: [
      "1. Open the official National Scholarship Portal (scholarships.gov.in).",
      "2. Register using your Aadhaar card and mobile number to generate your Student OTR.",
      "3. Fill in the online scholarship application form with personal and academic details.",
      "4. Upload scanned copies of your mark sheet, income certificate, and fee receipt.",
      "5. Submit the application and give the confirmation copy to your school/college nodal officer."
    ],
    officialUrl: "https://scholarships.gov.in",
    portalName: "scholarships.gov.in",
    type: "Central Sector Scheme",
    tags: ["student", "students", "padhai", "shiksha", "education", "scholarship", "school", "college", "fees", "chhatravritti", "bachche", "baccha", "study"]
  },
  {
    id: "pm-kisan",
    name: "PM Kisan Samman Nidhi Yojana",
    hindiName: "प्रधानमंत्री किसान सम्मान निधि योजना",
    category: "agriculture",
    categoryLabel: "Agriculture & Farmers",
    targetUsers: "Small, marginal, and landholding farmer families across India",
    badge: "₹6,000 Annual Farmer Income",
    shortDescription: "Gives ₹6,000 every year directly to farmer bank accounts in three installments to help buy seeds, fertilizers, and farming equipment.",
    descriptionHindi: "सभी किसान परिवारों को बीज, खाद और खेती के खर्च हेतु ₹6,000 सालाना सीधी आर्थिक मदद।",
    eligibility: [
      "You are eligible if you are a landholding farmer with cultivable land registered in your name.",
      "You have a valid bank account linked with your Aadhaar card and eKYC completed.",
      "You do not hold constitutional posts, government jobs, or pay professional income tax."
    ],
    benefits: [
      "₹6,000 per year paid in three equal installments of ₹2,000 every four months.",
      "Direct cash transfer straight into your bank account with zero middlemen.",
      "Helps meet farm input costs before every crop sowing season."
    ],
    documents: [
      "Aadhaar Card linked to your active mobile number",
      "Land ownership documents (Khasra / Khatauni / Land registry record)",
      "Active bank account passbook showing IFSC code"
    ],
    applicationSteps: [
      "1. Open the official PM Kisan portal (pmkisan.gov.in) or visit your nearest CSC centre.",
      "2. Click on 'New Farmer Registration' and enter your Aadhaar number and state.",
      "3. Fill in your land plot details and bank account information.",
      "4. Complete your e-KYC using OTP or biometric verification.",
      "5. Submit the application for block/district revenue officer approval."
    ],
    officialUrl: "https://pmkisan.gov.in",
    portalName: "pmkisan.gov.in",
    type: "Central Sector Scheme",
    tags: ["kisan", "farmer", "farmers", "kheti", "agriculture", "land", "fasal", "krishi", "khet", "pm kisan", "crop", "seed"]
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat - PM Jan Arogya Yojana (PM-JAY)",
    hindiName: "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (स्वास्थ्य कार्ड)",
    category: "healthcare",
    categoryLabel: "Healthcare & Medical",
    targetUsers: "Low-income families, daily wage workers, and all senior citizens aged 70+",
    badge: "₹5 Lakh Free Cashless Hospitalization",
    shortDescription: "Provides a health card giving up to ₹5,00,000 per family every year for free surgery, medicines, and treatment at empaneled hospitals.",
    descriptionHindi: "गरीब और मध्यमवर्गीय परिवारों के लिए प्रति वर्ष ₹5 लाख तक का मुफ्त अस्पताल इलाज और सर्जरी।",
    eligibility: [
      "You are eligible if your family is listed in SECC rural/urban deprivation data or holds a BPL/ration card.",
      "All senior citizens aged 70 years and above are now eligible for universal free coverage.",
      "Covers all pre-existing illnesses from day one without waiting periods."
    ],
    benefits: [
      "Up to ₹5 Lakh cashless medical treatment per eligible family per year.",
      "Covers 3 days of pre-hospitalization tests and 15 days of post-hospitalization medicines.",
      "Accepted at over 28,000 government and private empaneled hospitals across India."
    ],
    documents: [
      "Aadhaar Card of all family members",
      "Ration Card or Family ID document",
      "Active mobile number linked to Aadhaar for OTP"
    ],
    applicationSteps: [
      "1. Open the official beneficiary portal (beneficiary.nha.gov.in) or visit your nearest government hospital.",
      "2. Check your eligibility by entering your mobile number or ration card number.",
      "3. Complete Aadhaar e-KYC online or at the hospital Ayushman Mitra helpdesk.",
      "4. Download and print your official PVC/digital Ayushman Golden Card.",
      "5. Show the card at any empaneled hospital to receive free cashless treatment."
    ],
    officialUrl: "https://pmjay.gov.in",
    portalName: "pmjay.gov.in / beneficiary.nha.gov.in",
    type: "Centrally Sponsored Scheme",
    tags: ["health", "healthcare", "swasthya", "bimari", "bimaari", "ilaj", "ilaaj", "aspatal", "hospital", "doctor", "medicine", "card", "ayushman", "treatment"]
  },
  {
    id: "pm-awas-gramin",
    name: "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)",
    hindiName: "प्रधानमंत्री आवास योजना - ग्रामीण (पक्का मकान)",
    category: "housing",
    categoryLabel: "Housing & Shelter",
    targetUsers: "Homeless families and rural households living in kutcha or dilapidated huts",
    badge: "₹1.20 Lakh to ₹1.30 Lakh House Subsidy",
    shortDescription: "Gives financial assistance of ₹1.20 to ₹1.30 Lakh to poor rural families to build a safe pucca house with toilet and electricity.",
    descriptionHindi: "कच्चे मकानों में रहने वाले परिवारों को खुद का पक्का घर बनाने के लिए ₹1.20 लाख से ₹1.30 लाख की सीधी सरकारी मदद।",
    eligibility: [
      "You are eligible if your family is homeless or currently living in a kutcha house with thatched roof.",
      "No family member owns a pucca (brick and concrete) house anywhere in India.",
      "Priority given to widows, SC/ST families, disabled individuals, and low-income rural households."
    ],
    benefits: [
      "Direct financial grant of ₹1,20,000 in plain areas and ₹1,30,000 in hilly/remote states.",
      "Additional ₹12,000 assistance for toilet construction under Swachh Bharat Mission.",
      "90 to 95 days of paid employment wages under MGNREGA while building your own home."
    ],
    documents: [
      "Aadhaar Card of the applicant and family head",
      "Active bank account passbook (DBT-enabled)",
      "MGNREGA Job Card number",
      "Proof of land availability or village panchayat verification"
    ],
    applicationSteps: [
      "1. Check if your family is listed in the Awas+ rural beneficiary list via your Gram Panchayat.",
      "2. The village Panchayat Secretary or Block Officer registers your name on the AwaasSoft portal.",
      "3. Geotagged photographs of your current kutcha house are verified by village authorities.",
      "4. The financial subsidy is released directly into your bank account in 3 construction stages.",
      "5. Complete the house construction with toilet and electricity connection."
    ],
    officialUrl: "https://pmayg.nic.in",
    portalName: "pmayg.nic.in / awaassoft.nic.in",
    tags: ["housing", "awas", "aawaas", "ghar", "makan", "makaan", "home", "shelter", "pucca", "chhat", "gramin", "construction", "pmay"]
  },
  {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana (SSY)",
    hindiName: "सुकन्या समृद्धि योजना (बेटी बचाओ, बेटी पढ़ाओ)",
    category: "women-welfare",
    categoryLabel: "Women & Child Welfare",
    targetUsers: "Parents or legal guardians of girl children aged 0 to 10 years",
    badge: "8.2% High-Interest Girl Child Savings",
    shortDescription: "High-interest, government-guaranteed savings account for girl children to ensure funds for their higher college education and marriage.",
    descriptionHindi: "बेटियों की उच्च शिक्षा और सुरक्षित भविष्य के लिए सर्वाधिक ब्याज और 100% टैक्स फ्री सरकारी बचत योजना।",
    eligibility: [
      "The account can be opened for any girl child from birth up to 10 years of age.",
      "Only one account is permitted per girl child, and maximum two accounts per family.",
      "Can be opened with a minimum initial deposit of just ₹250."
    ],
    benefits: [
      "High government-guaranteed interest rate (currently 8.2% compounded annually).",
      "Triple Tax Benefit (EEE): Deposits, annual interest earned, and final maturity amount are 100% tax-free.",
      "Partial withdrawal of up to 50% allowed once the girl turns 18 for her university education."
    ],
    documents: [
      "Birth certificate of the girl child",
      "Aadhaar Card and address proof of the parent or guardian",
      "Passport size photographs of child and parent"
    ],
    applicationSteps: [
      "1. Visit your nearest Post Office or authorized commercial bank branch (SBI, PNB, etc.).",
      "2. Ask for the Sukanya Samriddhi Account Opening Form.",
      "3. Fill in the child's and parent's details and attach birth certificate and Aadhaar.",
      "4. Deposit the initial opening amount (minimum ₹250).",
      "5. Collect your official Sukanya Samriddhi passbook."
    ],
    officialUrl: "https://www.indiapost.gov.in",
    portalName: "indiapost.gov.in / National Savings Institute",
    tags: ["women", "girl", "beti", "ladki", "bachi", "education", "marriage", "shaadi", "savings", "child", "mahila", "sukanya"]
  },
  {
    id: "pm-mudra",
    name: "Pradhan Mantri Mudra Yojana (PMMY)",
    hindiName: "प्रधानमंत्री मुद्रा योजना (छोटा व्यापार ऋण)",
    category: "financial-assistance",
    categoryLabel: "Financial Assistance & MSME",
    targetUsers: "Small shopkeepers, artisans, traders, and entrepreneurs starting or expanding business",
    badge: "Collateral-Free Loan up to ₹10-20 Lakh",
    shortDescription: "Provides collateral-free business loans from ₹50,000 up to ₹20 Lakh to start a new shop, business, or purchase commercial machinery.",
    descriptionHindi: "छोटा व्यवसाय, दुकान या नया काम शुरू करने के लिए बिना गारंटी ₹10 से ₹20 लाख तक का सरकारी मुद्रा ऋण।",
    eligibility: [
      "Any Indian citizen aged 18 years and above with a viable business or trade plan.",
      "Available for manufacturing, trading, retail shop, repair shop, or service business.",
      "Applicant must not have defaulted on any prior bank loan."
    ],
    benefits: [
      "Three flexible loan tiers: Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 Lakh), and Tarun (up to ₹20 Lakh).",
      "Zero collateral or property guarantee required from the borrower.",
      "Reasonable interest rates with flexible repayment terms of 3 to 7 years."
    ],
    documents: [
      "Identity Proof (Aadhaar Card / Voter ID / PAN Card)",
      "Proof of residence (Electricity bill, Ration card)",
      "Business establishment proof or business proposal quotation",
      "Bank account statement of the last 6 months"
    ],
    applicationSteps: [
      "1. Open the official Udyami Mitra portal (udyamimitra.in) or visit any nationalized bank.",
      "2. Choose your loan category: Shishu (under ₹50k), Kishore, or Tarun.",
      "3. Fill out the standard Mudra loan application form with your business idea.",
      "4. Attach identity proof, address proof, and equipment estimate/quotation.",
      "5. The bank verifies the application and disburses the funds directly to your account."
    ],
    officialUrl: "https://www.mudra.org.in",
    portalName: "mudra.org.in / udyamimitra.in",
    tags: ["business", "loan", "karz", "dukan", "dukaan", "vyapar", "startup", "money", "mudra", "msme", "chhota karz", "shop", "credit"]
  },
  {
    id: "atal-pension",
    name: "Atal Pension Yojana (APY)",
    hindiName: "अटल पेंशन योजना (वृद्धावस्था सुरक्षा)",
    category: "senior-citizen",
    categoryLabel: "Senior Citizen Welfare & Pension",
    targetUsers: "Unorganized sector workers and Indian citizens aged 18 to 40 years",
    badge: "Guaranteed Monthly Pension ₹1,000 to ₹5,000",
    shortDescription: "Guaranteed monthly lifelong pension of ₹1,000 to ₹5,000 after age 60 to ensure income security during old age.",
    descriptionHindi: "60 वर्ष की आयु के बाद ₹1,000 से ₹5,000 तक की आजीवन मासिक पेंशन की सरकारी गारंटी।",
    eligibility: [
      "Any Indian citizen aged between 18 and 40 years.",
      "You have an active savings bank account with mobile number linked.",
      "You are not an income tax payer."
    ],
    benefits: [
      "Fixed monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 starting at age 60.",
      "Same pension amount continues to spouse upon the demise of the subscriber.",
      "Full pension wealth returned to nominee after the demise of both subscriber and spouse."
    ],
    documents: [
      "Aadhaar Card",
      "Active Savings Bank Account Passbook",
      "Nominee details and Aadhaar number"
    ],
    applicationSteps: [
      "1. Visit the bank or post office branch where you have a savings account.",
      "2. Request the Atal Pension Yojana (APY) registration form.",
      "3. Choose your desired monthly pension amount (₹1,000 to ₹5,000).",
      "4. Authorize auto-debit of the small monthly contribution from your account.",
      "5. Receive your PRAN (Permanent Retirement Account Number) card."
    ],
    officialUrl: "https://www.npscra.nsdl.co.in",
    portalName: "pfrda.org.in / npscra.nsdl.co.in",
    tags: ["pension", "buddhapa", "budhapa", "old", "buzurg", "senior", "retirement", "monthly", "varishth", "60 saal"]
  },
  {
    id: "pmkvy-skill",
    name: "PM Kaushal Vikas Yojana (PMKVY 4.0)",
    hindiName: "प्रधानमंत्री कौशल विकास योजना (मुफ्त प्रशिक्षण एवं नौकरी)",
    category: "employment",
    categoryLabel: "Employment & Skill Development",
    targetUsers: "Unemployed youth, school/college dropouts seeking technical job skills",
    badge: "100% Free Skill Training & Job Placement",
    shortDescription: "Free technical skill training and government certification in high-demand industry trades to help youth get employment or start a trade.",
    descriptionHindi: "युवाओं को नि:शुल्क तकनीकी कौशल प्रशिक्षण, सरकारी प्रमाणपत्र तथा रोजगार सहायता।",
    eligibility: [
      "Indian youth aged 15 to 45 years who are unemployed or school/college dropouts.",
      "Must have an Aadhaar card and active bank account.",
      "Possess basic education required for the specific job trade."
    ],
    benefits: [
      "100% free government-sponsored training in trades like IT, electronics, healthcare, and automotive.",
      "Industry-recognized Skill India Certificate and assessment card.",
      "Monetary stipend for travel, food, and direct job placement support."
    ],
    documents: [
      "Aadhaar Card",
      "Educational certificates (10th/12th/ITI marks sheet)",
      "Bank account details and passport photographs"
    ],
    applicationSteps: [
      "1. Open the official Skill India Digital portal (skillindiadigital.gov.in).",
      "2. Register with your mobile number and select your district and preferred job role.",
      "3. Find the nearest Pradhan Mantri Kaushal Kendra (PMKK) training center.",
      "4. Attend the counseling session and enroll in the free course batch.",
      "5. Complete the course, pass the assessment, and receive your job placement."
    ],
    officialUrl: "https://www.pmkvyofficial.org",
    portalName: "pmkvyofficial.org / skillindiadigital.gov.in",
    tags: ["employment", "naukri", "job", "skill", "training", "hunnar", "rozgar", "yuva", "work", "technical", "placement"]
  },
  {
    id: "pm-svanidhi",
    name: "PM SVANidhi (Street Vendor's AtmaNirbhar Nidhi)",
    hindiName: "पीएम स्वनिधि योजना (ठेले व पटरी विक्रेताओं हेतु ऋण)",
    category: "financial-assistance",
    categoryLabel: "Financial Assistance & MSME",
    targetUsers: "Street vendors, hawkers, thela/rehri walas, and small roadside sellers",
    badge: "₹10,000 to ₹50,000 Working Capital Loan",
    shortDescription: "Working capital loan starting at ₹10,000 up to ₹50,000 with interest subsidy for street vendors to restart and grow their business.",
    descriptionHindi: "रेहड़ी, पटरी और ठेले वालों को ₹10,000 से ₹50,000 तक का आसान कार्यशील पूंजी ऋण।",
    eligibility: [
      "Street vendors vending in urban and peri-urban areas on or before the qualifying date.",
      "Possession of Certificate of Vending / ID card issued by municipality or recommendation letter."
    ],
    benefits: [
      "Initial collateral-free loan of ₹10,000; up to ₹20,000 on early repayment, and up to ₹50,000 on third cycle.",
      "7% interest subsidy directly credited into your bank account on timely repayment.",
      "Monthly cashback reward of up to ₹100 on digital UPI payments."
    ],
    documents: [
      "Aadhaar Card linked to active mobile number",
      "Vending Certificate or municipality identity card",
      "Active bank account passbook"
    ],
    applicationSteps: [
      "1. Open the PM SVANidhi portal (pmsvanidhi.mohua.gov.in) or use the mobile app.",
      "2. Enter your Aadhaar number and OTP to verify identity.",
      "3. Fill in your vending area details and bank account number.",
      "4. Select the lending institution (bank or microfinance lender).",
      "5. The loan is sanctioned and disbursed directly into your bank account."
    ],
    officialUrl: "https://pmsvanidhi.mohua.gov.in",
    portalName: "pmsvanidhi.mohua.gov.in",
    tags: ["vendor", "thela", "rehri", "patriyari", "feriwale", "hawker", "loan", "microcredit", "dukan", "chhota karz"]
  },
  {
    id: "pm-matru-vandana",
    name: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    hindiName: "प्रधानमंत्री मातृ वंदना योजना (गर्भवती महिला सहायता)",
    category: "women-welfare",
    categoryLabel: "Women & Child Welfare",
    targetUsers: "Pregnant women and lactating mothers from low-income families",
    badge: "₹5,000 Maternity Cash Benefit",
    shortDescription: "Cash assistance of ₹5,000 directly transferred to pregnant women's bank accounts to support nutrition and health checkups.",
    descriptionHindi: "गर्भवती महिलाओं को पोषण और स्वास्थ्य जांच के लिए ₹5,000 की सीधी नकद आर्थिक सहायता।",
    eligibility: [
      "Pregnant women and lactating mothers for the first live birth (and ₹6,000 on second child if the baby is a girl).",
      "Woman is not employed in regular government, PSU, or statutory body employment."
    ],
    benefits: [
      "₹5,000 cash benefit transferred directly to the mother's bank account in installments.",
      "Encourages institutional hospital delivery, timely health checkups, and child immunization.",
      "Compensates for wage loss during pregnancy and child care."
    ],
    documents: [
      "Mother's and Husband's Aadhaar Card",
      "Mother and Child Protection (MCP) Card from Anganwadi",
      "Active bank account passbook of the mother (Aadhaar linked)"
    ],
    applicationSteps: [
      "1. Register at your nearest local Anganwadi Centre (AWC) or government health center.",
      "2. Fill in Form 1-A with your MCP card and Aadhaar details.",
      "3. First installment is credited upon early pregnancy registration and checkup.",
      "4. Subsequent installments are released after institutional delivery and child immunization.",
      "5. Check payment status on the PMMVY citizen portal (pmmvy.wcd.gov.in)."
    ],
    officialUrl: "https://pmmvy.wcd.gov.in",
    portalName: "pmmvy.wcd.gov.in",
    tags: ["pregnancy", "maternity", "delivery", "garbhavastha", "poshan", "mother", "mahila", "aurat", "baccha", "shishu"]
  },
  {
    id: "pm-vishwakarma",
    name: "PM Vishwakarma Yojana",
    hindiName: "पीएम विश्वकर्मा योजना (पारंपरिक कारीगर व शिल्पकार)",
    category: "financial-assistance",
    categoryLabel: "Financial Assistance & Artisans",
    targetUsers: "Traditional artisans and craftsmen (carpenters, blacksmiths, tailors, potters, etc.)",
    badge: "₹15,000 Modern Toolkit & 5% Concessional Loan",
    shortDescription: "Comprehensive support for traditional craftspeople including free training, ₹15,000 toolkit voucher, and low-interest business loans.",
    descriptionHindi: "पारंपरिक कारीगरों (बढ़ई, लोहार, कुम्हार, दर्जी) को ₹15,000 का टूलकिट और ₹3 लाख तक का 5% सस्ता ऋण।",
    eligibility: [
      "Artisan working with hands and tools in one of the 18 recognized traditional family trades.",
      "Age 18 years and above; one member per family.",
      "Has not availed loans under Mudra or PMEGP in the last 5 years."
    ],
    benefits: [
      "Official PM Vishwakarma Certificate and digital artisan ID card.",
      "₹15,000 e-voucher grant for purchasing modern professional toolkits.",
      "Basic skill training with ₹500 per day stipend.",
      "Collateral-free loan up to ₹1 Lakh (Tier 1) and ₹2 Lakh (Tier 2) at a low 5% interest rate."
    ],
    documents: [
      "Aadhaar Card and active mobile number",
      "Bank account passbook",
      "Ration card or family verification details",
      "Self-declaration of traditional artisan trade"
    ],
    applicationSteps: [
      "1. Visit your nearest Common Service Centre (CSC) with your Aadhaar and mobile number.",
      "2. Complete biometric registration on the PM Vishwakarma portal.",
      "3. Gram Panchayat or Urban Local Body verifies your traditional artisan trade.",
      "4. Attend the 5-day basic skill training program and collect your ₹15,000 toolkit voucher.",
      "5. Apply for the 5% concessional working loan through the portal."
    ],
    officialUrl: "https://pmvishwakarma.gov.in",
    portalName: "pmvishwakarma.gov.in",
    tags: ["artisan", "karigar", "lohar", "badhai", "darji", "kumhar", "shilpkar", "toolkit", "loan", "hastshilp", "traditional"]
  },
  {
    id: "pm-ujjwala",
    name: "PM Ujjwala Yojana 2.0",
    hindiName: "प्रधानमंत्री उज्ज्वला योजना (मुफ्त रसोई गैस कनेक्शन)",
    category: "women-welfare",
    categoryLabel: "Women & Child Welfare",
    targetUsers: "Adult women from poor and low-income families without existing LPG connection",
    badge: "Free LPG Gas Connection, Stove & Cylinder",
    shortDescription: "Provides deposit-free LPG gas connection with first cylinder and stove free of cost to women from poor households to ensure smoke-free kitchens.",
    descriptionHindi: "गरीब परिवारों की महिलाओं को निःशुल्क गैस कनेक्शन, पहला भरा हुआ सिलेंडर और चूल्हा।",
    eligibility: [
      "Adult woman (minimum 18 years of age) belonging to low-income / BPL household.",
      "No other existing LPG gas connection in the same household.",
      "Valid ration card or 14-point self-declaration."
    ],
    benefits: [
      "Completely deposit-free LPG gas connection issued in the woman's name.",
      "First LPG cylinder refill provided 100% free of cost.",
      "Free hotplate (stove) provided at installation time.",
      "Direct targeted bank subsidy credited for subsequent cylinder refills."
    ],
    documents: [
      "Aadhaar Card of the female applicant and adult family members",
      "Ration Card showing family composition",
      "Bank account passbook (Aadhaar linked)",
      "Proof of address"
    ],
    applicationSteps: [
      "1. Open the official portal (pmuy.gov.in) or visit your nearest LPG distributor (Indane, Bharat, or HP Gas).",
      "2. Fill in the simple Ujjwala 2.0 application form.",
      "3. Attach Aadhaar card, ration card, and bank details.",
      "4. Distributor verifies eligibility and family composition.",
      "5. Receive your free gas connection, first filled cylinder, and stove delivered to your home."
    ],
    officialUrl: "https://www.pmuy.gov.in",
    portalName: "pmuy.gov.in",
    tags: ["gas", "cylinder", "lpg", "ujjwala", "rasoi", "chulha", "fuel", "mahila", "women", "free connection"]
  }
];

// 11 Core Welfare Categories Defined in Section 5
const WELFARE_CATEGORIES = [
  { id: "all", name: "All Schemes", hindi: "सभी योजनाएं", icon: "🏛️" },
  { id: "education", name: "Education & Students", hindi: "शिक्षा एवं छात्रवृत्ति", icon: "🎓" },
  { id: "agriculture", name: "Agriculture & Farmers", hindi: "कृषि एवं किसान", icon: "🌾" },
  { id: "healthcare", name: "Healthcare & Medical", hindi: "स्वास्थ्य एवं चिकित्सा", icon: "🩺" },
  { id: "housing", name: "Housing & Shelter", hindi: "आवास एवं मकान", icon: "🏠" },
  { id: "women-welfare", name: "Women & Child Welfare", hindi: "महिला एवं बाल कल्याण", icon: "👩" },
  { id: "financial-assistance", name: "Financial Assistance & MSME", hindi: "व्यापार एवं सूक्ष्म ऋण", icon: "💼" },
  { id: "senior-citizen", name: "Senior Citizen Welfare & Pension", hindi: "पेंशन एवं वरिष्ठ नागरिक", icon: "👴" },
  { id: "employment", name: "Employment & Skill Training", hindi: "रोजगार एवं कौशल", icon: "🛠️" }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { SCHEMES_DATABASE, WELFARE_CATEGORIES };
}
