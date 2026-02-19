import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { theme } from "@/constants/theme";
import { events } from "@/constants/events";

export default function TicketsTab() {
  return (
    <LinearGradient colors={[theme.bgTop, theme.bgBottom]} style={{ flex: 1 }}>
      <StatusBar style="light" />
      <View style={styles.wrap}>
        <Text style={styles.title}>Tickets</Text>
        <Text style={styles.sub}>Open a sample ticket screen.</Text>

        <Pressable
          onPress={() => router.push(`/ticket/${events[0].id}`)}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Open Ticket</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 16, justifyContent: "center", gap: 10 },
  title: { color: theme.text, fontWeight: "900", fontSize: 22 },
  sub: { color: theme.muted, fontWeight: "700" },
  btn: {
    marginTop: 10,
    height: 48,
    borderRadius: 16,
    backgroundColor: theme.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { color: "#0B0708", fontWeight: "900" },
});
