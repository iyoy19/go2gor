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
  {
    id: 5,
    name: "Victory Futsal",
    venue: "Go2Gor Stadium, Surabaya",
    sport: "Futsal",
    image: "https://picsum.photos/seed/victory-futsal/1200/800",
    price: 175000,
    features: [
      "Rumput Sintetis Premium",
      "Standar Internasional",
      "Kamera CCTV",
      "Locker Room",
    ],
    gallery: [
      "https://picsum.photos/seed/victory-1/600/400",
      "https://picsum.photos/seed/victory-2/600/400",
    ],
    description:
      "Rasakan sensasi bermain di lapangan standar internasional. Victory Futsal menawarkan fasilitas premium untuk pengalaman bermain futsal yang tak terlupakan.",
  },
  {
    id: 6,
    name: "Smash Badminton Hall",
    venue: "Go2Gor Hall, Yogyakarta",
    sport: "Badminton",
    image: "https://picsum.photos/seed/smash-badminton/1200/800",
    price: 90000,
    features: [
      "Lantai Kayu Parket",
      "Standar BWF",
      "Kafetaria",
      "Wi-Fi Gratis",
    ],
    gallery: [
      "https://picsum.photos/seed/smash-1/600/400",
      "https://picsum.photos/seed/smash-2/600/400",
      "https://picsum.photos/seed/smash-3/600/400",
    ],
    description:
      "Lapangan badminton dengan lantai kayu parket yang empuk dan nyaman. Selesaikan permainanmu dan bersantai di kafetaria kami yang menyediakan berbagai makanan dan minuman.",
  },
  {
    id: 7,
    name: "Cempaka Arena",
    venue: "GOR Cempaka, Jakarta Timur",
    sport: "Futsal",
    image: "https://picsum.photos/seed/lap1/1200/800",
    price: 150000,
    features: ["Rumput Sintetis", "Lighting Mantap"],
    gallery: [],
    description: "Rumput sintetis & lighting mantap buat sparring malam.",
  },
  {
    id: 8,
    name: "Melati Pro Court",
    venue: "GOR Melati, Bekasi",
    sport: "Futsal",
    image: "https://picsum.photos/seed/lap2/1200/800",
    price: 120000,
    features: ["Tempat Favorit Komunitas", "Bersih"],
    gallery: [],
    description: "Tempat favorit anak komunitas futsal Bekasi.",
  },
  {
    id: 9,
    name: "Nusantara Open",
    venue: "GOR Nusantara, Depok",
    sport: "Tenis",
    image: "https://picsum.photos/seed/lap3/1200/800",
    price: 180000,
    features: ["Vinyl Anti-Selip", "Standar Internasional"],
    gallery: [],
    description: "Lapangan licin? No way. Vinyl anti-selip terbaik.",
  },
  {
    id: 10,
    name: "Sakura Elite Court",
    venue: "GOR Sakura, Tangerang",
    sport: "Tenis",
    image: "https://picsum.photos/seed/lap4/1200/800",
    price: 200000,
    features: ["Private Club Feel", "Nyaman"],
    gallery: [],
    description: "Tempat main tenis rasa private club.",
  },
];
