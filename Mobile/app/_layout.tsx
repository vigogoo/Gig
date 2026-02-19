import { Slot } from "expo-router";
import { VibeProvider } from "@/context/VibeProvider";

export default function RootLayout() {
  return (
    <VibeProvider>
      <Slot />
    </VibeProvider>
  );
}
