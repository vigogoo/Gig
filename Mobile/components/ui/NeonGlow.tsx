import { View, StyleSheet, ViewStyle } from "react-native";
import { useVibe } from "@/context/VibeProvider";

export function NeonGlow({ style }: { style?: ViewStyle }) {
  const { theme } = useVibe();
  const glow = theme.mode === "clean" ? theme.shadow : theme.accent;

  return (
    <View
      pointerEvents="none"
      style={[
        styles.glow,
        {
          shadowColor: glow,
          shadowOpacity: theme.mode === "clean" ? 0.12 : 0.55,
          shadowRadius: theme.mode === "clean" ? 14 : 26,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  glow: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 18,
    height: 44,
    borderRadius: 999,
    backgroundColor: "transparent",
    shadowOffset: { width: 0, height: 12 },
    elevation: 18,
  },
});
