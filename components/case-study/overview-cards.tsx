"use client";

import { motion } from "motion/react";
import { FONT } from "@/lib/constants";
import type { OverviewCard } from "@/lib/case-studies/types";

// Each card has a unique squircle shape — one corner is more rounded than others
const CARD_SHAPES = [
  "60% 10% 10% 10% / 60% 10% 10% 10%", // top-left emphasis
  "10% 60% 10% 10% / 10% 60% 10% 10%", // top-right emphasis
  "10% 10% 10% 60% / 10% 10% 10% 60%", // bottom-left emphasis
  "10% 10% 60% 10% / 10% 10% 60% 10%", // bottom-right emphasis
];

interface OverviewCardsProps {
  cards: OverviewCard[];
}

export default function OverviewCards({ cards }: OverviewCardsProps) {
  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative bg-[#3a3a3a] text-white p-6 lg:p-7 min-h-[160px] flex items-center justify-center text-center overflow-hidden"
              style={{
                borderRadius: CARD_SHAPES[i % CARD_SHAPES.length],
                fontFamily: FONT,
              }}
            >
              <div>
                <p className="text-[14px] text-white/50 mb-1">{card.label}</p>
                <p className="text-[17px] font-semibold leading-snug text-white">
                  {card.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}