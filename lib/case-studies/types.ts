export interface CaseStudyMeta {
  slug: string;
  tags: string[];
  title: string;
  subtitle: string;
  client: string;
  year: string;
  heroGradient: string;
  heroColor: string;
  overview: OverviewCard[];
  clientDescription: string;
  context: string;
  challenge?: string;
  goals?: string[];
  impact: ImpactMetric[];
  impactSummary?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  sections: CaseStudySection[];
}

export interface ImpactMetric {
  value: string;
  label: string;
  description?: string;
}

export interface OverviewCard {
  label: string;
  value: string;
}

export type CaseStudySection =
  | FeatureSection
  | HeuristicSection
  | CompetitorSection
  | PersonaSection
  | SolutionSection
  | GenericSection;

interface BaseSectionData {
  id: string;
  stickyLabel: string;
  stickyTitle: string;
  stickyDescription: string;
}

export interface FeatureSection extends BaseSectionData {
  type: "features";
  cards: NumberedCard[];
}

export interface HeuristicSection extends BaseSectionData {
  type: "heuristic";
  cards: NumberedCard[];
}

export interface CompetitorSection extends BaseSectionData {
  type: "competitors";
  cards: CompetitorCard[];
}

export interface PersonaSection extends BaseSectionData {
  type: "personas";
  cards: PersonaCard[];
}

export interface SolutionSection extends BaseSectionData {
  type: "solution";
  cards: NumberedCard[];
}

export interface GenericSection extends BaseSectionData {
  type: "generic";
  cards: NumberedCard[];
}

export interface NumberedCard {
  number: string;
  title: string;
  description: string;
  imagePlaceholder?: string;
  interactiveType?:
    | "before-after"
    | "annotated"
    | "carousel"
    | "expandable";
  interactiveData?: Record<string, unknown>;
}

export interface CompetitorCard {
  name: string;
  description: string;
  imagePlaceholder?: string;
  highlights: string[];
}

export interface PersonaCard {
  name: string;
  tagline: string;
  photoPlaceholder?: string;
  quote: string;
  tasks: string[];
}