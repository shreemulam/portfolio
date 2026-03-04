"use client";

import { motion } from "motion/react";
import { ACCENT, FONT, SERIF } from "@/lib/constants";
import type { KeyInsight as KeyInsightType } from "@/lib/case-studies/types";

interface KeyInsightProps {
  insight: KeyInsightType;
}

export default function KeyInsightCallout({ insight }: KeyInsightProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="rounded-2xl bg-[#faf5fc] p-8 lg:p-14"
          style={{ borderLeft: `4px solid ${ACCENT}` }}
        >
          {insight.icon && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="block text-[40px] mb-6"
            >
              {insight.icon}
            </motion.span>
          )}

          <p
            className="text-[24px] lg:text-[36px] leading-[1.35] tracking-[-0.02em] text-black/80 italic"
            style={{ fontFamily: SERIF }}
          >
            {insight.text}
          </p>
        </motion.div>
      </div>
    </section>
  );
}