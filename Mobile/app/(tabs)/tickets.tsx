import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

import { events } from "@/constants/events";
import { useVibe } from "@/context/VibeProvider";

export default function TicketsTab() {
  const { theme } = useVibe();

  return (
    <LinearGradient colors={theme.bg} style={{ flex: 1 }}>
      <StatusBar style={theme.mode === "clean" ? "dark" : "light"} />

      <View style={styles.wrap}>
        <Text style={[styles.title, { color: theme.text }]}>Tickets</Text>
        <Text style={[styles.sub, { color: theme.muted }]}>
          Open a sample ticket screen.
        </Text>

        <Pressable
          onPress={() => router.push(`/ticket/${events[0].id}`)}
          style={[
            styles.btn,
            { backgroundColor: theme.accent, borderColor: theme.border },
          ]}
        >
          <Text
            style={[
              styles.btnText,
              { color: theme.mode === "clean" ? "#fff" : "#0B0708" },
            ]}
          >
            Open Ticket
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 16, justifyContent: "center", gap: 10 },
  title: { fontWeight: "900", fontSize: 22 },
  sub: { fontWeight: "700" },
  btn: {
    marginTop: 10,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  btnText: { fontWeight: "900" },
});
