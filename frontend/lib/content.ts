import type { IconName } from "@/components/icon";

/** Relive's site. Set at build time (NEXT_PUBLIC_RELIVE_URL), e.g. http://localhost:5173 when running both locally. */
export const RELIVE_URL = process.env.NEXT_PUBLIC_RELIVE_URL || "https://relive.co.in";

/**
 * Thrive has no login of its own yet: every "Log in" / "get started" button opens Relive's login (`?login=1`).
 * `from=thrive` (and the goal picked) let Relive tell these visitors apart once it reads them.
 */
export const loginUrl = (goal?: string) => `${RELIVE_URL}/?login=1&from=thrive${goal ? `&goal=${goal}` : ""}`;

/**
 * "Speak to us" and the other conversation buttons open /contact/ (app/contact/page.tsx) to call or email the team.
 * For now the CGreen support line Relive also shows (frontend/lib/contact.ts in the Relive repo); change these if Thrive gets its own.
 */
export const SUPPORT_PHONE = "+91 82912 11398"; // display
export const SUPPORT_TEL = "+918291211398"; // tel: links
export const SUPPORT_EMAIL = "relive@cgreen.in";

export const SOURCE_RBI = "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12848";
export const SOURCE_EMI = "https://www.icici.bank.in/personal-banking/loans/personal-loan/emi-calculator";

export const GOALS: { id: string; icon: IconName; title: string; desc: string }[] = [
  { id: "combine", icon: "layers", title: "I want to combine several EMIs.", desc: "Explore a simpler arrangement for eligible repayments." },
  { id: "monthly", icon: "wallet", title: "I want to explore a lower EMI.", desc: "Review what may fit my monthly budget." },
  { id: "cost", icon: "receipt", title: "I want to review my interest costs.", desc: "Understand my current terms and available alternatives." },
  { id: "dates", icon: "calendar", title: "I want fewer repayment dates.", desc: "Make several commitments easier to keep track of." },
  { id: "sooner", icon: "clock", title: "I want to finish repayment sooner.", desc: "Explore the options and costs involved." },
  { id: "unsure", icon: "conversation", title: "I need help working it out.", desc: "Talk through my situation and understand the next step." },
];

export const SLIDES = [
  {
    topic: "YOUR EMIs, RECONSIDERED",
    line1: "Too many EMIs?",
    line2: "Let’s simplify them.",
    desc: "Different loans. Different due dates. One monthly budget. Explore whether your eligible repayments could work better together.",
  },
  {
    topic: "YOUR MONTHLY BUDGET",
    line1: "Your income has",
    line2: "other jobs to do.",
    desc: "Rent. Family. Everyday life. Let’s review your repayments alongside the expenses that matter to your household.",
  },
  {
    topic: "REVIEW YOUR EXISTING TERMS",
    line1: "Could your loan",
    line2: "work better for you?",
    desc: "Compare available alternatives on interest, fees, tenure and total repayment. Not just a smaller monthly number.",
  },
  {
    topic: "FEWER THINGS TO KEEP TRACK OF",
    line1: "Different EMIs.",
    line2: "Too many due dates?",
    desc: "Start with a clear picture of your commitments. Explore whether an eligible consolidation could make them easier to manage.",
  },
  {
    topic: "START BEFORE IT GETS DIFFICULT",
    line1: "Paying on time.",
    line2: "Still feeling stretched?",
    desc: "You don’t have to wait for a missed payment. Tell us what feels difficult and what you would like to change.",
  },
  {
    topic: "YOU DO NOT NEED ALL THE ANSWERS",
    line1: "Not sure where",
    line2: "to begin? Let’s talk.",
    desc: "Speak, type or request a conversation. We’ll help you understand your situation and work out a practical next step.",
  },
];

export const FAQS: [question: string, answer: string][] = [
  [
    "What does EMI consolidation mean?",
    "It generally means replacing several eligible debts with a new loan and a single repayment arrangement for those debts. It reorganises repayment; it does not erase what you owe. Which debts can be included depends on the available lender product and your circumstances.",
  ],
  [
    "Will my EMI definitely reduce?",
    "No. Any change depends on the proposed amount, interest rate, tenure and fees. A longer tenure can lower monthly instalments while increasing total interest. Compare the complete terms before deciding.",
  ],
  [
    "Is xThrive a lender?",
    "No. xThrive is a CGreen service supporting review and the application process. The lending partner makes the credit decision, issues any offer and handles sanction and disbursement.",
  ],
  [
    "Can I speak to someone instead of filling a form?",
    "Yes. Choose Speak to us, verify your mobile number and choose your callback preferences. You do not need to finish the financial assessment to request a conversation. In this design preview, requests stay in your browser and no callback is actually booked.",
  ],
  [
    "What happens if I have overdue payments?",
    "Tell us about them. An unresolved overdue account may need a Relive review first. This is a support route, not an automatic lending decision. Your goal of more manageable repayments remains relevant.",
  ],
  [
    "What information will I need?",
    "Start with your mobile number and what you want to change. Current repayment details and recent statements may help later. We explain any additional information or permission needed at the relevant step.",
  ],
  [
    "What will it cost?",
    "Review any applicable lender charges and any legally permissible service charges in writing before agreeing. No fees are collected in this preview. The approved service and pricing schedule must be published before production launch.",
  ],
];

