export type MatchType = {
  id: number;
  title: string;
  description: string;
  image: string;
  eventDate: string;
  category: string;
  location: string;
  status: "live" | "upcoming";
};

export const matches: MatchType[] = [
  {
    id: 1,
    title: "Final Futsal Go2Gor Cup 2025",
    description:
      "Pertandingan final futsal paling bergengsi tahun ini! Saksikan langsung aksi seru dua tim terbaik memperebutkan gelar juara.",
    image: "https://picsum.photos/seed/live-futsal/500/300",
    eventDate: new Date().toISOString(),
    category: "Futsal",
    location: "Go2Gor Arena, Jakarta",
    status: "live",
  },
  {
    id: 2,
    title: "Semi Final Badminton Championship",
    description:
      "Dua pasangan terbaik akan bertanding memperebutkan tiket ke babak final.",
    image: "https://picsum.photos/seed/badminton-semi/500/300",
    eventDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 jam lagi
    category: "Badminton",
    location: "Go2Gor Center, Bandung",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Kompetisi Basket 3x3",
    description:
      "Aksi seru tim basket muda dalam format 3 lawan 3. Siapakah yang akan jadi juara?",
    image: "https://picsum.photos/seed/basket-3x3/500/300",
    eventDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // besok
    category: "Basket",
    location: "GOR Nusantara, Depok",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Turnamen Tenis Junior",
    description:
      "Pertandingan tenis junior tingkat nasional, menampilkan bakat-bakat muda terbaik.",
    image: "https://picsum.photos/seed/tenis-junior/500/300",
    eventDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 hari lagi
    category: "Tenis",
    location: "GOR Sakura, Tangerang",
    status: "upcoming",
  },
  {
    id: 5,
    title: "Friendly Match Futsal Komunitas",
    description:
      "Pertandingan persahabatan antar komunitas futsal se-Jabodetabek.",
    image: "https://picsum.photos/seed/futsal-friendly/500/300",
    eventDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 hari lagi
    category: "Futsal",
    location: "Cempaka Arena, Jakarta Timur",
    status: "upcoming",
  },
];
