"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  ChevronRight,
  Footprints,
  Headphones,
  MapPin,
  Menu,
  Play,
  Route,
  Share2,
  Sparkles,
  Users,
  WifiOff,
  X,
} from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Choose a route",
    text: "Pick a curated route that fits your time, pace and mood.",
    image: "/assets/how-route.webp",
  },
  {
    number: "2",
    title: "Walk & explore",
    text: "Follow the map and discover landmarks along the way.",
    image: "/assets/how-walk.webp",
  },
  {
    number: "3",
    title: "Listen to stories",
    text: "Hear engaging audio guides in Albanian or English.",
    image: "/assets/how-audio.webp",
  },
  {
    number: "4",
    title: "Earn & share",
    text: "Unlock badges, track progress and share your journey.",
    image: "/assets/how-badge.webp",
  },
];

const features = [
  { title: "Bilingual audio", text: "Stories in Albanian and English.", icon: Headphones },
  { title: "Real map route", text: "A live route through the heart of Tirana.", icon: Route },
  { title: "Step tracking", text: "Track steps, distance, progress and time.", icon: Footprints },
  { title: "Badges & rewards", text: "Stay motivated and unlock achievements.", icon: Award },
  { title: "Share & connect", text: "Turn each completed route into a share card.", icon: Share2 },
  { title: "Offline-ready PWA", text: "Install it on your phone and keep exploring.", icon: WifiOff },
];

const landmarks = [
  { title: "Skanderbeg Square", image: "/assets/landmarks/skanderbeg-square.jpg" },
  { title: "Et’hem Bey Mosque", image: "/assets/landmarks/ethem-bey-mosque.jpg" },
  { title: "Clock Tower", image: "/assets/landmarks/clock-tower.jpg" },
  { title: "National Historical Museum", image: "/assets/landmarks/national-history-museum.jpg" },
  { title: "Pyramid of Tirana", image: "/assets/landmarks/pyramid-of-tirana.jpg" },
  { title: "Bunk’Art 2", image: "/assets/landmarks/bunkart-2.jpg" },
  { title: "Reja", image: "/assets/landmarks/reja.jpg" },
  { title: "Resurrection of Christ Cathedral", image: "/assets/landmarks/orthodox-cathedral.jpg" },
  { title: "Castle of Tirana", image: "/assets/landmarks/tirana-castle.jpg" },
  { title: "Mother Teresa Square", image: "/assets/landmarks/mother-teresa-square.jpg" },
  { title: "Air Albania Stadium", image: "/assets/landmarks/air-albania-stadium.jpg" },
  { title: "Grand Park of Tirana", image: "/assets/landmarks/grand-park.jpg" },
  { title: "Dajti Mountain", image: "/assets/landmarks/dajti-mountain.jpg" },
];

