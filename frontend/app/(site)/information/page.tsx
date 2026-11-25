import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { GUIDES } from "@/lib/content";

export const metadata: Metadata = { title: "Information" };

export default function Information() {
  return (
    <section className="route-section">
      <div className="wrap">
        <a className="breadcrumb" href="/">
          <Icon name="left" /> Back to xThrive
        </a>
        <div className="public-top">
          <div className="eyebrow">INFORMATION / A CLEARER NEXT STEP</div>
          <h1>
            Understand your options.
            <br />
            Before you make a decision.
          </h1>
          <p>Plain-English guides to consolidation, balance transfers and what to ask before agreeing to new terms.</p>
        </div>
        <div className="public-grid">
          {Object.entries(GUIDES).map(([id, guide], i) => (
            <article key={id} className="public-card">
              <div className="eyebrow">GUIDE / 0{i + 1}</div>
              <h2>{guide.title}</h2>
              <p>{guide.summary}</p>
              <a className="text-link" href={`/information/${id}/`}>
                Read this guide <Icon name="arrow" />
              </a>
            </article>
          ))}
        </div>
        <div className="source-box">
          Reading these guides does not require registration. Personal-help requests use the help-first mobile login.
        </div>
      </div>
    </section>
  );
}
