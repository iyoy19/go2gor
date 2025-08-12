"use client";

import { useEffect, useState } from "react";
// Komponen Modal Detail universal (event/match)
function DetailModal({ data, onClose }: { data: any; onClose: () => void }) {
  if (!data) return null;
  function handleBgClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={handleBgClick}
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl"
        >
          &times;
        </button>
        <div className="relative h-48 w-full mb-4">
          <img
            src={data.image}
            alt={data.title}
            className="object-cover rounded-xl w-full h-full"
          />
        </div>
        {data.category && (
          <div className="mb-2 text-xs text-gray-500">
            {data.category} - {data.location}
          </div>
        )}
        <div className="font-bold text-xl mb-2">{data.title}</div>
        {data.description && (
          <div className="mb-2 text-sm text-gray-700 dark:text-gray-200">
            {data.description}
          </div>
        )}
        <div className="flex items-center gap-2 text-sm mb-2">
          <FiCalendar className="text-indigo-500" />
          {data.eventDate ? (
            <ClientDate
              date={data.eventDate}
              options={{ day: "numeric", month: "long", year: "numeric" }}
            />
          ) : null}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FiMapPin className="text-indigo-500" />
          {data.location}
        </div>
      </div>
    </div>
  );
}
// Komponen client-only untuk tanggal/jam lokal
function ClientDate({
  date,
  options,
}: {
  date: string | Date;
  options: Intl.DateTimeFormatOptions;
}) {
  const [text, setText] = useState("");
  useEffect(() => {
    const d = typeof date === "string" ? new Date(date) : date;
    setText(d.toLocaleDateString("id-ID", options));
  }, [date, options]);
  return <>{text}</>;
}

function ClientTime({
  date,
  options,
}: {
  date: string | Date;
  options: Intl.DateTimeFormatOptions;
}) {
  const [text, setText] = useState("");
  useEffect(() => {
    const d = typeof date === "string" ? new Date(date) : date;
    setText(d.toLocaleTimeString("id-ID", options));
  }, [date, options]);
  return <>{text}</>;
}

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar, FiMapPin, FiX, FiArrowRight } from "react-icons/fi";
import { dummyEvents } from "@/data/event";
import { matches, MatchType } from "@/data/matches";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type EventType = {
  id: number;
  title: string;
  eventDate: string;
  location: string;
};

export default function EventPage() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  // Jadwal event singkat (3 terdekat, tanpa kategori)
  const now = new Date();
  const simpleEvents = dummyEvents
    .filter((e) => new Date(e.eventDate) > now)
    .sort(
      (a, b) =>
        new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
    );

  // Jadwal pertandingan dari matches
  const today = new Date();
  const liveMatches = matches.filter((m) => m.status === "live");
  const upcomingMatches = matches.filter(
    (m) => m.status === "upcoming" && new Date(m.eventDate) > today
  );

  return (
    <div className="min-h-screen text-gray-900 dark:text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Event Terdekat
          </h1>
        </motion.div>
        {simpleEvents.length > 0 ? (
          <>
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="w-full"
            >
              {simpleEvents.map((event) => (
                <SwiperSlide key={event.id}>
                  <div
                    className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer p-0 border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden h-full"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover rounded-t-xl"
                      />
                    </div>
                    <div className="p-5 flex flex-col gap-2 flex-1">
                      <div className="flex items-center gap-3">
                        <FiCalendar className="text-indigo-500" />
                        <span className="font-semibold">
                          <ClientDate
                            date={event.eventDate}
                            options={{
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }}
                          />
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FiMapPin className="text-indigo-500" />
                        <span>{event.location}</span>
                      </div>
                      <div className="font-bold text-lg">{event.title}</div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <DetailModal
              data={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          </>
        ) : (
          <div className="text-center text-gray-500 py-10">
            Belum ada event terdekat.
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto mt-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-center mb-8 text-indigo-700 dark:text-yellow-300"
        >
          Jadwal Pertandingan
        </motion.h2>
        {liveMatches.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-bold text-pink-600 mb-4">
              Sedang Berlangsung
            </h3>
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="w-full"
            >
              {liveMatches.map((m) => (
                <SwiperSlide key={m.id}>
                  <div
                    className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer p-0 border border-pink-200 dark:border-pink-400 flex flex-col gap-0 relative overflow-hidden h-full"
                    onClick={() => setSelectedMatch(m)}
                  >
                    <span className="absolute top-3 right-3 bg-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full animate-pulse z-10">
                      LIVE
                    </span>
                    <div className="relative h-48 w-full">
                      <Image
                        src={m.image}
                        alt={m.title}
                        fill
                        className="object-cover rounded-t-xl"
                      />
                    </div>
                    <div className="p-5 flex flex-col gap-2 flex-1">
                      <div className="font-bold text-lg mb-1">{m.title}</div>
                      <div className="flex items-center gap-2 text-sm">
                        <FiCalendar className="text-pink-500" />
                        <ClientTime
                          date={m.eventDate}
                          options={{ hour: "2-digit", minute: "2-digit" }}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FiMapPin className="text-pink-500" />
                        {m.location}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {m.category}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <DetailModal
              data={selectedMatch}
              onClose={() => setSelectedMatch(null)}
            />
          </div>
        )}
        {upcomingMatches.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-indigo-600 mb-4">
              Akan Datang
            </h3>
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="w-full"
            >
              {upcomingMatches.map((m) => (
                <SwiperSlide key={m.id}>
                  <div
                    className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer p-0 border border-indigo-200 dark:border-indigo-400 flex flex-col gap-0 overflow-hidden h-full"
                    onClick={() => setSelectedMatch(m)}
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={m.image}
                        alt={m.title}
                        fill
                        className="object-cover rounded-t-xl"
                      />
                    </div>
                    <div className="p-5 flex flex-col gap-2 flex-1">
                      <div className="font-bold text-lg mb-1">{m.title}</div>
                      <div className="flex items-center gap-2 text-sm">
                        <FiCalendar className="text-indigo-500" />
                        <ClientDate
                          date={m.eventDate}
                          options={{
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FiMapPin className="text-indigo-500" />
                        {m.location}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {m.category}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <DetailModal
              data={selectedMatch}
              onClose={() => setSelectedMatch(null)}
            />
          </div>
        )}
        {liveMatches.length === 0 && upcomingMatches.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            Tidak ada pertandingan hari ini atau yang akan datang.
          </div>
        )}
      </div>
    </div>
  );
}
