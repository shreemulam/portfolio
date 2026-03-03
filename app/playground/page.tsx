"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

/* ─── Constants ─── */

const ACCENT = "#EAB0FF";
const ACCENT_TEXT = "#9b59b6";
const FONT = "'Geist', sans-serif";

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
  { label: "CASE STUDIES", href: "/#case-studies" },
  { label: "PLAYGROUND", href: "/playground" },
  { label: "ABOUT", href: "/about" },
  { label: "RESUME", href: "#" },
  { label: "LINKEDIN", href: "#" },
];

/* ─── Data ─── */

type BentoSize = "large" | "wide" | "tall" | "small";

interface PlaygroundProject {
  tags: string[];
  title: string;
  description: string;
  gradient: string;
  size: BentoSize;
}

const BENTO_PROJECTS: PlaygroundProject[] = [
  {
    tags: ["Visual", "CSS"],
    title: "Gradient Experiments",
    description:
      "Exploring dynamic color gradients with CSS and canvas — generative palettes, mesh gradients, and noise-driven color fields.",
    gradient: "from-[#f5edf8] via-[#e8d5f0] to-[#dfc0e8]",
    size: "large",
  },
  {
    tags: ["Motion", "React"],
    title: "Micro-interactions",
    description: "Reusable animation patterns for product interfaces",
    gradient: "from-[#e8f0fa] via-[#d5e2f5] to-[#c0d5f0]",
    size: "wide",
  },
  {
    tags: ["3D", "WebGL"],
    title: "Depth Studies",
    description:
      "Playing with parallax and 3D transforms in the browser",
    gradient: "from-[#f0e8f8] via-[#e0d5f0] to-[#d0c0e8]",
    size: "small",
  },
  {
    tags: ["Typography", "Layout"],
    title: "Type Specimens",
    description: "Variable font explorations and kinetic typography",
    gradient: "from-[#faf0e8] via-[#f5e8d8] to-[#f0e0c8]",
    size: "tall",
  },
  {
    tags: ["Data Viz", "SVG"],
    title: "Chart Sketches",
    description:
      "Experimental chart types and data storytelling ideas",
    gradient: "from-[#e8f5f0] via-[#d5f0e8] to-[#c0e8d8]",
    size: "small",
  },
  {
    tags: ["UI", "Prototype"],
    title: "Component Lab",
    description:
      "Prototyping new interaction patterns and UI primitives",
    gradient: "from-[#f8f0e8] via-[#f0e5d8] to-[#e8dac8]",
    size: "wide",
  },
  {
    tags: ["Color", "Theory"],
    title: "Color Systems",
    description:
      "Building adaptive color palettes from perceptual models",
    gradient: "from-[#f8e8f0] via-[#f0d8e8] to-[#e8c8e0]",
    size: "wide",
  },
  {
    tags: ["Gesture", "Mobile"],
    title: "Interaction Patterns",
    description:
      "Swipe, drag, and gesture-driven interface explorations",
    gradient: "from-[#e8e8fa] via-[#d8d8f5] to-[#c8c8f0]",
    size: "small",
  },
  {
    tags: ["Audio", "Feedback"],
    title: "Sound & UI",
    description:
      "Pairing interface states with subtle audio feedback",
    gradient: "from-[#f0f0e8] via-[#e8e8d8] to-[#e0e0c8]",
    size: "tall",
  },
];

const BENTO_GRID_CLASSES: Record<BentoSize, string> = {
  large:
    "col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-2",
  wide: "col-span-1 md:col-span-2 lg:col-span-2",
  tall: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-2 lg:row-span-2",
  small: "col-span-1 row-span-1",
};

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

/* ─── Helpers ─── */

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/* ─── Bento Card ─── */

