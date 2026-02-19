import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { VibeProvider, useVibe } from "@/context/VibeProvider";

function TabsInner() {
  const { theme } = useVibe();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [styles.tab, { borderColor: theme.border }],
        tabBarBackground: () => (
          <BlurView
            intensity={28}
            tint={theme.mode === "clean" ? "light" : "dark"}
            style={[StyleSheet.absoluteFill, { backgroundColor: theme.surface2 }]}
          />
        ),
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.muted,
      }}
    >
      <Tabs.Screen name="pulse" options={{ tabBarIcon: ({ color, size }) => <Ionicons name="pulse" size={size} color={color} /> }} />
      <Tabs.Screen name="map" options={{ tabBarIcon: ({ color, size }) => <Ionicons name="map-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="studio" options={{ tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={size + 6} color={color} /> }} />
      <Tabs.Screen name="rooms" options={{ tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="wallet" options={{ tabBarIcon: ({ color, size }) => <Ionicons name="wallet-outline" size={size} color={color} /> }} />
    </Tabs>
  );
}

export default function TabLayout() {
  // ✅ extra-safe: tabs also get provider
  return (
    <VibeProvider>
      <TabsInner />
    </VibeProvider>
  );
}

const styles = StyleSheet.create({
  tab: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 14,
    height: 64,
    borderRadius: 26,
    borderWidth: 1,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
});
