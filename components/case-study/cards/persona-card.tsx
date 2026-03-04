"use client";

import { motion } from "motion/react";
import { ACCENT, ACCENT_TEXT, FONT, SERIF } from "@/lib/constants";
import type { PersonaCard as PersonaCardType } from "@/lib/case-studies/types";

interface PersonaCardProps {
  card: PersonaCardType;
  index: number;
}

export default function PersonaCard({ card, index }: PersonaCardProps) {
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
      {/* Header: Meet [Name], a [tagline] */}
      <p
        className="text-[14px] text-black/40 mb-1"
        style={{ fontFamily: FONT }}
      >
        Meet
      </p>
      <h3 className="mb-4">
        <span
          className="text-[28px] font-medium text-black"
          style={{ fontFamily: FONT }}
        >
          {card.name}
        </span>
        <span
          className="text-[20px] text-black/40 ml-1"
          style={{ fontFamily: FONT }}
        >
          , {card.tagline}
        </span>
      </h3>

      {/* Photo placeholder + Quote */}
      <div className="flex flex-col sm:flex-row gap-5 mb-5">
        {/* Photo placeholder */}
        <div className="flex-shrink-0 w-[100px] h-[100px] rounded-2xl bg-gradient-to-br from-[#f0e4f6] to-[#e8d5f0] overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/40" />
          </div>
        </div>

        {/* Quote */}
        <div className="flex-1">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="mb-2 text-black/15"
          >
            <path
              d="M3 21C3 21 5 17 5 14C5 11 3 10 3 10C3 10 6 10 8 8C10 6 10 3 10 3M14 21C14 21 16 17 16 14C16 11 14 10 14 10C14 10 17 10 19 8C21 6 21 3 21 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <p
            className="text-[16px] leading-[1.6] text-black/60 italic"
            style={{ fontFamily: SERIF }}
          >
            &ldquo;{card.quote}&rdquo;
          </p>
        </div>
      </div>

      {/* Key tasks */}
      <div>
        <p
          className="text-[13px] font-semibold text-black/40 mb-3"
          style={{ fontFamily: FONT }}
        >
          Key tasks:
        </p>
        <div className="flex flex-wrap gap-2">
          {card.tasks.map((task) => (
            <span
              key={task}
              className="text-[13px] font-medium border border-black/10 rounded-full px-3.5 py-1.5 text-black/50"
              style={{ fontFamily: FONT }}
            >
              {task}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}