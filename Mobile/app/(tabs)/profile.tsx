import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useVibe } from "@/context/VibeProvider";
const { theme } = useVibe();


export default function ProfileTab() {
  return (
    <LinearGradient colors={theme.bg} style={styles.wrap}>
      <StatusBar style="light" />
      <View style={styles.wrap}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.sub}>Coming next.</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 16, justifyContent: "center" },
  title: { color: theme.text, fontWeight: "900", fontSize: 22 },
  sub: { color: theme.muted, fontWeight: "700", marginTop: 6 },
});
