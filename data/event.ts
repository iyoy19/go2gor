export type EventType = {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
  eventDate: string;
  createdAt: string;
  category: string;
  location: string;
  registrationFee: number;
  maxTeams: number;
  remainingSlots: number;
  prizes: {
    first: {
      amount: number;
      extras?: string[];
    };
    second: {
      amount: number;
      extras?: string[];
    };
    third: {
      amount: number;
      extras?: string[];
    };
  };
  requirements: string[];
  timeline: {
    date: string;
    event: string;
  }[];
};

// ✅ Dummy Images
const randomImages = Array.from(
  { length: 10 },
  (_, i) => `https://picsum.photos/seed/event-${i + 1}/500/300`,
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
    title: "Festival Futsal Community Cup 2025",
    description:
      "Turnamen futsal bergengsi antar komunitas dengan total hadiah puluhan juta rupiah! Ikuti keseruan pertandingan dan jalin silaturahmi antar komunitas futsal.",
    image: "https://picsum.photos/seed/event-futsal/500/300",
    slug: "festival-futsal-community-cup-2025",
    eventDate: new Date("2025-09-03T09:00:00Z").toISOString(),
    createdAt: new Date("2025-08-10T10:00:00Z").toISOString(),
    category: "Futsal",
    location: "GOR Futsal Center",
    registrationFee: 250000,
    maxTeams: 16,
    remainingSlots: 12,
    prizes: {
      first: {
        amount: 5000000,
        extras: ["Trophy", "Medali", "Sertifikat"],
      },
      second: {
        amount: 3000000,
        extras: ["Trophy", "Medali", "Sertifikat"],
      },
      third: {
        amount: 1500000,
        extras: ["Trophy", "Medali", "Sertifikat"],
      },
    },
    requirements: [
      "Tim terdiri dari 7-12 pemain",
      "Minimal usia pemain 18 tahun",
      "Membawa fotokopi KTP untuk semua pemain",
      "Menggunakan jersey tim yang seragam",
      "Pembayaran maksimal H-3 sebelum event",
      "Wajib mengikuti technical meeting",
    ],
    timeline: [
      {
        date: "2025-09-01",
        event: "Technical Meeting (19:00 WIB)",
      },
      {
        date: "2025-09-03",
        event: "Pembukaan Turnamen",
      },
      {
        date: "2025-09-10",
        event: "Final & Penutupan",
      },
    ],
  },
  {
    id: 102,
    title: "Badminton Open Tournament 2025",
    description:
      "Turnamen badminton terbuka dengan berbagai kategori! Tunjukkan kemampuan terbaikmu dan raih hadiah menarik.",
    image: "https://picsum.photos/seed/event-badminton/500/300",
    slug: "badminton-open-tournament-2025",
    eventDate: new Date("2025-09-15T08:00:00Z").toISOString(),
    createdAt: new Date("2025-08-12T11:00:00Z").toISOString(),
    category: "Badminton",
    location: "GOR Badminton Center",
    registrationFee: 150000,
    maxTeams: 32,
    remainingSlots: 20,
    prizes: {
      first: {
        amount: 3000000,
        extras: ["Trophy", "Medali", "Sertifikat"],
      },
      second: {
        amount: 2000000,
        extras: ["Trophy", "Medali", "Sertifikat"],
      },
      third: {
        amount: 1000000,
        extras: ["Trophy", "Medali", "Sertifikat"],
      },
    },
    requirements: [
      "Pemain amatir (bukan atlet profesional)",
      "Membawa KTP saat registrasi ulang",
      "Menggunakan pakaian olahraga yang sesuai",
      "Pembayaran maksimal H-3 sebelum event",
      "Wajib mengikuti technical meeting",
    ],
    timeline: [
      {
        date: "2025-09-13",
        event: "Technical Meeting (19:00 WIB)",
      },
      {
        date: "2025-09-15",
        event: "Pembukaan Tournament",
      },
      {
        date: "2025-09-17",
        event: "Final & Penutupan",
      },
    ],
  },
  {
    id: 103,
    title: "Badminton Open Tournament 2025",
    description:
      "Turnamen badminton terbuka dengan berbagai kategori! Tunjukkan kemampuan terbaikmu dan raih hadiah menarik.",
    image: "https://picsum.photos/seed/event-badminton/500/300",
    slug: "badminton-open-tournament-2025",
    eventDate: new Date("2025-09-15T08:00:00Z").toISOString(),
    createdAt: new Date("2025-08-12T11:00:00Z").toISOString(),
    category: "Badminton",
    location: "GOR Badminton Center",
    registrationFee: 150000,
    maxTeams: 32,
    remainingSlots: 20,
    prizes: {
      first: {
        amount: 3000000,
        extras: ["Trophy", "Medali", "Sertifikat"],
      },
      second: {
        amount: 2000000,
        extras: ["Trophy", "Medali", "Sertifikat"],
      },
      third: {
        amount: 1000000,
        extras: ["Trophy", "Medali", "Sertifikat"],
      },
    },
    requirements: [
      "Pemain amatir (bukan atlet profesional)",
      "Membawa KTP saat registrasi ulang",
      "Menggunakan pakaian olahraga yang sesuai",
      "Pembayaran maksimal H-3 sebelum event",
      "Wajib mengikuti technical meeting",
    ],
    timeline: [
      {
        date: "2025-09-13",
        event: "Technical Meeting (19:00 WIB)",
      },
      {
        date: "2025-09-15",
        event: "Pembukaan Tournament",
      },
      {
        date: "2025-09-17",
        event: "Final & Penutupan",
      },
    ],
  },
  {
    id: 104,
    title: "Badminton Open Tournament 2025",
    description:
      "Turnamen badminton terbuka dengan berbagai kategori! Tunjukkan kemampuan terbaikmu dan raih hadiah menarik.",
    image: "https://picsum.photos/seed/event-badminton/500/300",
    slug: "badminton-open-tournament-2025",
    eventDate: new Date("2025-09-15T08:00:00Z").toISOString(),
    createdAt: new Date("2025-08-12T11:00:00Z").toISOString(),
    category: "Badminton",
    location: "GOR Badminton Center",
    registrationFee: 150000,
    maxTeams: 32,
    remainingSlots: 20,
    prizes: {
      first: {
        amount: 3000000,
        extras: ["Trophy", "Medali", "Sertifikat"],
      },
      second: {
        amount: 2000000,
        extras: ["Trophy", "Medali", "Sertifikat"],
      },
      third: {
        amount: 1000000,
        extras: ["Trophy", "Medali", "Sertifikat"],
      },
    },
    requirements: [
      "Pemain amatir (bukan atlet profesional)",
      "Membawa KTP saat registrasi ulang",
      "Menggunakan pakaian olahraga yang sesuai",
      "Pembayaran maksimal H-3 sebelum event",
      "Wajib mengikuti technical meeting",
    ],
    timeline: [
      {
        date: "2025-09-13",
        event: "Technical Meeting (19:00 WIB)",
      },
      {
        date: "2025-09-15",
        event: "Pembukaan Tournament",
      },
      {
        date: "2025-09-17",
        event: "Final & Penutupan",
      },
    ],
  },
  {
    id: 105,
    title: "Badminton Open Tournament 2025",
    description:
      "Turnamen badminton terbuka dengan berbagai kategori! Tunjukkan kemampuan terbaikmu dan raih hadiah menarik.",
    image: "https://picsum.photos/seed/event-badminton/500/300",
    slug: "badminton-open-tournament-2025",
    eventDate: new Date("2025-09-15T08:00:00Z").toISOString(),
    createdAt: new Date("2025-08-12T11:00:00Z").toISOString(),
    category: "Badminton",
    location: "GOR Badminton Center",
    registrationFee: 150000,
    maxTeams: 32,
    remainingSlots: 20,
    prizes: {
      first: {
        amount: 3000000,
        extras: ["Trophy", "Medali", "Sertifikat"],
      },
      second: {
        amount: 2000000,
        extras: ["Trophy", "Medali", "Sertifikat"],
      },
      third: {
        amount: 1000000,
        extras: ["Trophy", "Medali", "Sertifikat"],
      },
    },
    requirements: [
      "Pemain amatir (bukan atlet profesional)",
      "Membawa KTP saat registrasi ulang",
      "Menggunakan pakaian olahraga yang sesuai",
      "Pembayaran maksimal H-3 sebelum event",
      "Wajib mengikuti technical meeting",
    ],
    timeline: [
      {
        date: "2025-09-13",
        event: "Technical Meeting (19:00 WIB)",
      },
      {
        date: "2025-09-15",
        event: "Pembukaan Tournament",
      },
      {
        date: "2025-09-17",
        event: "Final & Penutupan",
      },
    ],
  },
];
