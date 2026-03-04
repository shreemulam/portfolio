"use client";

import { motion } from "motion/react";
import { ACCENT, ACCENT_TEXT, FONT, SERIF, fadeSlideUp } from "@/lib/constants";
import type { OverviewCard } from "@/lib/case-studies/types";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  client: string;
  year: string;
  tags: string[];
  heroGradient: string;
  heroColor: string;
  firstSectionId?: string;
}

export default function HeroSection({
  title,
  subtitle,
  client,
  year,
  tags,
  heroGradient,
  heroColor,
  firstSectionId,
}: HeroSectionProps) {
  return (
    <section className="relative pt-8 pb-0 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[12px] font-medium tracking-wide text-black/40 border border-black/10 rounded-full px-3.5 py-1.5"
              style={{ fontFamily: FONT }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="text-[42px] lg:text-[64px] font-medium tracking-[-0.03em] text-black leading-[1.08] max-w-[800px]"
          style={{ fontFamily: FONT }}
        >
          {title}
        </motion.h1>

        {/* Client + Year */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-[15px] font-medium tracking-wide mt-4"
          style={{ fontFamily: FONT, color: ACCENT_TEXT }}
        >
          {client} &bull; {year}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-[17px] leading-relaxed text-black/50 max-w-[640px] mt-4"
          style={{ fontFamily: FONT }}
        >
          {subtitle}
        </motion.p>

        {/* Jump to solution */}
        {firstSectionId && (
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            href={`#${firstSectionId}`}
            whileHover={{
              scale: 1.03,
              borderColor: heroColor,
              boxShadow: `0 0 20px ${heroColor}40`,
            }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full border border-black/15 text-[14px] font-semibold text-black no-underline transition-colors duration-200"
            style={{ fontFamily: FONT }}
          >
            Jump to solution
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 2V12M7 12L3 8M7 12L11 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        )}
      </div>

      {/* Hero gradient band with phone mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="relative mt-16"
      >
        {/* Gradient band */}
        <div
          className={`w-full h-[320px] lg:h-[400px] bg-gradient-to-r ${heroGradient}`}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Phone mockup placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative w-[240px] lg:w-[280px] rounded-[36px] border-[6px] border-black bg-white overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
            style={{ aspectRatio: "9/19" }}
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-b-2xl z-10" />

            {/* Placeholder content */}
            <div
              className={`w-full h-full bg-gradient-to-b ${heroGradient} flex flex-col items-center justify-center gap-3 pt-8`}
            >
              <div className="w-16 h-16 rounded-2xl bg-white/30 backdrop-blur-sm" />
              <div className="w-24 h-3 rounded-full bg-white/30" />
              <div className="w-32 h-3 rounded-full bg-white/20" />
              <div className="mt-4 w-28 h-8 rounded-full bg-white/40" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}