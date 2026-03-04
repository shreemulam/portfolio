"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ACCENT, ACCENT_TEXT, FONT } from "@/lib/constants";

interface AnnotatedScreenshotProps {
  label?: string;
}

const ANNOTATIONS = [
  { x: 25, y: 20, text: "Missing loading state after user action" },
  { x: 65, y: 35, text: "Unclear toggle—users don't understand consequences" },
  { x: 40, y: 70, text: "No error recovery path when transaction fails" },
];

export default function AnnotatedScreenshot({ label }: AnnotatedScreenshotProps) {
  const [activeAnnotation, setActiveAnnotation] = useState<number | null>(null);

  return (
    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-gradient-to-br from-[#f5edf8] via-[#ede0f3] to-[#e8d5f0]">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Wireframe placeholder */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6">
        <div className="w-[180px] h-[240px] rounded-xl border border-black/[0.08] bg-white/50 flex flex-col p-3 gap-2">
          <div className="w-full h-3 rounded-full bg-black/[0.06]" />
          <div className="w-2/3 h-3 rounded-full bg-black/[0.04]" />
          <div className="flex-1 rounded-lg bg-black/[0.03] mt-1" />
          <div className="w-full h-8 rounded-full bg-black/[0.06]" />
        </div>
      </div>

      {/* Annotation dots */}
      {ANNOTATIONS.map((annotation, i) => (
        <div
          key={i}
          className="absolute z-10"
          style={{ left: `${annotation.x}%`, top: `${annotation.y}%` }}
        >
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              setActiveAnnotation(activeAnnotation === i ? null : i)
            }
            className="relative w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-black cursor-pointer border-2 border-white shadow-lg"
            style={{ backgroundColor: ACCENT, fontFamily: FONT }}
          >
            {i + 1}

            {/* Pulse ring */}
            {activeAnnotation !== i && (
              <motion.div
                animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
            )}
          </motion.button>

          {/* Tooltip */}
          <AnimatePresence>
            {activeAnnotation === i && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-20"
              >
                <div
                  className="bg-black/85 backdrop-blur-md text-white text-[12px] leading-[1.5] px-3 py-2 rounded-lg w-[180px] shadow-xl"
                  style={{ fontFamily: FONT }}
                >
                  {annotation.text}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Label */}
      {label && (
        <div className="absolute bottom-2 left-3 right-3">
          <p className="text-[10px] text-black/25 text-center" style={{ fontFamily: FONT }}>
            {label}
          </p>
        </div>
      )}

      {/* Instruction hint */}
      <div className="absolute top-3 right-3">
        <p className="text-[10px] text-black/30" style={{ fontFamily: FONT }}>
          Tap dots to explore
        </p>
      </div>
    </div>
  );
}