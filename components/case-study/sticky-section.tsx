"use client";

import { motion } from "motion/react";
import { ACCENT_TEXT, FONT } from "@/lib/constants";
import type { CaseStudySection } from "@/lib/case-studies/types";
import NumberedCard from "./cards/numbered-card";
import CompetitorCard from "./cards/competitor-card";
import PersonaCard from "./cards/persona-card";
import GalleryGrid from "./cards/gallery-grid";

interface StickySectionProps {
  section: CaseStudySection;
  index: number;
  isAlternate?: boolean;
}

function getLayout(section: CaseStudySection): "full-width" | "sticky" {
  if (section.layout) return section.layout;
  // Default: visual-heavy sections get full-width
  if (section.type === "features" || section.type === "solution" || section.type === "gallery") return "full-width";
  return "sticky";
}

function renderCards(section: CaseStudySection, isFullWidth: boolean) {
  switch (section.type) {
    case "features":
    case "heuristic":
    case "solution":
    case "generic":
      return section.cards.map((card, i) => (
        <NumberedCard key={i} card={card} index={i} fullWidth={isFullWidth} />
      ));
    case "competitors":
      return section.cards.map((card, i) => (
        <CompetitorCard key={i} card={card} index={i} />
      ));
    case "personas":
      return section.cards.map((card, i) => (
        <PersonaCard key={i} card={card} index={i} />
      ));
    case "gallery":
      return (
        <GalleryGrid items={section.items} columns={section.columns} />
      );
    default:
      return null;
  }
}

function SectionHeader({ section }: { section: CaseStudySection }) {
  return (
    <>
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
    </>
  );
}

export default function StickySection({
  section,
  index,
  isAlternate = false,
}: StickySectionProps) {
  const layout = getLayout(section);
  const isFullWidth = layout === "full-width";

  return (
    <section
      id={section.id}
      className={`relative py-16 lg:py-24 ${
        isAlternate ? "bg-[#FAFAFA]" : "bg-white"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {isFullWidth ? (
          /* Full-width layout: header on top, cards below at full width */
          <div>
            <div className="max-w-[800px] mb-12 lg:mb-16">
              <SectionHeader section={section} />
            </div>
            <div className="flex flex-col gap-8">
              {renderCards(section, true)}
            </div>
          </div>
        ) : (
          /* Sticky-split layout: left sticky text, right scrollable cards */
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="w-full lg:w-2/5 lg:sticky lg:top-32 lg:self-start">
              <SectionHeader section={section} />
            </div>
            <div className="w-full lg:w-3/5 flex flex-col gap-6">
              {renderCards(section, false)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}