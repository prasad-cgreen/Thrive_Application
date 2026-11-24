import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { SOURCE_EMI, SOURCE_RBI } from "@/lib/content";

export const metadata: Metadata = { title: "Terms and charges" };

export default function Terms() {
  return (
    <section className="route-section">
      <div className="wrap">
        <a className="breadcrumb" href="/">
          <Icon name="left" /> Back to xThrive
        </a>
        <article className="reading-card prose">
          <div className="eyebrow">TERMS &amp; CHARGES / DESIGN PREVIEW</div>
          <h1>
            Clarity before
            <br />
            commitment.
          </h1>
          <p>
            xThrive supports review and the application process. It does not itself lend, approve credit or promise a reduced monthly
            payment.
          </p>
          <h3>No live service transaction here</h3>
          <p>
            This prototype does not send applications, book callbacks, retrieve financial information, collect money or contact lenders.
            The sample OTP is not secure authentication. A prepared request is a local preview only.
          </p>
          <h3>Review costs in writing</h3>
          <p>
            Before any production transaction, review the actual lender&apos;s terms, APR where applicable, fees, applicable closure charges
            and total repayment. Any service-pricing policy must be approved for the operating model before launch. Where RBI LSP fee
            restrictions apply, customer charging must comply with those restrictions.
          </p>
          <h3>No guarantee</h3>
          <p>
            Availability depends on the customer&apos;s situation and the relevant lender. A lower EMI may involve a longer tenure and higher
            total interest. Neither a score nor an enquiry establishes eligibility.
          </p>
          <h3>Production details still required</h3>
          <p>
            The final legal entity disclosures, service scope, approved pricing, cancellation and refund terms, support hours and grievance
            contacts must be inserted before publication.
          </p>
          <div className="notice">
            References:{" "}
            <a href={SOURCE_RBI} target="_blank" rel="noopener noreferrer">
              RBI digital-lending requirements
            </a>
            ;{" "}
            <a href={SOURCE_EMI} target="_blank" rel="noopener noreferrer">
              Loan tenure and total interest
            </a>
            .
          </div>
        </article>
      </div>
    </section>
  );
}