/** The information guides, one page each at /information/<id>/. `body` is fixed HTML written here, never user input. */
export const GUIDES = {
  consolidation: {
    title: "What does EMI consolidation mean?",
    eyebrow: "INFORMATION / UNDERSTAND THE OPTION",
    summary: "Understand what consolidation changes and what it does not.",
    body: `<p>Consolidation is a possible way to replace several eligible debts with a new loan and a single repayment arrangement for those debts. It changes how you repay; it does not make your existing borrowing disappear.</p><h3>What needs checking?</h3><ul><li>Which existing accounts would be repaid and which would remain.</li><li>The confirmed payoff amounts, not only older reported balances.</li><li>The new rate, term, fees and overall amount repayable.</li><li>Whether the payment fits your current situation.</li></ul><h3>What is not a promise?</h3><p>Not all accounts can be consolidated. A review does not guarantee an offer, a lower payment or a lower total cost. Any available option depends on lender approval.</p><div class="notice">Have overdue accounts or a disputed record? Tell us first. You may need support through Relive before exploring a new arrangement.</div>`,
  },
  compare: {
    title: "Look beyond the monthly EMI.",
    eyebrow: "INFORMATION / YOUR COMPARISON CHECKLIST",
    summary: "Compare costs, commitments and the full repayment period.",
    body: `<p>A smaller monthly instalment can be helpful, but it is only one part of an offer. A longer tenure can also increase total interest.</p><h3>Compare the whole arrangement</h3><ul><li>The amount financed and the old debts it will actually repay.</li><li>The interest rate, APR where applicable, and all disclosed fees.</li><li>Processing, switching and applicable early-closure charges.</li><li>The repayment term and total amount payable.</li><li>Any commitments that remain outside the proposed arrangement.</li></ul><h3>Ask for the written terms</h3><p>Read the lender's Key Facts Statement where applicable and the actual offer before agreeing. A desired monthly EMI is your preference, not an approved quote.</p><p class="small">References: <a href="${SOURCE_EMI}" target="_blank" rel="noopener noreferrer">ICICI Bank: tenure and total interest</a>; <a href="${SOURCE_RBI}" target="_blank" rel="noopener noreferrer">RBI: digital lending disclosures</a>.</p>`,
  },
  transfer: {
    title: "Consolidation or balance transfer?",
    eyebrow: "INFORMATION / TWO DIFFERENT REVIEWS",
    summary: "Understand two different approaches to reviewing existing loans.",
    body: `<h3>Consolidation</h3><p>Explores whether several eligible commitments can be repaid through a new arrangement, leaving a simpler repayment structure for those debts.</p><h3>Balance transfer</h3><p>Reviews moving an eligible outstanding loan to another lender's arrangement. The current payoff amount, new terms and applicable charges all matter.</p><h3>Before choosing</h3><p>Compare the full cost and remaining tenure, not just the advertised rate. Do not assume all debts are eligible or that a lower EMI means a better overall deal.</p><div class="notice">xThrive helps you review the information. The relevant lender decides whether an offer is available.</div>`,
  },
  overdue: {
    title: "What if a repayment issue needs attention first?",
    eyebrow: "INFORMATION / FIND THE RIGHT STARTING POINT",
    summary: "Find the right support for overdue or disputed accounts.",
    body: `<p>Tell us whether you have missed payments, a disputed amount, an unfamiliar account, or a recent payment that is not reflected.</p><h3>Verify before assuming</h3><p>Older reported information may not match your latest statements. Keep payment evidence and ask the lender to explain differences. A missing field is not a zero balance.</p><h3>Relive may be the better starting point</h3><p>If unresolved overdue accounts need attention, a Relive review can help clarify the dues and possible next steps. Your consolidation goal can remain linked to that review.</p><div class="notice">Do not stop an agreed repayment merely because you started an enquiry. A future consolidation offer is not guaranteed.</div>`,
  },
};

export type GuideId = keyof typeof GUIDES;
