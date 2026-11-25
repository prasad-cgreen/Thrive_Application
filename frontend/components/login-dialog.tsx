"use client";

import { ArrowRight, ChevronRight, FileSearch, Fingerprint, LockKeyhole, ShieldCheck, Sparkles, X } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { GOALS } from "../lib/content";
import { OnboardingFlow, type Workflow } from "./onboarding-flow";
import { preloadTurnstile, Turnstile, TURNSTILE_SITE_KEY, type CaptchaState } from "./turnstile";
import { api, apiErrorCode, apiMessage, apiRetryAfter } from "../lib/api";
import { getSession, hasSignedInHint, setSignedInHint, type Session } from "../lib/session";

type LoginStep = "mobile" | "otp" | "onboarding";

// Bump when the consent text below changes: the backend stores which version each user agreed to.
const CONSENT_VERSION = "thrive-consent-v1";

// A goal's title without its full stop is the backend's concern option (CONCERN_OPTIONS in @thrive/shared).
const concernFor = (goal: string | null) => GOALS.find((item) => item.id === goal)?.title.replace(/\.$/, "") ?? "";

/**
 * xThrive's login, the same flow as Relive's: mobile + consent, OTP, then onboarding (PAN, credit report) for new
 * users, ending on /portal/. Every link to "/?login=1" (optionally "&goal=<goal id>") opens it: on the home page
 * straight away, from other pages after the navigation (the inline script in app/layout.tsx keeps the page hidden
 * until then). Members who already reached the dashboard are sent there instead of seeing the landing page.
 */
