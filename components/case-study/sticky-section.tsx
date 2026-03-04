"use client";

import { motion } from "motion/react";
import { ACCENT_TEXT, FONT } from "@/lib/constants";
import type { CaseStudySection } from "@/lib/case-studies/types";
import NumberedCard from "./cards/numbered-card";
import CompetitorCard from "./cards/competitor-card";
import PersonaCard from "./cards/persona-card";

interface StickySectionProps {
  section: CaseStudySection;
  index: number;
  isAlternate?: boolean;
}

function renderCards(section: CaseStudySection) {
  switch (section.type) {
    case "features":
    case "heuristic":
    case "solution":
    case "generic":
      return section.cards.map((card, i) => (
        <NumberedCard key={i} card={card} index={i} />
      ));
    case "competitors":
      return section.cards.map((card, i) => (
        <CompetitorCard key={i} card={card} index={i} />
      ));
    case "personas":
      return section.cards.map((card, i) => (
        <PersonaCard key={i} card={card} index={i} />
      ));
    default:
      return null;
  }
}

export default function StickySection({
  section,
  index,
  isAlternate = false,
}: StickySectionProps) {
  return (
    <section
      id={section.id}
      className={`relative py-16 lg:py-24 ${
        isAlternate ? "bg-[#FAFAFA]" : "bg-white"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left column — sticky */}
          <div className="w-full lg:w-2/5 lg:sticky lg:top-32 lg:self-start">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[13px] font-semibold tracking-[0.2em] mb-4"
              style={{ fontFamily: FONT, color: ACCENT_TEXT }}
            >
              {section.stickyLabel}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="text-[28px] lg:text-[36px] font-medium tracking-[-0.02em] text-black leading-[1.15]"
              style={{ fontFamily: FONT }}
            >
              {section.stickyTitle}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[16px] leading-relaxed text-black/50 mt-4"
              style={{ fontFamily: FONT }}
            >
              {section.stickyDescription}
            </motion.p>
          </div>

          {/* Right column — scrollable cards */}
          <div className="w-full lg:w-3/5 flex flex-col gap-6">
            {renderCards(section)}
          </div>
        </div>
      </div>
    </section>
  );
}