"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FiSearch,
  FiMapPin,
  FiCalendar,
  FiTag,
  FiArrowRight,
  FiXCircle,
} from "react-icons/fi";
import { FaFutbol, FaRegLightbulb } from "react-icons/fa";
import { GiWhistle, GiPodiumWinner } from "react-icons/gi";

type LapanganType = {
  id: number;
  name: string;
  venue: string;
  sport: "Futsal" | "Badminton";
  image: string;
  price: number;
  features: string[];
};

const dummyFields: LapanganType[] = [
  {
    id: 1,
    name: "Futsal Arena A",
    venue: "Go2Gor Arena, Jakarta",
    sport: "Futsal",
    image: "https://picsum.photos/seed/futsal-arena-a/800/600",
    price: 150000,
    features: ["Rumput Sintetis", "Standar FIFA", "Lampu LED"],
  },
  {
    id: 2,
    name: "Futsal Arena B",
    venue: "Go2Gor Arena, Jakarta",
    sport: "Futsal",
    image: "https://picsum.photos/seed/futsal-arena-b/800/600",
    price: 125000,
    features: ["Lantai Interlock", "Papan Skor Digital"],
  },
  {
    id: 3,
    name: "Badminton Court 1",
    venue: "Go2Gor Center, Bandung",
    sport: "Badminton",
    image: "https://picsum.photos/seed/badminton-court-1/800/600",
    price: 75000,
    features: ["Karpet Vinyl", "Standar BWF", "Lampu LED"],
  },
  {
    id: 4,
    name: "Badminton Court 2",
    venue: "Go2Gor Center, Bandung",
    sport: "Badminton",
    image: "https://picsum.photos/seed/badminton-court-2/800/600",
    price: 85000,
    features: ["Karpet Vinyl", "Papan Skor Digital"],
  },
  {
    id: 5,
    name: "Victory Futsal",
    venue: "Go2Gor Stadium, Surabaya",
    sport: "Futsal",
    image: "https://picsum.photos/seed/victory-futsal/800/600",
    price: 175000,
    features: [
      "Rumput Sintetis Premium",
      "Standar Internasional",
      "Kamera CCTV",
    ],
  },
  {
    id: 6,
    name: "Smash Badminton Hall",
    venue: "Go2Gor Hall, Yogyakarta",
    sport: "Badminton",
    image: "https://picsum.photos/seed/smash-badminton/800/600",
    price: 90000,
    features: ["Lantai Kayu Parket", "Standar BWF", "Kafetaria"],
  },
];

const sportFilters = ["Semua", "Futsal", "Badminton"];

export default function LapanganPage() {
  const [activeSport, setActiveSport] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFields = useMemo(() => {
    return dummyFields.filter((field) => {
      const sportMatch = activeSport === "Semua" || field.sport === activeSport;
      const searchMatch =
        field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.venue.toLowerCase().includes(searchTerm.toLowerCase());
      return sportMatch && searchMatch;
    });
  }, [activeSport, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Pilih Lapangan Impianmu
          </h1>
          <p className="text-lg text-gray-400">
            Temukan lapangan futsal dan badminton terbaik di kotamu.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="sticky top-24 z-40 bg-gray-900/60 backdrop-blur-lg p-4 rounded-2xl border border-white/10 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="relative col-span-1 md:col-span-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama lapangan atau venue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-wrap items-center justify-center gap-3">
              {sportFilters.map((sport) => (
                <button
                  key={sport}
                  onClick={() => setActiveSport(sport)}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${activeSport === sport ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "bg-gray-800 hover:bg-gray-700"}`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Lapangan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredFields.length > 0 ? (
              filteredFields.map((field, i) => (
                <motion.div
                  key={field.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.05,
                    ease: "easeOut",
                  }}
                >
                  <FieldCard field={field} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-20 text-center"
              >
                <FiXCircle size={64} className="text-gray-600 mb-4" />
                <h3 className="text-2xl font-bold text-white">
                  Tidak Ditemukan
                </h3>
                <p className="text-gray-400 max-w-sm">
                  Maaf, kami tidak dapat menemukan lapangan yang sesuai dengan
                  kriteria Anda. Coba ubah filter pencarian.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const FieldCard = ({ field }: { field: LapanganType }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden h-full flex flex-col group transition-all duration-300 hover:border-indigo-500/70 hover:shadow-2xl hover:shadow-indigo-900/20 transform hover:-translate-y-1">
      <div className="relative h-56">
        <Image
          src={field.image}
          alt={field.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute top-4 left-4 bg-indigo-500 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center gap-2">
          {field.sport === "Futsal" ? <FaFutbol /> : <GiWhistle />}
          <span>{field.sport}</span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-sm text-gray-400 mb-1 flex items-center gap-2">
          <FiMapPin /> {field.venue}
        </p>
        <h3 className="text-2xl font-bold text-white mb-3 leading-tight flex-grow">
          {field.name}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {field.features.map((feature) => (
            <span
              key={feature}
              className="text-xs bg-gray-700 text-gray-300 px-2.5 py-1 rounded-full flex items-center gap-1.5"
            >
              <FaRegLightbulb className="text-yellow-300" /> {feature}
            </span>
          ))}
        </div>

        <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-700">
          <div>
            <p className="text-sm text-gray-400">Mulai dari</p>
            <p className="text-xl font-bold text-white">
              Rp {field.price.toLocaleString("id-ID")}
              <span className="text-sm font-normal text-gray-400">/jam</span>
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-indigo-500 text-white px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-indigo-500/30"
          >
            <span>Booking</span>
            <FiArrowRight />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
