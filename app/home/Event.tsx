"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/styles/swiper-custom.css";

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
    <section className="relative w-full pt-1 sm:pt-8 pb-8 sm:pb-16 px-2 sm:px-6 lg:px-8 font-poppins overflow-hidden">
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
              className="relative w-full max-w-md lg:max-w-lg bg-gray-100 dark:bg-gray-800 border border-black/20 dark:border-gray-700/50 rounded-2xl p-3 pt-0 sm:p-6 shadow-2xl text-gray-900 dark:text-gray-100"
              initial={{ scale: 0.8, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-0.5 sm:top-3 right-2 sm:right-3 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white text-xl sm:text-2xl"
              >
                &times;
              </button>

              <Image
                src={selectedEvent.image}
                alt={selectedEvent.title}
                width={500}
                height={300}
                className="rounded-xl mb-2 sm:mb-4 object-cover w-full h-36 sm:h-48 mt-4 sm:mt-0"
              />

              <h3 className="text-xl sm:text-2xl font-extrabold mb-1.5 sm:mb-2 leading-tight">
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
        className="text-center mb-2 sm:mb-12"
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
            className="max-w-screen-lg mx-auto relative overflow-visible"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Swiper
              ref={swiperRef}
              modules={[Autoplay, Pagination, Navigation]}
              slidesPerView={3}
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              loop={true}
              grabCursor={true}
              breakpoints={{
                320: {
                  slidesPerView: 1.1,
                  spaceBetween: 8,
                  centeredSlides: true,
                },
                480: {
                  slidesPerView: 1.2,
                  spaceBetween: 12,
                  centeredSlides: true,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="w-full max-w-7xl h-[360px] sm:h-[450px] lg:h-[500px] px-8 sm:px-8 lg:px-10 py-0 sm:py-10 lg:py-20"
            >
              {events.map((event) => (
                <SwiperSlide key={event.id}>
                  <div
                    onClick={() => setSelectedEvent(event)}
                    className="group cursor-pointer relative overflow-hidden rounded-2xl h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500 swiper-slide-transform"
                  >
                    <div className="overflow-hidden rounded-t-2xl h-[220px] sm:h-[180px] md:h-[220px] relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-lg">
                        {new Date(event.eventDate).toLocaleDateString("id-ID", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    <div className="p-2.5 sm:p-3 md:p-4">
                      <h3 className="text-xs sm:text-base md:text-lg font-bold mb-1 sm:mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
                        {event.title}
                      </h3>
                      <p className="text-[11px] sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-snug">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* ✅ TOMBOL LIHAT SEMUA */}
          <div className="mt-4 sm:mt-10 text-center">
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
