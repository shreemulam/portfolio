"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ACCENT, FONT } from "@/lib/constants";

interface ImageCarouselProps {
  label?: string;
}

const SLIDES = [
  {
    title: "Select payment method",
    elements: (
      <>
        <div className="w-full h-3 rounded-full bg-black/[0.06] mb-2" />
        <div className="w-2/3 h-3 rounded-full bg-black/[0.04] mb-4" />
        <div className="w-full h-14 rounded-xl border border-[#EAB0FF]/30 bg-white/60 flex items-center px-3 gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#EAB0FF]/20" />
          <div className="flex-1">
            <div className="w-20 h-2 rounded-full bg-black/[0.08]" />
          </div>
          <div className="w-5 h-5 rounded-full bg-[#EAB0FF]/30" />
        </div>
        <div className="w-full h-14 rounded-xl border border-black/[0.06] bg-white/40 flex items-center px-3 gap-2">
          <div className="w-8 h-8 rounded-lg bg-black/[0.04]" />
          <div className="flex-1">
            <div className="w-16 h-2 rounded-full bg-black/[0.06]" />
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Confirm amount",
    elements: (
      <>
        <div className="text-center mb-4">
          <div className="w-20 h-8 rounded-full bg-[#EAB0FF]/20 mx-auto mb-2" />
          <div className="w-32 h-3 rounded-full bg-black/[0.06] mx-auto" />
        </div>
        <div className="w-full h-[2px] bg-black/[0.04] my-3" />
        <div className="flex justify-between mb-2">
          <div className="w-16 h-2 rounded-full bg-black/[0.05]" />
          <div className="w-12 h-2 rounded-full bg-black/[0.08]" />
        </div>
        <div className="flex justify-between">
          <div className="w-12 h-2 rounded-full bg-black/[0.05]" />
          <div className="w-16 h-2 rounded-full bg-black/[0.08]" />
        </div>
      </>
    ),
  },
  {
    title: "Success!",
    elements: (
      <>
        <div className="flex flex-col items-center gap-3">
          <motion.div
            animate={{ scale: [0.9, 1.1, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ backgroundColor: ACCENT }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13L9 17L19 7"
                stroke="black"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
          <div className="w-24 h-3 rounded-full bg-black/[0.08]" />
          <div className="w-32 h-2 rounded-full bg-black/[0.04]" />
          <div className="w-28 h-8 rounded-full bg-[#EAB0FF]/30 mt-2" />
        </div>
      </>
    ),
  },
];

export default function ImageCarousel({ label }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + SLIDES.length) % SLIDES.length);
    },
    []
  );

  return (
    <div className="w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#f5edf8] via-[#ede0f3] to-[#e8d5f0]">
      {/* Slide content */}
      <div className="relative min-h-[220px] p-5">
        {/* Step label */}
        <p
          className="text-[11px] font-semibold tracking-wide text-black/30 mb-3"
          style={{ fontFamily: FONT }}
        >
          STEP {current + 1} OF {SLIDES.length}
        </p>
        <p
          className="text-[14px] font-medium text-black/70 mb-4"
          style={{ fontFamily: FONT }}
        >
          {SLIDES[current].title}
        </p>

        {/* Slide wireframe */}
        <div className="w-[200px] mx-auto p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: direction >= 0 ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -30 : 30 }}
              transition={{ duration: 0.3 }}
            >
              {SLIDES[current].elements}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 pb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => go(-1)}
          className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center cursor-pointer bg-white/60 hover:border-[#EAB0FF]/50 transition-colors duration-200"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M8 2L4 6L8 10"
              stroke="black"
              strokeOpacity="0.4"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </motion.button>

        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className="p-0 border-none bg-transparent cursor-pointer"
            >
              <motion.div
                animate={{
                  width: i === current ? 20 : 6,
                  backgroundColor:
                    i === current ? ACCENT : "rgba(0,0,0,0.12)",
                }}
                transition={{ duration: 0.3 }}
                className="h-1.5 rounded-full"
              />
            </button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => go(1)}
          className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center cursor-pointer bg-white/60 hover:border-[#EAB0FF]/50 transition-colors duration-200"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M4 2L8 6L4 10"
              stroke="black"
              strokeOpacity="0.4"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </motion.button>
      </div>

      {/* Label */}
      {label && (
        <p
          className="text-[10px] text-black/25 text-center pb-3"
          style={{ fontFamily: FONT }}
        >
          {label}
        </p>
      )}
    </div>
  );
}