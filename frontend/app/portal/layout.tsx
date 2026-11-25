import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./portal.css";

export const metadata: Metadata = { title: "Your dashboard" };

// The signed-in dashboard: its own styles and chrome (sidebar, header), not the marketing pages' header and footer.
export default function PortalLayout({ children }: { children: ReactNode }) {
  return children;
}
