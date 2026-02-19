import { View, Text, StyleSheet, ImageBackground, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import { useVibe } from "@/context/VibeProvider";
import { events } from "@/constants/events";

export default function EventDetails() {
  const { theme } = useVibe();
  const { id } = useLocalSearchParams<{ id: string }>();

  const item = events?.find((e: any) => e.id === id) ?? events?.[0];

  if (!item) {
    return (
      <LinearGradient colors={theme.bg} style={{ flex: 1, padding: 16, paddingTop: 60 }}>
        <StatusBar style={theme.mode === "clean" ? "dark" : "light"} />
        <Text style={{ color: theme.text, fontWeight: "900", fontSize: 18 }}>No events found</Text>
      </LinearGradient>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.mode === "clean" ? "#fff" : "#000" }}>
      <StatusBar style={theme.mode === "clean" ? "dark" : "light"} />

      {/* HERO */}
      <ImageBackground source={{ uri: item.image }} style={styles.hero}>
        <LinearGradient
          colors={[
            "rgba(0,0,0,0.10)",
            theme.mode === "clean" ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.82)",
          ]}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.heroTop}>
          <Pressable
            onPress={() => router.back()}
            style={[
              styles.heroBtn,
              { borderColor: theme.border, backgroundColor: "rgba(0,0,0,0.28)" },
            ]}
          >
            <Ionicons name="chevron-back" size={18} color={theme.text} />
          </Pressable>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable
              style={[
                styles.heroBtn,
                { borderColor: theme.border, backgroundColor: "rgba(0,0,0,0.28)" },
              ]}
            >
              <Ionicons name="heart-outline" size={18} color={theme.text} />
            </Pressable>

            <Pressable
              style={[
                styles.heroBtn,
                { borderColor: theme.border, backgroundColor: "rgba(0,0,0,0.28)" },
              ]}
            >
              <Ionicons name="share-outline" size={18} color={theme.text} />
            </Pressable>
          </View>
        </View>

        <View style={styles.heroBottom}>
          <Text style={[styles.heroTitle, { color: theme.text }]}>{item.title}</Text>
          <Text style={[styles.heroSub, { color: theme.muted }]}>
            {item.city}, {item.country}
          </Text>

          <View
            style={[
              styles.pricePill,
              { borderColor: theme.border, backgroundColor: "rgba(255,255,255,0.12)" },
            ]}
          >
            <Text style={[styles.priceText, { color: theme.text }]}>
              {item.currency}
              {Number(item.price).toFixed(2)}
            </Text>
          </View>
        </View>
      </ImageBackground>

      {/* BODY */}
      <LinearGradient colors={theme.bg} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.body}>
          <View style={styles.metaRow}>
            <View
              style={[
                styles.metaItem,
                { backgroundColor: theme.surface2, borderColor: theme.border },
              ]}
            >
              <Ionicons name="calendar-outline" size={16} color={theme.muted} />
              <Text style={[styles.metaText, { color: theme.text }]}>{item.dateLabel}</Text>
            </View>

            <View
              style={[
                styles.metaItem,
                { backgroundColor: theme.surface2, borderColor: theme.border },
              ]}
            >
              <Ionicons name="time-outline" size={16} color={theme.muted} />
              <Text style={[styles.metaText, { color: theme.text }]}>{item.timeLabel}</Text>
            </View>
          </View>

          <Text style={[styles.section, { color: theme.text }]}>About this event</Text>
          <Text style={[styles.paragraph, { color: theme.muted }]}>{item.description}</Text>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.descRow}>
            <Text style={[styles.section, { color: theme.text }]}>Description</Text>

            <View
              style={[
                styles.rating,
                { borderColor: theme.border, backgroundColor: theme.surface2 },
              ]}
            >
              <Ionicons name="star" size={14} color={theme.accent} />
              <Text style={[styles.ratingText, { color: theme.text }]}>
                {Number(item.rating ?? 4.8).toFixed(1)}
              </Text>
            </View>
          </View>

          <View style={styles.bullets}>
            <View style={styles.bulletLine}>
              <Ionicons name="checkmark-circle-outline" size={16} color={theme.muted} />
              <Text style={[styles.bulletText, { color: theme.muted }]}>
                Doors open 1 hour before the event.
              </Text>
            </View>
            <View style={styles.bulletLine}>
              <Ionicons name="checkmark-circle-outline" size={16} color={theme.muted} />
              <Text style={[styles.bulletText, { color: theme.muted }]}>
                Bring a valid ID for entry verification.
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => router.push(`/ticket/${item.id}`)}
            style={[
              styles.cta,
              { backgroundColor: theme.accent, borderColor: theme.border },
            ]}
          >
            <Text
              style={[
                styles.ctaText,
                { color: theme.mode === "clean" ? "#fff" : "#0B0708" },
              ]}
            >
              Get a Ticket
            </Text>
          </Pressable>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { height: 360, justifyContent: "space-between" },
  heroTop: {
    paddingTop: 54,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heroBottom: { padding: 16, gap: 6 },
  heroTitle: { fontWeight: "900", fontSize: 22 },
  heroSub: { fontWeight: "800" },

  pricePill: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: "center",
  },
  priceText: { fontWeight: "900", fontSize: 12 },

  body: { padding: 16, gap: 12, paddingBottom: 110 },
  metaRow: { flexDirection: "row", gap: 12 },
  metaItem: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 14,
    borderWidth: 1,
  },
  metaText: { fontWeight: "800", fontSize: 12 },

  section: { fontWeight: "900", fontSize: 16 },
  paragraph: { fontWeight: "700", lineHeight: 20 },

  divider: { height: 1, marginVertical: 6 },

  descRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  rating: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 999,
    borderWidth: 1,
  },
  ratingText: { fontWeight: "900", fontSize: 12 },

  bullets: { gap: 10 },
  bulletLine: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  bulletText: { flex: 1, fontWeight: "700", lineHeight: 20 },

  cta: {
    marginTop: 8,
    height: 52,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  ctaText: { fontWeight: "900", fontSize: 15 },
});
