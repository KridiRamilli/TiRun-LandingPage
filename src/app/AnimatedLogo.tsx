"use client";

import { useEffect, useState } from "react";

const logoUrl = "/assets/tirun-animated.svg";

export default function AnimatedLogo() {
  const [src, setSrc] = useState(logoUrl);

  useEffect(() => {
    const controller = new AbortController();
    let logo: Blob | undefined;
    let objectUrl: string | undefined;
    let wasHidden = document.visibilityState === "hidden";

    function restart() {
      if (!logo || document.visibilityState !== "visible") return;
      // A fresh SVG image document resets every CSS animation together.
      // Reuse downloaded bytes instead of requesting the asset on every return.
      const previousUrl = objectUrl;
      objectUrl = URL.createObjectURL(logo);
      setSrc(objectUrl);
      if (previousUrl) URL.revokeObjectURL(previousUrl);
    }

    function onVisibilityChange() {
      if (document.visibilityState === "hidden") {
        wasHidden = true;
      } else if (wasHidden) {
        wasHidden = false;
        restart();
      }
    }

    function onPageShow(event: PageTransitionEvent) {
      if (event.persisted) restart();
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pageshow", onPageShow);
    void fetch(logoUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Logo unavailable");
        return response.blob();
      })
      .then((blob) => {
        if (!controller.signal.aborted) logo = blob;
      })
      .catch(() => {
        // Keep the original image if loading is interrupted or unavailable.
      });

    return () => {
      controller.abort();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pageshow", onPageShow);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  return <img src={src} alt="Tirana Run" width={1720} height={594} />;
}
