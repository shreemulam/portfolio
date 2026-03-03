"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260302_085640_276ea93b-d7da-4418-a09b-2aa5b490e838.mp4";

const ACCENT = "#EAB0FF";

const fadeSlideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const NAV_LINKS = [
  { label: "CASE STUDIES", href: "#case-studies" },
  { label: "PLAYGROUND", href: "/playground" },
  { label: "ABOUT", href: "/about" },
  { label: "RESUME", href: "#" },
  { label: "LINKEDIN", href: "#" },
];

const CASE_STUDIES = [
  {
    tags: ["Fintech", "Payments", "Behavioral UX"],
    title: "Redesigning funding flows for wallet-first payments",
    subtitle: "Accrue × SNIPES • 2024",
    description:
      "Driven by a need to increase wallet adoption, we reimagined the entire funding and backup payment flow for the white-label fintech platform.",
    bullets: [
      "Activation funnel redesign",
      "Apple Pay adoption strategy",
      "Checkout hierarchy optimization",
    ],
  },
  {
    tags: ["Loyalty", "Mobile", "Visual Design"],
    title: "Reimagining rewards for gas station loyalty",
    subtitle: "Accrue × ExxonMobil • 2025",
    description:
      "Designed a 4-tier rewards balance system from the ground up, transforming a fragmented points experience into a cohesive mobile-first product.",
    bullets: [
      "4-tier progression system",
      "Gift card integration flows",
      "Earning rate transparency",
    ],
  },
  {
    tags: ["Data Viz", "Analytics", "Product Design"],
    title: "Building a design intelligence dashboard",
    subtitle: "Accrue • 2024",
    description:
      "Created an internal analytics tool that surfaces UX friction points from wallet data, helping the design team prioritize what to fix with evidence.",
    bullets: [
      "Funnel drop-off heatmaps",
      "Behavioral cohort analysis",
      "Designer-first data story",
    ],
  },
  {
    tags: ["Design Systems", "White-Label", "Scale"],
    title: "Scaling a design system across merchant brands",
    subtitle: "Accrue • 2023–2024",
    description:
      "Built a token-driven design system that adapts to any merchant brand while preserving usability and consistency across 10+ integrations.",
    bullets: [
      "Multi-merchant token architecture",
      "40+ component variant library",
      "Automated QA pipeline",
    ],
  },
  {
    tags: ["E-commerce", "Conversion", "UX Research"],
    title: "Optimizing product pages for reserve-first shopping",
    subtitle: "Accrue × SNIPES • 2024",
    description:
      "Redesigned the product detail page to surface loyalty offers without overwhelming the core shopping flow for both members and guests.",
    bullets: [
      "Logged-out offer visibility",
      "Progressive disclosure patterns",
      "25+ tested layout variations",
    ],
  },
  {
    tags: ["Service Design", "Loyalty", "Brand"],
    title: "Bringing salon rewards into the digital age",
    subtitle: "Accrue × Hair Cuttery • 2024",
    description:
      "Designed the end-to-end loyalty integration for a national salon chain, bridging in-store service with digital reward tracking.",
    bullets: [
      "In-store to digital bridge",
      "Appointment-linked rewards",
      "Brand-aligned UI system",
    ],
  },
];

const CARD_VISUALS: {
  bg: string;
  blobs: { top: string; left: string; size: number; opacity: number }[];
}[] = [
  {
    bg: "from-[#f5edf8] via-[#f0e4f6] to-[#ede0f3]",
    blobs: [
      { top: "15%", left: "25%", size: 200, opacity: 0.25 },
      { top: "55%", left: "55%", size: 150, opacity: 0.15 },
      { top: "75%", left: "15%", size: 80, opacity: 0.3 },
    ],
  },
  {
    bg: "from-[#e8f0fa] via-[#dfe8f5] to-[#d6e2f2]",
    blobs: [
      { top: "20%", left: "40%", size: 180, opacity: 0.2 },
      { top: "60%", left: "20%", size: 120, opacity: 0.12 },
    ],
  },
  {
    bg: "from-[#f0e8f8] via-[#ebe0f5] to-[#e5d8f0]",
    blobs: [
      { top: "30%", left: "30%", size: 220, opacity: 0.2 },
      { top: "10%", left: "60%", size: 100, opacity: 0.15 },
    ],
  },
  {
    bg: "from-[#f2f2f2] via-[#ededed] to-[#e8e8e8]",
    blobs: [
      { top: "40%", left: "40%", size: 200, opacity: 0.15 },
      { top: "70%", left: "20%", size: 140, opacity: 0.1 },
    ],
  },
  {
    bg: "from-[#faf0e8] via-[#f5eade] to-[#f0e4d5]",
    blobs: [
      { top: "25%", left: "35%", size: 190, opacity: 0.2 },
      { top: "65%", left: "55%", size: 130, opacity: 0.12 },
    ],
  },
  {
    bg: "from-[#e8f2f5] via-[#dfedf0] to-[#d5e8ed]",
    blobs: [
      { top: "20%", left: "30%", size: 180, opacity: 0.18 },
      { top: "60%", left: "50%", size: 150, opacity: 0.12 },
    ],
  },
];

