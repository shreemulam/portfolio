"use client";

import { useParams } from "next/navigation";
import { motion } from "motion/react";
import { ACCENT, ACCENT_TEXT, FONT } from "@/lib/constants";
import { getCaseStudy } from "@/lib/case-studies";
import Navbar from "@/components/navbar";
import ScrollToTopButton from "@/components/scroll-to-top";
import HeroSection from "@/components/case-study/hero-section";
import ProjectDetails from "@/components/case-study/project-details";
import ClientBlock from "@/components/case-study/client-block";
import ContextBlock from "@/components/case-study/context-block";
import StickySection from "@/components/case-study/sticky-section";
import SectionNav from "@/components/case-study/section-nav";
import ImpactSection from "@/components/case-study/impact-section";

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return (
      <main
        className="min-h-screen bg-white flex flex-col"
        style={{ fontFamily: FONT }}
      >
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p
              className="text-[64px] font-medium tracking-[-0.03em] text-black mb-4"
              style={{ fontFamily: FONT }}
            >
              404
            </p>
            <p className="text-[17px] text-black/50 mb-8">
              This case study doesn&apos;t exist yet.
            </p>
            <motion.a
              href="/#case-studies"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(234,176,255,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center rounded-[40px] px-8 py-4 text-[15px] font-semibold text-black no-underline cursor-pointer"
              style={{ backgroundColor: ACCENT }}
            >
              Back to Case Studies
            </motion.a>
          </motion.div>
        </div>
      </main>
    );
  }

  const solutionSection = caseStudy.sections.find((s) => s.type === "solution");

  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: FONT }}>
      <Navbar />

      <HeroSection
        title={caseStudy.title}
        subtitle={caseStudy.subtitle}
        client={caseStudy.client}
        year={caseStudy.year}
        tags={caseStudy.tags}
        heroGradient={caseStudy.heroGradient}
        heroColor={caseStudy.heroColor}
        firstSectionId={solutionSection?.id}
      />

      <ProjectDetails cards={caseStudy.overview} />

      <ClientBlock
        clientName={caseStudy.client}
        clientDescription={caseStudy.clientDescription}
      />

      <ContextBlock
        text={caseStudy.context}
        challenge={caseStudy.challenge}
        goals={caseStudy.goals}
      />

      {/* Section navigation */}
      <SectionNav sections={caseStudy.sections} />

      {/* Content sections */}
      {caseStudy.sections.map((section, i) => (
        <StickySection
          key={section.id}
          section={section}
          index={i}
          isAlternate={i % 2 === 1}
        />
      ))}

      {/* Impact section */}
      <ImpactSection
        metrics={caseStudy.impact}
        summary={caseStudy.impactSummary}
        testimonial={caseStudy.testimonial}
      />

      {/* Footer CTA */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[800px] mx-auto px-6 lg:px-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[13px] font-semibold tracking-[0.2em] mb-6"
            style={{ color: ACCENT_TEXT }}
          >
            NEXT CASE STUDY
          </motion.p>
          <motion.a
            href="/#case-studies"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(234,176,255,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-[40px] px-8 py-4 text-[15px] font-semibold text-black no-underline cursor-pointer"
            style={{ backgroundColor: ACCENT }}
          >
            View All Case Studies
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </div>
      </section>

      <ScrollToTopButton />
    </main>
  );
}