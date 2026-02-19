import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useVibe } from "@/context/VibeProvider";
import { Glass } from "@/components/ui/Glass";

export default function MapTab() {
  const { theme } = useVibe();
  return (
    <LinearGradient colors={theme.bg} style={{ flex: 1, padding: 16, paddingTop: 60 }}>
      <Text style={[styles.h1, { color: theme.text }]}>VibeMap</Text>
      <Text style={[styles.p, { color: theme.muted }]}>Next: glowing pins + energy/budget filters.</Text>

      <Glass style={{ marginTop: 16 }}>
        <Text style={{ color: theme.text, fontWeight: "900" }}>Map will live here</Text>
        <Text style={{ color: theme.muted, fontWeight: "700", marginTop: 6 }}>
          We’ll integrate react-native-maps and build “Energy” and “Budget” knobs.
        </Text>
      </Glass>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({ h1: { fontSize: 26, fontWeight: "900" }, p: { marginTop: 6, fontWeight: "700" }});
