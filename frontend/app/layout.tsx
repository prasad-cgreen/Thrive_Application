import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/header";

import "./globals.css";

export const metadata: Metadata = {
  title: { default: "xThrive by CGreen | Let’s simplify your EMIs", template: "%s | xThrive" },
  description:
    "Too many EMIs? xThrive by CGreen helps you review your repayments and explore consolidation and balance-transfer options. Start with your situation.",
  // As in the design preview: kept out of search results until launch
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#f4f7f2" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <a className="brand footer-brand" href="/">
            <img className="thrive-logo" src="/thrive-logo.webp" alt="Thrive" />
            <span className="brand-rule" />
            <span className="parent-brand">
              <span>by</span>
              <img src="/cgreen-logo.webp" alt="CGreen" />
            </span>
          </a>
          <p>
            Simplify your repayments.
            <br />
            Make room for life.
          </p>
          <div className="footer-links">
            <a href="/rights/">Your Rights</a>
            <a href="/information/">Information</a>
            <a href="/privacy/">Privacy</a>
            <a href="/terms/">Terms &amp; charges</a>
            <a href="/contact/">Contact &amp; support</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            xThrive supports the review and application process; it is not a lender. Credit decisions and any offer remain with the
            lending partner. Approval, reduced EMIs and savings are not guaranteed.
          </p>
          <p className="tiny">
            Design preview for xthrive.ai &middot; No live OTP, callback, lender, bureau or AI connection. No borrower report is embedded.
            Brand assets supplied by CGreen.
          </p>
          <div className="footer-meta">
            <span>&copy; 2026 CGreen &middot; xThrive</span>
            <span>Designed around you.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
