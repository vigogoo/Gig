export type VibeMode = "luxury" | "neon" | "clean";

export const VIBES: { key: VibeMode; label: string; subtitle: string }[] = [
  { key: "luxury", label: "Allowlist", subtitle: "Black glass • Gold" },
  { key: "neon", label: "Neon", subtitle: "Glow • Motion • Energy" },
  { key: "clean", label: "Clean", subtitle: "Airy • Crisp • Modern" },
];
