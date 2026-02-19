import { View, Text, Pressable, StyleSheet } from "react-native";
import { useVibe } from "@/context/VibeProvider";
import { VIBES } from "@/constants/vibes";

export function VibeDial() {
  const { mode, setMode, theme } = useVibe();

  return (
    <View style={[styles.row, { borderColor: theme.border, backgroundColor: theme.surface }]}>
      {VIBES.map((v) => {
        const active = v.key === mode;
        return (
          <Pressable
            key={v.key}
            onPress={() => setMode(v.key)}
            style={[
              styles.chip,
              active && {
                backgroundColor: theme.mode === "clean" ? "rgba(10,132,255,0.10)" : "rgba(255,255,255,0.08)",
                borderColor: active ? theme.accent : theme.border,
              },
            ]}
          >
            <Text style={[styles.label, { color: active ? theme.text : theme.muted }]}>{v.label}</Text>
            <Text style={[styles.sub, { color: theme.muted }]} numberOfLines={1}>
              {v.subtitle}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
    borderRadius: 18,
    borderWidth: 1,
  },
  chip: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "transparent",
  },
  label: { fontWeight: "900", fontSize: 12 },
  sub: { fontWeight: "700", fontSize: 10, marginTop: 2 },
});
