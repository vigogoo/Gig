import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { theme } from "@/constants/theme";

const chips = ["My feed", "Food", "Concerts"];

export function CategoryChips({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.row}>
        {chips.map((c) => {
          const isActive = c === active;
          return (
            <Pressable
              key={c}
              onPress={() => onChange(c)}
              style={[
                styles.chip,
                isActive && { backgroundColor: theme.accentSoft, borderColor: theme.accent },
              ]}
            >
              <Text style={[styles.text, isActive && { color: theme.text }]}>
                {c}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 10, paddingVertical: 10 },
  chip: {
    paddingHorizontal: 14,
    height: 34,
    borderRadius: 999,
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  text: { color: theme.muted, fontSize: 13, fontWeight: "600" },
});
