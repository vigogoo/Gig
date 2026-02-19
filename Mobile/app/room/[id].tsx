import { useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, router } from "expo-router";
import { useVibe } from "@/context/VibeProvider";
import { Glass } from "@/components/ui/Glass";

const TABS = ["Updates", "Chat", "Lineup", "Perks", "Info"] as const;

export default function Room() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useVibe();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Chat");

  const mock = useMemo(
    () => [
      { id: "1", user: "Maya", msg: "What’s the dress code?" },
      { id: "2", user: "Kojo", msg: "Anyone doing a meetup before doors open?" },
      { id: "3", user: "Amir", msg: "Lineup drop is insane 🔥" },
    ],
    []
  );

  return (
    <LinearGradient colors={theme.bg} style={{ flex: 1 }}>
      <View style={{ padding: 16, paddingTop: 60, gap: 12 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Pressable onPress={() => router.back()}><Text style={{ color: theme.accent, fontWeight: "900" }}>Back</Text></Pressable>
          <Text style={{ color: theme.text, fontWeight: "900" }}>Room</Text>
          <View style={{ width: 44 }} />
        </View>

        <Glass>
          <Text style={{ color: theme.text, fontWeight: "900", fontSize: 16 }}>Event Room</Text>
          <Text style={{ color: theme.muted, fontWeight: "700", marginTop: 6 }} numberOfLines={1}>
            {id} • updates + chat + perks live here
          </Text>

          <View style={styles.tabs}>
            {TABS.map((t) => {
              const active = t === tab;
              return (
                <Pressable
                  key={t}
                  onPress={() => setTab(t)}
                  style={[
                    styles.tab,
                    { borderColor: theme.border },
                    active && { backgroundColor: theme.mode === "clean" ? "rgba(10,132,255,0.10)" : "rgba(255,255,255,0.08)", borderColor: theme.accent },
                  ]}
                >
                  <Text style={{ color: active ? theme.text : theme.muted, fontWeight: "900", fontSize: 12 }}>{t}</Text>
                </Pressable>
              );
            })}
          </View>
        </Glass>
      </View>

      {tab === "Chat" ? (
        <>
          <FlatList
            data={mock}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
            renderItem={({ item }) => (
              <Glass style={{ marginBottom: 10 }}>
                <Text style={{ color: theme.text, fontWeight: "900" }}>{item.user}</Text>
                <Text style={{ color: theme.muted, fontWeight: "700", marginTop: 6 }}>{item.msg}</Text>
              </Glass>
            )}
          />
          <View style={[styles.inputBar, { borderColor: theme.border, backgroundColor: theme.surface2 }]}>
            <TextInput
              placeholder="Say something…"
              placeholderTextColor={theme.muted}
              style={{ flex: 1, color: theme.text, fontWeight: "700" }}
            />
            <Pressable style={[styles.send, { backgroundColor: theme.accent }]}>
              <Text style={{ fontWeight: "900", color: theme.mode === "clean" ? "#fff" : "#0B0708" }}>Send</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <View style={{ padding: 16 }}>
          <Glass>
            <Text style={{ color: theme.text, fontWeight: "900" }}>{tab}</Text>
            <Text style={{ color: theme.muted, fontWeight: "700", marginTop: 6 }}>
              We’ll build this section next (real data + rich UI).
            </Text>
          </Glass>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  tabs: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 },
  tab: { paddingHorizontal: 12, height: 34, borderRadius: 999, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  inputBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 92,
    flexDirection: "row",
    gap: 10,
    padding: 10,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
  },
  send: { height: 40, paddingHorizontal: 14, borderRadius: 14, alignItems: "center", justifyContent: "center" },
});
