import { View, Text, ImageBackground, StyleSheet, Pressable } from "react-native";
import { theme } from "@/constants/theme";
import type { EventItem } from "@/constants/events";

export function EventCard({
  item,
  onPress,
}: {
  item: EventItem;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <ImageBackground source={{ uri: item.image }} style={styles.img} imageStyle={styles.imgRadius}>
        <View style={styles.overlay} />
        <View style={styles.topRow}>
          <View style={styles.datePill}>
            <Text style={styles.dateDay}>{item.dateLabel.split(" ")[0]}</Text>
            <Text style={styles.dateMon}>{item.dateLabel.split(" ")[1]}</Text>
          </View>
          <View style={styles.pricePill}>
            <Text style={styles.priceText}>
              {item.currency}
              {item.price.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.sub}>
            {item.city} {item.country ? `• ${item.country}` : ""} • {item.timeLabel}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.card2,
    marginBottom: 12,
  },
  img: { height: 190, padding: 14, justifyContent: "space-between" },
  imgRadius: { borderRadius: 18 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  datePill: {
    width: 44,
    height: 52,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.35)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  dateDay: { color: theme.text, fontWeight: "900", fontSize: 14, lineHeight: 16 },
  dateMon: { color: theme.muted, fontWeight: "800", fontSize: 12, marginTop: 2 },
  pricePill: {
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
  },
  priceText: { color: theme.text, fontWeight: "900", fontSize: 12 },
  bottom: { gap: 4 },
  title: { color: theme.text, fontWeight: "900", fontSize: 16 },
  sub: { color: theme.muted, fontWeight: "700", fontSize: 12 },
});
