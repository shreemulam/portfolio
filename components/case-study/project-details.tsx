"use client";

import { motion } from "motion/react";
import { FONT } from "@/lib/constants";
import type { OverviewCard } from "@/lib/case-studies/types";

interface ProjectDetailsProps {
  cards: OverviewCard[];
}

export default function ProjectDetails({ cards }: ProjectDetailsProps) {
  return (
    <section className="py-10 lg:py-14">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="border border-black/[0.06] rounded-2xl overflow-hidden"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className={`p-5 lg:p-6 ${
                  i < cards.length - 1
                    ? "border-b lg:border-b-0 lg:border-r border-black/[0.06]"
                    : ""
                } ${i === 1 ? "border-l lg:border-l-0 border-black/[0.06]" : ""}
                  ${i === 3 ? "border-l lg:border-l-0 border-black/[0.06]" : ""}`}
                style={{ fontFamily: FONT }}
              >
                <p className="text-[11px] font-semibold tracking-[0.15em] text-black/35 uppercase mb-2">
                  {card.label}
                </p>
                <p className="text-[15px] lg:text-[16px] font-medium leading-snug text-black/80">
                  {card.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}