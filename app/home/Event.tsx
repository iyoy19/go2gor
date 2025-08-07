"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { motion } from "framer-motion";

const events = [
  {
    title: "Futsal Night Challenge",
    date: "12 Agustus 2025",
    location: "GOR Kuningan",
    description: "Pertandingan malam penuh aksi antar tim komunitas lokal.",
    image: "https://picsum.photos/600/400?random=101",
  },
  {
    title: "Turnamen Pemuda Merdeka",
    date: "17 Agustus 2025",
    location: "GOR Nusantara",
    description: "Rayakan kemerdekaan lewat kompetisi futsal paling seru!",
    image: "https://picsum.photos/600/400?random=102",
  },
  {
    title: "Futsal Cup Antar Sekolah",
    date: "23 Agustus 2025",
    location: "GOR Cempaka",
    description: "Kompetisi antar pelajar se-Jabodetabek yang penuh semangat.",
    image: "https://picsum.photos/600/400?random=103",
  },
  {
    title: "Liga GOR Mingguan",
    date: "Setiap Sabtu, Agustus 2025",
    location: "GOR Melati",
    description: "Liga internal mingguan antar penyewa GOR. Siapa yang juara?",
    image: "https://picsum.photos/600/400?random=104",
  },
  {
    title: "Friendly Match Komunitas",
    date: "30 Agustus 2025",
    location: "GOR Sakura",
    description: "Pertandingan persahabatan antara komunitas futsal kampus.",
    image: "https://picsum.photos/600/400?random=105",
  },
];

export default function EventSection() {
  const swiperRef = useRef<any>(null);

  return (
    <section
      id="event"
      className="py-12 md:py-14 bg-gradient-to-tr from-[#473b3f] via-[#B5FFFC] to-[#093fb3]"
    >
      <div className="max-w-6xl mx-auto px-4 text-center mb-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Event & Turnamen
        </motion.h2>
        <motion.p
          className="text-gray-600 dark:text-gray-300 mt-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Ikuti berbagai event futsal seru di GOR favoritmu.
        </motion.p>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6 px-4 py-12 bg-white/30 dark:bg-black/20 rounded-xl max-w-xl mx-auto shadow-md">
          <Image
            src="/images/noevent1.svg"
            alt="No event illustration"
            width={200}
            height={200}
            className="opacity-80"
          />
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
            Belum ada event yang menarik 😔
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
            Tenang, akan segera ada turnamen dan event futsal seru untuk kamu
            ikuti! Pantau terus halaman ini, ya!
          </p>
        </div>
      ) : (
        <div
          onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay?.start()}
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={true}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={4500}
            freeMode={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            style={{ padding: "0 10px" }}
          >
            {events.map((ev, idx) => (
              <SwiperSlide key={idx}>
                <motion.div
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105 h-[260px]"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={ev.image}
                      alt={ev.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw,(max-width: 1024px)50vw,33vw"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-left text-white">
                      <h3 className="text-lg font-semibold">{ev.title}</h3>
                      <p className="text-sm">{ev.date}</p>
                      <p className="text-sm">{ev.location}</p>
                      <p className="text-xs mt-1">{ev.description}</p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
}
