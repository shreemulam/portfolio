"use client";

import { motion } from "motion/react";
import { ACCENT_TEXT, FONT } from "@/lib/constants";

interface ClientBlockProps {
  clientName: string;
  clientDescription: string;
}

export default function ClientBlock({
  clientName,
  clientDescription,
}: ClientBlockProps) {
  return (
    <section className="py-10 lg:py-14">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="rounded-2xl bg-[#faf5fc] p-8 lg:p-12"
        >
          <p
            className="text-[11px] font-semibold tracking-[0.2em] mb-4"
            style={{ color: ACCENT_TEXT, fontFamily: FONT }}
          >
            THE CLIENT
          </p>
          <p
            className="text-[28px] lg:text-[36px] font-medium tracking-[-0.02em] text-black leading-tight mb-4"
            style={{ fontFamily: FONT }}
          >
            {clientName}
          </p>
          <p
            className="text-[16px] lg:text-[18px] leading-[1.7] text-black/55 max-w-[720px]"
            style={{ fontFamily: FONT }}
          >
            {clientDescription}
          </p>
        </motion.div>
      </div>
    </section>
  );
}