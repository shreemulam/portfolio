"use client";

import { motion } from "motion/react";
import { ACCENT, FONT } from "@/lib/constants";
import type { NumberedCard as NumberedCardType } from "@/lib/case-studies/types";
import BeforeAfter from "./interactive/before-after";
import AnnotatedScreenshot from "./interactive/annotated-screenshot";
import ExpandableCard from "./interactive/expandable-card";
import ImageCarousel from "./interactive/image-carousel";

interface NumberedCardProps {
  card: NumberedCardType;
  index: number;
  fullWidth?: boolean;
}

function ImagePlaceholder({ label }: { label?: string }) {
  return (
    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-gradient-to-br from-[#f5edf8] via-[#ede0f3] to-[#e8d5f0]">
      {/* Decorative blobs */}
      <div
        className="absolute top-[20%] left-[15%] w-[120px] h-[120px] rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(234,176,255,0.2)" }}
      />
      <div
        className="absolute bottom-[15%] right-[20%] w-[80px] h-[80px] rounded-full blur-2xl"
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

      {/* Placeholder wireframe elements */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
        <div className="w-12 h-12 rounded-xl border-2 border-black/[0.08] bg-white/40" />
        <div className="w-32 h-2.5 rounded-full bg-black/[0.06]" />
        <div className="w-24 h-2.5 rounded-full bg-black/[0.04]" />
      </div>

      {/* Label */}
      {label && (
        <div className="absolute bottom-3 left-3 right-3">
          <p
            className="text-[11px] text-black/30 text-center"
            style={{ fontFamily: FONT }}
          >
            {label}
          </p>
        </div>
      )}
    </div>
  );
}

function InteractiveContent({ card }: { card: NumberedCardType }) {
  switch (card.interactiveType) {
    case "before-after":
      return <BeforeAfter label={card.imagePlaceholder} />;
    case "annotated":
      return <AnnotatedScreenshot label={card.imagePlaceholder} />;
    case "expandable":
      return <ExpandableCard label={card.imagePlaceholder} description={card.description} />;
    case "carousel":
      return <ImageCarousel label={card.imagePlaceholder} />;
    default:
      return <ImagePlaceholder label={card.imagePlaceholder} />;
  }
}

export default function NumberedCard({
  card,
  index,
  fullWidth = false,
}: NumberedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      whileHover={{
        y: -2,
        boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
      }}
      className="rounded-2xl bg-[#FAFAFA] border border-black/[0.08] p-6 lg:p-8 transition-shadow duration-300"
    >
      <div
        className={
          fullWidth
            ? "flex flex-col lg:flex-row lg:gap-10"
            : ""
        }
      >
        {/* Visual — wider in full-width mode */}
        <div className={fullWidth ? "w-full lg:w-[58%] flex-shrink-0" : ""}>
          <div className={fullWidth ? "" : "mb-4"}>
            <InteractiveContent card={card} />
          </div>
        </div>

        {/* Text content */}
        <div className={fullWidth ? "mt-5 lg:mt-0 flex-1" : ""}>
          {/* Number badge */}
          <div
            className="inline-flex items-center justify-center w-10 h-10 rounded-full text-[14px] font-semibold text-black"
            style={{ backgroundColor: ACCENT, fontFamily: FONT }}
          >
            {card.number}
          </div>

          {/* Title */}
          <h3
            className="text-[20px] font-medium text-black mt-4 mb-3"
            style={{ fontFamily: FONT }}
          >
            {card.title}
          </h3>

          {/* Description */}
          <p
            className="text-[15px] leading-relaxed text-black/50"
            style={{ fontFamily: FONT }}
          >
            {card.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}