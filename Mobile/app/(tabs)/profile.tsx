import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/constants/theme";

export default function ProfileTab() {
  return (
    <LinearGradient colors={[theme.bgTop, theme.bgBottom]} style={{ flex: 1 }}>
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
