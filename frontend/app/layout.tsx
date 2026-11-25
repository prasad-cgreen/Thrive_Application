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

// Google tag (Tag Manager container GTM-KP4KGD5M), for Google Analytics on xthrive.ai. Only loaded when
// NEXT_PUBLIC_GTM_ID is set at build time: the Docker build sets it, local development leaves it blank so test visits
// are not counted. Never push personal data (mobile, PAN, name, score) to dataLayer.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
const googleTagScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());`;

// Styles come from each section's layout: app/(site)/layout.tsx (marketing pages) and app/portal/layout.tsx (dashboard).
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: authCheckScript sets data-auth-check on <html> before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <body>
        {GTM_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`} />
            <script dangerouslySetInnerHTML={{ __html: googleTagScript }} />
          </>
        )}
        <script dangerouslySetInnerHTML={{ __html: authCheckScript }} />
        {children}
      </body>
    </html>
  );
}
