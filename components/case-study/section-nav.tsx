"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { ACCENT, FONT } from "@/lib/constants";
import type { CaseStudySection } from "@/lib/case-studies/types";

interface SectionNavProps {
  sections: CaseStudySection[];
}

export default function SectionNav({ sections }: SectionNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show nav after scrolling past hero
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionElements = sections.map((s) =>
      document.getElementById(s.id)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionElements.findIndex(
              (el) => el === entry.target
            );
            if (idx >= 0) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = useCallback(
    (index: number) => {
      const el = document.getElementById(sections[index].id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [sections]
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      {sections.map((section, i) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(i)}
          className="group relative flex items-center cursor-pointer bg-transparent border-none p-0"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold transition-all duration-300 ${
              activeIndex === i
                ? "text-black shadow-[0_0_16px_rgba(234,176,255,0.3)]"
                : "bg-black/[0.04] text-black/30 border border-black/10 hover:border-[#EAB0FF]/40 hover:text-black/50"
            }`}
            style={{
              fontFamily: FONT,
              backgroundColor: activeIndex === i ? ACCENT : undefined,
            }}
          >
            {i + 1}
          </div>

          {/* Tooltip */}
          <div className="absolute left-12 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-x-1 group-hover:translate-x-0">
            <div
              className="bg-black/80 backdrop-blur-md text-white text-[12px] px-3 py-1.5 rounded-lg whitespace-nowrap"
              style={{ fontFamily: FONT }}
            >
              {section.stickyLabel}
            </div>
          </div>
        </button>
      ))}
    </motion.div>
  );
}