export function LoginDialog() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [step, setStep] = useState<LoginStep>("mobile");
  const [mobile, setMobile] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentExpanded, setConsentExpanded] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [consentError, setConsentError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [seconds, setSeconds] = useState(10);
  const [transactionId, setTransactionId] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [captcha, setCaptcha] = useState<CaptchaState>({ token: "", failed: false });
  const [captchaRound, setCaptchaRound] = useState(0); // re-keys <Turnstile> for a fresh single-use token
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [concern, setConcern] = useState(""); // the goal picked on the landing page, if any
  const concernRef = useRef(""); // the same, for the document click handler registered once
  const [sessionNotice, setSessionNotice] = useState("");

  const chooseConcern = (goal: string | null) => {
    concernRef.current = concernFor(goal);
    setConcern(concernRef.current);
  };

  // The dialog closes only via its Close button or on success: no outside click / Escape, so a stray
  // click or key press can't throw away a half-entered OTP or PAN.
  useEffect(() => {
    if (!loginOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loginOpen]);

  useEffect(preloadTurnstile, []);

  // Unfinished onboarding is kept in the URL, so a refresh reopens the dialog at the saved step.
  useEffect(() => {
    if (loginOpen && step === "onboarding" && !window.location.search.includes("onboarding=1")) {
      window.history.replaceState(null, "", "/?onboarding=1");
    }
  }, [loginOpen, step]);

  useEffect(() => {
    if (!loginOpen || step !== "otp" || seconds <= 0) return;
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [loginOpen, seconds, step]);

  // replace, not assign: the landing page must not sit in history behind the dashboard, or Back returns to it.
  const goToPortal = () => {
    document.documentElement.setAttribute("data-auth-check", ""); // keep the landing page hidden while leaving
    window.location.replace("/portal/");
  };

  // The goal chosen on the landing page (selected_concern), saved once signed in.
  // Best effort: a failure only means the dashboard summary isn't personalised, so it never blocks login.
  const saveConcern = async () => {
    if (!concernRef.current) return;
    try {
      await api.post("/concern", { selected_concern: [concernRef.current], customer_text: "" });
    } catch {
      /* ignore */
    }
  };

  // Signed-in users skip the mobile step: straight to the dashboard, or back into onboarding.
  const resumeSession = async () => {
    try {
      // Ask /auth/session first: probing /workflow while signed out writes a 401 into the audit log.
      if (!(await getSession()).authenticated) return false;
      await saveConcern();
      const { data } = await api.get<Workflow>("/workflow");
      if (data.stage === "DASHBOARD") return goToPortal();
      setWorkflow(data);
      setStep("onboarding");
      setLoginOpen(true);
      return true;
    } catch {
      return false; // not signed in
    }
  };

  const openLogin = (goal: string | null) => {
    chooseConcern(goal);
    void resumeSession().then((resumed) => resumed || setLoginOpen(true));
  };

  // Login links on this page ("/?login=1&goal=...") open the dialog instead of reloading the page.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="/?login"]');
      if (!link) return;
      event.preventDefault();
      openLogin(new URL(link.href).searchParams.get("goal"));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- registered once; openLogin only uses setters and refs
  }, []);

  /**
   * Route guard: members who reached the dashboard never see the landing page (including via Back or a
   * back/forward-cache restore); they go straight to /portal/. Returns the session, null if the API is
   * unreachable, or "portal" when leaving for the dashboard.
   */
  const guardLanding = async (): Promise<Session | null | "portal"> => {
    let session: Session | null = null;
    try {
      session = await getSession();
    } catch {
      /* API unreachable: show the landing page */
    }
    if (session?.authenticated && session.stage === "DASHBOARD") {
      goToPortal();
      return "portal";
    }
    if (session && !session.authenticated) setSignedInHint(false);
    // Signed out with ?login=1: the login dialog is about to open and shows the page itself, so it doesn't flash first.
    const openingLogin = session?.authenticated === false && new URLSearchParams(window.location.search).has("login");
    if (!openingLogin) document.documentElement.removeAttribute("data-auth-check");
    return session;
  };

  // Arriving to log in (?login=1) keeps the page hidden (app/layout.tsx) until the dialog is up; then it shows behind it.
  useEffect(() => {
    if (loginOpen) document.documentElement.removeAttribute("data-auth-check");
  }, [loginOpen]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    chooseConcern(params.get("goal"));
    // ?login=1 opens the dialog straight away rather than after the session check below, except in a browser that
    // reached the dashboard: that check sends it on to /portal/ instead.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the URL is browser-only: reading it while rendering would mismatch the static HTML
    if (params.has("login") && !hasSignedInHint()) setLoginOpen(true);
    void guardLanding().then((session) => {
      if (session === "portal") return;
      // API unreachable: a login link still opens the dialog (only skipped above for the signed-in hint), so the
      // click isn't silently lost; Continue then shows "Unable to reach xThrive securely".
      if (!session) return void (params.has("login") && setLoginOpen(true));
      if (params.has("expired")) setSessionNotice("Your session has expired. Please log in again to continue.");
      // ?login=1: a login link, logout, session expiry or "Use a different number". ?onboarding=1: /portal/ or a refresh mid-onboarding.
      if (params.has("login") || params.has("onboarding")) {
        if (session.authenticated) void resumeSession();
        else setLoginOpen(true);
      }
      if (params.has("login") || params.has("expired") || (params.has("onboarding") && !session.authenticated)) {
        window.history.replaceState(null, "", "/");
      }
    });
    const onPageShow = (event: PageTransitionEvent) => event.persisted && void guardLanding();
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once per page load
  }, []);

  const closeLogin = () => {
    setLoginOpen(false);
    setSessionNotice("");
    if (window.location.search) window.history.replaceState(null, "", "/");
    window.setTimeout(() => {
      setStep("mobile");
      setOtp("");
      setOtpError("");
    }, 200);
  };

  // Why an OTP can't be sent yet ("" = ready): the Cloudflare bot check has no token.
  const captchaBlocker = () =>
    !TURNSTILE_SITE_KEY || captcha.token
      ? ""
      : captcha.failed
        ? "The security check could not load. Check your connection and refresh the page."
        : "Finishing a quick security check. If you see a \"Verify you are human\" box, tick it, then try again.";

  const requestOtp = async (number: string) => {
    try {
      const response = await api.post("/auth/request-otp", { mobile: number, consent: true, consentVersion: CONSENT_VERSION, turnstileToken: captcha.token || undefined });
      setTransactionId(response.data.transactionId);
      setDevOtp(response.data.devOtp ?? "");
      setSeconds(response.data.resendAfterSeconds ?? 10);
      setStep("otp");
    } finally {
      // Turnstile tokens are single-use: fetch a fresh one for the next send or resend.
      if (TURNSTILE_SITE_KEY) {
        setCaptcha({ token: "", failed: false });
        setCaptchaRound((round) => round + 1);
      }
    }
  };

  // Lockout sends the user back to the mobile step (per the login flow); other errors stay inline.
  const handleOtpError = (error: unknown, showError: (message: string) => void) => {
    const code = apiErrorCode(error);
    if (code === "OTP_ATTEMPTS_EXCEEDED") {
      setStep("mobile");
      setOtp("");
      setMobileError(apiMessage(error));
      return;
    }
    if (code === "RESEND_TOO_SOON") setSeconds(apiRetryAfter(error) ?? 10);
    if (code === "OTP_EXPIRED" || code === "OTP_ALREADY_USED" || code === "OTP_TRANSACTION_NOT_FOUND") setSeconds(0);
    showError(apiMessage(error));
  };

  const submitMobile = async (event: FormEvent) => {
    event.preventDefault();
    const normalized = mobile.replace(/\D/g, "");
    setMobileError("");
    setConsentError("");
    if (!normalized) return setMobileError("Mobile number is required");
    if (!/^[6-9]\d{9}$/.test(normalized)) return setMobileError("Enter a valid 10-digit mobile number");
    if (!consent) return setConsentError("Consent is required to proceed");
    if (captchaBlocker()) return setMobileError(captchaBlocker());
    setMobile(normalized);
    setBusy(true);
    try {
      await requestOtp(normalized);
    } catch (error) {
      handleOtpError(error, setMobileError);
    } finally {
      setBusy(false);
    }
  };

  const submitOtp = async (event: FormEvent) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(otp)) return setOtpError("Enter the 6-digit OTP");
    setOtpError("");
    setBusy(true);
    try {
      const { data } = await api.post<Workflow>("/auth/verify-otp", { transactionId, otp });
      await saveConcern();
      if (data.stage === "DASHBOARD") return goToPortal(); // existing user with a current report
      setWorkflow(data);
      setStep("onboarding");
      setBusy(false);
    } catch (error) {
      setOtp("");
      handleOtpError(error, setOtpError);
      setBusy(false);
    }
  };

  const resendOtp = async () => {
    if (seconds > 0 || busy) return;
    if (captchaBlocker()) return setOtpError(captchaBlocker());
    setBusy(true);
    setOtp("");
    setOtpError("");
    try {
      await requestOtp(mobile);
    } catch (error) {
      handleOtpError(error, setOtpError);
    } finally {
      setBusy(false);
    }
  };

  if (!loginOpen) return null;

  // Clicking the backdrop does nothing; only the Close button (or success) closes it
  return (
    <div className="animate-in fade-in duration-200 fixed inset-0 z-[300] grid place-items-end bg-black/60 p-0 backdrop-blur-xs sm:place-items-center sm:p-5">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        className="animate-in slide-in-from-bottom-10 duration-300 sm:fade-in sm:zoom-in-95 sm:slide-in-from-bottom-0 relative max-h-[100dvh] w-full max-w-[440px] overflow-y-auto overscroll-contain rounded-t-[26px] bg-white p-6 text-[#0c1a13] shadow-2xl sm:rounded-[26px] sm:p-8"
      >
        {/* Close button sits in the corner, so every step uses the full dialog width */}
        <button
          type="button"
          onClick={closeLogin}
          className="absolute right-4 top-4 grid size-8 place-items-center rounded-lg text-[#687e71] hover:bg-black/5 sm:right-6 sm:top-6"
          aria-label="Close dialog"
        >
          <X className="size-4" />
        </button>
        {step === "onboarding" && workflow ? (
          <OnboardingFlow initial={workflow} onComplete={goToPortal} />
        ) : (
          <div className="pr-10">
            <span className="mb-4 grid size-11 place-items-center rounded-xl bg-emerald-100 text-emerald-800">
              {step === "otp" ? <Fingerprint className="size-5" /> : <LockKeyhole className="size-5" />}
            </span>
            {/* Journey: 1 verify mobile (this screen + OTP), 2 PAN, 3 credit report (OnboardingFlow) */}
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Step 1 of 3</p>
            <h2 id="login-title" className="mt-1 text-xl font-bold tracking-tight text-[#0c1a13]">
              {step === "mobile" ? "Welcome to xThrive" : "Verify It’s You"}
            </h2>
            <p className="mt-1 text-xs text-[#5c7366]">
              {step === "mobile"
                ? "Enter the mobile number linked to your PAN. New here? We'll set you up."
                : `Enter the 6-digit OTP sent to +91 ••••••${mobile.slice(-4)}`}
            </p>
            {concern && step === "mobile" && (
              <p className="mt-3 inline-flex rounded-full bg-[#edf5e7] px-3 py-1 text-[11px] font-semibold text-[#183b2f]">Your goal: {concern}</p>
            )}
            {sessionNotice && step === "mobile" && (
              <p role="status" className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900">
                {sessionNotice}
              </p>
            )}
          </div>
        )}

        {/* Mobile Input Form */}
        {step === "mobile" && (
          <form onSubmit={submitMobile} className="mt-6" noValidate>
            <label htmlFor="mobile" className="text-xs font-bold text-[#35483d]">
              Mobile number (as linked to your PAN)
            </label>
            <div
              className={`mt-1.5 flex h-12 items-center rounded-xl border bg-white transition focus-within:ring-3 ${
                mobileError ? "border-red-400 focus-within:ring-red-100" : "border-[#d8e2dc] focus-within:border-emerald-500 focus-within:ring-emerald-100"
              }`}
            >
              <span className="border-r border-[#e5ece7] px-3.5 text-xs font-bold text-[#556b5e]">+91</span>
              <input
                id="mobile"
                autoFocus
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value.replace(/\D/g, ""));
                  setMobileError("");
                }}
                className="h-full min-w-0 flex-1 bg-transparent px-3 text-xs font-semibold outline-none placeholder:text-[#a3b8ad]"
                placeholder="10-digit mobile number"
                aria-invalid={Boolean(mobileError)}
              />
            </div>
            {mobileError && <p className="mt-1.5 text-xs font-medium text-red-600">{mobileError}</p>}

            {/* Consent: one checkbox, short summary; full purposes behind "View details" */}
            <div className={`mt-4 rounded-xl border bg-[#f8faf9] ${consentError ? "border-red-300" : "border-[#e5ede8]"}`}>
              <label className="flex cursor-pointer items-start gap-3 p-3.5">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    setConsentError("");
                  }}
                  aria-describedby="consent-details"
                  className="mt-0.5 size-4 shrink-0 cursor-pointer rounded accent-emerald-600"
                />
                <span className="text-xs leading-5 text-[#3f5447]">
                  I agree to the{" "}
                  <a href="/terms/" target="_blank" className="font-semibold text-emerald-700 underline-offset-2 hover:underline">
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a href="/privacy/" target="_blank" className="font-semibold text-emerald-700 underline-offset-2 hover:underline">
                    Privacy Policy
                  </a>
                  , and consent to xThrive fetching my credit report and contacting me.
                </span>
              </label>

              {consentExpanded && (
                <ul id="consent-details" className="mx-3.5 grid gap-2.5 border-t border-[#e5ede8] py-3 text-[11px] leading-4 text-[#55695d]">
                  {(
                    [
                      [Fingerprint, "Verification", "Verify my mobile number with a one-time password (OTP)."],
                      [FileSearch, "Credit report", "Fetch my credit report from Experian and CRIF High Mark using my PAN, name and mobile number, and store it securely to show my loans, EMIs and insights."],
                      [ShieldCheck, "AI summary", "Use an AI service to summarise my report and the goal I choose on xThrive. My name, PAN, mobile number and account numbers are not shared with it."],
                      [Sparkles, "Communication", "Contact me by SMS, WhatsApp, email and phone about my repayments and relevant offers."],
                    ] as const
                  ).map(([Icon, title, text]) => (
                    <li key={title} className="flex gap-2.5">
                      <Icon className="mt-0.5 size-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                      <span>
                        <span className="font-semibold text-[#2d4236]">{title}.</span> {text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <button
                type="button"
                aria-expanded={consentExpanded}
                aria-controls="consent-details"
                onClick={() => setConsentExpanded((value) => !value)}
                className="flex w-full items-center gap-1 rounded-b-xl border-t border-[#e5ede8] px-3.5 py-2 text-[11px] font-semibold text-emerald-700 hover:bg-[#f1f6f3] focus-visible:outline-2 focus-visible:outline-emerald-500"
              >
                {consentExpanded ? "Hide details" : "View details"}
                <ChevronRight className={`size-3.5 transition-transform ${consentExpanded ? "-rotate-90" : "rotate-90"}`} aria-hidden="true" />
              </button>
            </div>
            {consentError && <p className="mt-1.5 text-xs font-medium text-red-600">{consentError}</p>}

            <div className="mt-5">
              {/* Cloudflare bot check sits above the button; only visible if Cloudflare asks for a click */}
              <Turnstile key={captchaRound} onChange={setCaptcha} />
              <button
                type="submit"
                disabled={busy}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#23664e] text-sm font-semibold text-white transition hover:bg-[#183f34] disabled:opacity-60"
              >
                {busy ? "Sending OTP..." : "Continue"}
                {!busy && <ArrowRight className="size-4" />}
              </button>
            </div>
          </form>
        )}

        {/* OTP Form */}
        {step === "otp" && (
          <form onSubmit={submitOtp} className="mt-6" noValidate>
            <label htmlFor="otp" className="text-xs font-bold text-[#35483d]">
              Enter 6-Digit OTP
            </label>
            <input
              id="otp"
              autoFocus
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, ""));
                setOtpError("");
              }}
              className={`mt-1.5 h-13 w-full rounded-xl border bg-white px-4 text-center text-xl font-bold tracking-[0.4em] outline-none transition ${
                otpError ? "border-red-400 focus:ring-3 focus:ring-red-100" : "border-[#d8e2dc] focus:border-emerald-500 focus:ring-3 focus:ring-emerald-100"
              }`}
              placeholder="••••••"
              aria-invalid={Boolean(otpError)}
            />
            {otpError && <p className="mt-1.5 text-xs font-medium text-red-600">{otpError}</p>}

            <div className="mt-3 flex items-center justify-between text-xs">
              <button type="button" onClick={() => setStep("mobile")} className="font-semibold text-[#5a7063] hover:text-emerald-600">
                Change number
              </button>
              {seconds > 0 ? (
                <span className="text-[#71867a]" aria-live="polite">
                  Resend in 00:{String(seconds).padStart(2, "0")}
                </span>
              ) : (
                <button type="button" disabled={busy} onClick={() => void resendOtp()} className="font-bold text-emerald-700 hover:underline disabled:opacity-60">
                  Resend OTP
                </button>
              )}
            </div>

            <div className="mt-5">
              {/* Fresh bot check for "Resend OTP", above the button like the mobile step */}
              <Turnstile key={captchaRound} onChange={setCaptcha} />
              <button
                type="submit"
                disabled={busy}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#23664e] text-sm font-semibold text-white transition hover:bg-[#183f34] disabled:opacity-60"
              >
                {busy ? "Verifying..." : "Verify & Continue"}
                {!busy && <ArrowRight className="size-4" />}
              </button>
            </div>

            {devOtp && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-2.5 text-[11px] text-emerald-900">
                Test Mode OTP: <strong className="font-mono text-emerald-950">{devOtp}</strong>
              </div>
            )}
          </form>
        )}
      </section>
    </div>
  );
}
