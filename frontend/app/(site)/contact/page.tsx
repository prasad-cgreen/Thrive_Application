import type { Metadata } from "next";
import { Icon, IconSpan } from "@/components/icon";
import { SUPPORT_EMAIL, SUPPORT_PHONE, SUPPORT_TEL } from "@/lib/contact";
import { loginUrl } from "@/lib/content";

export const metadata: Metadata = { title: "Speak to us" };

// Where "Speak to us", "Talk it through", "Ask a question" and the other conversation buttons lead: a person, not the login.
export default function Contact() {
  return (
    <section className="route-section">
      <div className="wrap">
        <a className="breadcrumb" href="/">
          <Icon name="left" /> Back to xThrive
        </a>
        <div className="public-top">
          <div className="eyebrow">HUMAN SUPPORT. A SIMPLE START.</div>
          <h1>
            Let&rsquo;s arrange
            <br />a conversation.
          </h1>
          <p>
            Call or email our team and tell us what you would like to change. You do not need to complete the financial assessment or
            have every document ready.
          </p>
        </div>
        <div className="button-row">
          <a className="btn" href={`tel:${SUPPORT_TEL}`}>
            <IconSpan name="phone" />
            Call {SUPPORT_PHONE}
          </a>
          <a className="btn secondary" href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("xThrive: I would like to talk")}`}>
            <IconSpan name="conversation" />
            Email {SUPPORT_EMAIL}
          </a>
        </div>
        <div className="source-box">
          <p>
            Prefer to start online? <a href={loginUrl()}>Log in with your mobile number</a> and tell us your goal.
          </p>
          <p>Already dealing with overdue dues or an account dispute? Mention it, so the right support route can be discussed.</p>
        </div>
      </div>
    </section>
  );
}
