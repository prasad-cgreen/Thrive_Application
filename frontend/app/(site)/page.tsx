import { HeroCarousel } from "@/components/hero-carousel";
import { LoginDialog } from "@/components/login-dialog";
import { Icon, IconSpan, type IconName } from "@/components/icon";
import { FAQS, GOALS, loginUrl, RELIVE_URL, SOURCE_EMI } from "@/lib/content";

const bars = (count: number) => Array.from({ length: count }, (_, i) => <i key={i} />);

const COMPARE_ROWS: [IconName, string, string][] = [
  ["calendar", "Monthly repayment", "What you would need to pay each month."],
  ["clock", "Time to finish", "How long the commitment would continue."],
  ["receipt", "Interest and fees", "Including applicable costs to switch loans."],
  ["wallet", "Total amount repayable", "The full cost, not just the first EMI."],
];

const STEPS = [
  ["Tell us your goal.", "Sign in with your mobile number. Speak, type or request a callback."],
  ["See the full picture.", "Review your repayments and the details relevant to your situation."],
  ["Explore your options.", "Discuss any available terms, costs and trade-offs before you decide."],
  ["Know what happens next.", "Keep your request, documents and next actions together."],
];

export default function Home() {
  return (
    <>
      <section className="hero section" aria-label="Welcome to xThrive">
        <div className="wrap">
          <div className="eyebrow hero-intro">
            <span className="mini-dot" /> SIMPLER REPAYMENTS. MORE ROOM FOR LIFE.
          </div>
          <div className="hero-grid">
            <HeroCarousel />
            <aside className="start-card">
              <div className="eyebrow">LET&rsquo;S START WITH YOU</div>
              <h2>
                What would you{" "}
                <br />
                like to change?
              </h2>
              <p>Bring repayments together. Explore better terms. Understand your next step.</p>
              <div className="voice-invite">
                <div className="voice-wave" aria-hidden="true">
                  {bars(7)}
                </div>
                <div>
                  <strong>Your situation. Your own words.</strong>
                  <span>Speak, type or ask for a conversation.</span>
                </div>
              </div>
              <div className="start-actions">
                <a className="btn full" href={loginUrl()}>
                  Explore my EMI options <IconSpan name="arrow" />
                </a>
                <a className="btn secondary full" href="/contact/">
                  <IconSpan name="phone" />
                  Speak to us
                </a>
              </div>
              <p className="tiny card-footnote">Just your mobile number to begin. We&rsquo;ll ask for the details relevant to your request.</p>
            </aside>
          </div>
          <p className="hero-disclaimer">
            Available options depend on your circumstances and lender approval. Lower EMIs or savings are not guaranteed.
          </p>
        </div>
      </section>

      <section className="section white" id="help">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">A LITTLE LESS COMPLICATED</div>
              <h2>
                Your repayments should fit
                <br />
                into your life.
              </h2>
            </div>
            <p className="section-intro">Not just another loan. A clearer view of what you pay today, and what could work better tomorrow.</p>
          </div>
          <div className="service-grid">
            <article className="service-card">
              <IconSpan name="layers" className="icon-tile" />
              <span className="card-index">01 / CONSOLIDATE</span>
              <h3>
                Bring eligible{" "}
                <br />
                repayments together.
              </h3>
              <p>Explore whether several loans or card dues could be replaced with a simpler repayment arrangement.</p>
            </article>
            <article className="service-card">
              <IconSpan name="swap" className="icon-tile" />
              <span className="card-index">02 / COMPARE</span>
              <h3>
                Give your loan terms{" "}
                <br />
                another look.
              </h3>
              <p>Review available alternatives against your current interest, fees, remaining tenure and total repayment.</p>
            </article>
            <article className="service-card">
              <IconSpan name="conversation" className="icon-tile" />
              <span className="card-index">03 / GET SUPPORT</span>
              <h3>
                Find a next step{" "}
                <br />
                that makes sense.
              </h3>
              <p>Tell us what matters to you. Get help understanding the trade-offs before deciding what to do.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="your-goals">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">YOUR GOAL COMES FIRST</div>
              <h2>
                What would make
                <br />
                repayments easier?
              </h2>
            </div>
            <p className="section-intro">
              You don&rsquo;t need to know the name of a financial product. Start with what you want to change.
            </p>
          </div>
          <div className="goals-grid">
            {GOALS.map((goal) => (
              <a key={goal.id} className="goal-button" href={loginUrl(goal.id)}>
                <Icon name={goal.icon} />
                <div>
                  <b>{goal.title}</b>
                  <small>{goal.desc}</small>
                </div>
                <span className="goal-arrow">
                  <Icon name="arrow" />
                </span>
              </a>
            ))}
          </div>
          <p className="section-note">
            <IconSpan name="info" />
            Choose a goal to log in. Your selection comes with you.
          </p>
        </div>
      </section>

      <section className="section white" id="how-it-works">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">THE WAY FORWARD</div>
              <h2>
                One step at a time.
                <br />
                With support along the way.
              </h2>
            </div>
          </div>
          <div className="process-grid">
            {STEPS.map(([title, text], i) => (
              <article key={title}>
                <span className="step-number">{String(i + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="journey-note">
            <IconSpan name="shield" />
            <p>
              Starting a review is <strong>not a commitment to take a new loan.</strong> You review the proposed terms before deciding.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="bigger-picture">
        <div className="wrap comparison-grid">
          <div className="comparison-copy">
            <div className="eyebrow">LOOK BEYOND THE EMI</div>
            <h2>
              A smaller monthly number.
              <br />
              <span className="muted-heading">Not always a smaller cost.</span>
            </h2>
            <p>
              A longer repayment period can reduce the monthly instalment while increasing total interest. Compare the whole arrangement, not
              just the EMI.
            </p>
            <a className="text-link" href="/information/compare/">
              What should I compare? <IconSpan name="arrow" />
            </a>
            <p className="reference-line">
              Learn more:{" "}
              <a href={SOURCE_EMI} target="_blank" rel="noopener noreferrer">
                Loan tenure and total interest <span aria-hidden="true">&#8599;</span>
              </a>
            </p>
          </div>
          <div className="comparison-card">
            <div className="between">
              <span className="eyebrow">THE COMPLETE PICTURE</span>
              <IconSpan name="sliders" className="icon-tile small" />
            </div>
            {COMPARE_ROWS.map(([icon, title, text]) => (
              <div key={title} className="compare-row">
                <IconSpan name={icon} />
                <div>
                  <b>{title}</b>
                  <small>{text}</small>
                </div>
                <IconSpan name="check" className="compare-tick" />
              </div>
            ))}
            <div className="compare-footer">Clarity before commitment.</div>
          </div>
        </div>
      </section>

      <section className="section white" id="voice-support">
        <div className="wrap support-grid">
          <div className="voice-feature">
            <span className="voice-badge">
              <IconSpan name="mic" />
              YOUR VOICE, YOUR STARTING POINT
            </span>
            <h2>
              Your situation is
              <br />
              more than a form.
            </h2>
            <p>Tell us what you&rsquo;re paying, what feels difficult and what you would like to change.</p>
            <div className="sound-line" aria-hidden="true">
              {bars(23)}
            </div>
            <a className="btn" href="/contact/">
              <IconSpan name="mic" />
              Tell us my situation
            </a>
            <span className="small muted">You can also type or request a conversation.</span>
          </div>
          <div className="relive-feature">
            <div className="eyebrow">A DIFFERENT PROBLEM? THE RIGHT SUPPORT.</div>
            <h2>
              Already dealing
              <br />
              with overdue dues?
            </h2>
            <p>
              Missed payments, an old unpaid loan or an account dispute may need attention first. Relive can be the better place to begin.
            </p>
            <div className="relive-wordmark">
              re<span>&bull;</span>live <small>by CGreen</small>
            </div>
            <a className="btn secondary" href={RELIVE_URL}>
              Explore help through Relive <IconSpan name="arrow" />
            </a>
            <p className="tiny">Your goal of more manageable repayments still matters. We&rsquo;ll help you work out what to address first.</p>
          </div>
        </div>
      </section>

      <section className="section knowledge-section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">GOOD DECISIONS START WITH CLARITY</div>
              <h2>
                Understand your options.
                <br />
                Know what to ask.
              </h2>
            </div>
            <a className="text-link" href="/information/">
              All guides <IconSpan name="arrow" />
            </a>
          </div>
          <div className="knowledge-grid">
            <a href="/rights/" className="knowledge-card rights-card">
              <IconSpan name="shield" className="icon-tile" />
              <small>YOUR RIGHTS</small>
              <h3>
                Your choices deserve{" "}
                <br />
                to be explained.
              </h3>
              <p>Permissions, costs, lender information and how to raise a concern.</p>
              <span className="text-link">
                Know your rights <IconSpan name="arrow" />
              </span>
            </a>
            <a href="/information/consolidation/" className="knowledge-card">
              <IconSpan name="layers" className="icon-tile" />
              <small>INFORMATION / 01</small>
              <h3>
                What does EMI{" "}
                <br />
                consolidation mean?
              </h3>
              <p>What it changes, what it does not, and where to begin.</p>
              <span className="text-link">
                Read the guide <IconSpan name="arrow" />
              </span>
            </a>
            <a href="/information/compare/" className="knowledge-card">
              <IconSpan name="receipt" className="icon-tile" />
              <small>INFORMATION / 02</small>
              <h3>
                Before accepting{" "}
                <br />a new arrangement.
              </h3>
              <p>The questions worth asking about rates, fees, tenure and total cost.</p>
              <span className="text-link">
                See the checklist <IconSpan name="arrow" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="section white" id="questions">
        <div className="wrap faq-grid">
          <div>
            <div className="eyebrow">A FEW THINGS YOU MAY BE WONDERING</div>
            <h2>
              Let&rsquo;s clear{" "}
              <br />
              things up.
            </h2>
            <p className="muted faq-intro">
              Still have a question?
              <br />
              Start with a conversation.
            </p>
            <a className="text-link" href="/contact/">
              Speak to us <IconSpan name="arrow" />
            </a>
          </div>
          <div className="faq-list">
            {FAQS.map(([question, answer]) => (
              <details key={question} className="faq-item">
                <summary>{question}</summary>
                <div className="faq-answer">{answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-section">
        <div className="wrap">
          <div className="final-card">
            <div>
              <div className="eyebrow">YOUR NEXT CHAPTER</div>
              <h2>
                Make room for life.
                <br />
                Start with your repayments.
              </h2>
              <p>
                Tell us what you would like to change.
                <br />
                We&rsquo;ll help you understand the next step.
              </p>
            </div>
            <div className="final-actions">
              <a className="btn gold-button" href={loginUrl()}>
                Explore my EMI options <IconSpan name="arrow" />
              </a>
              <a className="btn light-outline" href="/contact/">
                <IconSpan name="phone" />
                Speak to us
              </a>
              <span>No need to have all the answers.</span>
            </div>
            <span className="final-orbit" aria-hidden="true" />
          </div>
        </div>
      </section>

      <LoginDialog />

      {/* Phones: the bar pinned to the bottom of the screen (home page only) */}
      <div className="mobile-bottom">
        <a className="btn" href={loginUrl()}>
          Explore my options <IconSpan name="arrow" />
        </a>
        <a className="btn secondary" href="/contact/">
          <IconSpan name="phone" />
          Speak to us
        </a>
      </div>
    </>
  );
}