const heroLandmarks = [landmarks[0], landmarks[3], landmarks[1], landmarks[4], landmarks[11]];

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65 },
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeLandmark, setActiveLandmark] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveLandmark((current) => (current + 1) % heroLandmarks.length),
      3600,
    );
    return () => window.clearInterval(timer);
  }, []);

  function submitWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <main>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="Tirana Run home">
            <img src="/assets/logo-placeholder.svg" alt="Tirana Run" />
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#about">About</a>
            <a href="#how">How it works</a>
            <a href="#features">Features</a>
            <a href="#preview">Preview</a>
          </nav>

          <a className="button button-small desktop-cta" href="#waitlist">
            Join the waitlist <ArrowRight size={17} />
          </a>

          <button
            className="mobile-menu-button"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            {[
              ["About", "#about"],
              ["How it works", "#how"],
              ["Features", "#features"],
              ["Preview", "#preview"],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </motion.nav>
        )}
      </header>

      <section className="hero" id="top">
        <div className="hero-stage">
          <motion.img
            className="hero-background"
            src="/assets/hero-clean.png"
            alt="Tirana Run route, mobile app and runners in Tirana"
            initial={{ opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
          />

          <div className="hero-left-wash" />

          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.72, delay: 0.12 }}
          >
            <div className="eyebrow"><Sparkles size={15} /> Walk. Explore. Connect.</div>
            <h1>
              Discover Tirana,
              <span>step by step.</span>
            </h1>
            <p className="hero-lead">
              Walk a guided route through the heart of Tirana. Explore iconic landmarks, listen to local stories and earn badges as you go.
            </p>

            <div className="hero-actions">
              <a className="button" href="#waitlist">
                Join the waitlist <ArrowRight size={18} />
              </a>
              <a className="button button-secondary" href="#how">
                <Play size={17} fill="currentColor" /> Learn more
              </a>
            </div>

            <div className="social-proof">
              <div className="avatar-stack" aria-hidden="true">
                <span>TR</span><span>RUN</span><span>AL</span><span>+</span>
              </div>
              <div><strong>2,500+ future explorers</strong><small>Be among the first on the route.</small></div>
            </div>
          </motion.div>

          <motion.div
            className="phone-place-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <img className="phone-thumb" src={heroLandmarks[activeLandmark].image} alt="" />
            <div>
              <strong>{heroLandmarks[activeLandmark].title}</strong>
              <span>Learn more about the landmark</span>
            </div>
            <span className="phone-play"><Play size={10} fill="currentColor" /></span>
            <div className="hero-card-dots" aria-label="Choose a featured landmark">
              {heroLandmarks.map((landmark, index) => (
                <button key={landmark.title} type="button" className={index === activeLandmark ? "active" : ""} aria-label={`Show ${landmark.title}`} aria-pressed={index === activeLandmark} onClick={() => setActiveLandmark(index)} />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="phone-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.82 }}
          >
            <div><strong>4.2</strong><span>km</span></div>
            <div><strong>7,860</strong><span>steps</span></div>
            <div><strong>45:12</strong><span>time</span></div>
          </motion.div>

          <motion.div
            className="hero-progress-card"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="mini-progress">78%</div>
            <div><strong>Keep going!</strong><span>You&apos;re doing great.</span></div>
          </motion.div>
        </div>
      </section>

      <section className="trust-strip" id="about">
        <div className="container trust-grid">
          <div><strong>1 route</strong><span>A focused first experience</span></div>
          <div><strong>2 languages</strong><span>Albanian and English</span></div>
          <div><strong>12+ landmarks</strong><span>Stories along the route</span></div>
          <div><strong>100% mobile</strong><span>Installable as a PWA</span></div>
        </div>
      </section>

      <section className="section" id="how">
        <div className="container">
          <motion.div className="section-heading centered" {...reveal}>
            <span className="eyebrow"><Route size={15} /> A simple journey</span>
            <h2>How it works</h2>
            <p>Choose a route, explore the city, listen to stories and collect your badge.</p>
          </motion.div>

          <div className="steps-grid">
            {steps.map((step, index) => (
              <motion.article
                key={step.title}
                className="step-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.52, delay: index * 0.08 }}
              >
                <span className="step-number">{step.number}</span>
                <img className="step-image" src={step.image} alt="" />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft" id="features">
        <div className="container">
          <motion.div className="section-heading centered" {...reveal}>
            <span className="eyebrow"><Sparkles size={15} /> Built for the city</span>
            <h2>Features</h2>
            <p>A lightweight experience that keeps the city, not the screen, at the center of your journey.</p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.article
                  key={feature.title}
                  className="feature-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.48, delay: index * 0.06 }}
                >
                  <div className="feature-icon"><Icon /></div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section preview-section" id="preview">
        <div className="container preview-grid">
          <motion.div className="preview-copy" {...reveal}>
            <span className="eyebrow"><Users size={15} /> App preview</span>
            <h2>Your journey, beautifully simple.</h2>
            <p>
              Routes, live progress, audio stories and badges are organized in a clean mobile interface designed for one-handed use while walking.
            </p>
            <ul className="check-list">
              <li><span>✓</span> Start from any point on the fixed route</li>
              <li><span>✓</span> Continue even with unstable internet</li>
              <li><span>✓</span> Share a badge after completing the route</li>
            </ul>
            <a className="text-link" href="#waitlist">Be first to try it <ChevronRight size={18} /></a>
          </motion.div>

          <motion.div className="preview-art" {...reveal} transition={{ duration: 0.7, delay: 0.1 }}>
            <img src="/assets/app-preview.webp" alt="Preview of Tirana Run app screens" />
          </motion.div>
        </div>
      </section>

      <section className="section city-section">
        <div className="container city-layout">
          <motion.div className="city-copy" {...reveal}>
            <span className="eyebrow"><MapPin size={15} /> The city you will love</span>
            <h2>Explore Tirana like never before</h2>
            <p>Iconic landmarks, neighborhoods, parks and local stories—connected through one walkable city route.</p>
            <a className="button button-secondary city-button" href="#waitlist">See all highlights <ArrowRight size={17} /></a>
          </motion.div>

          <motion.div className="route-decoration" {...reveal} transition={{ duration: 0.75, delay: 0.08 }}>
            <img src="/assets/route-pin.webp" alt="Tirana Run route and map pin" />
          </motion.div>
        </div>

        <div className="landmark-carousel" aria-label="Tirana landmarks">
          <div className="landmark-track">
            {[...landmarks, ...landmarks].map((landmark, index) => (
              <article className="landmark-card" key={`${landmark.title}-${index}`} aria-hidden={index >= landmarks.length}>
                <img src={landmark.image} alt={index < landmarks.length ? landmark.title : ""} loading="lazy" />
                <div className="landmark-card-content">
                  <div><strong>{landmark.title}</strong><span>Learn more about the landmark</span></div>
                  <span className="landmark-play"><Play size={13} fill="currentColor" /></span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="waitlist-section" id="waitlist">
        <div className="container">
          <motion.div className="waitlist-card" {...reveal}>
            <img className="waitlist-art" src="/assets/waitlist-background.png" alt="Runner, Tirana skyline and route pin illustration" />
            <div className="waitlist-content">
              <span className="eyebrow"><Sparkles size={15} /> Coming soon</span>
              <h2>Coming soon</h2>
              <p>Be the first to explore. Join the waitlist today.</p>

              {submitted ? (
                <div className="success-message">You are on the list. See you on the route!</div>
              ) : (
                <form className="waitlist-form" onSubmit={submitWaitlist}>
                  <label className="sr-only" htmlFor="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <button type="submit">Join the waitlist <ArrowRight size={18} /></button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/assets/logo-placeholder.svg" alt="Tirana Run" />
            <p>Discovering Tirana, step by step.</p>
          </div>
          <div>
            <h3>Product</h3>
            <a href="#about">About</a>
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
          </div>
          <div>
            <h3>Explore</h3>
            <a href="#preview">App preview</a>
            <a href="#waitlist">Waitlist</a>
            <a href="mailto:hello@tirana.run">Contact</a>
          </div>
          <div>
            <h3>Follow the journey</h3>
            <p>Updates, routes and behind-the-scenes progress.</p>
            <a className="footer-email" href="mailto:hello@tirana.run">hello@tirana.run</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Tirana Run.</span>
          <span>Built for Tirana.</span>
          <a href="/assets/landmarks/sources.json" target="_blank" rel="noreferrer">Photo credits</a>
        </div>
      </footer>
    </main>
  );
}
