import type { Metadata } from "next";
import SiteLoader from "./SiteLoader";
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
    icon: [
      { url: "/assets/favicon.ico?v=tirun-2", sizes: "16x16 32x32 48x48" },
      { url: "/assets/favicon-32x32.png?v=tirun-2", type: "image/png", sizes: "32x32" },
      { url: "/assets/favicon.svg?v=tirun-2", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/assets/favicon.ico?v=tirun-2",
    apple: { url: "/assets/apple-touch-icon.png?v=tirun-2", sizes: "180x180", type: "image/png" },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><SiteLoader>{children}</SiteLoader></body>
    </html>
  );
}
