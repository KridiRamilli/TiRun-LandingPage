import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TiRun — Discover Tirana, Step by Step",
  description:
    "Explore Tirana through a guided walking route with audio stories, step tracking, badges and a modern offline-ready PWA.",
  metadataBase: new URL("https://tirana.run"),
  openGraph: {
    title: "TiRun",
    description: "Discover Tirana, step by step.",
    type: "website",
  },
    icons: {
    icon: "assets/favicon.ico",
    shortcut: "assets/android-chrome-192x192.png",
    apple: "assets/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
