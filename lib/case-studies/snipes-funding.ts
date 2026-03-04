import { CaseStudyMeta } from "./types";

export const snipesFunding: CaseStudyMeta = {
  slug: "snipes-funding",
  tags: ["Fintech", "Payments", "Behavioral UX"],
  title: "Redesigning funding flows for wallet-first payments",
  subtitle:
    "Driven by a need to increase wallet adoption, we reimagined the entire funding and backup payment flow for the white-label fintech platform.",
  client: "Accrue × SNIPES",
  year: "2024",
  heroGradient: "from-[#f5edf8] via-[#e8d5f0] to-[#dfc0e8]",
  heroColor: "#EAB0FF",
  overview: [
    { label: "Designed for", value: "Mobile App" },
    { label: "Team", value: "2 Designers, 1 PM, 3 Engineers" },
    { label: "Timeline", value: "January to March 2024" },
    { label: "My role", value: "Research, strategy, design & testing" },
  ],
  context:
    "Accrue builds white-label wallet and loyalty platforms for enterprise retail brands. SNIPES, a global sneaker retailer, was the flagship merchant—but their wallet activation and funding flows had high drop-off rates, unclear backup payment logic, and no Apple Pay integration.",
  sections: [
    {
      id: "problem",
      type: "features",
      stickyLabel: "THE PROBLEM",
      stickyTitle:
        "Users were abandoning the wallet before they even funded it.",
      stickyDescription:
        "Analytics showed a 62% drop-off between wallet creation and first fund. The funding flow was confusing, backup payment was buried, and users didn't trust the system enough to add real money.",
      cards: [
        {
          number: "01",
          title: "Confusing funding entry points",
          description:
            "Users couldn't find where to add money. The fund button was hidden behind a menu, and the flow didn't match mental models from Cash App or Venmo.",
          imagePlaceholder: "Wallet home screen with buried fund CTA",
        },
        {
          number: "02",
          title: "Backup payment anxiety",
          description:
            "When wallet balance was low, users didn't understand what would happen at checkout. Would the transaction fail? Would they be charged to a card they didn't set up?",
          imagePlaceholder: "Checkout screen showing unclear payment fallback",
        },
        {
          number: "03",
          title: "No Apple Pay adoption",
          description:
            "Despite 78% of users being on iOS, there was no Apple Pay integration for loading funds. Users had to manually enter card details every time.",
          imagePlaceholder: "Manual card entry form vs Apple Pay flow",
          interactiveType: "before-after",
        },
      ],
    },
    {
      id: "research",
      type: "heuristic",
      stickyLabel: "RESEARCH",
      stickyTitle: "We mapped the drop-off funnel and ran usability tests.",
      stickyDescription:
        "I conducted 8 moderated usability tests and analyzed 3 months of Mixpanel funnel data to identify exactly where and why users were abandoning the flow.",
      cards: [
        {
          number: "01",
          title: "Visibility of system status",
          description:
            "Users had no feedback during the funding process. After tapping 'Add Money', there was no loading state, no confirmation, and no balance update—leading to duplicate attempts.",
          imagePlaceholder: "Funding flow with missing loading/confirmation states",
        },
        {
          number: "02",
          title: "Match between system and real world",
          description:
            "The terminology 'Fund Wallet' was unfamiliar. Users expected 'Add Money' or 'Load Cash'—language they recognized from Cash App and Venmo.",
          imagePlaceholder: "Terminology comparison across payment apps",
        },
        {
          number: "03",
          title: "Error prevention",
          description:
            "The backup payment toggle had no explanation of consequences. Users toggled it off thinking it was a secondary charge, not a safety net.",
          imagePlaceholder: "Backup payment toggle with missing context",
          interactiveType: "annotated",
        },
        {
          number: "04",
          title: "User control and freedom",
          description:
            "Once users started the funding flow, there was no way to go back or cancel without losing their entered amount. The flow felt like a one-way door.",
          imagePlaceholder: "Funding flow with no back navigation",
        },
      ],
    },
    {
      id: "competitors",
      type: "competitors",
      stickyLabel: "COMPETITIVE ANALYSIS",
      stickyTitle:
        "We studied how leading payment apps handle wallet funding.",
      stickyDescription:
        "I analyzed 4 competitors to understand best practices for wallet funding, backup payments, and trust-building patterns.",
      cards: [
        {
          name: "Cash App",
          description:
            "Cash App leads with a single prominent 'Add Cash' CTA on the home screen. The funding flow is 3 steps: amount → source → confirm. Apple Pay and debit cards are equally weighted. Balance updates are instant with optimistic UI.",
          highlights: [
            "Single CTA entry point",
            "Instant balance feedback",
            "Equal payment method weight",
          ],
        },
        {
          name: "Venmo",
          description:
            "Venmo's wallet funding is embedded in the payment flow itself—users can fund during a transaction. The backup payment concept is replaced by 'auto-reload' which feels proactive rather than reactive.",
          highlights: [
            "In-context funding",
            "Auto-reload framing",
            "Trust through transparency",
          ],
        },
      ],
    },
    {
      id: "personas",
      type: "personas",
      stickyLabel: "USER RESEARCH",
      stickyTitle: "We identified two key user archetypes.",
      stickyDescription:
        "Based on survey findings and stakeholder interviews, we created user archetypes to guide design decisions and prioritize features.",
      cards: [
        {
          name: "Marcus",
          tagline: "a sneakerhead who pre-funds",
          quote:
            "I want to load money before a drop so I can checkout instantly. I don't want to fumble with my card when a shoe sells out in 30 seconds.",
          tasks: [
            "Pre-fund before drops",
            "Instant checkout",
            "Balance visibility",
          ],
        },
        {
          name: "Aisha",
          tagline: "a casual shopper who pays at checkout",
          quote:
            "I don't want to keep money in another app. Just let me pay with Apple Pay at checkout and handle the rest behind the scenes.",
          tasks: [
            "Pay at checkout",
            "Apple Pay integration",
            "Minimal friction",
          ],
        },
      ],
    },
    {
      id: "solution",
      type: "solution",
      stickyLabel: "THE SOLUTION",
      stickyTitle: "A streamlined funding flow with smart payment fallbacks.",
      stickyDescription:
        "We redesigned the entire funding experience—from entry point to confirmation—with clear system feedback, Apple Pay integration, and transparent backup payment logic.",
      cards: [
        {
          number: "01",
          title: "Prominent fund CTA with smart defaults",
          description:
            "Moved the funding entry point to the wallet home screen with a large, persistent button. Pre-populated the last used amount and payment method for returning users.",
          imagePlaceholder: "Redesigned wallet home with prominent Add Money CTA",
          interactiveType: "before-after",
        },
        {
          number: "02",
          title: "Apple Pay as first-class funding",
          description:
            "Apple Pay appears as the primary funding method for iOS users. One tap to authenticate, instant balance update with optimistic UI. Debit card remains as secondary option.",
          imagePlaceholder: "Apple Pay funding flow—3 screens",
          interactiveType: "carousel",
        },
        {
          number: "03",
          title: "Transparent backup payment",
          description:
            "Redesigned the backup payment as 'Safety Net'—a clearly explained feature that shows exactly what happens when your wallet balance runs low at checkout.",
          imagePlaceholder: "Safety Net explanation with visual flow diagram",
          interactiveType: "expandable",
        },
        {
          number: "04",
          title: "Real-time funding confirmation",
          description:
            "Added a celebration moment with balance animation, receipt summary, and next-action CTA. Users see their money land immediately.",
          imagePlaceholder: "Success confirmation with animated balance counter",
        },
      ],
    },
  ],
};