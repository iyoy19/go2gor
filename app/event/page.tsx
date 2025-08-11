"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiCalendar, FiMapPin, FiX, FiArrowRight } from "react-icons/fi";
import { dummyEvents } from "@/data/event";

type EventType = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  slug: string;
  eventDate: string;
  location: string;
};

export default function EventPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const now = new Date();
  const upcomingEvents = dummyEvents.filter((e) => new Date(e.eventDate) > now);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="min-h-screen text-gray-900 dark:text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 font-poppins">
      {" "}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Upcoming Events
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Jangan lewatkan event olahraga paling seru di kotamu!
          </p>
        </motion.div>

        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={event.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                onClick={() => setSelectedEvent(event)}
                className="cursor-pointer group"
              >
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden h-full flex flex-col hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <Image
                      src={event.image}
                      alt={event.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105 transform-gpu"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md">
                      {event.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 leading-tight flex-grow">
                      {event.title}
                    </h2>
                    <div className="mt-auto space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="text-indigo-500 dark:text-indigo-400" />
                        <span>
                          {new Date(event.eventDate).toLocaleDateString(
                            "id-ID",
                            { day: "numeric", month: "long", year: "numeric" }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiMapPin className="text-indigo-500 dark:text-indigo-400" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20 flex flex-col items-center"
          >
            <Image
              src="/images/noevent1.svg"
              alt="No Events"
              width={200}
              height={200}
              className="mb-6 opacity-80"
            />
            <h2 className="text-2xl font-bold mb-2">Belum Ada Event</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Saat ini belum ada event yang akan datang. Cek kembali nanti ya!
            </p>
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-start justify-center bg-black/70 backdrop-blur-md p-4 pt-20 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg mx-auto border border-gray-200 dark:border-gray-700 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={selectedEvent!.image}
                  alt={selectedEvent!.title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="p-6">
                <span className="bg-indigo-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4 inline-block shadow-md">
                  {selectedEvent!.category}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                  {selectedEvent!.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
                  {selectedEvent!.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 mb-8">
                  <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <FiCalendar
                      size={20}
                      className="text-indigo-500 dark:text-indigo-400"
                    />
                    <div>
                      <p className="font-semibold">Tanggal & Waktu</p>
                      <p className="text-sm">
                        {new Date(selectedEvent!.eventDate).toLocaleString(
                          "id-ID",
                          { dateStyle: "full", timeStyle: "short" }
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <FiMapPin
                      size={20}
                      className="text-indigo-500 dark:text-indigo-400"
                    />
                    <div>
                      <p className="font-semibold">Lokasi</p>
                      <p className="text-sm">{selectedEvent!.location}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-indigo-600/40"
                  >
                    <span>Daftar Sekarang</span>
                    <FiArrowRight />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
