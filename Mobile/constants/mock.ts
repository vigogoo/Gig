export type EventItem = {
  id: string;
  title: string;
  city: string;
  country: string;
  venue: string;
  dateLabel: string;
  timeLabel: string;
  price: number;
  currency: string;
  vibeTags: string[];
  image: string;
  allowlist?: boolean;
};

export const EVENTS: EventItem[] = [
  {
    id: "aurum-gala",
    title: "Aurum Gala Night",
    city: "Nairobi",
    country: "Kenya",
    venue: "Skyline Atrium",
    dateLabel: "Sat, 12 Apr",
    timeLabel: "9:00 PM",
    price: 120,
    currency: "$",
    vibeTags: ["Black Tie", "VIP Tables", "Champagne"],
    allowlist: true,
    image: "https://images.unsplash.com/photo-1521334726092-b509a19597c1?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "neon-rave",
    title: "Neon Rave: District 7",
    city: "Accra",
    country: "Ghana",
    venue: "Dockyard Arena",
    dateLabel: "Fri, 22 Mar",
    timeLabel: "11:30 PM",
    price: 35,
    currency: "$",
    vibeTags: ["Glow", "Headliners", "Afterparty"],
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "design-week",
    title: "Design Week — Minimal Futures",
    city: "Lagos",
    country: "Nigeria",
    venue: "The White Hall",
    dateLabel: "Thu, 30 May",
    timeLabel: "6:00 PM",
    price: 15,
    currency: "$",
    vibeTags: ["Talks", "Networking", "Gallery"],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
  },
];

export const ROOMS = [
  { id: "aurum-gala", title: "Aurum Gala Night", live: true, members: 1240 },
  { id: "neon-rave", title: "Neon Rave: District 7", live: false, members: 892 },
  { id: "design-week", title: "Design Week — Minimal Futures", live: false, members: 402 },
];
