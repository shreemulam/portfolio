"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

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

/* ─── Data ─── */

const NAV_LINKS = [
  { label: "CASE STUDIES", href: "/#case-studies" },
  { label: "PLAYGROUND", href: "/playground" },
  { label: "ABOUT", href: "/about" },
  { label: "RESUME", href: "#" },
  { label: "LINKEDIN", href: "#" },
];

const SKILLS = [
  "Product Design",
  "Product Strategy",
  "Systems Thinking",
  "UX Architecture",
  "Interaction Design",
  "User Research",
  "Usability Testing",
  "Interviews",
  "Survey Design",
  "Behavioral UX",
  "UI Design",
  "Visual Design",
  "Typography",
  "Motion Design",
  "Microinteractions",
  "Data Analysis",
  "Funnel Analysis",
  "Event Modeling",
  "Front-End Awareness",
  "Accessibility",
  "Rapid Prototyping",
  "Design Systems",
];

const TOOLKIT: { category: string; tools: string[] }[] = [
  { category: "Design & Prototyping", tools: ["Figma", "Framer", "ProtoPie"] },
  {
    category: "Motion & Front-End",
    tools: ["Framer Motion", "React", "HTML", "CSS"],
  },
  { category: "Research & Testing", tools: ["Maze", "Dovetail"] },
  { category: "Analytics", tools: ["Mixpanel", "Microsoft Clarity"] },
  {
    category: "AI & Workflow",
    tools: ["Claude Code", "ChatGPT", "Cursor", "Vercel AI SDK"],
  },
];

const THINGS_I_NOTICE = [
  {
    front: "Users do not read.",
    back: "They scan, guess, and move fast. The UI has to still work.",
  },
  {
    front: "Most bugs are unclear decisions.",
    back: "The design usually skipped a rule, a state, or an edge case.",
  },
  {
    front: "Edge cases are the product.",
    back: "The happy path is easy. Real life is not.",
  },
  {
    front: "Speed beats correctness.",
    back: "People pick the fastest path, even if it is not the intended one.",
  },
  {
    front: "If it needs explaining, it needs redesigning.",
    back: "Clarity is cheaper than training.",
  },
  {
    front: "Systems break quietly first.",
    back: "I look for early cracks before they become support tickets.",
  },
  {
    front: "Motion is feedback, not decoration.",
    back: "If it does not clarify state, I cut it.",
  },
  {
    front: "Constraints are where the design is.",
    back: "Technical, legal, and business limits shape the real solution.",
  },
];

const HOW_I_WORK = [
  {
    title: "Start with what breaks",
    description:
      "I map failure states, edge cases, and recovery paths before visuals.",
  },
  {
    title: "Find where people hesitate",
    description:
      "I look for moments of confusion, drop-off, and misclicks.",
  },
  {
    title: "Make the rules explicit",
    description:
      "I define the system, states, and logic so it holds up at scale.",
  },
  {
    title: "Prototype to kill bad ideas early",
    description: "I test behavior and flow before polishing UI.",
  },
  {
    title: "Ship, then refine",
    description:
      "I iterate based on data, feedback, and what actually happens in the wild.",
  },
];

const FUN_FACTS = [
  { emoji: "\u2615", fact: "Runs on oatmilk iced mochas" },
  { emoji: "\uD83C\uDFA7", fact: "Dance Techno while designing" },
  {
    emoji: "\uD83C\uDF19",
    fact: "Night owl, trying to live in an early bird world",
  },
  { emoji: "\uD83D\uDCDA", fact: "Fantasy fiction nerd" },
  { emoji: "\uD83C\uDFA4", fact: "Bedroom singer & songwriter" },
  {
    emoji: "\u2708\uFE0F",
    fact: "Travelled to 10 new US states in 2025",
  },
];

