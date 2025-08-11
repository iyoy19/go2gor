"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { EventType, dummyEvents } from "@/data/event";

export default function EventSection() {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const swiperRef = useRef<any>(null);

  // ✅ Filter event agar hanya yang tanggalnya di masa depan
  const now = new Date();
  const events: EventType[] = dummyEvents.filter(
    (e) => new Date(e.eventDate) > now
  );

  return (
    <section className="relative w-full pt-8 pb-16 px-4 sm:px-6 lg:px-8 font-poppins overflow-hidden">
      {/* ✅ MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-md bg-black/50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="relative w-full max-w-md lg:max-w-lg bg-gray-100 dark:bg-gray-800 border border-black/20 dark:border-gray-700/50 rounded-2xl p-4 sm:p-6 shadow-2xl text-gray-900 dark:text-gray-100"
              initial={{ scale: 0.8, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-3 right-3 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white text-2xl"
              >
                &times;
              </button>

              <Image
                src={selectedEvent.image}
                alt={selectedEvent.title}
                width={500}
                height={300}
                className="rounded-xl mb-4 object-cover w-full h-40 sm:h-48"
              />

              <h3 className="text-2xl font-extrabold mb-2 leading-tight">
                {selectedEvent.title}
              </h3>
              <p className="text-black/90 dark:text-white/90 text-base leading-relaxed mb-3">
                {selectedEvent.description} Jangan lewatkan kesempatan untuk
                berolahraga bersama komunitas dan menambah relasi baru!
              </p>

              <div className="text-sm text-black/80 dark:text-white/80 mb-2">
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
                className="inline-block mt-4 text-sm text-black/90 dark:text-white/90 font-semibold underline hover:text-black dark:hover:text-white transition"
              >
                Selengkapnya →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ HEADER */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-black dark:text-white mb-2">
          Event Seru Komunitas
        </h2>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 font-medium">
          Gabung dan ramaikan berbagai event olahraga!
        </p>
      </motion.div>

      {/* ✅ CEK KOSONG */}
      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
            alt="No Events"
            width={150}
            height={150}
            className="mb-6 opacity-90 dark:filter dark:invert"
          />
          <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
            Tidak ada event yang sedang berlangsung
          </h3>
          <p className="text-black/80 dark:text-white/80 text-center max-w-md">
            Santai dulu... 🤗 Kami akan segera menghadirkan event seru untuk
            kamu!
          </p>
        </div>
      ) : (
        <>
          {/* ✅ SLIDER */}
          <motion.div
            className="max-w-screen-lg mx-auto relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Swiper
              ref={swiperRef}
              modules={[Autoplay, Pagination, EffectCards]}
              slidesPerView={1}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop={true}
              effect="cards"
              grabCursor={true}
              cardsEffect={{
                slideShadows: false,
              }}
              className="pb-10 w-full max-w-sm md:max-w-md h-[480px] md:h-[550px]"
            >
              {events.map((event) => (
                <SwiperSlide key={event.id}>
                  <div
                    onClick={() => setSelectedEvent(event)}
                    className="group cursor-pointer relative overflow-hidden rounded-xl shadow-lg h-full bg-white dark:bg-gray-700 border border-black-300 dark:border-slate-700 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
                  >
                    <div className="overflow-hidden rounded-t-xl h-4/5">
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-100 to-transparent dark:bg-gradient-to-t dark:from-gray-900 dark:to-transparent text-black dark:text-white px-4 py-3 h-1/5 flex flex-col justify-end">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <p className="text-sm text-black dark:text-white">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* ✅ TOMBOL LIHAT SEMUA */}
          <div className="mt-10 text-center">
            <Link
              href="/event"
              className="bg-indigo-500 dark:bg-indigo-700 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 dark:hover:bg-blue-700 transition-transform hover:scale-105 shadow-lg"
            >
              Lihat Semua Event
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