/* Decorative elements per card visual */
const CARD_DECORATIONS: React.ReactNode[] = [
  /* 1 — Floating payment card outlines */
  <>
    <div className="absolute top-[18%] left-[20%] w-[180px] h-[110px] rounded-xl border border-black/[0.08] rotate-[-12deg]" />
    <div className="absolute top-[35%] left-[35%] w-[180px] h-[110px] rounded-xl border border-[#EAB0FF]/25 bg-[#EAB0FF]/[0.04] rotate-[8deg]" />
    <div className="absolute bottom-[22%] right-[15%] w-[160px] h-[100px] rounded-xl border border-black/[0.06] rotate-[-5deg]" />
  </>,
  /* 2 — Concentric rings + phone outline */
  <>
    <div className="absolute top-[20%] left-[30%] w-44 h-44 rounded-full border border-[#EAB0FF]/15" />
    <div className="absolute top-[27%] left-[37%] w-28 h-28 rounded-full border border-[#EAB0FF]/20" />
    <div className="absolute top-[32%] left-[42%] w-14 h-14 rounded-full border border-[#EAB0FF]/30" />
    <div className="absolute bottom-[15%] right-[18%] w-[140px] h-[260px] rounded-[24px] border border-black/[0.08]" />
  </>,
  /* 3 — Bar chart silhouettes */
  <>
    <div className="absolute bottom-[30%] left-[15%] w-4 h-[60px] rounded-sm bg-[#EAB0FF]/15" />
    <div className="absolute bottom-[30%] left-[22%] w-4 h-[90px] rounded-sm bg-[#EAB0FF]/20" />
    <div className="absolute bottom-[30%] left-[29%] w-4 h-[45px] rounded-sm bg-[#EAB0FF]/10" />
    <div className="absolute bottom-[30%] left-[36%] w-4 h-[110px] rounded-sm bg-[#EAB0FF]/15" />
    <div className="absolute bottom-[30%] left-[43%] w-4 h-[75px] rounded-sm bg-[#EAB0FF]/12" />
    <div className="absolute top-[25%] right-[20%] w-[120px] h-[80px] rounded-lg border border-black/[0.06] bg-black/[0.02]" />
  </>,
  /* 4 — Component grid blocks */
  <>
    <div className="absolute top-[20%] left-[15%] w-[100px] h-[60px] rounded-lg border border-black/[0.08]" />
    <div className="absolute top-[20%] left-[42%] w-[100px] h-[60px] rounded-lg border border-[#EAB0FF]/15" />
    <div className="absolute top-[45%] left-[15%] w-[100px] h-[60px] rounded-lg border border-[#EAB0FF]/15" />
    <div className="absolute top-[45%] left-[42%] w-[100px] h-[60px] rounded-lg border border-black/[0.08]" />
    <div className="absolute bottom-[15%] left-[25%] w-[160px] h-[40px] rounded-full border border-[#EAB0FF]/15" />
  </>,
  /* 5 — Product card silhouette */
  <>
    <div className="absolute top-[15%] left-[20%] w-[200px] h-[280px] rounded-2xl border border-black/[0.08] bg-black/[0.02]" />
    <div className="absolute top-[20%] left-[25%] w-[160px] h-[120px] rounded-lg bg-black/[0.03]" />
    <div className="absolute bottom-[28%] left-[25%] w-20 h-3 rounded-full bg-[#EAB0FF]/15" />
    <div className="absolute bottom-[23%] left-[25%] w-[120px] h-3 rounded-full bg-black/[0.04]" />
  </>,
  /* 6 — Organic blob outlines */
  <>
    <div
      className="absolute top-[30%] left-[10%] w-[250px] h-[250px] border border-[#EAB0FF]/10 rotate-[15deg]"
      style={{ borderRadius: "42% 58% 70% 30% / 45% 45% 55% 55%" }}
    />
    <div
      className="absolute top-[20%] left-[30%] w-[180px] h-[180px] border border-black/[0.06]"
      style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
    />
    <div className="absolute bottom-[20%] right-[20%] w-4 h-4 rounded-full bg-[#EAB0FF]/25" />
    <div className="absolute top-[15%] right-[25%] w-3 h-3 rounded-full bg-[#EAB0FF]/20" />
  </>,
];

/* ─── Hooks ─── */

function useESTTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function update() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

/* ─── Shared Components ─── */

function FlipNavLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="group relative block h-[20px] overflow-hidden no-underline"
      style={{ perspective: "600px" }}
    >
      <span
        className="block text-[15px] font-semibold text-black/60 tracking-[0.08em] transition-transform duration-300 ease-out group-hover:[transform:rotateX(90deg)]"
        style={{ transformOrigin: "bottom center" }}
      >
        {label}
      </span>
      <span
        className="absolute inset-0 block text-[15px] font-semibold tracking-[0.08em] transition-transform duration-300 ease-out [transform:rotateX(-90deg)] group-hover:[transform:rotateX(0deg)]"
        style={{ transformOrigin: "top center", color: "#000" }}
      >
        {label}
      </span>
    </a>
  );
}

