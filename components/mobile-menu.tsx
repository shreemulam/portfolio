"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { FONT } from "@/lib/constants";

const menuLinks = [
  { label: "Case Studies", href: "/#case-studies" },
  { label: "Playground", href: "/playground" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] bg-white flex flex-col"
      style={{ fontFamily: FONT }}
    >
      <div className="flex justify-end px-6 py-6">
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center"
          aria-label="Close menu"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M1 1L17 17M17 1L1 17"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {menuLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            onClick={onClose}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
            className="text-[28px] font-medium text-black tracking-[-0.01em] hover:text-[#9b59b6] transition-colors"
          >
            {link.label}
          </motion.a>
        ))}
      </div>

      <div className="pb-12 flex justify-center">
        <a
          href="mailto:hello@rashi.design"
          className="text-[15px] font-medium text-[#9b59b6] hover:opacity-70 transition-opacity"
        >
          hello@rashi.design
        </a>
      </div>
    </motion.div>
  );
}