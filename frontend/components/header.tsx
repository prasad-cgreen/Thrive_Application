"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon, IconSpan } from "./icon";
import { loginUrl } from "@/lib/content";

const NAV = [
  ["/#help", "How we help"],
  ["/#how-it-works", "How it works"],
  ["/rights/", "Your Rights"],
  ["/information/", "Information"],
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname().replace(/\/?$/, "/");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const links = NAV.map(([href, label]) => (
    <a key={href} href={href} className={href === path ? "active" : undefined}>
      {label}
    </a>
  ));

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="brand" href="/" aria-label="xThrive by CGreen home">
          <img className="thrive-logo" src="/thrive-logo.webp" alt="Thrive - Transfer, Restructure, Growth" />
          <span className="brand-rule" aria-hidden="true" />
          <span className="parent-brand">
            <span>by</span>
            <img src="/cgreen-logo.webp" alt="CGreen" />
          </span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          {links}
        </nav>
        <div className="header-actions">
          <a className="btn secondary header-speak" href="/contact/">
            <IconSpan name="phone" />
            Speak to us
          </a>
          <a className="text-link login-link" href={loginUrl()}>
            Log in <Icon name="arrow" />
          </a>
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <IconSpan name="menu" />
          </button>
        </div>
      </div>
      {/* Any link chosen here closes the menu */}
      <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen} onClick={() => setMenuOpen(false)}>
        {links}
        <a href={loginUrl()}>Log in / My request</a>
        <a href="/contact/">Speak to us</a>
      </nav>
    </header>
  );
}
