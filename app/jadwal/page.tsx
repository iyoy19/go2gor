"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Dummy Data
const futsalJadwal = [
  {
    id: 1,
    teams: "Team A vs Team B",
    date: "2025-09-01",
    time: "18:00",
    field: "Futsal 1",
    img: "/images/futsal1.jpg",
    live: false,
  },
  {
    id: 2,
    teams: "",
    date: "2025-09-02",
    time: "20:00",
    field: "Futsal 2",
    img: "/images/futsal2.jpg",
    live: true,
  },
];

const badmintonJadwal = [
  {
    id: 1,
    players: "Alice vs Bob",
    date: "2025-09-01",
    time: "16:00",
    court: "Court 1",
    img: "/images/badminton1.jpg",
    live: false,
  },
  {
    id: 2,
    players: "",
    date: "2025-09-03",
    time: "17:00",
    court: "Court 2",
    img: "/images/badminton2.jpg",
    live: true,
  },
];

const events = [
  {
    id: 1,
    title: "Turnamen Futsal Gen Z",
    date: "2025-09-10",
    img: "/images/event1.jpg",
  },
  {
    id: 2,
    title: "Workshop Badminton",
    date: "2025-09-15",
    img: "/images/event2.jpg",
  },
];

export default function JadwalPage() {
  const [activeTab, setActiveTab] = useState<"futsal" | "badminton" | "event">(
    "futsal"
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 py-10 px-4 md:px-20">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8 pt-12">
        Jadwal Pertandingan & Event
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10">
        {["futsal", "badminton", "event"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={clsx(
              "px-6 py-2 rounded-full font-semibold transition-all",
              activeTab === tab
                ? "bg-purple-600 text-white shadow-lg scale-105"
                : "bg-white text-purple-600 border border-purple-300 hover:scale-105"
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {/* Futsal */}
        {activeTab === "futsal" && (
          <>
            {/* LIVE Matches */}
            {futsalJadwal.some((m) => m.live) && (
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Sedang LIVE
              </h2>
            )}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {futsalJadwal
                .filter((m) => m.live)
                .map((match) => (
                  <motion.div
                    key={match.id}
                    whileHover={{ scale: 1.03 }}
                    className="relative rounded-xl overflow-hidden shadow-lg"
                  >
                    <img
                      src={match.img || "/images/default.jpg"}
                      alt={match.teams || "TBD"}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
                      <div className="absolute top-4 right-4 bg-red-500 px-3 py-1 rounded-full text-white text-xs font-bold animate-pulse">
                        LIVE
                      </div>
                      <h2 className="text-white font-bold text-xl mb-1">
                        {match.teams || "TBD"}
                      </h2>
                      <p className="text-gray-200 text-sm">
                        {match.date} - {match.time}
                      </p>
                      <p className="text-gray-200 text-sm">
                        Lapangan: {match.field}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* Upcoming Matches */}
            {futsalJadwal.some((m) => !m.live) && (
              <h2 className="text-2xl font-bold text-indigo-800 mb-4">
                Jadwal Mendatang
              </h2>
            )}
            <div className="grid md:grid-cols-2 gap-6">
              {futsalJadwal
                .filter((m) => !m.live)
                .map((match) => (
                  <motion.div
                    key={match.id}
                    whileHover={{ scale: 1.03 }}
                    className="relative rounded-xl overflow-hidden shadow-lg"
                  >
                    <img
                      src={match.img || "/images/default.jpg"}
                      alt={match.teams || "TBD"}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
                      <h2 className="text-white font-bold text-xl mb-1">
                        {match.teams || "TBD"}
                      </h2>
                      <p className="text-gray-200 text-sm">
                        {match.date} - {match.time}
                      </p>
                      <p className="text-gray-200 text-sm">
                        Lapangan: {match.field}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </>
        )}

        {/* Badminton */}
        {activeTab === "badminton" && (
          <>
            {/* LIVE Matches */}
            {badmintonJadwal.some((m) => m.live) && (
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Sedang LIVE
              </h2>
            )}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {badmintonJadwal
                .filter((m) => m.live)
                .map((match) => (
                  <motion.div
                    key={match.id}
                    whileHover={{ scale: 1.03 }}
                    className="relative rounded-xl overflow-hidden shadow-lg"
                  >
                    <img
                      src={match.img || "/images/default.jpg"}
                      alt={match.players || "Menunggu pemain"}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
                      <div className="absolute top-4 right-4 bg-red-500 px-3 py-1 rounded-full text-white text-xs font-bold animate-pulse">
                        LIVE
                      </div>
                      <h2 className="text-white font-bold text-xl mb-1">
                        {match.players || "Menunggu pemain"}
                      </h2>
                      <p className="text-gray-200 text-sm">
                        {match.date} - {match.time}
                      </p>
                      <p className="text-gray-200 text-sm">
                        Court: {match.court}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* Upcoming Matches */}
            {badmintonJadwal.some((m) => !m.live) && (
              <h2 className="text-2xl font-bold text-indigo-800 mb-4">
                Jadwal Mendatang
              </h2>
            )}
            <div className="grid md:grid-cols-2 gap-6">
              {badmintonJadwal
                .filter((m) => !m.live)
                .map((match) => (
                  <motion.div
                    key={match.id}
                    whileHover={{ scale: 1.03 }}
                    className="relative rounded-xl overflow-hidden shadow-lg"
                  >
                    <img
                      src={match.img || "/images/default.jpg"}
                      alt={match.players || "Menunggu pemain"}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
                      <h2 className="text-white font-bold text-xl mb-1">
                        {match.players || "Menunggu pemain"}
                      </h2>
                      <p className="text-gray-200 text-sm">
                        {match.date} - {match.time}
                      </p>
                      <p className="text-gray-200 text-sm">
                        Court: {match.court}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </>
        )}

        {/* Event */}
        {activeTab === "event" && (
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {events.map((ev) => (
              <SwiperSlide key={ev.id}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <img
                    src={ev.img}
                    alt={ev.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{ev.title}</h3>
                    <p className="text-gray-600">{ev.date}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </motion.div>
    </div>
  );
}
