"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import "swiper/css"; // Import Swiper styles
import "swiper/css/pagination"; // Import Swiper pagination styles
import "swiper/css/autoplay"; // Import Swiper autoplay styles
import { Autoplay, Pagination } from "swiper/modules"; // Import Swiper modules
import Link from "next/link"; // Import Link

type ForumPost = {
  id: string;
  title: string;
  author: string;
  content: string;
  avatar: string;
  date: string; // ISO string for easy sorting
  commentsCount: number;
  viewsCount: number;
};

const forumPosts: ForumPost[] = [
  {
    id: "fp-005",
    title: "Tips Jitu Menang Turnamen Futsal Antar Kantor!",
    author: "FutsalPro",
    content:
      "Baru aja ikut turnamen futsal antar kantor, dan berhasil jadi juara! Mau share beberapa tips nih...",
    avatar: "https://i.pravatar.cc/150?img=60",
    date: "2024-08-14T10:30:00Z",
    commentsCount: 15,
    viewsCount: 230,
  },
  {
    id: "fp-004",
    title: "Rekomendasi Lapangan Badminton di Jakarta Barat",
    author: "BadmintonLover",
    content:
      "Lagi cari lapangan badminton yang bagus di Jakarta Barat, ada rekomendasi gak teman-teman? Prefer yang bersih dan harga terjangkau.",
    avatar: "https://i.pravatar.cc/150?img=55",
    date: "2024-08-12T15:00:00Z",
    commentsCount: 8,
    viewsCount: 180,
  },
  {
    id: "fp-003",
    title: "Strategi Jitu Main Futsal: Formasi 1-2-1",
    author: "CoachBola",
    content:
      "Formasi 1-2-1 ini efektif banget buat tim yang suka menyerang. Kuncinya ada di pergerakan pivot dan flank...",
    avatar: "https://i.pravatar.cc/150?img=50",
    date: "2024-08-10T09:00:00Z",
    commentsCount: 22,
    viewsCount: 350,
  },
  {
    id: "fp-002",
    title: "Pengalaman Pertama Booking Lapangan Online Go2Gor",
    author: "NewbiePlayer",
    content:
      "Awalnya ragu, tapi ternyata booking lapangan via Go2Gor gampang banget! Prosesnya cepat dan pilihan lapangannya banyak.",
    avatar: "https://i.pravatar.cc/150?img=45",
    date: "2024-08-08T11:45:00Z",
    commentsCount: 5,
    viewsCount: 120,
  },
  {
    id: "fp-001",
    title: "Cari Teman Mabar Badminton Malam Ini!",
    author: "MabarYuk",
    content:
      "Ada yang mau mabar badminton di daerah Jakarta Selatan malam ini? Level santai aja, buat seru-seruan.",
    avatar: "https://i.pravatar.cc/150?img=40",
    date: "2024-08-05T19:00:00Z",
    commentsCount: 10,
    viewsCount: 90,
  },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Testimoni() {
  return (
    <section className="relative overflow-hidden" id="testimoni">
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-200/20 dark:bg-purple-500/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-blue-200/20 dark:bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-extrabold text-black dark:text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Forum
        </motion.h2>

        {/* Swiper Container */}
        <Swiper
          spaceBetween={20}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            0: { slidesPerView: 1 }, // Mobile
            640: { slidesPerView: 2 }, // Tablet
            1024: { slidesPerView: 3 }, // Desktop
          }}
          className="pb-12 mb-4" // Add padding for pagination dots
        >
          {forumPosts.map((postItem) => (
            <SwiperSlide key={postItem.id}>
              <Link href={`/forum/${postItem.id}`} passHref>
                <motion.div
                  className="flex flex-col justify-between rounded-lg shadow-md bg-white dark:bg-gray-800 p-6 h-full cursor-pointer" // Added p-6 and h-full
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  {/* User and Details */}
                  <div className="flex items-center gap-3 mb-4">
                    {" "}
                    {/* Added mb-4 */}
                    <img
                      src={postItem.avatar}
                      alt={postItem.author}
                      className="w-12 h-12 rounded-full ring-2 ring-blue-400 dark:ring-blue-400 object-cover flex-shrink-0"
                    />
                    <div className="flex-1 text-left min-w-0">
                      <h4 className="text-lg font-semibold text-black dark:text-white truncate">
                        {postItem.author}
                      </h4>
                      <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                        {formatDate(postItem.date)}
                      </div>
                    </div>
                  </div>

                  {/* Title only */}
                  <div className="flex flex-col flex-1 justify-between">
                    <h3 className="text-xl font-bold text-black dark:text-white mb-2 truncate">
                      {postItem.title}
                    </h3>
                  </div>
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Removed helper text */}
      </div>
    </section>
  );
}
