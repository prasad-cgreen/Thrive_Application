import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

import "./(site)/site.css";

// 404.html: outside the (site) group, so it brings the marketing pages' header, footer and styles itself.
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="route-section">
        <div className="wrap">
          <div className="public-top">
            <div className="eyebrow">PAGE NOT FOUND</div>
            <h1>This page could not be found.</h1>
            <p>
              The link may be old or mistyped. <a href="/">Back to xThrive</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
