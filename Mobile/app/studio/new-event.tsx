import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useVibe } from "@/context/VibeProvider";
import { router } from "expo-router";
import { Glass } from "@/components/ui/Glass";

export default function NewEvent() {
  const { theme } = useVibe();

  return (
    <LinearGradient colors={theme.bg} style={{ flex: 1, padding: 16, paddingTop: 60 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Pressable onPress={() => router.back()}><Text style={{ color: theme.accent, fontWeight: "900" }}>Back</Text></Pressable>
        <Text style={{ color: theme.text, fontWeight: "900" }}>Create Event</Text>
        <View style={{ width: 44 }} />
      </View>

      <Glass style={{ marginTop: 16 }}>
        <Text style={{ color: theme.text, fontWeight: "900", fontSize: 16 }}>Event Basics</Text>

        <Label t="Title" />
        <Input themeMode={theme.mode} placeholder="e.g. Aurum Gala Night" />

        <Label t="Venue" />
        <Input themeMode={theme.mode} placeholder="e.g. Skyline Atrium" />

        <Label t="Date & time" />
        <Input themeMode={theme.mode} placeholder="e.g. Sat, 12 Apr • 9:00 PM" />

        <Label t="Ticketing" />
        <Input themeMode={theme.mode} placeholder="e.g. Early bird $80, Regular $120" />

        <Pressable style={[styles.cta, { backgroundColor: theme.accent }]}>
          <Text style={{ fontWeight: "900", color: theme.mode === "clean" ? "#fff" : "#0B0708" }}>Publish</Text>
        </Pressable>
      </Glass>
    </LinearGradient>
  );
}

function Label({ t }: { t: string }) {
  const { theme } = useVibe();
  return <Text style={{ marginTop: 12, color: theme.muted, fontWeight: "800", fontSize: 11 }}>{t}</Text>;
}

function Input({ placeholder, themeMode }: { placeholder: string; themeMode: string }) {
  const { theme } = useVibe();
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={theme.muted}
      style={{
        marginTop: 8,
        height: 46,
        borderRadius: 14,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: theme.border,
        color: theme.text,
        backgroundColor: themeMode === "clean" ? "rgba(15,23,42,0.03)" : "rgba(255,255,255,0.06)",
        fontWeight: "800",
      }}
    />
  );
}

const styles = StyleSheet.create({
  cta: { marginTop: 16, height: 52, borderRadius: 16, alignItems: "center", justifyContent: "center" },
});
