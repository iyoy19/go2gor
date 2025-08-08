"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ✅ Event Type
type EventType = {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
  eventDate: string;
  createdAt: string;
};

// ✅ Dummy Images
const randomImages = Array.from(
  { length: 10 },
  (_, i) => `https://picsum.photos/seed/event-${i + 1}/500/300`
);

// ✅ Dummy Events Data
const events: EventType[] = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: `Event Seru #${i + 1}`,
  description: "Ikuti keseruan olahraga bareng komunitas!",
  image: randomImages[i],
  slug: `event-seru-${i + 1}`,
  eventDate: new Date(Date.now() + i * 86400000).toISOString(), // +i hari
  createdAt: new Date(Date.now() - i * 86400000).toISOString(), // -i hari
}));

export default function EventSection() {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const swiperRef = useRef<any>(null);

  return (
    <section className="relative w-full pt-8 pb-16 px-4 sm:px-6 lg:px-8 font-poppins overflow-hidden bg-gradient-to-br from-[#ffe4e6] via-[#a433c0] to-[#04968a]">
      {/* ✅ MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="relative w-full max-w-md lg:max-w-lg bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-2xl text-white"
              initial={{ scale: 0.8, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-3 right-3 text-white/70 hover:text-white text-2xl"
              >
                &times;
              </button>

              <Image
                src={selectedEvent.image}
                alt={selectedEvent.title}
                width={500}
                height={300}
                className="rounded-xl mb-4 object-cover w-full h-48"
              />

              <h3 className="text-2xl font-extrabold mb-2 leading-tight">
                {selectedEvent.title}
              </h3>
              <p className="text-white/90 text-base leading-relaxed mb-3">
                {selectedEvent.description} Jangan lewatkan kesempatan untuk
                berolahraga bersama komunitas dan menambah relasi baru!
              </p>

              <div className="text-sm text-white/80 mb-2">
                <p>
                  📅 Tanggal Event:{" "}
                  <strong>
                    {new Date(selectedEvent.eventDate).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </strong>
                </p>
                <p>
                  🕓 Diunggah:{" "}
                  <strong>
                    {new Date(selectedEvent.createdAt).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </strong>
                </p>
              </div>

              <Link
                href={`/event/${selectedEvent.slug}`}
                className="inline-block mt-4 text-sm text-white/90 font-semibold underline hover:text-white transition"
              >
                Selengkapnya →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-2">
          Event Seru Komunitas
        </h2>
        <p className="text-base md:text-lg text-gray-700 font-medium">
          Gabung dan ramaikan berbagai event olahraga!
        </p>
      </div>

      {/* ✅ SLIDER */}
      <div className="max-w-screen-lg mx-auto relative">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Pagination, EffectCoverflow]}
          slidesPerView={1.2}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 },
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          effect="coverflow"
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          className="pb-10"
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div
                onClick={() => setSelectedEvent(event)}
                className="cursor-pointer relative overflow-hidden rounded-xl shadow-lg bg-white"
              >
                <div className="overflow-hidden rounded-t-xl">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* ✅ Judul dan Deskripsi transparan */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white px-4 py-3">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-sm">{event.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ✅ TOMBOL LIHAT SEMUA */}
      <div className="mt-10 text-center">
        <Link
          href="/event"
          className="bg-black text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-gray-900 transition"
        >
          Lihat Semua Event
        </Link>
      </div>
    </section>
  );
}
