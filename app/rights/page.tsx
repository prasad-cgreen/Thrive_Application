import type { Metadata } from "next";
import { Icon, IconSpan, type IconName } from "@/components/icon";
import { SOURCE_RBI } from "@/lib/content";

export const metadata: Metadata = { title: "Your Rights" };

const CARDS: [IconName, string, string][] = [
  [
    "document",
    "Know the complete terms.",
    "For applicable digital loans, review the lender’s Key Facts Statement, APR, repayment schedule and disclosed charges before agreeing. Ask about anything unclear.",
  ],
  [
    "shield",
    "Choose before sharing.",
    "Applicable digital-lending rules require need-based data collection with prior explicit consent. Login is not permission to retrieve a report, contact a lender or share information for a different purpose.",
  ],
  [
    "loan",
    "Know who is lending.",
    "xThrive supports review and the application process; it is not a lender. Check the actual lending entity, written offer and grievance contact. Approval and disbursement remain with the lender.",
  ],
  [
    "conversation",
    "Know where to raise a concern.",
    "Use the relevant lender’s grievance route and retain the acknowledgement. Official RBI information explains applicable complaint and escalation routes. Help with a concern should not depend on accepting a new loan.",
  ],
];

export default function Rights() {
  return (
    <section className="route-section">
      <div className="wrap">
        <a className="breadcrumb" href="/">
          <Icon name="left" /> Back to xThrive
        </a>
        <div className="public-top">
          <div className="eyebrow">YOUR RIGHTS / OPEN TO EVERYONE</div>
          <h1>
            Your choices deserve
            <br />
            to be explained.
          </h1>
          <p>Understand the terms, the information being requested and who is responsible. You can read this page without logging in.</p>
        </div>
        <div className="public-grid">
          {CARDS.map(([icon, title, text]) => (
            <article key={title} className="public-card">
              <IconSpan name={icon} className="icon-tile" />
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="source-box">
          <p>
            <b>Official reference:</b>{" "}
            <a href={SOURCE_RBI} target="_blank" rel="noopener noreferrer">
              Reserve Bank of India: Digital Lending Directions
            </a>
            . For complaints, consult{" "}
            <a href="https://cms.rbi.org.in/" target="_blank" rel="noopener noreferrer">
              RBI&apos;s Complaint Management System
            </a>{" "}
            and the rules applicable to your lender and case.
          </p>
          <p>
            General information, not a case-specific legal opinion. Reviewed for this design on 24 November 2026. Production content and
            grievance contacts require compliance approval.
          </p>
        </div>
        <div className="button-row">
          <a className="btn" href="/contact/">
            Ask a question <Icon name="arrow" />
          </a>
          <a className="btn secondary" href="/information/">
            Read the guides
          </a>
        </div>
      </div>
    </section>
  );
}
