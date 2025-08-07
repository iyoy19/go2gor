"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    name: "Raka Pratama",
    quote:
      "GOR-nya cozy banget 😍 booking tinggal klik, langsung dapet jadwal. No ribet, no drama!",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
  },
  {
    name: "Zahra Aulia",
    quote:
      "Gampang banget nyari lapangan kosong buat latihan. Plus, tempatnya bersih dan vibes-nya oke 🔥",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
  },
  {
    name: "Fauzan Maulana",
    quote:
      "Keren sih ini! Bisa booking bareng tim lewat HP, langsung tau slot yang available. Super praktis 💯",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 4,
  },
  {
    name: "Intan Febriani",
    quote:
      "Suka banget sama sistem booking-nya. Ga harus nanya admin terus 😅 tinggal pilih waktu, langsung fix!",
    avatar: "https://i.pravatar.cc/150?img=24",
    rating: 4,
  },
];

export default function Testimoni() {
  const [index, setIndex] = useState(0);

  const handleSwipe = (dir: "up" | "down") => {
    if (dir === "up") {
      setIndex((prev) => (prev + 1) % reviews.length);
    } else {
      setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    }
  };

  return (
    <section
      className="py-20 bg-gradient-to-b from-white to-blue-50"
      id="testimoni"
    >
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-10">
          Apa Kata Mereka?
        </h2>

        <div className="relative h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.y < -50) {
                  handleSwipe("up");
                } else if (info.offset.y > 50) {
                  handleSwipe("down");
                }
              }}
            >
              <div className="bg-white w-full p-8 rounded-xl shadow-lg border border-blue-100">
                <img
                  src={reviews[index].avatar}
                  alt={reviews[index].name}
                  className="w-20 h-20 mx-auto rounded-full ring-2 ring-blue-400 mb-4"
                />
                <h4 className="text-xl font-semibold text-blue-700">
                  {reviews[index].name}
                </h4>
                <div className="text-yellow-400 text-sm mb-2">
                  {"★".repeat(reviews[index].rating)}
                  {"☆".repeat(5 - reviews[index].rating)}
                </div>
                <p className="text-gray-700 italic">“{reviews[index].quote}”</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-sm mt-6 text-gray-400">
          Geser ke atas/bawah untuk melihat testimoni lainnya 👆👇
        </p>
      </div>
    </section>
  );
}
