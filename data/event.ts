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
  "Turnamen Futsal Antar Komunitas",
  "Latihan Bersama Bulutangkis",
  "Kompetisi Basket 3x3",
];

const eventDescriptions = [
  "Ikuti keseruan olahraga bareng komunitas dan raih hadiah menarik!",
  "Asah kemampuanmu dan jalin silaturahmi dengan sesama pecinta olahraga.",
  "Ayo bergerak, sehat bersama, dan nikmati momen kebersamaan!",
  "Ikuti keseruan olahraga bareng komunitas dan raih hadiah menarik!",
  "Asah kemampuanmu dan jalin silaturahmi dengan sesama pecinta olahraga.",
  "Ayo bergerak, sehat bersama, dan nikmati momen kebersamaan!",
];

const eventCategories = [
  // New array for categories
  "Futsal",
  "Badminton",
  "Futsal",
  "Badminton",
];

const eventLocations = [
  // New array for locations
  "Lapangan Futsal A",
  "Lapangan Futsal B",
  "Lapangan Futsal C",
];

// ✅ 3 Event Terdekat (data baru unik)
export const dummyEvents: EventType[] = [
  {
    id: 101,
    title: "Festival Olahraga Keluarga",
    description:
      "Ajak keluarga berolahraga bersama dan nikmati berbagai lomba seru!",
    image: "https://picsum.photos/seed/event-family/500/300",
    slug: "festival-olahraga-keluarga",
    eventDate: new Date("2025-08-15T09:00:00Z").toISOString(),
    createdAt: new Date("2025-08-10T10:00:00Z").toISOString(),
    category: "Family",
    location: "Lapangan Serbaguna 1",
  },
  {
    id: 102,
    title: "Liga Futsal Pelajar",
    description:
      "Kompetisi futsal antar pelajar se-kota, rebut piala bergengsi!",
    image: "https://picsum.photos/seed/event-futsal/500/300",
    slug: "liga-futsal-pelajar",
    eventDate: new Date("2025-08-17T14:00:00Z").toISOString(),
    createdAt: new Date("2025-08-12T11:00:00Z").toISOString(),
    category: "Futsal",
    location: "Lapangan Futsal A",
  },
  {
    id: 103,
    title: "Open Tournament Badminton",
    description: "Turnamen terbuka untuk semua usia, hadiah jutaan rupiah!",
    image: "https://picsum.photos/seed/event-badminton/500/300",
    slug: "open-tournament-badminton",
    eventDate: new Date("2025-08-20T08:00:00Z").toISOString(),
    createdAt: new Date("2025-08-13T12:00:00Z").toISOString(),
    category: "Badminton",
    location: "Lapangan Badminton B",
  },
  {
    id: 104,
    title: "Fun Run 5K Kota Gor",
    description:
      "Lomba lari santai 5 kilometer, terbuka untuk umum. Dapatkan medali finisher!",
    image: "https://picsum.photos/seed/event-funrun/500/300",
    slug: "fun-run-5k-kota-gor",
    eventDate: new Date("2025-08-22T06:00:00Z").toISOString(),
    createdAt: new Date("2025-08-14T09:00:00Z").toISOString(),
    category: "Lari",
    location: "GOR Kota Gor Lapangan Utama",
  },
  {
    id: 105,
    title: "Turnamen Tenis Meja Antar RT",
    description: "Kompetisi tenis meja seru antar RT, rebutkan piala bergilir!",
    image: "https://picsum.photos/seed/event-tenismeja/500/300",
    slug: "turnamen-tenis-meja-antar-rt",
    eventDate: new Date("2025-08-25T10:00:00Z").toISOString(),
    createdAt: new Date("2025-08-15T13:00:00Z").toISOString(),
    category: "Tenis Meja",
    location: "Aula RW 05",
  },
];
