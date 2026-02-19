import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { VibeMode } from "@/constants/vibes";
import { THEMES, type Theme } from "@/constants/themes";

type VibeCtx = {
  mode: VibeMode;
  theme: Theme;
  setMode: (m: VibeMode) => void;
};

const DEFAULT_MODE: VibeMode = "luxury";
const DEFAULT_THEME: Theme = THEMES[DEFAULT_MODE];

// ✅ Safe default so app never crashes even if provider is missing somewhere
const Ctx = createContext<VibeCtx>({
  mode: DEFAULT_MODE,
  theme: DEFAULT_THEME,
  setMode: () => {},
});

const STORAGE_KEY = "vibe.mode.v1";

export function VibeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<VibeMode>(DEFAULT_MODE);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === "luxury" || saved === "neon" || saved === "clean") {
          setModeState(saved);
        }
      } catch {}
    })();
  }, []);

  const setMode = async (m: VibeMode) => {
    setModeState(m);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, m);
    } catch {}
  };

  const theme = useMemo(() => THEMES[mode], [mode]);
  const value = useMemo(() => ({ mode, theme, setMode }), [mode, theme]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useVibe() {
  return useContext(Ctx);
}
