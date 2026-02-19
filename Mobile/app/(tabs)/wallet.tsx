import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useVibe } from "@/context/VibeProvider";
import { Glass } from "@/components/ui/Glass";
import { router } from "expo-router";
import { EVENTS } from "@/constants/mock";

export default function WalletTab() {
  const { theme } = useVibe();

  return (
    <LinearGradient colors={theme.bg} style={{ flex: 1, padding: 16, paddingTop: 60 }}>
      <Text style={[styles.h1, { color: theme.text }]}>Wallet</Text>
      <Text style={[styles.p, { color: theme.muted }]}>Tickets become premium passes. Transfer/resell hooks later.</Text>

      <Pressable onPress={() => router.push(`/ticket/${EVENTS[0].id}`)} style={{ marginTop: 16 }}>
        <Glass>
          <Text style={{ color: theme.text, fontWeight: "900" }}>Aurum Gala Night — Pass</Text>
          <Text style={{ color: theme.muted, fontWeight: "800", marginTop: 6 }}>Tap to open QR + entry details</Text>
        </Glass>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 26, fontWeight: "900" },
  p: { marginTop: 6, fontWeight: "700" },
});
