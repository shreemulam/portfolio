"use client";

import { motion } from "motion/react";
import { ACCENT, ACCENT_TEXT, FONT, SERIF } from "@/lib/constants";
import type { ImpactMetric } from "@/lib/case-studies/types";

interface ImpactSectionProps {
  metrics: ImpactMetric[];
  summary?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export default function ImpactSection({
  metrics,
  summary,
  testimonial,
}: ImpactSectionProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-semibold tracking-[0.2em] mb-10"
          style={{ color: ACCENT_TEXT, fontFamily: FONT }}
        >
          THE IMPACT
        </motion.p>

        {/* Metric cards */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            metrics.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          } gap-5 lg:gap-6`}
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="rounded-2xl bg-[#faf5fc] p-6 lg:p-7"
            >
              <p
                className="text-[32px] lg:text-[36px] font-semibold tracking-[-0.03em] text-black leading-none mb-2"
                style={{ fontFamily: FONT }}
              >
                {metric.value}
              </p>
              <p
                className="text-[14px] font-semibold text-black/60 mb-1"
                style={{ fontFamily: FONT }}
              >
                {metric.label}
              </p>
              {metric.description && (
                <p
                  className="text-[13px] text-black/40 leading-relaxed"
                  style={{ fontFamily: FONT }}
                >
                  {metric.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        {summary && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[17px] lg:text-[19px] leading-[1.7] text-black/50 max-w-[800px] mt-10"
            style={{ fontFamily: FONT }}
          >
            {summary}
          </motion.p>
        )}

        {/* Testimonial */}
        {testimonial && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 pt-10 border-t border-black/[0.06]"
          >
            <p
              className="text-[22px] lg:text-[26px] leading-[1.5] text-black/70 max-w-[700px] italic"
              style={{ fontFamily: SERIF }}
            >
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-black"
                style={{ backgroundColor: ACCENT }}
              >
                {testimonial.author[0]}
              </div>
              <div>
                <p
                  className="text-[14px] font-medium text-black/70"
                  style={{ fontFamily: FONT }}
                >
                  {testimonial.author}
                </p>
                <p
                  className="text-[12px] text-black/40"
                  style={{ fontFamily: FONT }}
                >
                  {testimonial.role}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}