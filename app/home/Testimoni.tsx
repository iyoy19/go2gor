"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";

type Review = {
  name: string;
  quote: string;
  avatar: string;
  rating: number;
  type: "text" | "image";
  imageUrl?: string;
  bookingHistory: string[];
  uploadedAt: string;
  description?: string;
};

const reviews: Review[] = [
  {
    name: "Raka Pratama",
    quote:
      "GOR-nya cozy banget 😍 booking tinggal klik, langsung dapet jadwal. No ribet, no drama!",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    type: "text",
    bookingHistory: ["Cempaka Arena"],
    uploadedAt: "2024-07-01T12:00:00Z",
    description: "Sangat puas dengan fasilitas dan kemudahan booking.",
  },
  {
    name: "Zahra Aulia",
    quote:
      "Gampang banget nyari lapangan kosong buat latihan. Plus, tempatnya bersih dan vibes-nya oke 🔥",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    type: "text",
    bookingHistory: ["Sakura Elite Court"],
    uploadedAt: "2024-07-15T08:30:00Z",
    description:
      "Fasilitas lengkap dan staf yang ramah membuat saya betah berlatih di sini.",
  },
  {
    name: "Fauzan Maulana",
    quote: "",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 4,
    type: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    bookingHistory: ["Nusantara Open"],
    uploadedAt: "2024-07-20T17:45:00Z",
    description: "Tempat yang nyaman dan asri untuk latihan tenis.",
  },
  {
    name: "Intan Febriani",
    quote:
      "Suka banget sama sistem booking-nya. Ga harus nanya admin terus 😅 tinggal pilih waktu, langsung fix!",
    avatar: "https://i.pravatar.cc/150?img=24",
    rating: 4,
    type: "text",
    bookingHistory: ["Cempaka Arena"],
    uploadedAt: "2024-08-01T09:15:00Z",
    description:
      "Sistem yang simpel dan cepat, sangat membantu untuk jadwalkan latihan.",
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
  const [index, setIndex] = useState(0);

  const handleSwipe = (dir: "up" | "down" | "left" | "right") => {
    if (dir === "up" || dir === "right") {
      setIndex((prev) => (prev + 1) % reviews.length);
    } else {
      setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleSwipe("right");
      } else if (e.key === "ArrowLeft") {
        handleSwipe("left");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const review = reviews[index];

  const renderCardContent = (isDesktop: boolean) => (
    <>
      {review.type === "image" && review.imageUrl ? (
        <div
          className={`relative ${isDesktop ? "h-full" : "flex-1"} rounded-2xl overflow-hidden shadow-lg`}
        >
          <img
            src={review.imageUrl}
            alt={`Testimoni dari ${review.name}`}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center p-6">
          <p className="text-gray-700 dark:text-gray-300 italic text-base md:text-lg text-center">
            {review.description}
          </p>
        </div>
      )}
    </>
  );

  const renderCardFooter = () => (
    <div className="flex items-center gap-3 border-t border-gray-300 dark:border-slate-700 p-4 md:border-t-0 md:border-l">
      <img
        src={review.avatar}
        alt={review.name}
        className="w-12 h-12 rounded-full ring-2 ring-blue-400 dark:ring-blue-400 object-cover flex-shrink-0"
      />
      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-lg font-semibold text-black dark:text-white truncate">
            {review.name}
          </h4>
          <div className="flex items-center text-yellow-500 flex-shrink-0">
            {[...Array(5)].map((_, i) =>
              i < review.rating ? (
                <StarIcon key={i} className="w-4 h-4" />
              ) : (
                <StarIcon
                  key={i}
                  className="w-4 h-4 text-gray-400 dark:text-gray-600"
                  aria-hidden="true"
                />
              )
            )}
          </div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-600 dark:text-gray-400 font-medium">
          <div className="truncate">{review.bookingHistory.join(", ")}</div>
          <div className="text-right text-gray-500 dark:text-gray-500 flex-shrink-0">
            <span className="font-semibold hidden sm:inline">Diunggah: </span>
            {formatDate(review.uploadedAt)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative py-20 overflow-hidden" id="testimoni">
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-200/20 dark:bg-purple-500/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-blue-200/20 dark:bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-extrabold text-black dark:text-white mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Apa Kata Mereka?
        </motion.h2>

        {/* Mobile View */}
        <div className="relative min-h-[450px] w-full max-w-sm mx-auto md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="absolute inset-0 flex flex-col justify-between rounded-3xl shadow-2xl dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.y < -50) handleSwipe("up");
                else if (info.offset.y > 50) handleSwipe("down");
              }}
            >
              {renderCardContent(false)}
              {renderCardFooter()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop View */}
        <div className="relative min-h-[280px] max-w-4xl mx-auto hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="absolute inset-0 flex flex-row justify-between rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -50) handleSwipe("right");
                else if (info.offset.x > 50) handleSwipe("left");
              }}
            >
              <div className="w-1/2 h-full">{renderCardContent(true)}</div>
              <div className="w-1/2 h-full flex flex-col justify-center">
                {renderCardFooter()}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === i ? "bg-yellow-400 dark:bg-white scale-125" : "bg-gray-400 dark:bg-slate-600"}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <p className="text-sm mt-6 text-gray-500 dark:text-gray-500">
          <span className="md:hidden">
            Geser ke atas atau bawah untuk melihat testimoni lainnya 👆👇
          </span>
          <span className="hidden md:inline">
            Geser kartu atau gunakan panah keyboard untuk navigasi 👈👉
          </span>
        </p>
      </div>
    </section>
  );
}
