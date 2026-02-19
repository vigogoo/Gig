import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useVibe } from "@/context/VibeProvider";
import { Glass } from "@/components/ui/Glass";
import { ROOMS } from "@/constants/mock";
import { router } from "expo-router";

export default function RoomsTab() {
  const { theme } = useVibe();

  return (
    <LinearGradient colors={theme.bg} style={{ flex: 1 }}>
      <FlatList
        data={ROOMS}
        keyExtractor={(r) => r.id}
        contentContainerStyle={{ padding: 16, paddingTop: 60, paddingBottom: 110 }}
        ListHeaderComponent={
          <View style={{ marginBottom: 14 }}>
            <Text style={[styles.h1, { color: theme.text }]}>Rooms</Text>
            <Text style={[styles.p, { color: theme.muted }]}>Communities for events you follow or bought.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/room/${item.id}`)} style={{ marginBottom: 12 }}>
            <Glass>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ gap: 4 }}>
                  <Text style={{ color: theme.text, fontWeight: "900" }}>{item.title}</Text>
                  <Text style={{ color: theme.muted, fontWeight: "800", fontSize: 12 }}>
                    {item.members.toLocaleString()} members
                  </Text>
                </View>
                {item.live ? (
                  <View style={[styles.live, { backgroundColor: theme.accent2 }]}>
                    <Text style={{ fontWeight: "900", color: "#0B0708", fontSize: 11 }}>LIVE</Text>
                  </View>
                ) : (
                  <View style={[styles.live, { backgroundColor: "rgba(255,255,255,0.10)", borderWidth: 1, borderColor: theme.border }]}>
                    <Text style={{ fontWeight: "900", color: theme.text, fontSize: 11 }}>ROOM</Text>
                  </View>
                )}
              </View>
            </Glass>
          </Pressable>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 26, fontWeight: "900" },
  p: { marginTop: 6, fontWeight: "700" },
  live: { paddingHorizontal: 12, height: 32, borderRadius: 999, alignItems: "center", justifyContent: "center" },
});
