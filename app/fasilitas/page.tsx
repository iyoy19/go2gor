// app/fasilitas/page.tsx
"use client";

import { motion } from "framer-motion";

const fasilitasList = [
  {
    title: "🏀 Lapangan Basket",
    description:
      "Tempat main basket yang luas, aman, dan selalu siap buat kamu & teman.",
    image: "https://picsum.photos/400/300?random=1",
  },
  {
    title: "⚽ Lapangan Futsal",
    description:
      "Permukaan sintetis nyaman, cocok untuk futsal seru bareng squad.",
    image: "https://picsum.photos/400/300?random=2",
  },
  {
    title: "🏋️‍♂️ Gym & Fitness",
    description:
      "Alat lengkap untuk latihan, cardio, dan bikin badan makin fit.",
    image: "https://picsum.photos/400/300?random=3",
  },
  {
    title: "🧘‍♀️ Yoga & Wellness",
    description: "Ruang tenang untuk yoga, meditasi, dan recharge energi.",
    image: "https://picsum.photos/400/300?random=4",
  },
];

export default function FasilitasPage() {
  return (
    <main className="min-h-screen p-4 md:p-12">
      {/* Hero Section */}
      <section className="text-center mb-4 p-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Fasilitas Keren Buat Kamu
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
          Nikmati fasilitas modern, nyaman, dan seru. Cocok buat olahraga,
          hangout, atau sekadar recharge bareng teman.
        </p>
      </section>

      {/* Fasilitas Cards */}
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {fasilitasList.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-2xl overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-white/70 backdrop-blur-md">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-800 text-sm">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
