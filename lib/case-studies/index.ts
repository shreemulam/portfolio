import { CaseStudyMeta } from "./types";
import { snipesFunding } from "./snipes-funding";

// Add more imports as case study data files are created:
// import { exxonmobilRewards } from "./exxonmobil-rewards";
// import { walletIntelligence } from "./wallet-intelligence";
// import { designSystem } from "./design-system";
// import { snipesPdp } from "./snipes-pdp";
// import { hairCuttery } from "./hair-cuttery";

const allCaseStudies: CaseStudyMeta[] = [
  snipesFunding,
  // exxonmobilRewards,
  // walletIntelligence,
  // designSystem,
  // snipesPdp,
  // hairCuttery,
];

export const CASE_STUDIES_MAP = new Map<string, CaseStudyMeta>(
  allCaseStudies.map((cs) => [cs.slug, cs])
);

export const CASE_STUDY_SLUGS = allCaseStudies.map((cs) => cs.slug);

export function getCaseStudy(slug: string): CaseStudyMeta | undefined {
  return CASE_STUDIES_MAP.get(slug);
}