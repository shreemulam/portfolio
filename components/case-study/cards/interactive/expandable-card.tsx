"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ACCENT, ACCENT_TEXT, FONT } from "@/lib/constants";

interface ExpandableCardProps {
  label?: string;
  description?: string;
}

const EXPANDABLE_ITEMS = [
  {
    title: "How it works",
    detail:
      "When your wallet balance can't cover the full purchase, the remaining amount is automatically charged to your backup payment method. No failed transactions, no checkout interruptions.",
  },
  {
    title: "You're always in control",
    detail:
      "You choose which card to use as backup. You can change it anytime. We'll always show you a split breakdown before confirming.",
  },
  {
    title: "No hidden charges",
    detail:
      "The backup payment only triggers when your wallet balance is insufficient. You'll see the exact split amount before completing checkout.",
  },
];

export default function ExpandableCard({ label }: ExpandableCardProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#f5edf8] via-[#ede0f3] to-[#e8d5f0] p-4 lg:p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: ACCENT }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 2V10M6 2L3 5M6 2L9 5"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p
          className="text-[13px] font-semibold text-black/60"
          style={{ fontFamily: FONT }}
        >
          Safety Net — Tap to explore
        </p>
      </div>

      {/* Expandable items */}
      <div className="flex flex-col gap-2">
        {EXPANDABLE_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.button
              key={i}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              whileTap={{ scale: 0.98 }}
              className="text-left w-full p-3 rounded-xl bg-white/70 backdrop-blur-sm border transition-all duration-200 cursor-pointer"
              style={{
                borderColor: isOpen
                  ? "rgba(234,176,255,0.5)"
                  : "rgba(234,176,255,0.15)",
                boxShadow: isOpen
                  ? "0 0 12px rgba(234,176,255,0.15)"
                  : "0 1px 4px rgba(0,0,0,0.03)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[14px] font-medium text-black"
                  style={{ fontFamily: FONT }}
                >
                  {item.title}
                </span>
                <motion.svg
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="flex-shrink-0 ml-2"
                >
                  <path
                    d="M3 5L7 9L11 5"
                    stroke="rgba(0,0,0,0.25)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p
                      className="text-[13px] text-black/50 mt-2 leading-[1.6]"
                      style={{ fontFamily: FONT }}
                    >
                      {item.detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Label */}
      {label && (
        <p
          className="text-[10px] text-black/25 text-center mt-3"
          style={{ fontFamily: FONT }}
        >
          {label}
        </p>
      )}
    </div>
  );
}