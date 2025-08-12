// data/forumPosts.ts
// Data dummy untuk forum komunitas

export interface ForumComment {
  id: number;
  author: string;
  avatar?: string;
  content: string;
  date: string;
}

export interface ForumPost {
  id: number;
  author: string;
  avatar?: string;
  title: string;
  content: string;
  date: string;
  comments: ForumComment[];
  likes: number;
  dislikes: number;
  tags: string[];
}

export const forumPosts: ForumPost[] = [
  {
    id: 1,
    author: "Andi Wijaya",
    avatar: "",
    title: "Tips Booking Lapangan di Musim Hujan",
    content:
      "Bagaimana cara memastikan lapangan tetap bisa digunakan saat musim hujan? Ada tips atau pengalaman?",
    date: "2025-08-10",
    comments: [
      {
        id: 1,
        author: "Rizky Saputra",
        content: "Pastikan cek ramalan cuaca dan bawa terpal cadangan.",
        date: "2025-08-10",
      },
      {
        id: 2,
        author: "Dewi Lestari",
        content: "Lapangan indoor lebih aman saat musim hujan!",
        date: "2025-08-10",
      },
      {
        id: 3,
        author: "Fajar Pratama",
        content: "Jangan lupa booking lebih awal, biasanya penuh.",
        date: "2025-08-10",
      },
    ],
    likes: 12,
    dislikes: 1,
    tags: ["Tips", "Musim Hujan"],
  },
  {
    id: 2,
    author: "Siti Rahma",
    avatar: "",
    title: "Rekomendasi Sepatu Futsal Terbaik?",
    content:
      "Saya ingin beli sepatu futsal baru, ada rekomendasi merk dan tipe yang nyaman?",
    date: "2025-08-09",
    comments: [
      {
        id: 1,
        author: "Andi Wijaya",
        content: "Specs Barricada dan Adidas Copa nyaman dipakai.",
        date: "2025-08-09",
      },
      {
        id: 2,
        author: "Budi Santoso",
        content: "Nike Tiempo juga oke, grip bagus.",
        date: "2025-08-09",
      },
      {
        id: 3,
        author: "Rina Melati",
        content: "Pilih yang sesuai bentuk kaki, jangan hanya merk.",
        date: "2025-08-09",
      },
      {
        id: 4,
        author: "Dewi Lestari",
        content: "Cek juga promo di toko online, kadang diskon.",
        date: "2025-08-09",
      },
      {
        id: 5,
        author: "Fajar Pratama",
        content: "Jangan lupa pakai kaos kaki tebal biar nyaman.",
        date: "2025-08-09",
      },
    ],
    likes: 20,
    dislikes: 0,
    tags: ["Peralatan", "Futsal"],
  },
  {
    id: 3,
    author: "Budi Santoso",
    avatar: "",
    title: "Cari Lawan Sparing Minggu Ini",
    content:
      "Tim kami butuh lawan sparing untuk minggu ini. Ada yang berminat?",
    date: "2025-08-08",
    comments: [
      {
        id: 1,
        author: "Andi Wijaya",
        content: "Tim kami siap, DM saja untuk atur jadwal.",
        date: "2025-08-08",
      },
      {
        id: 2,
        author: "Rizky Saputra",
        content: "Bisa main hari Minggu sore?",
        date: "2025-08-08",
      },
    ],
    likes: 8,
    dislikes: 0,
    tags: ["Sparing", "Jadwal"],
  },
];
