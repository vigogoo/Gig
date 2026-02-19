import { useMemo } from "react";
import { View, Text, StyleSheet, FlatList, ImageBackground, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useVibe } from "@/context/VibeProvider";
import { EVENTS } from "@/constants/mock";
import { Glass } from "@/components/ui/Glass";
import { NeonGlow } from "@/components/ui/NeonGlow";
import { VibeDial } from "@/components/ui/VibeDial";

function VibeTag({ t }: { t: string }) {
  const { theme } = useVibe();
  return (
    <View style={[styles.tag, { borderColor: theme.border, backgroundColor: theme.surface2 }]}>
      <Text style={[styles.tagText, { color: theme.muted }]}>{t}</Text>
    </View>
  );
}

function CinematicCard({ item }: { item: (typeof EVENTS)[number] }) {
  const { theme } = useVibe();
  const s = useSharedValue(1);

  const aStyle = useAnimatedStyle(() => ({
    transform: [{ scale: s.value }],
  }));

  return (
    <Animated.View style={[styles.cardWrap, aStyle]}>
      <Pressable
        onPress={() => router.push(`/event/${item.id}`)}
        onPressIn={() => (s.value = withSpring(0.985, { damping: 18, stiffness: 240 }))}
        onPressOut={() => (s.value = withSpring(1, { damping: 18, stiffness: 240 }))}
        style={[styles.card, { borderColor: theme.border }]}
      >
        <ImageBackground source={{ uri: item.image }} style={styles.cardImg} imageStyle={styles.cardImgRadius}>
          <LinearGradient
            colors={theme.mode === "clean" ? ["rgba(255,255,255,0.05)", "rgba(0,0,0,0.55)"] : ["rgba(0,0,0,0.10)", "rgba(0,0,0,0.78)"]}
            style={StyleSheet.absoluteFill}
          />

          {/* allowlist / premium */}
          <View style={styles.cardTop}>
            {item.allowlist ? (
              <View style={[styles.allowlist, { borderColor: theme.accent, backgroundColor: theme.mode === "clean" ? "rgba(10,132,255,0.10)" : "rgba(0,0,0,0.35)" }]}>
                <Ionicons name="sparkles" size={14} color={theme.accent} />
                <Text style={[styles.allowText, { color: theme.text }]}>Allowlist</Text>
              </View>
            ) : (
              <View />
            )}

            <View style={[styles.price, { borderColor: theme.border, backgroundColor: "rgba(0,0,0,0.28)" }]}>
              <Text style={[styles.priceText, { color: theme.text }]}>
                {item.currency}{item.price}
              </Text>
            </View>
          </View>

          {/* bottom content */}
          <View style={styles.cardBottom}>
            <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
            <Text style={[styles.sub, { color: theme.muted }]}>
              {item.city}, {item.country} • {item.dateLabel} • {item.timeLabel}
            </Text>

            <View style={styles.tagRow}>
              {item.vibeTags.slice(0, 3).map((t) => <VibeTag key={t} t={t} />)}
            </View>

            {/* quick action bar */}
            <Glass style={{ marginTop: 12, padding: 0 }} intensity={22}>
              <View style={styles.quickRow}>
                <Pressable onPress={() => router.push(`/room/${item.id}`)} style={[styles.quickBtn, { borderColor: theme.border }]}>
                  <Ionicons name="chatbubbles-outline" size={16} color={theme.accent} />
                  <Text style={[styles.quickText, { color: theme.text }]}>Room</Text>
                </Pressable>
                <Pressable onPress={() => router.push(`/wallet`)} style={[styles.quickBtn, { borderColor: theme.border }]}>
                  <Ionicons name="wallet-outline" size={16} color={theme.accent2} />
                  <Text style={[styles.quickText, { color: theme.text }]}>Wallet</Text>
                </Pressable>
                <Pressable onPress={() => router.push(`/event/${item.id}`)} style={[styles.quickBtn, { borderColor: theme.border }]}>
                  <Ionicons name="ticket-outline" size={16} color={theme.accent} />
                  <Text style={[styles.quickText, { color: theme.text }]}>Buy</Text>
                </Pressable>
              </View>
            </Glass>
          </View>
        </ImageBackground>
      </Pressable>
    </Animated.View>
  );
}

export default function Pulse() {
  const { theme } = useVibe();

  const data = useMemo(() => EVENTS, []);

  return (
    <LinearGradient colors={theme.bg} style={{ flex: 1 }}>
      <NeonGlow />
      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
        ListHeaderComponent={
          <View style={{ gap: 14, marginBottom: 10 }}>
            <View style={styles.topRow}>
              <Text style={[styles.h1, { color: theme.text }]}>Pulse</Text>

              <Glass style={{ paddingVertical: 10, paddingHorizontal: 12 }} intensity={22}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Ionicons name="location" size={16} color={theme.accent} />
                  <Text style={{ color: theme.text, fontWeight: "900" }}>Your City</Text>
                  <Ionicons name="chevron-down" size={16} color={theme.muted} />
                </View>
              </Glass>
            </View>

            <Text style={[styles.hint, { color: theme.muted }]}>
              Discover • Join Rooms • Buy passes • Upgrade experiences
            </Text>

            <VibeDial />
          </View>
        }
        renderItem={({ item }) => <CinematicCard item={item} />}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  h1: { fontSize: 28, fontWeight: "900", letterSpacing: -0.4 },
  hint: { fontSize: 13, fontWeight: "700" },

  cardWrap: { marginBottom: 14 },
  card: { borderRadius: 24, overflow: "hidden", borderWidth: 1 },
  cardImg: { height: 420, padding: 16, justifyContent: "space-between" },
  cardImgRadius: { borderRadius: 24 },

  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  allowlist: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    height: 34,
    borderRadius: 999,
    borderWidth: 1,
  },
  allowText: { fontWeight: "900", fontSize: 12 },

  price: { paddingHorizontal: 12, height: 34, borderRadius: 999, borderWidth: 1, justifyContent: "center" },
  priceText: { fontWeight: "900", fontSize: 12 },

  cardBottom: { gap: 6 },
  title: { fontSize: 20, fontWeight: "900" },
  sub: { fontSize: 12, fontWeight: "800" },

  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 },
  tag: { paddingHorizontal: 10, height: 28, borderRadius: 999, borderWidth: 1, justifyContent: "center" },
  tagText: { fontSize: 11, fontWeight: "800" },

  quickRow: { flexDirection: "row", gap: 10 },
  quickBtn: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  quickText: { fontWeight: "900", fontSize: 12 },
});
