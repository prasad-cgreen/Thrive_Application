export function Footer() {
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
          <div className="footer-meta">
            <span>&copy; 2026 CGreen &middot; xThrive</span>
            <span>Designed around you.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
