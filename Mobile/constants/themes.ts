import type { ColorValue } from "react-native";
import type { VibeMode } from "./vibes";

export type Theme = {
  mode: VibeMode;

  // ✅ expo-linear-gradient expects at least 2 colors (tuple)
  bg: readonly [ColorValue, ColorValue, ...ColorValue[]];

  surface: string;
  surface2: string;
  border: string;

  text: string;
  muted: string;

  accent: string;
  accent2: string;

  // ✅ your UI uses this (CategoryChips)
  accentSoft: string;

  success: string;
  danger: string;

  shadow: string;
};

export const THEMES: Record<VibeMode, Theme> = {
  luxury: {
    mode: "luxury",
    bg: ["#07080A", "#0A0D12"] as const,
    surface: "rgba(255,255,255,0.06)",
    surface2: "rgba(255,255,255,0.045)",
    border: "rgba(255,255,255,0.10)",
    text: "#F7F3EA",
    muted: "rgba(247,243,234,0.62)",
    accent: "#C8A24A",
    accent2: "#EAD9A8",
    accentSoft: "rgba(200,162,74,0.18)",
    success: "#22C55E",
    danger: "#EF4444",
    shadow: "rgba(0,0,0,0.45)",
  },

  neon: {
    mode: "neon",
    bg: ["#04010B", "#050014"] as const,
    surface: "rgba(255,255,255,0.06)",
    surface2: "rgba(255,255,255,0.045)",
    border: "rgba(255,255,255,0.10)",
    text: "#F8FAFF",
    muted: "rgba(248,250,255,0.62)",
    accent: "#00F5FF",
    accent2: "#FF2D95",
    accentSoft: "rgba(0,245,255,0.16)",
    success: "#22C55E",
    danger: "#FF3B30",
    shadow: "rgba(0,0,0,0.55)",
  },

  clean: {
    mode: "clean",
    bg: ["#F6F7FB", "#FFFFFF"] as const,
    surface: "rgba(255,255,255,0.92)",
    surface2: "rgba(255,255,255,0.78)",
    border: "rgba(15,23,42,0.10)",
    text: "#0B1220",
    muted: "rgba(11,18,32,0.55)",
    accent: "#0A84FF",
    accent2: "#34C759",
    accentSoft: "rgba(10,132,255,0.12)",
    success: "#34C759",
    danger: "#FF3B30",
    shadow: "rgba(15,23,42,0.10)",
  },
};
