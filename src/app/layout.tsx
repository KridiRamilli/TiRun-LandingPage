import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tirana Run — Discover Tirana, Step by Step",
  description:
    "Explore Tirana through a guided walking route with audio stories, step tracking, badges and a modern offline-ready PWA.",
  metadataBase: new URL("https://tirana.run"),
  openGraph: {
    title: "Tirana Run",
    description: "Discover Tirana, step by step.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
