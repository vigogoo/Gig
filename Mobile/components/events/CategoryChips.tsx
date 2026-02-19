import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { useVibe } from "@/context/VibeProvider";

const chips = ["My feed", "Food", "Concerts"];

export function CategoryChips({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: string) => void;
}) {
  const { theme } = useVibe();

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
                { borderColor: theme.border, backgroundColor: theme.surface2 },
                isActive && {
                  backgroundColor: theme.accentSoft,
                  borderColor: theme.accent,
                },
              ]}
            >
              <Text style={[styles.text, { color: isActive ? theme.text : theme.muted }]}>
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
    borderWidth: 1,
  },
  text: { fontSize: 13, fontWeight: "600" },
});
