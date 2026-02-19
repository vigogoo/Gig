import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { useVibe } from "@/context/VibeProvider";

export default function TabLayout() {
  const { theme } = useVibe();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // ✅ Icons only
        tabBarShowLabel: false,

        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.muted,

        tabBarStyle: [
          styles.tab,
          {
            borderColor: theme.border,
          },
        ],

        tabBarBackground: () => (
          <BlurView
            intensity={28}
            tint={theme.mode === "clean" ? "light" : "dark"}
            style={[StyleSheet.absoluteFill, { backgroundColor: theme.surface2 }]}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="pulse"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pulse" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="studio"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size + 8} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="rooms"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="wallet"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
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
