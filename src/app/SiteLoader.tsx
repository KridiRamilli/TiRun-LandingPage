"use client";

import { useEffect, useState, type ReactNode } from "react";

export default function SiteLoader({ children }: { children: ReactNode }) {
  // Keep the page usable when JavaScript is unavailable.
  const [phase, setPhase] = useState<"hidden" | "loading" | "leaving">("hidden");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startedAt = performance.now();
    const minimumDuration = reducedMotion ? 0 : 1800;
    const previousOverflow = document.body.style.overflow;
    let leaving = false;
    let readyTimer: number | undefined;
    let exitTimer: number | undefined;

    setPhase("loading");
    document.body.style.overflow = "hidden";

    function dismiss() {
      if (leaving) return;
      leaving = true;
      setPhase("leaving");
      exitTimer = window.setTimeout(() => {
        setPhase("hidden");
        document.body.style.overflow = previousOverflow;
      }, reducedMotion ? 0 : 250);
    }

    function onReady() {
      readyTimer = window.setTimeout(dismiss, Math.max(0, minimumDuration - (performance.now() - startedAt)));
    }

    if (document.readyState === "complete") onReady();
    else window.addEventListener("load", onReady, { once: true });
    // Third-party requests must never leave the visitor stuck on the loader.
    const deadline = window.setTimeout(dismiss, 6000);

    return () => {
      window.removeEventListener("load", onReady);
      window.clearTimeout(readyTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(deadline);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <>
      <div inert={phase !== "hidden"}>{children}</div>
      {phase !== "hidden" && (
        <div className={`site-loader${phase === "leaving" ? " site-loader-leaving" : ""}`} role="status" aria-live="polite" aria-label="Loading TiRun">
          <div className="site-loader-content">
            <img src="/assets/tirun-loader.svg" alt="" width={1720} height={594} fetchPriority="high" />
            <p>Discover Tirana, step by step.</p>
            <div className="site-loader-track" aria-hidden="true"><span /></div>
            <span className="sr-only">Loading TiRun…</span>
          </div>
        </div>
      )}
    </>
  );
}
