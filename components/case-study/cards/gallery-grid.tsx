"use client";

import { motion } from "motion/react";
import { FONT } from "@/lib/constants";
import type { GalleryItem } from "@/lib/case-studies/types";

interface GalleryGridProps {
  items: GalleryItem[];
  columns?: 1 | 2 | 3;
}

function GalleryPlaceholder({ label }: { label?: string }) {
  return (
    <div className="relative w-full h-full min-h-[200px] rounded-xl overflow-hidden bg-gradient-to-br from-[#f5edf8] via-[#ede0f3] to-[#e8d5f0]">
      {/* Decorative blobs */}
      <div
        className="absolute top-[20%] left-[15%] w-[140px] h-[140px] rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(234,176,255,0.2)" }}
      />
      <div
        className="absolute bottom-[15%] right-[20%] w-[100px] h-[100px] rounded-full blur-2xl"
        style={{ backgroundColor: "rgba(234,176,255,0.15)" }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Wireframe elements */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
        <div className="w-14 h-14 rounded-xl border-2 border-black/[0.08] bg-white/40" />
        <div className="w-36 h-2.5 rounded-full bg-black/[0.06]" />
        <div className="w-24 h-2.5 rounded-full bg-black/[0.04]" />
      </div>

      {/* Label */}
      {label && (
        <div className="absolute bottom-3 left-3 right-3">
          <p
            className="text-[12px] text-black/30 text-center leading-snug"
            style={{ fontFamily: FONT }}
          >
            {label}
          </p>
        </div>
      )}
    </div>
  );
}

export default function GalleryGrid({
  items,
  columns = 1,
}: GalleryGridProps) {
  const colsClass =
    columns === 3
      ? "lg:grid-cols-3"
      : columns === 2
        ? "lg:grid-cols-2"
        : "grid-cols-1";

  return (
    <div className={`grid grid-cols-1 ${colsClass} gap-4 lg:gap-6`}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.6,
            delay: i * 0.08,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="rounded-xl overflow-hidden"
          style={{
            gridColumn:
              item.span && item.span > 1 ? `span ${item.span}` : undefined,
            aspectRatio:
              item.span === columns || columns === 1 ? "16/9" : "4/3",
          }}
        >
          <GalleryPlaceholder label={item.imagePlaceholder} />

          {item.caption && (
            <p
              className="text-[13px] text-black/40 mt-2.5 leading-snug"
              style={{ fontFamily: FONT }}
            >
              {item.caption}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}