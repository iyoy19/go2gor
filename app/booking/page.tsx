"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { dummyFields } from "@/data/lapangan";
import FieldSelector from "@/components/Booking/FieldSelector";
import BookingDatePicker from "@/components/Booking/BookingDatePicker";
import TimeSlotGrid from "@/components/Booking/TimeSlotGrid";
import BookingModal from "@/components/Booking/BookingModal";
import clsx from "clsx";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

interface TimeSlot {
  time: string;
  isBooked: boolean;
}

interface FieldSchedule {
  fieldId: string;
  date: string;
  slots: TimeSlot[];
}

function seededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return () => {
    h = Math.imul(48271, h) % 0x7fffffff;
    return (h & 0xfffffff) / 0x7fffffff;
  };
}

const generateDummySchedule = (fieldId: string, date: string): TimeSlot[] => {
  const rand = seededRandom(fieldId + date);
  const slots: TimeSlot[] = [];
  for (let i = 8; i <= 22; i++) {
    const time = `${i < 10 ? "0" : ""}${i}:00`;
    const isBooked = rand() > 0.7;
    slots.push({ time, isBooked });
  }
  return slots;
};

function isTimesConsecutive(times: string[]) {
  if (times.length < 2) return true;
  const sorted = times.slice().sort();
  const jamArr = sorted.map((j) => parseInt(j.split(":")[0], 10));
  for (let i = 1; i < jamArr.length; i++) {
    if (jamArr[i] !== jamArr[i - 1] + 1) return false;
  }
  return true;
}

interface DateOption {
  date: string;
  label: string;
}

const getDatesForNext7Days = (): DateOption[] => {
  const dates: DateOption[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateString = d.toISOString().split("T")[0];
    const label =
      i === 0
        ? "Hari Ini"
        : d.toLocaleDateString("id-ID", {
            weekday: "short",
            day: "numeric",
            month: "short",
          });
    dates.push({ date: dateString, label });
  }
  return dates;
};

export default function Booking() {
  const availableDates = useMemo(() => getDatesForNext7Days(), []);
  // Gunakan field pertama sebagai default
  const [selectedFieldId, setSelectedFieldId] = useState(
    dummyFields[0].id.toString()
  );
  const [selectedDate, setSelectedDate] = useState(availableDates[0].date);
  const [schedule, setSchedule] = useState<FieldSchedule | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [formError, setFormError] = useState("");

  const currentField = useMemo(
    () => dummyFields.find((f) => f.id.toString() === selectedFieldId),
    [selectedFieldId]
  );

  useEffect(() => {
    const fetchedSchedule = {
      fieldId: selectedFieldId,
      date: selectedDate,
      slots: generateDummySchedule(selectedFieldId, selectedDate),
    };
    setSchedule(fetchedSchedule);
    setSelectedTimes([]);
  }, [selectedFieldId, selectedDate]);

  const handleTimeSelect = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20 font-poppins">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-xl p-6 shadow-lg border border-white/30 bg-black/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Kiri - Lapangan */}
          <FieldSelector
            fields={dummyFields}
            selectedFieldId={selectedFieldId}
            onFieldSelect={setSelectedFieldId}
            currentField={currentField}
          />

          {/* Kanan - Tanggal & Waktu */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Pilih Tanggal dan Waktu Booking
            </h2>

            <BookingDatePicker
              availableDates={availableDates}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />

            {schedule && (
              <TimeSlotGrid
                slots={schedule.slots}
                selectedTimes={selectedTimes}
                onTimeSelect={handleTimeSelect}
              />
            )}

            {/* Warning jam tidak berurutan */}
            {selectedTimes.length > 1 && !isTimesConsecutive(selectedTimes) && (
              <div className="text-yellow-800 bg-yellow-100 border border-yellow-300 rounded-md px-4 py-2 mt-2 text-sm">
                <b>Perhatian:</b> Jam booking tidak berurutan.
              </div>
            )}

            {/* Booking Button */}
            <div className="mt-8 text-center">
              {formError && (
                <div className="text-red-600 text-sm mb-2">{formError}</div>
              )}
              <button
                type="button"
                className={clsx(
                  "inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold shadow-md transition-all duration-300 ease-in-out",
                  selectedTimes.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-teal-600 text-white hover:bg-teal-700"
                )}
                onClick={() => {
                  if (selectedTimes.length === 0) {
                    setFormError(
                      "Pilih minimal satu jam booking terlebih dahulu."
                    );
                    return;
                  }
                  setFormError("");
                  setShowModal(true);
                }}
                disabled={selectedTimes.length === 0}
              >
                <CalendarDaysIcon className="w-6 h-6" />
                Booking Sekarang
              </button>
            </div>
          </div>
        </motion.div>

        {/* Notification */}
        {showNotif && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
            <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg text-lg font-semibold animate-fadeInUp">
              Booking berhasil! Silakan lanjut ke pembayaran.
            </div>
          </div>
        )}

        {/* Booking Modal */}
        <BookingModal
          show={showModal}
          onClose={() => setShowModal(false)}
          currentField={currentField}
          selectedDate={selectedDate}
          selectedTimes={selectedTimes}
          onSubmit={() => {
            setShowModal(false);
            setShowNotif(true);
            setTimeout(() => setShowNotif(false), 2000);
          }}
        />
      </div>
    </section>
  );
}
