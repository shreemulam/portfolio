export const ACCENT = "#EAB0FF";
export const ACCENT_TEXT = "#9b59b6";
export const FONT = "'Geist', sans-serif";
export const SERIF = "'Instrument Serif', serif";

export const fadeSlideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export const NAV_LINKS = [
  { label: "CASE STUDIES", href: "/#case-studies" },
  { label: "PLAYGROUND", href: "/playground" },
  { label: "ABOUT", href: "/about" },
  { label: "RESUME", href: "#" },
  { label: "LINKEDIN", href: "#" },
];