"use client";

import { useState, useEffect } from "react";
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
  { label: "CASE STUDIES", href: "#" },
  { label: "PLAYGROUND", href: "#" },
  { label: "ABOUT", href: "#" },
  { label: "RESUME", href: "#" },
  { label: "LINKEDIN", href: "#" },
];

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
        className="absolute inset-0 block text-[15px] font-semibold tracking-[0.08em] transition-transform duration-300 ease-out [transform:rotateX(-90deg)]  group-hover:[transform:rotateX(0deg)]"
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
      {/* Glow layer */}
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

export default function HeroPage() {
  const estTime = useESTTime();

  return (
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
        {/* Left: Name + status */}
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

        {/* Right: Nav links */}
        <div className="flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <FlipNavLink key={link.label} label={link.label} href={link.href} />
          ))}
        </div>
      </motion.nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center pt-[290px] pb-24 px-6 max-w-[1200px] mx-auto gap-8">
        {/* Label */}
        <motion.p
          custom={1}
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          className="text-[13px] font-semibold tracking-[0.2em] text-[#373a46]/50"
          style={{ fontFamily: "'Geist', sans-serif" }}
        >
          PRODUCT & VISUAL DESIGNER
        </motion.p>

        {/* Main Heading */}
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

        {/* Current role */}
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

        {/* Reel prompt */}
        <motion.p
          custom={4}
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          className="text-[16px] text-[#373a46]/50 mt-6"
          style={{ fontFamily: "'Geist', sans-serif" }}
        >
          Short on time? Here&apos;s my work in 120 seconds.
        </motion.p>

        {/* Watch now CTA */}
        <motion.button
          custom={5}
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(234,176,255,0.4), inset -4px -6px 25px 0px rgba(201,201,201,0.08), inset 4px 4px 10px 0px rgba(29,29,29,0.24)" }}
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
      </div>
    </section>
  );
}