export type EventType = {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
  eventDate: string;
  createdAt: string;
  category: string; // Added
  location: string; // Added
};

// ✅ Dummy Images
const randomImages = Array.from(
  { length: 10 },
  (_, i) => `https://picsum.photos/seed/event-${i + 1}/500/300`
);

const eventTitles = [
  "Turnamen Futsal Antar Komunitas",
  "Latihan Bersama Bulutangkis",
  "Kompetisi Basket 3x3",
];

const eventDescriptions = [
  "Ikuti keseruan olahraga bareng komunitas dan raih hadiah menarik!",
  "Asah kemampuanmu dan jalin silaturahmi dengan sesama pecinta olahraga.",
  "Ayo bergerak, sehat bersama, dan nikmati momen kebersamaan!",
];

const eventCategories = [
  // New array for categories
  "Futsal",
  "Badminton",
];

const eventLocations = [
  // New array for locations
  "Lapangan Futsal A",
];

// ✅ Semua Event
export const dummyEvents: EventType[] = Array.from({ length: 10 }, (_, i) => {
  const baseDate = new Date("2025-08-11T00:00:00Z"); // Fixed base date

  const futureDate = new Date(baseDate.getTime());
  futureDate.setDate(baseDate.getDate() + i * 2); // Event every 2 days

  const pastDate = new Date(baseDate.getTime());
  pastDate.setDate(baseDate.getDate() - i * 3); // Created every 3 days ago

  return {
    id: i + 1,
    title: eventTitles[i % eventTitles.length],
    description: eventDescriptions[i % eventDescriptions.length],
    image: randomImages[i],
    slug: eventTitles[i % eventTitles.length]
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, ""),
    eventDate: futureDate.toISOString(),
    createdAt: pastDate.toISOString(),
    category: eventCategories[i % eventCategories.length], // Added
    location: eventLocations[i % eventLocations.length], // Added
  };
});
