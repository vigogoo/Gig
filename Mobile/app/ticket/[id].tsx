import { useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import QRCode from "react-native-qrcode-svg";

import { theme } from "@/constants/theme";
import { events } from "@/constants/events";

export default function TicketScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = events.find((e) => e.id === id) ?? events[0];

  const [mode, setMode] = useState<"image" | "qr">("image");

  const qrValue = useMemo(() => {
    return `ticket:${item.id}:${item.title}:${item.dateLabel}:${item.timeLabel}`;
  }, [item]);

  return (
    <LinearGradient colors={[theme.bgTop, theme.bgBottom]} style={styles.page}>
      <StatusBar style="light" />

      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons name="chevron-back" size={18} color={theme.text} />
        </Pressable>
        <Text style={styles.topTitle}>Tickets</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.hero}>
        <Image
          source={{
            uri:
              mode === "image"
                ? item.image
                : "https://images.unsplash.com/photo-1520975682031-ae13f0a3d3a2?auto=format&fit=crop&w=900&q=80",
          }}
          style={styles.heroImg}
        />
      </View>

      <View style={styles.ticketCard}>
        <Text style={styles.ticketTitle}>{item.title} Concert: {item.country}</Text>
        <Text style={styles.ticketDate}>{item.dateLabel}</Text>

        <View style={styles.grid}>
          <Info label="Date" value={item.dateLabel} />
          <Info label="Time" value={item.timeLabel} />
          <Info label="Venue" value={item.venue} />
          <Info label="Seat" value="No seat" />
        </View>

        <View style={styles.codeArea}>
          {mode === "qr" ? (
            <View style={styles.qrWrap}>
              <QRCode value={qrValue} size={150} />
              <Text style={styles.qrHint}>Scan to verify entry</Text>
            </View>
          ) : (
            <View style={styles.barcode}>
              <View style={styles.bars} />
              <Text style={styles.barcodeText}>000 234 991 028</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={() => setMode("image")}
          style={[styles.actionBtn, mode === "image" && styles.actionBtnActive]}
        >
          <Ionicons name="image-outline" size={18} color={mode === "image" ? "#0B0708" : theme.text} />
          <Text style={[styles.actionText, mode === "image" && styles.actionTextActive]}>Image</Text>
        </Pressable>

        <Pressable
          onPress={() => setMode("qr")}
          style={[styles.actionBtn, mode === "qr" && styles.actionBtnActive]}
        >
          <Ionicons name="qr-code-outline" size={18} color={mode === "qr" ? "#0B0708" : theme.text} />
          <Text style={[styles.actionText, mode === "qr" && styles.actionTextActive]}>QR Code</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.info}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 16 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 40,
    marginBottom: 10,
  },
  topTitle: { color: theme.text, fontWeight: "900", fontSize: 16 },
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

  hero: {
    height: 140,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.border,
    marginBottom: 12,
  },
  heroImg: { width: "100%", height: "100%" },

  ticketCard: {
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.92)",
    padding: 14,
  },
  ticketTitle: { color: "#111827", fontWeight: "900", fontSize: 14, textAlign: "center" },
  ticketDate: { color: "#6B7280", fontWeight: "800", fontSize: 12, textAlign: "center", marginTop: 4 },

  grid: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  info: { width: "48%", gap: 4 },
  infoLabel: { color: "#6B7280", fontWeight: "800", fontSize: 11 },
  infoValue: { color: "#111827", fontWeight: "900", fontSize: 12 },

  codeArea: { marginTop: 14, borderTopWidth: 1, borderTopColor: "rgba(17,24,39,0.10)", paddingTop: 14 },
  barcode: { alignItems: "center", gap: 8 },
  bars: {
    width: "100%",
    height: 44,
    borderRadius: 10,
    backgroundColor: "rgba(17,24,39,0.12)",
  },
  barcodeText: { color: "#111827", fontWeight: "900", letterSpacing: 2, fontSize: 12 },

  qrWrap: { alignItems: "center", gap: 10 },
  qrHint: { color: "#6B7280", fontWeight: "800", fontSize: 12 },

  actions: { flexDirection: "row", gap: 12, marginTop: 14 },
  actionBtn: {
    flex: 1,
    height: 52,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: theme.border,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  actionBtnActive: { backgroundColor: theme.accent, borderColor: theme.accent },
  actionText: { color: theme.text, fontWeight: "900" },
  actionTextActive: { color: "#0B0708" },
});
