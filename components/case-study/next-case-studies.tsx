"use client";

import { motion } from "motion/react";
import { ACCENT_TEXT, FONT } from "@/lib/constants";

interface CaseStudyPreview {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  gradient: string;
}

const ALL_PREVIEWS: CaseStudyPreview[] = [
  {
    slug: "snipes-funding",
    title: "Redesigning funding flows for wallet-first payments",
    subtitle: "Accrue × SNIPES • 2024",
    tags: ["Fintech", "Payments", "Behavioral UX"],
    gradient: "from-[#f5edf8] via-[#f0e4f6] to-[#ede0f3]",
  },
  {
    slug: "exxonmobil-rewards",
    title: "Reimagining rewards for gas station loyalty",
    subtitle: "Accrue × ExxonMobil • 2025",
    tags: ["Loyalty", "Mobile", "Visual Design"],
    gradient: "from-[#e8f0fa] via-[#dfe8f5] to-[#d6e2f2]",
  },
  {
    slug: "wallet-intelligence",
    title: "Building a design intelligence dashboard",
    subtitle: "Accrue • 2024",
    tags: ["Data Viz", "Analytics", "Product Design"],
    gradient: "from-[#f0e8f8] via-[#ebe0f5] to-[#e5d8f0]",
  },
  {
    slug: "design-system",
    title: "Scaling a design system across merchant brands",
    subtitle: "Accrue • 2023–2024",
    tags: ["Design Systems", "White-Label", "Scale"],
    gradient: "from-[#f2f2f2] via-[#ededed] to-[#e8e8e8]",
  },
  {
    slug: "snipes-pdp",
    title: "Optimizing product pages for reserve-first shopping",
    subtitle: "Accrue × SNIPES • 2024",
    tags: ["E-commerce", "Conversion", "UX Research"],
    gradient: "from-[#f5edf8] via-[#ede0f3] to-[#e8d5f0]",
  },
  {
    slug: "hair-cuttery",
    title: "Bringing salon rewards into the digital age",
    subtitle: "Accrue × Hair Cuttery • 2024",
    tags: ["Service Design", "Loyalty", "Brand"],
    gradient: "from-[#f0f5e8] via-[#e8f0e0] to-[#e0ebd8]",
  },
];

interface NextCaseStudiesProps {
  currentSlug: string;
}

export default function NextCaseStudies({ currentSlug }: NextCaseStudiesProps) {
  const others = ALL_PREVIEWS.filter((p) => p.slug !== currentSlug);
  // Pick 2: next in order (wrapping), so it feels sequential
  const currentIndex = ALL_PREVIEWS.findIndex((p) => p.slug === currentSlug);
  const picks = [
    others[(currentIndex) % others.length],
    others[(currentIndex + 1) % others.length],
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAFA]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-semibold tracking-[0.2em] mb-8"
          style={{ color: ACCENT_TEXT, fontFamily: FONT }}
        >
          MORE CASE STUDIES
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {picks.map((study, i) => (
            <motion.a
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              whileHover={{
                y: -4,
                boxShadow: "0 16px 48px rgba(0,0,0,0.08)",
              }}
              className="group rounded-2xl overflow-hidden bg-white border border-black/[0.06] no-underline cursor-pointer transition-shadow duration-300"
            >
              {/* Gradient thumbnail */}
              <div
                className={`relative w-full h-[180px] lg:h-[200px] bg-gradient-to-br ${study.gradient} overflow-hidden`}
              >
                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                {/* Wireframe placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[140px] h-[100px] rounded-xl border border-black/[0.06] bg-white/50 flex flex-col items-center justify-center gap-2 p-3">
                    <div className="w-8 h-8 rounded-lg bg-black/[0.04]" />
                    <div className="w-16 h-1.5 rounded-full bg-black/[0.06]" />
                    <div className="w-12 h-1.5 rounded-full bg-black/[0.04]" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium tracking-wide text-black/35 border border-black/[0.08] rounded-full px-2.5 py-1"
                      style={{ fontFamily: FONT }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3
                  className="text-[18px] lg:text-[20px] font-medium text-black leading-snug tracking-[-0.01em] mb-2 group-hover:text-black/80 transition-colors"
                  style={{ fontFamily: FONT }}
                >
                  {study.title}
                </h3>

                {/* Subtitle */}
                <p
                  className="text-[13px] font-medium"
                  style={{ color: ACCENT_TEXT, fontFamily: FONT }}
                >
                  {study.subtitle}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}