export type EventItem = {
  id: string;
  title: string;
  city: string;
  country: string;
  venue: string;
  dateLabel: string; // e.g. "29 December 2022"
  timeLabel: string; // e.g. "10:00 PM"
  price: number;
  currency: string; // "$"
  rating: number;   // 0-5
  image: string;    // remote for now
  description: string;
};

export const events: EventItem[] = [
  {
    id: "oliver-tree",
    title: "Oliver Tree",
    city: "Jakarta",
    country: "Indonesia",
    venue: "Gelora Bung Karno",
    dateLabel: "29 December 2022",
    timeLabel: "10:00 PM",
    price: 45.9,
    currency: "$",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    description:
      "About this event is a 100% list of songs. Forget it. When I'm Down, I'll Hate and Life Goes On which will be sung on the Bung Karno stage.",
  },
  {
    id: "neon-fest",
    title: "Neon Fest",
    city: "Jakarta",
    country: "Indonesia",
    venue: "Downtown Arena",
    dateLabel: "22 December 2022",
    timeLabel: "8:00 PM",
    price: 32.0,
    currency: "$",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
    description:
      "A high-energy night of lights, music, and headliners across multiple stages.",
  },
];