function AccrueLogo() {
  return (
    <a
      href="https://www.byaccrue.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex-shrink-0 inline-flex items-center justify-center"
    >
      <span
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-lg scale-125"
        style={{ backgroundColor: ACCENT }}
      />
      <svg
        width="46"
        height="44"
        viewBox="0 0 64 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative transition-transform duration-300 ease-out group-hover:[transform:rotate(15deg)]"
      >
        <rect
          x="1.83712"
          y="14.6332"
          width="49.4403"
          height="46.9998"
          rx="6.5"
          transform="rotate(-15 1.83712 14.6332)"
          fill="black"
        />
        <rect
          x="1.83712"
          y="14.6332"
          width="49.4403"
          height="46.9998"
          rx="6.5"
          transform="rotate(-15 1.83712 14.6332)"
          stroke="#EAB0FF"
          strokeWidth="3"
        />
        <path
          d="M36.336 17.2952L25.2279 20.2717L22.7818 35.7709C22.7645 36.0006 22.7107 36.5079 22.7845 36.7831C22.9533 37.413 23.4566 37.5653 24.0653 37.7773L33.8717 41.1028C33.39 40.7082 33.2434 40.2518 33.2696 39.4816L36.336 17.2952Z"
          fill="white"
        />
        <path
          d="M36.5533 25.0129L40.5109 23.9676L38.5111 39.593C38.372 40.6796 37.3859 41.4603 36.2964 41.3465C35.1708 41.2289 34.3725 40.2048 34.5334 39.0844L36.5533 25.0129Z"
          fill="white"
        />
      </svg>
    </a>
  );
}

/* ─── Case Study Components ─── */