const EXPERIENCE = [
  {
    company: "Accrue",
    role: "Product Designer",
    period: "Apr 2025 \u2013 Present",
    location: "New York, NY",
    description:
      "Designing and scaling a white-label wallet and loyalty platform used by enterprise retail brands. Leading end-to-end product design across onboarding, payments, rewards, and system-level UX, with a strong focus on constraints, edge cases, and real-world behavior.",
  },
  {
    company: "Orbit",
    role: "Founding Product Designer & Strategist (Contract)",
    period: "Dec 2024 \u2013 Mar 2025",
    location: "Remote, US",
    description:
      "Led product definition and early design for a new platform from zero to MVP. Partnered closely with founders to shape product strategy, core flows, and positioning, translating ambiguous ideas into shippable concepts.",
  },
  {
    company: "Pomu.io",
    role: "Product Designer",
    period: "Mar 2024 \u2013 Mar 2025",
    location: "Remote, US",
    description:
      "Designed core product experiences for a marketplace platform, working across research, prototyping, and UI. Collaborated with engineering to iterate quickly and improve usability through testing and data-informed decisions.",
  },
  {
    company: "NYU Tandon School of Engineering",
    role: "UX Designer & Digital Media Strategist (Part-time)",
    period: "Sep 2023 \u2013 Jun 2024",
    location: "Brooklyn, NY",
    description:
      "Designed and built accessible digital experiences for academic conferences and events. Conducted usability testing, improved navigation and content structure, and ensured WCAG-compliant designs across web platforms.",
  },
  {
    company: "Slash",
    role: "Product Designer",
    period: "Oct 2021 \u2013 Aug 2022",
    location: "Hyderabad, India",
    description:
      "Redesigned a core booking experience for a home services product, focusing on simplifying selection and scheduling across services. Explored a multi-service booking flow and shipped improvements within technical constraints.",
  },
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

/* ─── How I Think Section ─── */

function HowIThinkSection() {
  const [openCards, setOpenCards] = useState<Set<number>>(new Set());
  const [activeStep, setActiveStep] = useState(0);

  function toggleCard(index: number) {
    setOpenCards((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
      className="pt-12"
    >
      {/* Section Header */}
      <h2
        className="text-[28px] font-medium tracking-[-0.02em] text-black mb-2"
        style={{ fontFamily: FONT }}
      >
        How I Think
      </h2>
      <p
        className="text-sm text-black/40 mb-10"
        style={{ fontFamily: FONT }}
      >
        A few patterns I&apos;ve learned from designing real systems, plus how I
        approach messy problems.
      </p>

      {/* Part A: Things I Notice */}
      <p
        className="text-[13px] font-semibold uppercase tracking-[0.2em] mb-6"
        style={{ fontFamily: FONT, color: ACCENT_TEXT }}
      >
        Things I Notice
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-16">
        {THINGS_I_NOTICE.map((item, i) => {
          const isOpen = openCards.has(i);
          return (
            <motion.button
              key={i}
              onClick={() => toggleCard(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.05 + i * 0.05,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              whileHover={{
                borderColor: "rgba(234,176,255,0.5)",
                boxShadow: "0 0 15px rgba(234,176,255,0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              className="text-left p-4 rounded-2xl border bg-white/80 backdrop-blur-sm transition-all duration-200 cursor-pointer"
              style={{
                borderColor: isOpen
                  ? "rgba(234,176,255,0.5)"
                  : "rgba(234,176,255,0.15)",
                boxShadow: isOpen
                  ? "0 0 15px rgba(234,176,255,0.15)"
                  : "0 2px 12px rgba(0,0,0,0.03)",
                fontFamily: FONT,
              }}
              aria-expanded={isOpen}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-[15px] text-black">
                  {item.front}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 ml-3"
                >
                  <ChevronDown
                    size={18}
                    strokeWidth={1.5}
                    className="text-black/25"
                  />
                </motion.span>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-black/50 mt-3">{item.back}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Part B: How I Work */}
      <p
        className="text-[13px] font-semibold uppercase tracking-[0.2em] mb-6"
        style={{ fontFamily: FONT, color: ACCENT_TEXT }}
      >
        How I Work
      </p>

      {/* Desktop Stepper */}
      <div className="hidden md:block">
        <div className="flex gap-2 mb-6">
          {HOW_I_WORK.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className="flex-1 flex items-center gap-2.5 cursor-pointer bg-transparent border-none p-0 transition-opacity duration-200"
              style={{
                fontFamily: FONT,
                opacity: activeStep === i ? 1 : 0.5,
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 flex-shrink-0"
                style={{
                  backgroundColor:
                    activeStep === i ? ACCENT : "rgba(0,0,0,0.05)",
                  color: activeStep === i ? "#000" : "rgba(0,0,0,0.3)",
                }}
              >
                {i + 1}
              </div>
              <span
                className="text-sm font-medium text-left"
                style={{
                  color: activeStep === i ? ACCENT_TEXT : "rgba(0,0,0,0.7)",
                }}
              >
                {step.title}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-4 rounded-2xl border bg-white/80 backdrop-blur-sm"
            style={{
              borderColor: "rgba(234,176,255,0.15)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
            }}
          >
            <p className="text-[15px] text-black/50" style={{ fontFamily: FONT }}>
              {HOW_I_WORK[activeStep].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Stepper */}
      <div className="md:hidden space-y-3">
        {HOW_I_WORK.map((step, i) => {
          const isActive = activeStep === i;
          return (
            <motion.button
              key={i}
              onClick={() => setActiveStep(i)}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left p-4 rounded-2xl border bg-white/80 backdrop-blur-sm transition-all duration-200 cursor-pointer"
              style={{
                borderColor: isActive
                  ? "rgba(234,176,255,0.5)"
                  : "rgba(234,176,255,0.15)",
                boxShadow: isActive
                  ? "0 0 15px rgba(234,176,255,0.15)"
                  : "0 2px 12px rgba(0,0,0,0.03)",
                fontFamily: FONT,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0"
                  style={{
                    backgroundColor: isActive ? ACCENT : "rgba(0,0,0,0.05)",
                    color: isActive ? "#000" : "rgba(0,0,0,0.3)",
                  }}
                >
                  {i + 1}
                </div>
                <span
                  className="text-sm font-medium"
                  style={{
                    color: isActive ? ACCENT_TEXT : "rgba(0,0,0,0.7)",
                  }}
                >
                  {step.title}
                </span>
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-black/50 mt-3 pl-10">
                      {step.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Page ─── */



/* ─── Photo Gallery ─── */

const GALLERY_PHOTOS = [
  { src: "/gallery/photo-1.jpg", alt: "Travel" },
  { src: "/gallery/photo-2.jpg", alt: "Food" },
  { src: "/gallery/photo-3.jpg", alt: "Art" },
  { src: "/gallery/photo-4.jpg", alt: "Travel" },
  { src: "/gallery/photo-5.jpg", alt: "Food" },
  { src: "/gallery/photo-6.jpg", alt: "Art" },
  { src: "/gallery/photo-7.jpg", alt: "Travel" },
  { src: "/gallery/photo-8.jpg", alt: "Food" },
];

function PhotoGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let raf: number;
    const tick = () => {
      if (!isPaused.current) {
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

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mb-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[13px] font-semibold tracking-[0.2em]"
          style={{ fontFamily: FONT, color: ACCENT_TEXT }}
        >
          LIFE IN PHOTOS
        </motion.p>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={() => (isPaused.current = true)}
        onMouseLeave={() => (isPaused.current = false)}
        onTouchStart={() => (isPaused.current = true)}
        onTouchEnd={() => (isPaused.current = false)}
        className="flex gap-4 px-6 overflow-x-hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {[...GALLERY_PHOTOS, ...GALLERY_PHOTOS].map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % GALLERY_PHOTOS.length) * 0.05 }}
            className="flex-shrink-0 w-[280px] h-[360px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#f0e4f6] via-[#e8d5f0] to-[#dfc0e8]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
/* ─── Mobile Menu ─── */

function MobileMenu({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const menuLinks = [
    { label: "Case Studies", href: "/#case-studies" },
    { label: "Playground", href: "/playground" },
    { label: "About", href: "/about" },
    { label: "Resume", href: "#" },
    { label: "LinkedIn", href: "#" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] bg-white flex flex-col"
      style={{ fontFamily: FONT }}
    >
      <div className="flex justify-end px-6 py-6">
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center"
          aria-label="Close menu"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M1 1L17 17M17 1L1 17" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {menuLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            onClick={onClose}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
            className="text-[28px] font-medium text-black tracking-[-0.01em] hover:text-[#9b59b6] transition-colors"
          >
            {link.label}
          </motion.a>
        ))}
      </div>
      <div className="pb-12 flex justify-center">
        <a
          href="mailto:hello@rashi.design"
          className="text-[15px] font-medium text-[#9b59b6] hover:opacity-70 transition-opacity"
        >
          hello@rashi.design
        </a>
      </div>
    </motion.div>
  );
}
export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const estTime = useESTTime();

  return (
    <main
      className="min-h-screen bg-white"
      style={{ fontFamily: FONT }}
    >
      {/* ─��� Navbar ── */}
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
              <FlipNavLink key={link.label} label={link.label} href={link.href} />
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
            aria-label="Open menu"
          >
            <span className="block w-5 h-[1.5px] bg-black" />
            <span className="block w-5 h-[1.5px] bg-black" />
            <span className="block w-3.5 h-[1.5px] bg-black" />
          </button>
        </div>
      </motion.nav>

      {/* ── Background wash — white top, gradual accent at bottom ── */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white via-[40%] to-[#f9eefb] pointer-events-none" />

        {/* Floating accent blob — only near bottom for subtle warmth */}
        <motion.div
          animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-[5%] right-[-8%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-15 pointer-events-none"
          style={{ backgroundColor: ACCENT }}
        />

        {/* Floating accent dots */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[12%] w-3 h-3 rounded-full pointer-events-none"
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
          className="absolute top-[60%] left-[8%] w-2 h-2 rounded-full pointer-events-none"
          style={{ backgroundColor: ACCENT, opacity: 0.3 }}
        />

        {/* ── Content ── */}
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-28">
            {/* ── LEFT COLUMN (sticky on desktop) ── */}
            <div className="w-full lg:w-2/5 lg:sticky lg:top-32 lg:self-start">
              {/* Profile Photo */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="group/photo relative"
              >
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

                {/* Decorative corner elements */}
                <div
                  className="absolute -top-6 -right-6 w-8 h-8 rounded-md border-2 rotate-[12deg] transition-all duration-500 group-hover/photo:rotate-0 group-hover/photo:scale-110"
                  style={{
                    borderColor: ACCENT,
                    backgroundColor: "rgba(234,176,255,0.1)",
                  }}
                />
                <div
                  className="absolute -bottom-5 -left-5 w-5 h-5 rounded-sm border-2 rotate-[-8deg] transition-all duration-500 group-hover/photo:rotate-0 group-hover/photo:scale-110"
                  style={{
                    borderColor: ACCENT,
                    backgroundColor: "rgba(234,176,255,0.1)",
                  }}
                />
                <div
                  className="absolute top-[30%] -right-8 w-3 h-3 rounded-full transition-all duration-500 group-hover/photo:scale-150"
                  style={{ backgroundColor: ACCENT, opacity: 0.5 }}
                />

                {/* Photo */}
                <motion.div
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="relative rounded-2xl overflow-hidden rotate-[-3deg] shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
                  style={{ aspectRatio: "3/4" }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="w-full h-full"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/about.jpg"
                      alt="Rashi"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  {/* Subtle accent overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#EAB0FF]/10 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </motion.div>

              {/* Fun Facts Grid */}
              <div className="grid grid-cols-3 gap-3 mt-10">
                {FUN_FACTS.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: 0.15 + i * 0.04,
                      ease: [0.25, 0.4, 0.25, 1],
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      borderColor: "rgba(234,176,255,0.6)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group/fact flex flex-col items-center text-center p-4 rounded-xl border border-[#EAB0FF]/15 bg-white/80 backdrop-blur-sm cursor-default transition-all duration-200 hover:shadow-[0_8px_24px_rgba(234,176,255,0.15)]"
                  >
                    <span className="text-2xl mb-2">{item.emoji}</span>
                    <span className="text-[11px] text-black/40 transition-opacity duration-200 group-hover/fact:text-black/60">
                      {item.fact}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── RIGHT COLUMN (scrollable) ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="w-full lg:w-3/5"
            >
              {/* Label */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[13px] font-semibold tracking-[0.2em] mb-4"
                style={{ fontFamily: FONT, color: ACCENT_TEXT }}
              >
                ABOUT ME
              </motion.p>

              {/* Header */}
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
                Hi, I&apos;m{" "}
                <span
                  className="italic"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    color: ACCENT_TEXT,
                  }}
                >
                  Rashi
                </span>
                .
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-[17px] leading-[1.7] text-black/40 mt-4"
                style={{ fontFamily: FONT }}
              >
                I move rectangles around professionally. Sometimes they even end
                up in the right place.
              </motion.p>

              {/* Bio Paragraphs */}
              <div className="space-y-6 mt-8">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-[17px] leading-[1.7] text-black/50"
                  style={{ fontFamily: FONT }}
                >
                  I&apos;m a product designer in NYC designing financial systems
                  at{" "}
                  <a
                    href="https://www.byaccrue.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium no-underline transition-colors duration-200 hover:opacity-80"
                    style={{ color: ACCENT_TEXT }}
                  >
                    Accrue
                  </a>
                  .
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  className="text-[17px] leading-[1.7] text-black/50"
                  style={{ fontFamily: FONT }}
                >
                  I turn messy constraints and complex logic into interfaces
                  people can use without thinking too hard.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-[17px] leading-[1.7] font-medium text-black"
                  style={{ fontFamily: FONT }}
                >
                  I design for real users, not ideal ones.
                </motion.p>
              </div>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="pt-12"
              >
                <h2
                  className="text-[28px] font-medium tracking-[-0.02em] text-black mb-6"
                  style={{ fontFamily: FONT }}
                >
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: i * 0.02,
                      }}
                      whileHover={{
                        scale: 1.05,
                        borderColor: "rgba(234,176,255,0.6)",
                        boxShadow:
                          "0 4px 12px rgba(234,176,255,0.15)",
                      }}
                      className="px-4 py-2 rounded-full text-sm font-medium border border-[#EAB0FF]/20 bg-white/80 text-black/70 cursor-default transition-all duration-200 hover:text-[#9b59b6]"
                      style={{ fontFamily: FONT }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Toolkit */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="pt-12"
              >
                <h2
                  className="text-[28px] font-medium tracking-[-0.02em] text-black mb-6"
                  style={{ fontFamily: FONT }}
                >
                  Toolkit
                </h2>
                <div className="space-y-6">
                  {TOOLKIT.map((group, gi) => (
                    <motion.div
                      key={group.category}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: gi * 0.1,
                      }}
                    >
                      <p
                        className="text-[13px] font-semibold uppercase tracking-[0.15em] mb-3"
                        style={{ fontFamily: FONT, color: ACCENT_TEXT }}
                      >
                        {group.category}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {group.tools.map((tool) => (
                          <motion.span
                            key={tool}
                            whileHover={{
                              scale: 1.05,
                              borderColor: "rgba(234,176,255,0.6)",
                              boxShadow:
                                "0 4px 12px rgba(234,176,255,0.15)",
                            }}
                            className="px-4 py-2 rounded-full text-sm font-medium border border-[#EAB0FF]/20 bg-white/80 text-black/70 cursor-default transition-all duration-200 hover:text-[#9b59b6]"
                            style={{ fontFamily: FONT }}
                          >
                            {tool}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* How I Think */}
              <HowIThinkSection />

              {/* Experience */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-16 pt-16 border-t border-[#EAB0FF]/15"
              >
                <h2
                  className="text-[28px] font-medium tracking-[-0.02em] text-black mb-8"
                  style={{ fontFamily: FONT }}
                >
                  Experience
                </h2>

                <div className="space-y-8">
                  {EXPERIENCE.map((exp, i) => (
                    <motion.div
                      key={exp.company}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: [0.25, 0.4, 0.25, 1],
                      }}
                      whileHover={{ x: 10 }}
                      className="group"
                    >
                      <div className="flex items-baseline justify-between mb-1">
                        <h3
                          className="text-[22px] font-medium text-black transition-colors duration-200 group-hover:text-[#9b59b6]"
                          style={{ fontFamily: FONT }}
                        >
                          {exp.company}
                        </h3>
                        <span
                          className="text-[15px] text-black/40 text-right flex-shrink-0 ml-4"
                          style={{ fontFamily: FONT }}
                        >
                          {exp.period}
                        </span>
                      </div>
                      <p
                        className="text-[16px] mb-0.5"
                        style={{ color: ACCENT_TEXT, fontFamily: FONT }}
                      >
                        {exp.role}
                      </p>
                      <p
                        className="text-[14px] text-black/40 mb-3"
                        style={{ fontFamily: FONT }}
                      >
                        {exp.location}
                      </p>
                      <p
                        className="text-[16px] leading-[1.7] text-black/50"
                        style={{ fontFamily: FONT }}
                      >
                        {exp.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Let's Connect */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mt-16 pt-16 border-t border-[#EAB0FF]/15"
              >
                <h2
                  className="text-[28px] font-medium tracking-[-0.02em] text-black mb-6"
                  style={{ fontFamily: FONT }}
                >
                  Let&apos;s Connect
                </h2>
                <p
                  className="text-[17px] text-black/50 mb-8"
                  style={{ fontFamily: FONT }}
                >
                  Currently open to new opportunities. Let&apos;s build
                  something great together.
                </p>
                <motion.a
                  href="mailto:hello@rashi.design"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(234,176,255,0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                  className="inline-flex items-center rounded-[40px] px-8 py-4 text-[15px] font-semibold text-black no-underline cursor-pointer"
                  style={{
                    fontFamily: FONT,
                    backgroundColor: ACCENT,
                    boxShadow: "0 0 20px rgba(234,176,255,0.3)",
                  }}
                >
                  Say Hello
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>


      {/* ── Photo Gallery ── */}
      <PhotoGallery />
      {/* ── Footer ── */}
      <footer className="relative bg-gradient-to-b from-[#f9eefb] to-[#f3e4f7] pt-16 pb-12 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/60 to-transparent" />

        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="w-full h-px bg-[#9b59b6]/15 mb-12" />

          {/* Contact CTA */}
          <div className="mb-10 text-center" style={{ fontFamily: FONT }}>
            <span className="text-[15px] text-black/30">Say hi</span>
            <span className="text-[15px] text-black/20 mx-2">→</span>
            <a
              href="mailto:hello@rashi.design"
              className="text-[15px] font-medium text-[#9b59b6] hover:opacity-70 transition-opacity no-underline"
            >
              hello@rashi.design
            </a>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-6 lg:gap-8 text-center lg:text-left">
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
              className="flex flex-wrap items-center justify-center gap-4 lg:gap-8"
              style={{ fontFamily: FONT }}
            >
              {[
                { label: "CASE STUDIES", href: "/#case-studies" },
                { label: "PLAYGROUND", href: "/playground" },
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
              className="flex flex-col items-center gap-1 text-center lg:items-end lg:text-right"
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu onClose={() => setMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}

/* ─── Scroll-to-top FAB (bottom-left) ─── */

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