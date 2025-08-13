export type LapanganType = {
  id: number;
  name: string;
  venue: string;
  sport: "Futsal" | "Badminton" | "Tenis";
  image: string;
  price: number;
  features: string[];
  gallery: string[];
  description: string;
};

export const dummyFields: LapanganType[] = [
  {
    id: 1,
    name: "Futsal Arena A",
    venue: "Go2Gor Arena, Jakarta",
    sport: "Futsal",
    image: "https://picsum.photos/seed/futsal-arena-a/1200/800",
    price: 150000,
    features: [
      "Rumput Sintetis",
      "Standar FIFA",
      "Lampu LED",
      "Kantin",
      "Mushola",
    ],
    gallery: [
      "https://picsum.photos/seed/futsal-a-1/600/400",
      "https://picsum.photos/seed/futsal-a-2/600/400",
      "https://picsum.photos/seed/futsal-a-3/600/400",
      "https://picsum.photos/seed/futsal-a-4/600/400",
    ],
    description:
      "Lapangan futsal dengan rumput sintetis kualitas terbaik, cocok untuk pertandingan serius maupun latihan rutin. Pencahayaan LED terang memastikan visibilitas maksimal di malam hari.",
  },
  {
    id: 2,
    name: "Futsal Arena B",
    venue: "Go2Gor Arena, Jakarta",
    sport: "Futsal",
    image: "https://picsum.photos/seed/futsal-arena-b/1200/800",
    price: 125000,
    features: ["Lantai Interlock", "Papan Skor Digital", "Area Parkir Luas"],
    gallery: [
      "https://picsum.photos/seed/futsal-b-1/600/400",
      "https://picsum.photos/seed/futsal-b-2/600/400",
      "https://picsum.photos/seed/futsal-b-3/600/400",
    ],
    description:
      "Lapangan futsal interlock yang responsif dan aman untuk pergelangan kaki. Dilengkapi papan skor digital untuk pengalaman bermain yang lebih profesional.",
  },
  {
    id: 3,
    name: "Badminton Court 1",
    venue: "Go2Gor Center, Bandung",
    sport: "Badminton",
    image: "https://picsum.photos/seed/badminton-court-1/1200/800",
    price: 75000,
    features: ["Karpet Vinyl", "Standar BWF", "Lampu LED", "Sewa Raket & Kok"],
    gallery: [
      "https://picsum.photos/seed/badminton-1-1/600/400",
      "https://picsum.photos/seed/badminton-1-2/600/400",
      "https://picsum.photos/seed/badminton-1-3/600/400",
    ],
    description:
      "Lapangan badminton dengan karpet vinyl standar BWF yang memberikan cengkeraman optimal. Tersedia penyewaan peralatan berkualitas bagi yang tidak membawa.",
  },
  {
    id: 4,
    name: "Badminton Court 2",
    venue: "Go2Gor Center, Bandung",
    sport: "Badminton",
    image: "https://picsum.photos/seed/badminton-court-2/1200/800",
    price: 85000,
    features: ["Karpet Vinyl", "Papan Skor Digital", "Tribune Penonton"],
    gallery: [
      "https://picsum.photos/seed/badminton-2-1/600/400",
      "https://picsum.photos/seed/badminton-2-2/600/400",
      "https://picsum.photos/seed/badminton-2-3/600/400",
      "https://picsum.photos/seed/badminton-2-4/600/400",
    ],
    description:
      "Nikmati permainan badminton di lapangan modern dengan papan skor digital dan tribune penonton yang nyaman. Cocok untuk fun game maupun turnamen kecil.",
  },
];