function VerticalNav({
  activeIndex,
  visible,
  onNavigate,
}: {
  activeIndex: number;
  visible: boolean;
  onNavigate: (index: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      {CASE_STUDIES.map((study, i) => (
        <button
          key={i}
          onClick={() => onNavigate(i)}
          className="group relative flex items-center cursor-pointer bg-transparent border-none p-0"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all duration-300 ${
              activeIndex === i
                ? "text-black shadow-[0_0_20px_rgba(234,176,255,0.3)]"
                : "bg-black/[0.04] text-black/30 border border-black/10 hover:border-[#EAB0FF]/40 hover:text-black/50"
            }`}
            style={{
              fontFamily: "'Geist', sans-serif",
              backgroundColor:
                activeIndex === i ? ACCENT : undefined,
            }}
          >
            {i + 1}
          </div>

          {/* Hover tooltip */}
          <div className="absolute left-14 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-x-1 group-hover:translate-x-0">
            <div
              className="bg-black/80 backdrop-blur-md text-white text-[13px] px-4 py-2 rounded-lg whitespace-nowrap"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              {study.title.length > 45
                ? study.title.slice(0, 45) + "..."
                : study.title}
            </div>
          </div>
        </button>
      ))}
    </motion.div>
  );
}

function CardVisual({ index }: { index: number }) {
  const visual = CARD_VISUALS[index];
  const decorations = CARD_DECORATIONS[index];

  return (
    <div
      className={`relative w-full h-full min-h-[400px] lg:min-h-0 overflow-hidden bg-gradient-to-br ${visual.bg}`}
    >
      {visual.blobs.map((blob, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            top: blob.top,
            left: blob.left,
            width: blob.size,
            height: blob.size,
            backgroundColor: `rgba(234, 176, 255, ${blob.opacity})`,
          }}
        />
      ))}
      {decorations}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}

function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof CASE_STUDIES)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      }}
      whileHover={{
        y: -4,
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.04)",
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px] rounded-3xl overflow-hidden bg-white border border-black/[0.08] shadow-[0_2px_20px_rgba(0,0,0,0.04)] cursor-pointer"
    >
      {/* Left — text content */}
      <div className="flex flex-col justify-center p-10 lg:p-16 gap-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="text-[12px] font-medium tracking-wide text-black/40 border border-black/10 rounded-full px-3.5 py-1.5"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2
          className="text-[32px] lg:text-[42px] leading-[1.12] font-medium text-black tracking-[-0.02em]"
          style={{ fontFamily: "'Geist', sans-serif" }}
        >
          {study.title}
        </h2>

        {/* Subtitle */}
        <p
          className="text-[15px] font-medium tracking-wide"
          style={{ fontFamily: "'Geist', sans-serif", color: "#9b59b6" }}
        >
          {study.subtitle}
        </p>

        {/* Description */}
        <p
          className="text-[16px] leading-relaxed text-black/50 max-w-[480px]"
          style={{ fontFamily: "'Geist', sans-serif" }}
        >
          {study.description}
        </p>

        {/* Bullets */}
        <ul className="flex flex-col gap-2.5 mt-1">
          {study.bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-3">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: ACCENT }}
              />
              <span
                className="text-[15px] text-black/60"
                style={{ fontFamily: "'Geist', sans-serif" }}
              >
                {bullet}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#"
          className="group/cta inline-flex items-center gap-2 mt-4 text-[15px] font-semibold text-black no-underline"
          style={{ fontFamily: "'Geist', sans-serif" }}
        >
          <span className="border-b border-black/20 pb-0.5 group-hover/cta:border-[#EAB0FF] transition-colors duration-300">
            Read Case Study
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform duration-300 group-hover/cta:translate-x-1"
          >
            <path
              d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      {/* Right — visual */}
      <CardVisual index={index} />
    </motion.div>
  );
}

function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.8 }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 24px rgba(234,176,255,0.4)",
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border-none"
      style={{
        backgroundColor: ACCENT,
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 15V3M9 3L3 9M9 3L15 9"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}

function CaseStudiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [navVisible, setNavVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNavVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll("[data-case-study]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(
              entry.target.getAttribute("data-case-study")
            );
            setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const scrollToStudy = useCallback((index: number) => {
    const card = document.querySelector(
      `[data-case-study="${index}"]`
    );
    card?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      className="relative bg-[#FAFAFA] py-24 lg:py-32"
    >
      <VerticalNav
        activeIndex={activeIndex}
        visible={navVisible}
        onNavigate={scrollToStudy}
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 flex flex-col gap-8">
        {CASE_STUDIES.map((study, index) => (
          <div key={index} data-case-study={index}>
            <CaseStudyCard study={study} index={index} />
          </div>
        ))}
      </div>

      <ScrollToTopButton />
    </section>
  );
}

/* ─── Testimonials ─── */

const TESTIMONIALS = [
  {
    initial: "N",
    quote:
      "Rashi has an incredible eye for translating complex product requirements into clean, intuitive designs. She doesn't just make things look good — she makes them work.",
    name: "Nikhil Gupta",
    role: "CEO, Accrue",
  },
  {
    initial: "J",
    quote:
      "Working with Rashi on the ExxonMobil loyalty redesign was a masterclass in thoughtful UX. She brought structure and clarity to a project that could have easily spiraled.",
    name: "Jesse Ganes",
    role: "Head of Design, Accrue",
  },
  {
    initial: "M",
    quote:
      "Rashi consistently delivers work that balances aesthetic quality with real usability. Her design system thinking saved us countless hours across merchant integrations.",
    name: "Mimi Chen",
    role: "Product Manager, Accrue",
  },
  {
    initial: "A",
    quote:
      "She has a rare ability to zoom out and think about the full user journey while still sweating the details on every pixel. Our SNIPES widget work was proof of that.",
    name: "Alfred Auyeung",
    role: "Engineering Lead, SNIPES",
  },
];

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = TESTIMONIALS.length;

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + total) % total);
    },
    [total]
  );

  useEffect(() => {
    const interval = setInterval(() => go(1), 6000);
    return () => clearInterval(interval);
  }, [go]);

  const t = TESTIMONIALS[current];

  return (
    <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[800px] mx-auto px-6 lg:px-10 flex flex-col items-center text-center">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-[42px] lg:text-[56px] font-medium tracking-[-0.03em] text-black leading-[1.1] mb-16"
          style={{ fontFamily: "'Geist', sans-serif" }}
        >
          What people{" "}
          <span
            className="italic"
            style={{ fontFamily: "'Instrument Serif', serif", color: "#9b59b6" }}
          >
            say
          </span>
        </motion.h2>

        {/* Testimonial card */}
        <div className="relative w-full min-h-[320px] flex flex-col items-center justify-center">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col items-center gap-8"
          >
            {/* Avatar */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-[22px] font-semibold text-black"
              style={{
                backgroundColor: ACCENT,
                fontFamily: "'Geist', sans-serif",
              }}
            >
              {t.initial}
            </div>

            {/* Quote */}
            <p
              className="text-[22px] lg:text-[26px] leading-[1.5] text-black/70 max-w-[640px] italic"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Name + Role */}
            <div className="flex flex-col items-center gap-1">
              <span
                className="text-[16px] font-semibold text-black"
                style={{ fontFamily: "'Geist', sans-serif" }}
              >
                {t.name}
              </span>
              <span
                className="text-[14px] font-medium"
                style={{
                  fontFamily: "'Geist', sans-serif",
                  color: "#9b59b6",
                }}
              >
                {t.role}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Navigation arrows + dots */}
        <div className="flex items-center gap-8 mt-12">
          {/* Left arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => go(-1)}
            className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center cursor-pointer bg-white hover:border-[#EAB0FF]/50 transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 3L5 8L10 13"
                stroke="black"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className="p-0 border-none bg-transparent cursor-pointer"
              >
                <motion.div
                  animate={{
                    width: i === current ? 28 : 8,
                    backgroundColor:
                      i === current ? ACCENT : "rgba(0,0,0,0.12)",
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-2 rounded-full"
                />
              </button>
            ))}
          </div>

          {/* Right arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => go(1)}
            className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center cursor-pointer bg-white hover:border-[#EAB0FF]/50 transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 3L11 8L6 13"
                stroke="black"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}

/* ─── Playground ─── */

const PLAYGROUND_PROJECTS = [
  {
    tags: ["Visual", "CSS"],
    title: "Gradient Experiments",
    description: "Exploring dynamic color gradients with CSS and canvas",
    gradient: "from-[#f5edf8] via-[#e8d5f0] to-[#dfc0e8]",
  },
  {
    tags: ["Motion", "React"],
    title: "Micro-interactions",
    description: "Reusable animation patterns for product interfaces",
    gradient: "from-[#e8f0fa] via-[#d5e2f5] to-[#c0d5f0]",
  },
  {
    tags: ["3D", "WebGL"],
    title: "Depth Studies",
    description: "Playing with parallax and 3D transforms in the browser",
    gradient: "from-[#f0e8f8] via-[#e0d5f0] to-[#d0c0e8]",
  },
  {
    tags: ["Typography", "Layout"],
    title: "Type Specimens",
    description: "Variable font explorations and kinetic typography",
    gradient: "from-[#faf0e8] via-[#f5e8d8] to-[#f0e0c8]",
  },
  {
    tags: ["Data Viz", "SVG"],
    title: "Chart Sketches",
    description: "Experimental chart types and data storytelling ideas",
    gradient: "from-[#e8f5f0] via-[#d5f0e8] to-[#c0e8d8]",
  },
  {
    tags: ["UI", "Prototype"],
    title: "Component Lab",
    description: "Prototyping new interaction patterns and UI primitives",
    gradient: "from-[#f8f0e8] via-[#f0e5d8] to-[#e8dac8]",
  },
];

const CARD_TILTS = [-3, 2, -1.5, 3, -2, 1.5];

function PlaygroundCard({
  project,
  index,
}: {
  project: (typeof PLAYGROUND_PROJECTS)[number];
  index: number;
}) {
  const tilt = CARD_TILTS[index % CARD_TILTS.length];

  return (
    <motion.div
      animate={{ rotate: tilt }}
      whileHover={{
        rotate: 0,
        scale: 1.05,
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group/card relative flex-shrink-0 w-[280px] h-[380px] rounded-2xl overflow-hidden border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.05)] cursor-pointer"
    >
      {/* Gradient placeholder (replace with project image) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Decorative blob */}
      <div
        className="absolute top-[30%] left-[20%] w-[160px] h-[160px] rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(234,176,255,0.15)" }}
      />

      {/* Always-visible bottom info — gradient scrim + tags + title */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/80 to-transparent pt-20 p-6 flex flex-col">
        {/* Tags */}
        <div className="flex gap-2 mb-2.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium tracking-wide text-black/50 border border-black/10 rounded-full px-3 py-1"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title — always visible */}
        <h3
          className="text-[18px] font-semibold text-black leading-tight"
          style={{ fontFamily: "'Geist', sans-serif" }}
        >
          {project.title}
        </h3>

        {/* Description + CTA — reveal on hover */}
        <div className="grid grid-rows-[0fr] group-hover/card:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
          <div className="overflow-hidden">
            <p
              className="text-[13px] leading-relaxed text-black/50 mt-2 mb-3"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              {project.description}
            </p>
            <span
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
              style={{
                fontFamily: "'Geist', sans-serif",
                color: "#9b59b6",
              }}
            >
              View Project
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-300 group-hover/card:translate-x-1"
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="#9b59b6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PlaygroundSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const arrowPause = useRef(false);

  /* Continuous auto-scroll with seamless loop */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let raf: number;
    const tick = () => {
      if (!isPaused.current && !arrowPause.current) {
        el.scrollLeft += 0.5;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const scroll = useCallback((dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    arrowPause.current = true;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
    setTimeout(() => {
      arrowPause.current = false;
    }, 800);
  }, []);

  return (
    <section className="relative bg-[#FAFAFA] py-24 lg:py-32 overflow-hidden">
      {/* Header */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 flex items-start justify-between mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <p
            className="text-[13px] font-semibold tracking-[0.2em] mb-4"
            style={{ fontFamily: "'Geist', sans-serif", color: "#9b59b6" }}
          >
            THE PLAYGROUND
          </p>
          <h2
            className="text-[42px] lg:text-[52px] font-medium tracking-[-0.03em] leading-[1.1] mb-4"
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            Where ideas come to{" "}
            <span
              className="italic"
              style={{ fontFamily: "'Instrument Serif', serif", color: "#9b59b6" }}
            >
              play
            </span>
          </h2>
          <p
            className="text-[17px] leading-relaxed text-black/50 max-w-[480px]"
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            A collection of code experiments, motion studies, and half-baked
            ideas.
          </p>
        </motion.div>

        {/* Arrow nav */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-3 mt-2"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll(-1)}
            className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center cursor-pointer bg-white hover:border-[#EAB0FF]/50 transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 3L5 8L10 13"
                stroke="black"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll(1)}
            className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center cursor-pointer bg-white hover:border-[#EAB0FF]/50 transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 3L11 8L6 13"
                stroke="black"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Carousel — py-10 prevents rotated cards from clipping */}
      <div
        ref={scrollRef}
        onMouseEnter={() => (isPaused.current = true)}
        onMouseLeave={() => (isPaused.current = false)}
        className="flex gap-6 pl-10 pr-10 py-10 overflow-x-hidden overflow-y-visible"
        style={{ scrollbarWidth: "none" }}
      >
        {[...PLAYGROUND_PROJECTS, ...PLAYGROUND_PROJECTS].map((project, i) => (
          <PlaygroundCard key={i} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ─── About ─── */

const PHILOSOPHIES = [
  { num: "01", text: "Systems thinking over isolated screens" },
  { num: "02", text: "Accessibility as a default, not a feature" },
  { num: "03", text: "Prototyping is thinking" },
  { num: "04", text: "Details make the difference" },
];

const STATS = [
  { value: "4+", label: "Years Experience" },
  { value: "40+", label: "Projects Shipped" },
  { value: "6", label: "Years of Design Education" },
  { value: "∞", label: "Rectangles Moved" },
];

function PhilosophyCard({
  item,
  index,
  constraintsRef,
}: {
  item: (typeof PHILOSOPHIES)[number];
  index: number;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.35}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      whileDrag={{ scale: 1.04, zIndex: 20, boxShadow: "0 12px 32px rgba(234,176,255,0.25)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-[#EAB0FF]/20 px-6 py-5 cursor-grab active:cursor-grabbing shadow-[0_2px_12px_rgba(234,176,255,0.08)] hover:shadow-[0_8px_24px_rgba(234,176,255,0.15)] hover:border-[#EAB0FF]/40 select-none transition-[box-shadow,border-color] duration-300"
      style={{
        marginLeft: index * 20,
        width: "fit-content",
        touchAction: "none",
      }}
    >
      <span
        className="text-[13px] font-bold block mb-1"
        style={{ fontFamily: "'Geist', sans-serif", color: "#9b59b6" }}
      >
        {item.num}
      </span>
      <span
        className="text-[15px] font-medium text-black"
        style={{ fontFamily: "'Geist', sans-serif" }}
      >
        {item.text}
      </span>
    </motion.div>
  );
}

function AboutSection() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="relative py-24 lg:py-36 overflow-hidden">
      {/* Accent background wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdf6ff] via-[#f9eefb] to-white" />

      {/* Large floating accent blobs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
        style={{ backgroundColor: ACCENT }}
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[5%] right-[-8%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-20"
        style={{ backgroundColor: ACCENT }}
      />

      {/* Floating accent dots */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[12%] w-3 h-3 rounded-full"
        style={{ backgroundColor: ACCENT, opacity: 0.5 }}
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[60%] left-[8%] w-2 h-2 rounded-full"
        style={{ backgroundColor: ACCENT, opacity: 0.4 }}
      />
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 90, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-[25%] right-[20%] w-4 h-4 rounded-sm border-2"
        style={{ borderColor: ACCENT, opacity: 0.3 }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative flex justify-center"
          >
            <div className="group/photo relative">
              {/* Accent glow behind photo */}
              <div
                className="absolute -inset-8 rounded-3xl blur-2xl opacity-0 group-hover/photo:opacity-40 transition-opacity duration-700"
                style={{ backgroundColor: ACCENT }}
              />

              {/* Accent border frame */}
              <div
                className="absolute -inset-4 rounded-2xl border-2 rotate-[-3deg] transition-all duration-500 group-hover/photo:rotate-0 group-hover/photo:-inset-5"
                style={{ borderColor: ACCENT }}
              />
              {/* Decorative corner squares */}
              <div
                className="absolute -top-6 -right-6 w-8 h-8 rounded-md border-2 rotate-[12deg] transition-all duration-500 group-hover/photo:rotate-0 group-hover/photo:scale-110"
                style={{ borderColor: ACCENT, backgroundColor: "rgba(234,176,255,0.1)" }}
              />
              <div
                className="absolute -bottom-5 -left-5 w-5 h-5 rounded-sm border-2 rotate-[-8deg] transition-all duration-500 group-hover/photo:rotate-0 group-hover/photo:scale-110"
                style={{ borderColor: ACCENT, backgroundColor: "rgba(234,176,255,0.1)" }}
              />
              <div
                className="absolute top-[30%] -right-8 w-3 h-3 rounded-full transition-all duration-500 group-hover/photo:scale-150"
                style={{ backgroundColor: ACCENT, opacity: 0.5 }}
              />

              {/* Photo — larger */}
              <div className="relative w-[400px] h-[520px] rounded-2xl overflow-hidden grayscale rotate-[-3deg] transition-all duration-500 group-hover/photo:grayscale-0 group-hover/photo:rotate-0 shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about.jpg"
                  alt="Rashi Chaudhary"
                  className="w-full h-full object-cover"
                />
                {/* Fallback gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f0e4f6] via-[#e8d5f0] to-[#dfc0e8] -z-10" />
                {/* Subtle accent overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#EAB0FF]/10 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[13px] font-semibold tracking-[0.2em]"
              style={{ fontFamily: "'Geist', sans-serif", color: "#9b59b6" }}
            >
              ABOUT ME
            </motion.p>

            {/* Heading */}
            <h2
              className="text-[40px] lg:text-[56px] font-medium tracking-[-0.03em] text-black leading-[1.08]"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              More than just{" "}
              <span
                className="italic"
                style={{ fontFamily: "'Instrument Serif', serif", color: "#9b59b6" }}
              >
                pixels
              </span>
            </h2>

            {/* Description */}
            <p
              className="text-[17px] leading-[1.7] text-black/50 max-w-[480px]"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              I design products that work in the real world, with edge cases,
              constraints, and people who don&apos;t read instructions.
            </p>

            {/* Philosophy cards — draggable bounding box */}
            <div
              ref={constraintsRef}
              className="relative flex flex-col gap-3 py-4 min-h-[260px]"
            >
              {PHILOSOPHIES.map((item, i) => (
                <PhilosophyCard
                  key={item.num}
                  item={item}
                  index={i}
                  constraintsRef={constraintsRef}
                />
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="/about"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(234,176,255,0.5)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="self-start rounded-[40px] px-8 py-4 text-[15px] font-semibold text-black cursor-pointer border-none no-underline inline-block"
              style={{
                fontFamily: "'Geist', sans-serif",
                backgroundColor: ACCENT,
              }}
            >
              Read full bio
            </motion.a>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-24">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="flex flex-col items-center gap-2 py-8 rounded-2xl border border-[#EAB0FF]/20 bg-white/80 backdrop-blur-sm cursor-default transition-all duration-300 hover:border-[#EAB0FF]/60 hover:shadow-[0_8px_30px_rgba(234,176,255,0.2)] hover:bg-white"
            >
              <span
                className="text-[42px] lg:text-[52px] font-medium tracking-[-0.02em]"
                style={{
                  fontFamily: "'Geist', sans-serif",
                  color: "#9b59b6",
                }}
              >
                {stat.value}
              </span>
              <span
                className="text-[14px] text-black/40 font-medium"
                style={{ fontFamily: "'Geist', sans-serif" }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */

const PILL_LINES = [
  "\u{1F440} You made it to the footer. Respect.",
  "\u{2728} This section exists purely because I enjoy details.",
  "\u{1F3C6} Most people never scroll this far. You did.",
  "\u{1F95A} This is not a CTA. It\u2019s an easter egg.",
  "\u{1F50D} You\u2019re now interacting with the least important part of the site.",
  "\u{1F4D0} I care an unreasonable amount about spacing.",
  "\u{23F1}\uFE0F I notice when motion feels off by a few milliseconds.",
  "\u{1F6E0}\uFE0F I prototype things even when nobody asked.",
  "\u{2699}\uFE0F I like systems that quietly work in the background.",
  "\u{1F9E0} I overthink interfaces so users don\u2019t have to.",
  "\u{1F52C} I enjoy figuring out why things feel wrong.",
  "\u{1F4A5} I don\u2019t trust anything until I break it once.",
  "\u{1F6E1}\uFE0F I believe good design should survive bad usage.",
  "\u{23F3} This footer took longer than it should have.",
  "\u{1F91D} If you\u2019re still clicking, we might get along.",
];

const GREEN_THRESHOLDS: [number, string][] = [
  [4, "Still here. That\u2019s data."],
  [6, "Persistence noted."],
  [9, "You are thoroughly investigating."],
  [13, "At this point, we\u2019re basically talking."],
  [18, "Okay. You win."],
];

function FooterSection() {
  const [clicks, setClicks] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const lastScrollY = useRef(0);

  // Reset on 300px scroll-up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (lastScrollY.current - y > 300) {
        setClicks(0);
        setHasClicked(false);
        setShowCta(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    setHasClicked(true);
    const next = clicks + 1;
    setClicks(next);
    if (next >= 13) setShowCta(true);
  };

  const pillText = hasClicked
    ? PILL_LINES[(clicks - 1) % PILL_LINES.length]
    : PILL_LINES[0];

  const greenLine = GREEN_THRESHOLDS.slice()
    .reverse()
    .find(([threshold]) => clicks >= threshold);

  return (
    <footer className="relative bg-gradient-to-b from-[#f9eefb] to-[#f3e4f7] pt-24 pb-12 overflow-hidden">
      {/* Subtle top gradient fade */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/60 to-transparent" />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Easter egg pill */}
        <div className="flex flex-col items-center mb-20">
          {/* Bouncing pointer before first click */}
          <div className="h-8 mb-2 flex items-center justify-center" style={{ pointerEvents: "none" }}>
            <motion.span
              animate={!hasClicked ? { y: [0, -8, 0], opacity: 1 } : { opacity: 0, y: -10 }}
              transition={
                !hasClicked
                  ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
              className="text-[20px]"
            >
              {"\u{1F446}"}
            </motion.span>
          </div>

          {/* Pill */}
          <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative w-[480px] max-w-full px-8 py-3.5 rounded-full border border-[#9b59b6]/15 bg-white/60 backdrop-blur-sm cursor-pointer overflow-hidden shadow-[0_2px_12px_rgba(234,176,255,0.1)]"
          >
            <motion.span
              key={clicks}
              initial={hasClicked ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="block text-[15px] text-black/60 text-center"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              {pillText}
            </motion.span>
          </motion.button>

          {/* Green threshold line */}
          <div className="h-8 flex items-center">
            {greenLine && (
              <motion.p
                key={greenLine[1]}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-[13px] font-medium"
                style={{
                  fontFamily: "'Geist', sans-serif",
                  color: "#9b59b6",
                }}
              >
                {greenLine[1]}
              </motion.p>
            )}
          </div>

          {/* CTA — always rendered, animated in/out to avoid layout shift */}
          <div className="h-14 mt-2 flex items-center justify-center">
            <motion.a
              href="mailto:hello@rashi.design"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={showCta ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={showCta ? {
                scale: 1.05,
                boxShadow: "0 0 24px rgba(234,176,255,0.3)",
              } : {}}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold text-black no-underline"
              style={{
                fontFamily: "'Geist', sans-serif",
                backgroundColor: ACCENT,
                pointerEvents: showCta ? "auto" : "none",
              }}
            >
              {"\uD83D\uDCAC"} Let&apos;s continue this conversation. Say hi?
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#9b59b6]/15 mb-12" />

        {/* Footer content — 3 columns */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left — name + role */}
          <div className="flex flex-col gap-1.5">
            <span
              className="text-[22px] font-semibold text-black tracking-[-0.01em]"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Rashi Chaudhary
            </span>
            <span
              className="text-[14px] text-black/40"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Product & Visual Designer &bull; NYC
            </span>
          </div>

          {/* Center — nav links */}
          <div
            className="flex items-center gap-8"
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            {[
              { label: "PLAYGROUND", href: "/playground" },
              { label: "ABOUT", href: "/about" },
              { label: "LINKEDIN", href: "#" },
              { label: "RESUME", href: "#" },
            ].map((link) => (
              <FlipNavLink key={link.label} label={link.label} href={link.href} />
            ))}
          </div>

          {/* Right — copyright */}
          <div
            className="flex flex-col items-end gap-1 text-right"
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            <span className="text-[13px] text-black/25">
              &copy; 2026 &bull; Made with caffeine & existential dread
            </span>
            <span className="text-[13px] text-black/25">
              and yes, I aligned all the pixels
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */

export default function HeroPage() {
  const estTime = useESTTime();

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen w-full overflow-hidden bg-white">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover [transform:scaleY(-1)]"
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[26.416%] from-[rgba(255,255,255,0)] to-[66.943%] to-white" />
        </div>

        {/* Navigation */}
        <motion.nav
          custom={0}
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex items-center justify-between px-10 py-6 max-w-[1200px] mx-auto"
          style={{ fontFamily: "'Geist', sans-serif" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-b from-[#2c2c2c] to-[#1a1a1a] shadow-[inset_-4px_-6px_25px_0px_rgba(201,201,201,0.08),inset_4px_4px_10px_0px_rgba(29,29,29,0.24)]">
              <svg
                width="12"
                height="14"
                viewBox="0 0 14 16"
                fill="none"
                className="ml-0.5"
              >
                <path d="M0 0L14 8L0 16V0Z" fill="#fff" />
              </svg>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-[#373a46]/60 tracking-wide">
              <span className="font-medium text-black">Rashi</span>
              <span className="text-black/20">&middot;</span>
              <span>{estTime || "\u2014"}</span>
              <span className="text-black/20">&middot;</span>
              <span>NYC</span>
              <span className="text-black/15 mx-0.5">|</span>
              <span className="truncate max-w-[200px]">
                The Naturals by Jennife...
              </span>
            </div>
          </div>

          <div className="flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <FlipNavLink
                key={link.label}
                label={link.label}
                href={link.href}
              />
            ))}
          </div>
        </motion.nav>

        {/* Hero Content — raised up from pt-[290px] to pt-[200px] */}
        <div className="relative z-10 flex flex-col items-center text-center pt-[200px] pb-24 px-6 max-w-[1200px] mx-auto gap-8">
          <motion.p
            custom={1}
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            className="text-[14px] font-semibold tracking-[0.2em] text-[#9b59b6]"
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            PRODUCT & VISUAL DESIGNER
          </motion.p>

          <motion.h1
            custom={2}
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            className="text-[80px] leading-[1.05] font-medium tracking-[-0.04em] text-black"
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            Moving{" "}
            <span
              className="italic text-[100px]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              rectangles
            </span>
            <br />
            around (professionally)
          </motion.h1>

          <motion.div
            custom={3}
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 mt-4"
          >
            <AccrueLogo />
            <p
              className="text-[18px] leading-relaxed text-[#373a46] opacity-80"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Currently making loyalty rewarding for users and brands at{" "}
              <span className="font-semibold text-black opacity-100">
                Accrue
              </span>{" "}
              in NYC
            </p>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4 mt-6"
          >
            <p
              className="text-[16px] text-[#373a46]/50"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Short on time? Here&apos;s my work in 120 seconds.
            </p>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 0 30px rgba(234,176,255,0.4), inset -4px -6px 25px 0px rgba(201,201,201,0.08), inset 4px 4px 10px 0px rgba(29,29,29,0.24)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group/btn inline-flex items-center gap-3 rounded-[40px] px-8 py-4 text-[15px] font-semibold text-white bg-gradient-to-b from-[#2c2c2c] to-[#1a1a1a] shadow-[inset_-4px_-6px_25px_0px_rgba(201,201,201,0.08),inset_4px_4px_10px_0px_rgba(29,29,29,0.24)] cursor-pointer"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Watch now
              <svg
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              >
                <path d="M0 0L14 8L0 16V0Z" fill="#fff" />
              </svg>
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          custom={6}
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          className="absolute bottom-10 left-0 right-0 z-10 flex flex-col items-center gap-2"
        >
          <span
            className="text-[12px] font-medium tracking-[0.15em] text-black/30"
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 3V13M8 13L3 8M8 13L13 8"
                stroke="black"
                strokeOpacity="0.25"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Case Studies */}
      <CaseStudiesSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Playground */}
      <PlaygroundSection />

      {/* About */}
      <AboutSection />

      {/* Footer */}
      <FooterSection />
    </main>
  );
}