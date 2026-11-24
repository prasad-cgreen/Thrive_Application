"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./icon";
import { SLIDES } from "@/lib/content";

const AUTOPLAY_MS = 5000;
const SWIPE_PX = 40;
const NOTE = "A possible approach, not a confirmed offer.";
const TRUST = ["No need to know the solution yet", "Human support when you need it", "You decide whether to proceed"];

/**
 * Hero panel, laid out like the Relive landing page's carousel (frontend/components/hero-carousel.tsx in the Relive repo), with Thrive's
 * messages: each slide's label, title and text cross-fade; the note and trust points stay under them. The picture (separate
 * repayments becoming one plan) fills the right half when the panel is wide, and sits on top when it is narrow (see .tc in
 * globals.css). Advances by itself, pausing on hover and not at all for reduced motion; dots, swipe and (with a dot
 * focused) the arrow keys also change the slide.
 */
export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStart = useRef<number | null>(null);
  const go = (to: number) => setIndex((to + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Restarts whenever the slide changes, so one chosen by hand also stays for the full time.
  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, reducedMotion]);

  return (
    <div
      className="tc"
      role="region"
      aria-roledescription="carousel"
      aria-label="Ways Thrive can help"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go(index - 1);
        if (event.key === "ArrowRight") go(index + 1);
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const moved = (event.changedTouches[0]?.clientX ?? 0) - (touchStart.current ?? 0);
        if (touchStart.current != null && Math.abs(moved) > SWIPE_PX) go(index + (moved < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      <div className="tc-visual" role="img" aria-label="Illustration: separate repayments reviewed for a simpler arrangement">
        <div className="tc-flow">
          <div className="tc-chip">
            <Icon name="loan" />
            <span>
              <small>PERSONAL LOAN</small>
              <b>One EMI</b>
            </span>
          </div>
          <div className="tc-chip">
            <Icon name="calendar" />
            <span>
              <small>ANOTHER LOAN</small>
              <b>Another date</b>
            </span>
          </div>
          <div className="tc-chip">
            <Icon name="card" />
            <span>
              <small>CARD DUES</small>
              <b>More to manage</b>
            </span>
          </div>
          <span className="tc-arrow">
            <Icon name="arrow" />
          </span>
          <div className="tc-plan">
            <Icon name="spark" />
            <span>
              <small>EXPLORE WITH THRIVE</small>
              <b>One clearer plan.</b>
            </span>
          </div>
        </div>
      </div>

      <div className="tc-text">
        {/* Every slide's text sits in the same grid cell, so the panel is as tall as the longest one and does not jump */}
        <div className="tc-slides">
          {SLIDES.map((slide, i) => {
            const Title = i === index ? "h1" : "p"; // one h1 on the page: the shown slide's
            return (
              <div key={slide.topic} className={i === index ? "tc-slide is-active" : "tc-slide"} aria-hidden={i !== index}>
                <p className="tc-tag">
                  <span className="tc-tag-dot" aria-hidden="true" />
                  {slide.topic}
                </p>
                <Title className="tc-title">
                  {slide.line1} <span>{slide.line2}</span>
                </Title>
                <p className="tc-body">{slide.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="tc-note">
          <span className="tc-note-icon">
            <Icon name="shield" />
          </span>
          <p>{NOTE}</p>
        </div>
        <ul className="tc-trust">
          {TRUST.map((item) => (
            <li key={item}>
              <Icon name="check" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="tc-dots">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.topic}
            type="button"
            onClick={() => go(i)}
            aria-label={`Message ${i + 1} of ${SLIDES.length}`}
            aria-current={i === index ? "true" : undefined}
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  );
}
