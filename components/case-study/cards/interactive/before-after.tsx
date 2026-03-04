"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { ACCENT, FONT } from "@/lib/constants";

interface BeforeAfterProps {
  label?: string;
}

export default function BeforeAfter({ label }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging.current) updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] rounded-xl overflow-hidden cursor-col-resize select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* "Before" side */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0e4e4] via-[#ece0e0] to-[#e8d8d8]">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
          <div className="w-10 h-10 rounded-xl border-2 border-black/[0.1] bg-white/30" />
          <div className="w-24 h-2 rounded-full bg-black/[0.06]" />
          <div className="w-16 h-2 rounded-full bg-black/[0.04]" />
          <div className="w-20 h-6 rounded-full bg-black/[0.06] mt-2" />
        </div>
        <div
          className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/60 text-white text-[11px] font-medium"
          style={{ fontFamily: FONT }}
        >
          Before
        </div>
      </div>

      {/* "After" side — clipped */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#f5edf8] via-[#ede0f3] to-[#e8d5f0]"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
          <div
            className="w-10 h-10 rounded-xl border-2 bg-white/40"
            style={{ borderColor: `${ACCENT}60` }}
          />
          <div className="w-28 h-2 rounded-full" style={{ backgroundColor: `${ACCENT}30` }} />
          <div className="w-20 h-2 rounded-full" style={{ backgroundColor: `${ACCENT}20` }} />
          <div
            className="w-24 h-7 rounded-full mt-2 flex items-center justify-center"
            style={{ backgroundColor: ACCENT }}
          >
            <span className="text-[10px] font-semibold text-black" style={{ fontFamily: FONT }}>
              Add Money
            </span>
          </div>
        </div>
        <div
          className="absolute top-3 right-3 px-2 py-1 rounded-md text-black text-[11px] font-medium"
          style={{ fontFamily: FONT, backgroundColor: ACCENT }}
        >
          After
        </div>
      </div>

      {/* Divider handle */}
      <div
        className="absolute top-0 bottom-0 w-[3px] z-10"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute inset-0 bg-white shadow-[0_0_8px_rgba(0,0,0,0.15)]" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: ACCENT }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4 7H10M4 7L6 5M4 7L6 9M10 7L8 5M10 7L8 9" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Label */}
      {label && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <p className="text-[10px] text-black/25 text-center whitespace-nowrap" style={{ fontFamily: FONT }}>
            {label}
          </p>
        </div>
      )}
    </div>
  );
}