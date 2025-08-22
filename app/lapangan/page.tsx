"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiSearch, FiMapPin, FiArrowRight, FiXCircle } from "react-icons/fi";
import { FaFutbol, FaRegLightbulb } from "react-icons/fa";
import { GiWhistle } from "react-icons/gi";
import clsx from "clsx";

import { LapanganType, dummyFields } from "@/data/lapangan";

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

  const textColorClass = "text-gray-900";
  const secondaryTextColorClass = "text-gray-500";
  const bgColorClass = "bg-transparent";
  const cardBgClass = "bg-white/90";
  const borderColorClass = "border-gray-100";

  return (
    <div
      className={clsx(
        "min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 font-poppins",
        bgColorClass,
        textColorClass
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1
            className={clsx(
              "text-4xl md:text-5xl font-bold tracking-tight mb-3",
              textColorClass
            )}
          >
            Pilih Lapangan Impianmu
          </h1>
          <p className={clsx("text-lg", secondaryTextColorClass)}>
            Temukan lapangan futsal dan badminton terbaik di kotamu.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className={clsx(
            "sticky top-24 z-40 backdrop-blur-lg p-4 rounded-2xl border mb-12",
            cardBgClass,
            borderColorClass
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="relative col-span-1 md:col-span-1">
              <FiSearch
                className={clsx(
                  "absolute left-4 top-1/2 -translate-y-1/2",
                  secondaryTextColorClass
                )}
              />
              <input
                type="text"
                placeholder="Cari nama lapangan atau venue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={clsx(
                  "w-full rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition",
                  "bg-gray-100 border border-gray-300 text-neutral-800"
                )}
              />
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-wrap items-center justify-center gap-3">
              {sportFilters.map((sport) => (
                <button
                  key={sport}
                  onClick={() => setActiveSport(sport)}
                  className={clsx(
                    "px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300",
                    activeSport === sport
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  )}
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
                  <FieldCard
                    field={field}
                    secondaryTextColorClass={secondaryTextColorClass}
                    textColorClass={textColorClass}
                    borderColorClass={borderColorClass}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-20 text-center"
              >
                <FiXCircle
                  size={64}
                  className={clsx("mb-4", secondaryTextColorClass)}
                />
                <h3 className={clsx("text-2xl font-bold", textColorClass)}>
                  Tidak Ditemukan
                </h3>
                <p className={clsx("max-w-sm", secondaryTextColorClass)}>
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

const FieldCard = ({
  field,
  secondaryTextColorClass,
  textColorClass,
  borderColorClass,
}: {
  field: LapanganType;
  secondaryTextColorClass: string;
  textColorClass: string;
  borderColorClass: string;
}) => {
  return (
    <div
      className={clsx(
        "rounded-2xl overflow-hidden h-full flex flex-col group transition-all duration-300 hover:border-indigo-400 hover:shadow-xl transform hover:-translate-y-1",
        "bg-white border border-gray-100 shadow-sm"
      )}
    >
      <div className="relative h-56 overflow-hidden rounded-t-2xl bg-gray-100">
        <Image
          src={field.image}
          alt={field.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full transition-all duration-300 bg-gradient-to-t from-black/40 to-transparent opacity-70 group-hover:from-black/20 group-hover:opacity-40"></div>
        </div>
        <div className="absolute top-4 left-4 bg-white/90 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-2 shadow-sm border border-indigo-100">
          {field.sport === "Futsal" ? (
            <FaFutbol className="text-indigo-500" />
          ) : (
            <GiWhistle className="text-indigo-500" />
          )}
          <span>{field.sport}</span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <p
          className={clsx(
            "text-sm mb-1 flex items-center gap-2",
            secondaryTextColorClass
          )}
        >
          <FiMapPin /> {field.venue}
        </p>
        <h3
          className={clsx(
            "text-xl font-semibold mb-3 leading-tight flex-grow tracking-tight",
            textColorClass
          )}
        >
          {field.name}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {field.features.map((feature) => (
            <span
              key={feature}
              className={clsx(
                "text-xs px-2 py-1 rounded-full flex items-center gap-1.5 border border-gray-200 bg-gray-50 text-gray-600"
              )}
            >
              <FaRegLightbulb className="text-yellow-400" /> {feature}
            </span>
          ))}
        </div>

        <div
          className={clsx(
            "mt-auto flex justify-between items-center pt-4 border-t",
            borderColorClass
          )}
        >
          <div>
            <p className={clsx("text-xs mb-1", secondaryTextColorClass)}>
              Mulai dari
            </p>
            <p className={clsx("text-lg font-bold", textColorClass)}>
              Rp {field.price.toLocaleString("id-ID")}
              <span
                className={clsx("text-xs font-normal", secondaryTextColorClass)}
              >
                /jam
              </span>
            </p>
          </div>
          {/* Link Booking dengan param fieldId */}
          <Link
            href={`/booking`}
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full font-semibold shadow-md transition text-sm"
          >
            <span>Booking</span>
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};
