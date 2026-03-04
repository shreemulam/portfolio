"use client";

import { motion } from "motion/react";
import { ACCENT, ACCENT_TEXT, FONT } from "@/lib/constants";
import type { CompetitorCard as CompetitorCardType } from "@/lib/case-studies/types";

interface CompetitorCardProps {
  card: CompetitorCardType;
  index: number;
}

export default function CompetitorCard({ card, index }: CompetitorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      whileHover={{
        y: -2,
        boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
      }}
      className="rounded-2xl bg-[#FAFAFA] border border-black/[0.08] p-6 lg:p-8 transition-shadow duration-300"
    >
      {/* Number + Name */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="inline-flex items-center justify-center w-10 h-10 rounded-full text-[14px] font-semibold text-black"
          style={{ backgroundColor: ACCENT, fontFamily: FONT }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <h3
          className="text-[22px] font-medium text-black"
          style={{ fontFamily: FONT }}
        >
          {card.name}
        </h3>
      </div>

      {/* Image placeholder */}
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br from-[#f0f0f0] via-[#eaeaea] to-[#e5e5e5] mb-4">
        {/* Wireframe grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-4">
            <div className="w-[120px] h-[180px] rounded-lg bg-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" />
            <div className="w-[120px] h-[180px] rounded-lg bg-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" />
          </div>
        </div>
        {card.imagePlaceholder && (
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-[11px] text-black/30 text-center" style={{ fontFamily: FONT }}>
              {card.imagePlaceholder}
            </p>
          </div>
        )}
      </div>

      {/* Description */}
      <p
        className="text-[15px] leading-relaxed text-black/50 mb-4"
        style={{ fontFamily: FONT }}
      >
        {card.description}
      </p>

      {/* Highlights */}
      <div className="flex flex-wrap gap-2">
        {card.highlights.map((highlight) => (
          <span
            key={highlight}
            className="text-[12px] font-medium tracking-wide border border-[#EAB0FF]/25 rounded-full px-3 py-1.5 text-black/50"
            style={{ fontFamily: FONT }}
          >
            {highlight}
          </span>
        ))}
      </div>
    </motion.div>
  );
}