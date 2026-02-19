import { View, Text, StyleSheet, ImageBackground, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import { theme } from "@/constants/theme";
import { events } from "@/constants/events";

export default function EventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = events.find((e) => e.id === id) ?? events[0];

  return (
    <View style={{ flex: 1, backgroundColor: theme.bgBottom }}>
      <StatusBar style="light" />

      <ImageBackground source={{ uri: item.image }} style={styles.hero}>
        <LinearGradient
          colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,0.85)"]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.heroTop}>
          <Pressable onPress={() => router.back()} style={styles.heroBtn}>
            <Ionicons name="chevron-back" size={18} color={theme.text} />
          </Pressable>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable style={styles.heroBtn}>
              <Ionicons name="heart-outline" size={18} color={theme.text} />
            </Pressable>
            <Pressable style={styles.heroBtn}>
              <Ionicons name="share-outline" size={18} color={theme.text} />
            </Pressable>
          </View>
        </View>

        <View style={styles.heroBottom}>
          <Text style={styles.heroTitle}>{item.title}</Text>
          <Text style={styles.heroSub}>
            {item.city}, {item.country}
          </Text>

          <View style={styles.pricePill}>
            <Text style={styles.priceText}>
              {item.currency}
              {item.price.toFixed(2)}
            </Text>
          </View>
        </View>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={16} color={theme.muted} />
            <Text style={styles.metaText}>{item.dateLabel}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color={theme.muted} />
            <Text style={styles.metaText}>{item.timeLabel}</Text>
          </View>
        </View>

        <Text style={styles.section}>About this event</Text>
        <Text style={styles.paragraph}>{item.description}</Text>

        <View style={styles.divider} />

        <View style={styles.descRow}>
          <Text style={styles.section}>Description</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color={theme.accent} />
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
          </View>
        </View>

        <View style={styles.bullets}>
          <View style={styles.bulletLine}>
            <Ionicons name="checkmark-circle-outline" size={16} color={theme.muted} />
            <Text style={styles.bulletText}>{item.title} singing is {item.dateLabel} at {item.timeLabel}</Text>
          </View>
          <View style={styles.bulletLine}>
            <Ionicons name="checkmark-circle-outline" size={16} color={theme.muted} />
            <Text style={styles.bulletText}>Meet and greet with other fans after show</Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.push(`/ticket/${item.id}`)}
          style={styles.cta}
        >
          <Text style={styles.ctaText}>Get a Ticket</Text>
        </Pressable>
      </ScrollView>
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
    backgroundColor: "rgba(0,0,0,0.35)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroBottom: { padding: 16, gap: 6 },
  heroTitle: { color: theme.text, fontWeight: "900", fontSize: 22 },
  heroSub: { color: theme.muted, fontWeight: "800" },
  pricePill: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
  },
  priceText: { color: theme.text, fontWeight: "900", fontSize: 12 },

  body: { padding: 16, gap: 12, paddingBottom: 22 },
  metaRow: { flexDirection: "row", gap: 12 },
  metaItem: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 14,
    backgroundColor: theme.card2,
    borderWidth: 1,
    borderColor: theme.border,
  },
  metaText: { color: theme.text, fontWeight: "800", fontSize: 12 },

  section: { color: theme.text, fontWeight: "900", fontSize: 16 },
  paragraph: { color: theme.muted, fontWeight: "700", lineHeight: 20 },

  divider: { height: 1, backgroundColor: "rgba(255,255,255,0.10)", marginVertical: 6 },

  descRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  rating: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  ratingText: { color: theme.text, fontWeight: "900", fontSize: 12 },

  bullets: { gap: 10 },
  bulletLine: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  bulletText: { flex: 1, color: theme.muted, fontWeight: "700", lineHeight: 20 },

  cta: {
    marginTop: 8,
    height: 52,
    borderRadius: 18,
    backgroundColor: theme.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: { color: "#0B0708", fontWeight: "900", fontSize: 15 },
});
