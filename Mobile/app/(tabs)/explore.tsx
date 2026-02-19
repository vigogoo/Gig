import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useVibe } from "@/context/VibeProvider";

export default function Explore() {
  const { theme } = useVibe();

  return (
    <LinearGradient colors={theme.bg} style={styles.page}>
      <Text style={[styles.title, { color: theme.text }]}>Explore</Text>
      <Text style={[styles.sub, { color: theme.muted }]}>
        This tab was the Expo template. We’ll replace it with VibeMap / Rooms / Studio.
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 16, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: "900" },
  sub: { marginTop: 8, fontWeight: "700", lineHeight: 20 },
});
