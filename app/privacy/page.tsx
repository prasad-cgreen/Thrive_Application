import type { Metadata } from "next";
import { Icon } from "@/components/icon";

export const metadata: Metadata = { title: "Privacy" };

export default function Privacy() {
  return (
    <section className="route-section">
      <div className="wrap">
        <a className="breadcrumb" href="/">
          <Icon name="left" /> Back to xThrive
        </a>
        <article className="reading-card prose">
          <div className="eyebrow">PRIVACY / DESIGN PREVIEW</div>
          <h1>
            Know what happens
            <br />
            to your information.
          </h1>
          <p>This downloaded page is a design prototype, not the production privacy notice for xthrive.ai.</p>
          <h3>In this preview</h3>
          <p>
            Form values stay in the memory of this browser tab. No SMS is sent and no account, bureau, AI, analytics or callback service is
            contacted. Refreshing the page or clearing the preview removes those form values from the application. Browser autofill and
            locally downloaded files are controlled by your browser and device.
          </p>
          <h3>Your microphone</h3>
          <p>
            Recording is optional and starts only after you agree and grant microphone access. Audio is recorded locally for playback. It
            is not uploaded or transcribed. Delete it or leave the recording screen to clear it from the app; microphone tracks are
            stopped.
          </p>
          <h3>External links</h3>
          <p>
            Official information links open their own websites only when you choose to follow them. Those sites have their own privacy
            practices.
          </p>
          <h3>Before production launch</h3>
          <p>
            Publish the approved legal entity, purposes, consent wording, processors, retention periods, security arrangements, contact and
            grievance details. Ask separately for any report access, lender submission, recording or marketing permission. Mobile
            verification must not silently enable those activities.
          </p>
          <div className="notice">
            Do not enter real banking secrets, OTPs from other services, full card numbers or passwords into this prototype.
          </div>
        </article>
      </div>
    </section>
  );
}
