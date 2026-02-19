import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useVibe } from "@/context/VibeProvider";
import { Glass } from "@/components/ui/Glass";
import { router } from "expo-router";

export default function Studio() {
  const { theme } = useVibe();

  return (
    <LinearGradient colors={theme.bg} style={{ flex: 1, padding: 16, paddingTop: 60 }}>
      <Text style={[styles.h1, { color: theme.text }]}>Studio</Text>
      <Text style={[styles.p, { color: theme.muted }]}>Create events. Sell tickets. Manage rooms.</Text>

      <Glass style={{ marginTop: 16 }}>
        <Text style={{ color: theme.text, fontWeight: "900", fontSize: 16 }}>Organizer Toolkit</Text>

        <View style={{ gap: 10, marginTop: 12 }}>
          <Row label="Smart tiers" value="Early bird → Regular → Last chance" />
          <Row label="Allowlist mode" value="Invite codes • VIP drops • gated access" />
          <Row label="Promos + affiliates" value="Track promoters and auto payouts" />
          <Row label="Room marketing" value="Updates and hype stay inside your app" />
        </View>

        <Pressable
          onPress={() => router.push("/studio/new-event")}
          style={[styles.cta, { backgroundColor: theme.accent }]}
        >
          <Text style={{ fontWeight: "900", color: theme.mode === "clean" ? "#fff" : "#0B0708" }}>
            Create New Event
          </Text>
        </Pressable>
      </Glass>
    </LinearGradient>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  const { theme } = useVibe();
  return (
    <View style={{ gap: 4 }}>
      <Text style={{ color: theme.muted, fontWeight: "800", fontSize: 11 }}>{label}</Text>
      <Text style={{ color: theme.text, fontWeight: "800" }}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 26, fontWeight: "900" },
  p: { marginTop: 6, fontWeight: "700" },
  cta: { marginTop: 16, height: 52, borderRadius: 16, alignItems: "center", justifyContent: "center" },
});
