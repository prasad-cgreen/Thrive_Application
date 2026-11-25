import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { default: "xThrive by CGreen | Let’s simplify your EMIs", template: "%s | xThrive" },
  description:
    "Too many EMIs? xThrive by CGreen helps you review your repayments and explore consolidation and balance-transfer options. Start with your situation.",
  // As in the design preview: kept out of search results until launch
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#f4f7f2" };

// Runs before the home page paints, hiding it while the page works out where the visitor should be:
//  - a visitor who reached the dashboard before (see lib/session.ts), while it checks the session, so Back from
//    /portal/ goes straight back to the dashboard without flashing the landing page;
//  - ?login=1 (a "Log in" link from another page), until the login dialog is open, so it opens straight away.
// The 4 s fallback un-hides it if that never happens. The hiding rule is in app/(site)/site.css.
const authCheckScript = `try{if(location.pathname==="/"&&(/[?&]login=/.test(location.search)||localStorage.getItem("thrive:signed-in")==="1")){var d=document.documentElement;d.setAttribute("data-auth-check","");setTimeout(function(){d.removeAttribute("data-auth-check")},4000)}}catch(e){}`;

// Styles come from each section's layout: app/(site)/layout.tsx (marketing pages) and app/portal/layout.tsx (dashboard).
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: authCheckScript sets data-auth-check on <html> before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: authCheckScript }} />
        {children}
      </body>
    </html>
  );
}
