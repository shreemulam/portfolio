"use client";

import { motion } from "motion/react";
import { ACCENT_TEXT, FONT } from "@/lib/constants";

interface ContextBlockProps {
  text: string;
  challenge?: string;
  goals?: string[];
}

export default function ContextBlock({
  text,
  challenge,
  goals,
}: ContextBlockProps) {
  return (
    <section className="py-8 lg:py-12">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Main context */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-[20px] lg:text-[24px] leading-[1.6] text-black/70 max-w-[900px]"
          style={{ fontFamily: FONT }}
        >
          {text}
        </motion.p>

        {/* Challenge callout */}
        {challenge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 pl-5 border-l-[3px]"
            style={{ borderColor: ACCENT_TEXT }}
          >
            <p
              className="text-[11px] font-semibold tracking-[0.2em] mb-2"
              style={{ color: ACCENT_TEXT, fontFamily: FONT }}
            >
              THE CHALLENGE
            </p>
            <p
              className="text-[16px] lg:text-[18px] leading-[1.7] text-black/60 max-w-[800px]"
              style={{ fontFamily: FONT }}
            >
              {challenge}
            </p>
          </motion.div>
        )}

        {/* Goals */}
        {goals && goals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8"
          >
            <p
              className="text-[11px] font-semibold tracking-[0.2em] mb-4"
              style={{ color: ACCENT_TEXT, fontFamily: FONT }}
            >
              PROJECT GOALS
            </p>
            <ul className="flex flex-col gap-2.5">
              {goals.map((goal, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[15px] lg:text-[16px] text-black/60 leading-relaxed"
                  style={{ fontFamily: FONT }}
                >
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                    style={{
                      backgroundColor: `${ACCENT_TEXT}15`,
                      color: ACCENT_TEXT,
                    }}
                  >
                    {i + 1}
                  </span>
                  {goal}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  );
}