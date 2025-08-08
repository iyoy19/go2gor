"use client";

import { useState } from "react";
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

  const handleSwipe = (dir: "up" | "down") => {
    if (dir === "up") {
      setIndex((prev) => (prev + 1) % reviews.length);
    } else {
      setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    }
  };

  const review = reviews[index];

  return (
    <section
      className="py-20 bg-gradient-to-b from-white to-blue-50"
      id="testimoni"
    >
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-blue-900 mb-12">
          Apa Kata Mereka?
        </h2>

        <div className="relative h-[440px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="absolute inset-0 flex flex-col justify-between rounded-3xl shadow-lg border border-blue-200 bg-white p-6"
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
              {review.type === "image" && review.imageUrl ? (
                <>
                  <div className="relative flex-1 rounded-2xl overflow-hidden mb-4 shadow-lg">
                    <img
                      src={review.imageUrl}
                      alt={`Testimoni dari ${review.name}`}
                      className="w-full h-full rounded-2xl"
                    />
                  </div>
                  {review.description && (
                    <p className="text-gray-700 text-center text-sm mb-4">
                      {review.description}
                    </p>
                  )}
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center mb-4 px-6">
                  {review.description && (
                    <p className="text-gray-700 italic text-lg text-center">
                      {review.description}
                    </p>
                  )}
                </div>
              )}

              {/* Footer: avatar, nama+rating, lapangan, tanggal upload */}
              <div className="flex items-center gap-4 border-t border-blue-100 pt-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-16 h-16 rounded-full ring-4 ring-blue-400 object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  {/* Baris 1: Nama dan rating */}
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-semibold text-blue-800">
                      {review.name}
                    </h4>
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) =>
                        i < review.rating ? (
                          <StarIcon key={i} className="w-5 h-5" />
                        ) : (
                          <StarIcon
                            key={i}
                            className="w-5 h-5 text-gray-300"
                            aria-hidden="true"
                          />
                        )
                      )}
                    </div>
                  </div>

                  {/* Baris 2: Nama lapangan & tanggal upload */}
                  <div className="flex justify-between mt-1 text-sm text-gray-600 font-medium">
                    <div>{review.bookingHistory.join(", ")}</div>
                    <div className="text-right text-gray-400">
                      <span className="font-semibold">Diunggah: </span>
                      {formatDate(review.uploadedAt)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-sm mt-6 text-gray-400">
          Geser ke atas atau bawah untuk melihat testimoni lainnya 👆👇
        </p>
      </div>
    </section>
  );
}
