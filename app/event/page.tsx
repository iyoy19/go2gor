"use client";

import Image from "next/image";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { useState } from "react";
import {
  FiCalendar,
  FiMapPin,
  FiX,
  FiArrowRight,
  FiAward,
  FiClipboard,
  FiClock,
  FiInfo,
} from "react-icons/fi";
import { FaTrophy, FaUserFriends } from "react-icons/fa";
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
  registrationFee: number;
  maxTeams: number;
  remainingSlots: number;
  prizes: {
    first: {
      amount: number;
      extras?: string[];
    };
    second: {
      amount: number;
      extras?: string[];
    };
    third: {
      amount: number;
      extras?: string[];
    };
  };
  requirements: string[];
  timeline: {
    date: string;
    event: string;
  }[];
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
        ease: easeOut,
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
            className="fixed inset-0 z-[999] flex items-start justify-center bg-black/70 backdrop-blur-md overflow-y-auto py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl mx-4 my-10 border border-gray-200 dark:border-gray-700 overflow-auto max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky Header with Close Button */}
              <div className="sticky top-0 z-50 flex justify-end p-4 from-gray-900/50 to-transparent">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEvent(null);
                  }}
                  className="text-white bg-black/60 hover:bg-black/80 rounded-full w-9 h-9 flex items-center justify-center transition-all duration-200 shadow-lg backdrop-blur-sm hover:scale-105"
                >
                  <FiX size={18} className="stroke-[2.5]" />
                </button>
              </div>

              {/* Top - Image */}
              <div className="relative w-full overflow-hidden">
                <div className="relative h-[300px] sm:h-[400px] overflow-hidden rounded-t-2xl">
                  <Image
                    src={selectedEvent!.image}
                    alt={selectedEvent!.title}
                    layout="fill"
                    objectFit="cover"
                    priority
                    className="rounded-t-2xl"
                  />
                  <div className="absolute inset-0 bg-transparent rounded-t-2xl"></div>
                </div>
              </div>

              {/* Bottom - Content Split into Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
                {/* Left Column - Event Details */}
                <div className="space-y-6">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-indigo-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                      {selectedEvent!.category}
                    </span>
                    <span className="bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                      Rp{" "}
                      {selectedEvent!.registrationFee.toLocaleString("id-ID")}
                      /tim
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                    {selectedEvent!.title}
                  </h3>

                  {/* Event Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 mb-6">
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

                  {/* Description */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-lg font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
                      <FiInfo className="w-5 h-5" />
                      <h4>Deskripsi Event</h4>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                        {selectedEvent!.description}
                      </p>
                    </div>
                  </div>

                  {/* Prize Section */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-lg font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
                      <FaTrophy className="w-5 h-5" />
                      <h4>Total Hadiah</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 rounded-lg text-white relative overflow-hidden">
                        <div className="relative z-10">
                          <div className="font-bold text-xl mb-1 flex items-center gap-2">
                            <FiAward className="w-5 h-5" />
                            Juara 1
                          </div>
                          <div className="text-sm font-medium">
                            Rp{" "}
                            {selectedEvent!.prizes.first.amount.toLocaleString(
                              "id-ID"
                            )}
                            {selectedEvent!.prizes.first.extras && (
                              <div className="text-xs mt-1 bg-black/20 p-1 rounded">
                                +{" "}
                                {selectedEvent!.prizes.first.extras.join(", ")}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-2 translate-y-2">
                          <FaTrophy className="w-16 h-16" />
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-gray-400 to-gray-600 p-4 rounded-lg text-white relative overflow-hidden">
                        <div className="relative z-10">
                          <div className="font-bold text-xl mb-1 flex items-center gap-2">
                            <FiAward className="w-5 h-5" />
                            Juara 2
                          </div>
                          <div className="text-sm font-medium">
                            Rp{" "}
                            {selectedEvent!.prizes.second.amount.toLocaleString(
                              "id-ID"
                            )}
                            {selectedEvent!.prizes.second.extras && (
                              <div className="text-xs mt-1 bg-black/20 p-1 rounded">
                                +{" "}
                                {selectedEvent!.prizes.second.extras.join(", ")}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-2 translate-y-2">
                          <FaTrophy className="w-16 h-16" />
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-amber-700 to-amber-900 p-4 rounded-lg text-white relative overflow-hidden">
                        <div className="relative z-10">
                          <div className="font-bold text-xl mb-1 flex items-center gap-2">
                            <FiAward className="w-5 h-5" />
                            Juara 3
                          </div>
                          <div className="text-sm font-medium">
                            Rp{" "}
                            {selectedEvent!.prizes.third.amount.toLocaleString(
                              "id-ID"
                            )}
                            {selectedEvent!.prizes.third.extras && (
                              <div className="text-xs mt-1 bg-black/20 p-1 rounded">
                                +{" "}
                                {selectedEvent!.prizes.third.extras.join(", ")}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-2 translate-y-2">
                          <FaTrophy className="w-16 h-16" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}
                </div>
                {/* Right Column - Timeline and Prize */}
                <div className="space-y-6">
                  {/* Timeline */}
                  <div>
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-lg font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
                        <FiClipboard className="w-5 h-5" />
                        <h4>Syarat & Ketentuan</h4>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                          {selectedEvent!.requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="min-w-[20px] mt-1">•</div>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-lg font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
                      <FiClock className="w-5 h-5" />
                      <h4>Timeline Event</h4>
                    </div>
                    <div className="space-y-3">
                      {selectedEvent!.timeline.map((item, index) => (
                        <div
                          key={index}
                          className="flex gap-4 items-start group"
                        >
                          <div className="w-24 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                            {new Date(item.date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                            })}
                          </div>
                          <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-800/70 transition-colors">
                            {item.event}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="flex flex-wrap gap-4 justify-between items-center p-6 md:p-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FaUserFriends className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <p className="text-sm">
                      Slot tersisa:{" "}
                      <span className="font-bold text-indigo-600">
                        {selectedEvent!.remainingSlots} tim
                      </span>
                    </p>
                    <p className="text-xs">
                      *Maksimal {selectedEvent!.maxTeams} tim
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-indigo-600/40 hover:bg-indigo-700 transition-colors"
                >
                  <span>Daftar Sekarang</span>
                  <FiArrowRight className="animate-pulse" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
