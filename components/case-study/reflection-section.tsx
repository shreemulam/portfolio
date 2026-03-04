"use client";

import { motion } from "motion/react";
import { ACCENT, ACCENT_TEXT, FONT, SERIF } from "@/lib/constants";
import type { Reflection } from "@/lib/case-studies/types";

interface ReflectionSectionProps {
  reflection: Reflection;
}

export default function ReflectionSection({
  reflection,
}: ReflectionSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-semibold tracking-[0.2em] mb-10"
          style={{ color: ACCENT_TEXT, fontFamily: FONT }}
        >
          LOOKING BACK
        </motion.p>

        {/* Reflection items */}
        <div className="max-w-[800px] flex flex-col gap-10 mb-14">
          {reflection.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="flex items-start gap-5"
            >
              {/* Number badge */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-semibold text-black"
                style={{ backgroundColor: ACCENT, fontFamily: FONT }}
              >
                {i + 1}
              </div>

              <div>
                <h3
                  className="text-[18px] font-medium text-black mb-2"
                  style={{ fontFamily: FONT }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[15px] leading-relaxed text-black/50"
                  style={{ fontFamily: FONT }}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* What I'd do differently */}
        {reflection.doOver && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="max-w-[800px] rounded-xl bg-[#FAFAFA] p-6 lg:p-8 mb-10"
            style={{ borderLeft: "4px solid rgba(0,0,0,0.12)" }}
          >
            <p
              className="text-[11px] font-semibold tracking-[0.2em] text-black/35 mb-4"
              style={{ fontFamily: FONT }}
            >
              WHAT I&apos;D DO DIFFERENTLY
            </p>
            <p
              className="text-[18px] lg:text-[22px] leading-[1.5] text-black/60 italic"
              style={{ fontFamily: SERIF }}
            >
              {reflection.doOver}
            </p>
          </motion.div>
        )}

        {/* Next steps */}
        {reflection.nextSteps && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="max-w-[800px]"
          >
            <p
              className="text-[11px] font-semibold tracking-[0.2em] mb-3"
              style={{ color: ACCENT_TEXT, fontFamily: FONT }}
            >
              LOOKING AHEAD
            </p>
            <div className="flex items-start gap-3">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="flex-shrink-0 mt-0.5"
              >
                <path
                  d="M3 9H15M15 9L10 4M15 9L10 14"
                  stroke={ACCENT_TEXT}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p
                className="text-[16px] leading-relaxed text-black/50"
                style={{ fontFamily: FONT }}
              >
                {reflection.nextSteps}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}