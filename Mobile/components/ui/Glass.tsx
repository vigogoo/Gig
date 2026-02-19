import { BlurView } from "expo-blur";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useVibe } from "@/context/VibeProvider";

export function Glass({
  children,
  style,
  intensity = 26,
}: {
  children?: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
}) {
  const { theme } = useVibe();

  return (
    <View style={[styles.wrap, { borderColor: theme.border }, style]}>
      <BlurView intensity={intensity} tint={theme.mode === "clean" ? "light" : "dark"} style={StyleSheet.absoluteFill} />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: theme.surface2 }]} />
      <View style={styles.inner}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderRadius: 18,
    overflow: "hidden",
  },
  inner: { padding: 14 },
});
