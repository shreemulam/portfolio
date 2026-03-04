"use client";

import { motion } from "motion/react";
import { ACCENT, ACCENT_TEXT, FONT } from "@/lib/constants";
import type { ProcessStep } from "@/lib/case-studies/types";

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-semibold tracking-[0.2em] mb-12 lg:mb-16"
          style={{ color: ACCENT_TEXT, fontFamily: FONT }}
        >
          THE PROCESS
        </motion.p>

        {/* Desktop: horizontal */}
        <div className="hidden lg:block relative">
          {/* Connector line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            className="absolute top-6 left-6 right-6 h-[2px] bg-black/[0.08]"
            style={{ transformOrigin: "left" }}
          />

          <div className="flex justify-between">
            {steps.map((step, i) => (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.15,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="flex flex-col items-center text-center"
                style={{ width: `${100 / steps.length}%` }}
              >
                {/* Node circle */}
                <div
                  className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-semibold text-black mb-4"
                  style={{ backgroundColor: ACCENT, fontFamily: FONT }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Phase name */}
                <p
                  className="text-[15px] font-semibold text-black mb-1.5"
                  style={{ fontFamily: FONT }}
                >
                  {step.phase}
                </p>

                {/* Duration pill */}
                <span
                  className="inline-block text-[12px] font-medium px-3 py-1 rounded-full bg-[#faf5fc] mb-3"
                  style={{ color: ACCENT_TEXT, fontFamily: FONT }}
                >
                  {step.duration}
                </span>

                {/* Description */}
                <p
                  className="text-[13px] leading-relaxed text-black/45 max-w-[180px]"
                  style={{ fontFamily: FONT }}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden relative pl-8">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-black/[0.08]"
            style={{ transformOrigin: "top" }}
          />

          <div className="flex flex-col gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="relative"
              >
                {/* Node circle */}
                <div
                  className="absolute -left-8 top-0 z-10 w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold text-black"
                  style={{ backgroundColor: ACCENT, fontFamily: FONT }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="ml-4">
                  <div className="flex items-center gap-3 mb-1.5">
                    <p
                      className="text-[15px] font-semibold text-black"
                      style={{ fontFamily: FONT }}
                    >
                      {step.phase}
                    </p>
                    <span
                      className="text-[12px] font-medium px-2.5 py-0.5 rounded-full bg-[#faf5fc]"
                      style={{ color: ACCENT_TEXT, fontFamily: FONT }}
                    >
                      {step.duration}
                    </span>
                  </div>
                  <p
                    className="text-[14px] leading-relaxed text-black/45"
                    style={{ fontFamily: FONT }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}