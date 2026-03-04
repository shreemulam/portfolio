"use client";

import { motion } from "motion/react";
import { FONT } from "@/lib/constants";

interface ContextBlockProps {
  text: string;
}

export default function ContextBlock({ text }: ContextBlockProps) {
  return (
    <section className="py-8 lg:py-12">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
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
      </div>
    </section>
  );
}