function BentoCard({
  project,
  index,
}: {
  project: PlaygroundProject;
  index: number;
}) {
  const isLarge = project.size === "large";

  return (
    <motion.div
      id={slugify(project.title)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      whileHover={{
        y: -6,
        boxShadow:
          "0 20px 60px rgba(234,176,255,0.15), 0 8px 24px rgba(0,0,0,0.06)",
        borderColor: "rgba(234,176,255,0.5)",
      }}
      className={`${BENTO_GRID_CLASSES[project.size]} relative rounded-2xl overflow-hidden border border-black/[0.08] bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)] cursor-pointer group/card`}
      style={{
        minHeight: isLarge ? 480 : project.size === "tall" ? 480 : 240,
      }}
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative blob */}
      <div
        className="absolute top-[30%] left-[20%] w-[160px] h-[160px] rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(234,176,255,0.15)" }}
      />

      {/* Content */}
      {isLarge ? (
        /* ── Large card: always-visible description ── */
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent pt-24 p-8 flex flex-col">
          <div className="flex gap-2 mb-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium tracking-wide text-black/50 border border-black/10 rounded-full px-3 py-1"
                style={{ fontFamily: FONT }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h3
            className="text-[28px] font-semibold text-black leading-tight mb-2"
            style={{ fontFamily: FONT }}
          >
            {project.title}
          </h3>
          <p
            className="text-[15px] leading-relaxed text-black/50 mb-4 max-w-[360px]"
            style={{ fontFamily: FONT }}
          >
            {project.description}
          </p>
          <span
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold"
            style={{ fontFamily: FONT, color: ACCENT_TEXT }}
          >
            Explore
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-300 group-hover/card:translate-x-1"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke={ACCENT_TEXT}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      ) : (
        /* ── Standard card: hover-reveal description ── */
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/80 to-transparent pt-20 p-6 flex flex-col">
          <div className="flex gap-2 mb-2.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium tracking-wide text-black/50 border border-black/10 rounded-full px-3 py-1"
                style={{ fontFamily: FONT }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h3
            className="text-[18px] font-semibold text-black leading-tight"
            style={{ fontFamily: FONT }}
          >
            {project.title}
          </h3>

          {/* Reveal on hover */}
          <div className="grid grid-rows-[0fr] group-hover/card:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
            <div className="overflow-hidden">
              <p
                className="text-[13px] leading-relaxed text-black/50 mt-2 mb-3"
                style={{ fontFamily: FONT }}
              >
                {project.description}
              </p>
              <span
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
                style={{ fontFamily: FONT, color: ACCENT_TEXT }}
              >
                Explore
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover/card:translate-x-1"
                >
                  <path
                    d="M3 8H13M13 8L9 4M13 8L9 12"
                    stroke={ACCENT_TEXT}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Page ─── */

export default function PlaygroundPage() {
  const estTime = useESTTime();

  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: FONT }}>
      {/* ── Navbar ── */}
      <motion.nav
        custom={0}
        variants={fadeSlideUp}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full"
        style={{ fontFamily: FONT }}
      >
        <div className="flex items-center justify-between px-6 lg:px-10 py-6 max-w-[1200px] mx-auto">
          <a href="/" className="flex items-center gap-3 no-underline">
            <div className="flex items-center gap-2 text-[13px] text-[#373a46]/60 tracking-wide">
              <span className="font-medium text-black">Rashi</span>
              <span className="text-black/20">&middot;</span>
              <span>{estTime || "\u2014"}</span>
              <span className="text-black/20">&middot;</span>
              <span>NYC</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <FlipNavLink
                key={link.label}
                label={link.label}
                href={link.href}
              />
            ))}
          </div>
        </div>
      </motion.nav>

      {/* ── Hero Section ── */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Background gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white via-[70%] to-[#FAFAFA] pointer-events-none" />

        {/* Floating accent blobs */}
        <motion.div
          animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-[20%] right-[-5%] w-[300px] h-[300px] rounded-full blur-[100px] opacity-15 pointer-events-none"
          style={{ backgroundColor: ACCENT }}
        />
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] right-[15%] w-3 h-3 rounded-full pointer-events-none"
          style={{ backgroundColor: ACCENT, opacity: 0.35 }}
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-[60%] left-[5%] w-2 h-2 rounded-full pointer-events-none"
          style={{ backgroundColor: ACCENT, opacity: 0.3 }}
        />

        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[13px] font-semibold tracking-[0.2em] mb-4"
            style={{ fontFamily: FONT, color: ACCENT_TEXT }}
          >
            THE PLAYGROUND
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="text-[48px] lg:text-[64px] font-medium tracking-[-0.03em] text-black leading-[1.08]"
            style={{ fontFamily: FONT }}
          >
            Where ideas come to{" "}
            <span
              className="italic"
              style={{
                fontFamily: "'Instrument Serif', serif",
                color: ACCENT_TEXT,
              }}
            >
              play
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-[17px] leading-relaxed text-black/50 max-w-[520px] mt-4"
            style={{ fontFamily: FONT }}
          >
            A collection of code experiments, motion studies, and half-baked
            ideas. Click around — nothing here is precious.
          </motion.p>
        </div>
      </section>

      {/* ── Bento Grid ── */}
      <section className="relative bg-[#FAFAFA] py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            style={{ gridAutoRows: "minmax(240px, auto)" }}
          >
            {BENTO_PROJECTS.map((project, index) => (
              <BentoCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative bg-gradient-to-b from-[#FAFAFA] via-[#f9eefb] to-[#f3e4f7] pt-16 pb-12 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="w-full h-px bg-[#9b59b6]/15 mb-12" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Left — name + role */}
            <div className="flex flex-col gap-1.5">
              <span
                className="text-[22px] font-semibold text-black tracking-[-0.01em]"
                style={{ fontFamily: FONT }}
              >
                Rashi Chaudhary
              </span>
              <span
                className="text-[14px] text-black/40"
                style={{ fontFamily: FONT }}
              >
                Product & Visual Designer &bull; NYC
              </span>
            </div>

            {/* Center — nav links */}
            <div
              className="flex items-center gap-8"
              style={{ fontFamily: FONT }}
            >
              {[
                { label: "CASE STUDIES", href: "/#case-studies" },
                { label: "PLAYGROUND", href: "/playground" },
                { label: "ABOUT", href: "/about" },
                { label: "LINKEDIN", href: "#" },
                { label: "RESUME", href: "#" },
              ].map((link) => (
                <FlipNavLink
                  key={link.label}
                  label={link.label}
                  href={link.href}
                />
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

      <ScrollToTopButton />
    </main>
  );
}

/* ─── Scroll-to-top FAB ─── */

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