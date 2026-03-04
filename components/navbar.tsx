"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ACCENT, FONT, SERIF, fadeSlideUp, NAV_LINKS } from "@/lib/constants";
import MobileMenu from "./mobile-menu";

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
        className="absolute inset-0 block text-[15px] font-semibold tracking-[0.08em] transition-transform duration-300 ease-out [transform:rotateX(-90deg)] group-hover:[transform:rotateX(0deg)]"
        style={{ transformOrigin: "top center", color: "#000" }}
      >
        {label}
      </span>
    </a>
  );
}

export { FlipNavLink };

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const estTime = useESTTime();

  return (
    <>
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
              <span
                className="font-medium italic text-black text-[15px]"
                style={{ fontFamily: SERIF }}
              >
                Rashi
              </span>
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

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu onClose={() => setMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}