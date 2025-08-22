"use client";

import { useState, useEffect, useMemo } from "react";
import { CalendarDate, today, getLocalTimeZone } from "@internationalized/date";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { dummyFields } from "@/data/lapangan";

// Dynamic BookingModal
const BookingModal = dynamic(
  () => import("@/components/Booking/BookingModal"),
  { ssr: false }
);

const timeSlots = Array.from({ length: 15 }, (_, i) => {
  const hour = i + 8;
  return `${hour < 10 ? "0" : ""}${hour}:00`;
});

function getNextSevenDays(start: CalendarDate) {
  const days: CalendarDate[] = [];
  for (let i = 0; i < 7; i++) {
    days.push(start.add({ days: i }));
  }
  return days;
}

function formatDateInput(date: CalendarDate | null) {
  if (!date) return "";
  const m = date.month.toString().padStart(2, "0");
  const d = date.day.toString().padStart(2, "0");
  return `${date.year}-${m}-${d}`;
}

const monthNames = [
  "",
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function formatDayLabel(date: CalendarDate, idx: number) {
  if (idx === 0) return "Hari Ini";
  if (idx === 1) return "Besok";
  return `${date.day} ${monthNames[date.month]}`;
}

export default function BookingPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedField, setSelectedField] = useState(dummyFields[0].id);
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const todayDate = today(getLocalTimeZone());

  useEffect(() => {
    setMounted(true);
    if (!selectedDate) setSelectedDate(todayDate);
  }, [selectedDate, todayDate]);

  const nextSevenDays = useMemo(() => getNextSevenDays(todayDate), [todayDate]);

  const checkSequential = (times: string[]) => {
    const hours = times.map((t) => parseInt(t.split(":")[0]));
    for (let i = 1; i < hours.length; i++) {
      if (hours[i] !== hours[i - 1] + 1) return false;
    }
    return true;
  };

  const isSequential = checkSequential(selectedTimes);

  if (!mounted) return null;

  return (
    <div className="p-6 md:p-12 bg-transparent min-h-screen">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center md:text-left mb-8 pt-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-teal-700 mb-2">
          ⚽{" "}
          <span className="bg-gradient-to-r from-teal-400 to-teal-600 text-transparent bg-clip-text">
            Booking Lapangan
          </span>{" "}
          & Waktu Favoritmu!
        </h1>
        <p className="text-md md:text-lg text-gray-600">
          Pilih tanggal, jam, dan nikmati permainanmu tanpa ribet.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Lapangan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Pilih Lapangan</h2>
          <div className="flex flex-col gap-4">
            {dummyFields.map((field) => (
              <motion.button
                key={field.id}
                onClick={() => setSelectedField(field.id)}
                whileHover={{ scale: 1.03 }}
                className={clsx(
                  "flex items-center gap-3 px-4 py-2 rounded-lg border text-left transition-all",
                  selectedField === field.id
                    ? "bg-teal-600 text-white"
                    : "bg-white/40 hover:bg-white/60"
                )}
              >
                <img
                  src={field.image}
                  alt={field.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <span>{field.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Card Tanggal & Jam */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Pilih Tanggal & Jam</h2>

          {/* Tanggal */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setShowCalendar((prev) => !prev)}
              className="p-2 rounded-lg border hover:bg-white/50 flex-shrink-0"
            >
              <CalendarDaysIcon className="w-5 h-5" />
            </button>

            <div className="flex gap-2 overflow-x-auto flex-nowrap scrollbar-hide">
              {nextSevenDays.map((date, idx) => {
                const isSelected = selectedDate?.toString() === date.toString();
                const isDisabled = date.toString() < todayDate.toString();
                return (
                  <motion.button
                    key={idx}
                    onClick={() => !isDisabled && setSelectedDate(date)}
                    disabled={isDisabled}
                    className={clsx(
                      "px-3 py-2 rounded-lg text-sm min-w-[64px] flex-shrink-0 transition-all",
                      isDisabled
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : isSelected
                          ? "bg-teal-600 text-white"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                    )}
                    whileTap={{ scale: isDisabled ? 1 : 0.95 }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={isSelected ? "selected" : "normal-" + idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        {isSelected ? formatDayLabel(date, idx) : date.day}
                      </motion.span>
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <input
            type="date"
            value={formatDateInput(selectedDate)}
            min={formatDateInput(todayDate)}
            onChange={(e) => {
              const [y, m, d] = e.target.value.split("-").map(Number);
              setSelectedDate(new CalendarDate(y, m, d));
            }}
            className={clsx(
              "border rounded-lg px-2 py-1 mb-4",
              showCalendar ? "block" : "hidden"
            )}
          />

          {/* Jam */}
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4">
            <h3 className="text-md font-semibold mb-2">Pilih Jam</h3>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {timeSlots.map((time) => {
                const selected = selectedTimes.includes(time);
                return (
                  <motion.button
                    key={time}
                    onClick={() =>
                      setSelectedTimes((prev) =>
                        prev.includes(time)
                          ? prev.filter((t) => t !== time)
                          : [...prev, time].sort()
                      )
                    }
                    whileTap={{ scale: 0.95 }}
                    className={clsx(
                      "px-3 py-2 rounded-lg text-sm border",
                      selected
                        ? "bg-teal-600 text-white"
                        : "bg-white/50 hover:bg-white/70"
                    )}
                  >
                    {time}
                  </motion.button>
                );
              })}
            </div>

            {!isSequential && selectedTimes.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-yellow-700 font-semibold mb-2"
              >
                ⚠️ Perhatikan Jam Yang Dipilih
              </motion.div>
            )}

            <motion.button
              className="w-full px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
              disabled={!selectedDate || selectedTimes.length === 0}
              onClick={() => setShowModal(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              Booking Sekarang
            </motion.button>
          </div>
        </motion.div>
      </div>

      {showModal && (
        <BookingModal
          show={showModal}
          onClose={() => setShowModal(false)}
          currentField={dummyFields.find((f) => f.id === selectedField)!}
          selectedDate={selectedDate?.toString() || ""}
          selectedTimes={selectedTimes}
          onSubmit={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
