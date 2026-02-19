import { useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { theme } from "@/constants/theme";
import { events } from "@/constants/events";
import { SearchBar } from "@/components/events/SearchBar";
import { CategoryChips } from "@/components/events/CategoryChips";
import { EventCard } from "@/components/events/EventCard";

export default function HomeScreen() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("My feed");

  const data = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return events;
    return events.filter((e) => e.title.toLowerCase().includes(needle));
  }, [q]);

  return (
    <LinearGradient colors={[theme.bgTop, theme.bgBottom]} style={styles.page}>
      <StatusBar style="light" />
      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={{ gap: 14 }}>
            <View style={styles.header}>
              <Pressable style={styles.iconBtn}>
                <Ionicons name="menu" size={18} color={theme.text} />
              </Pressable>

              <Pressable style={styles.location}>
                <Ionicons name="location" size={16} color={theme.accent} />
                <Text style={styles.locationText}>Jakarta, Ina</Text>
                <Ionicons name="chevron-down" size={16} color={theme.muted} />
              </Pressable>

              <Image
                source={{ uri: "https://i.pravatar.cc/100?img=12" }}
                style={styles.avatar}
              />
            </View>

            <SearchBar value={q} onChangeText={setQ} />

            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Upcoming events</Text>
              <Text style={styles.sectionLink}>See All</Text>
            </View>

            <CategoryChips active={cat} onChange={setCat} />
          </View>
        }
        renderItem={({ item }) => (
          <EventCard item={item} onPress={() => router.push(`/event/${item.id}`)} />
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  content: { padding: 16, paddingBottom: 24 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: theme.card2,
    borderWidth: 1,
    borderColor: theme.border,
    alignItems: "center",
    justifyContent: "center",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 14,
    backgroundColor: theme.card2,
    borderWidth: 1,
    borderColor: theme.border,
  },
  locationText: { color: theme.text, fontWeight: "800", fontSize: 13 },
  avatar: { width: 40, height: 40, borderRadius: 14, borderWidth: 1, borderColor: theme.border },
  sectionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 },
  sectionTitle: { color: theme.text, fontWeight: "900", fontSize: 16 },
  sectionLink: { color: theme.muted, fontWeight: "800", fontSize: 12 },
});
