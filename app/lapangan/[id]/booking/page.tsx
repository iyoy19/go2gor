"use client";

import { useState, useMemo, useEffect, use } from "react";
import { motion } from "framer-motion";
import { dummyFields } from "@/data/lapangan";
import FieldSelector from "@/components/Booking/FieldSelector";
import BookingDatePicker from "@/components/Booking/BookingDatePicker";
import TimeSlotGrid from "@/components/Booking/TimeSlotGrid";
import BookingModal from "@/components/Booking/BookingModal";
import clsx from "clsx";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";

// Helper format tanggal Indonesia
function formatDateIndo(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Helper untuk menampilkan jam booking sebagai rentang jika berurutan
function renderJamBooking(times: string[]) {
  if (times.length === 0) return "-";
  // Urutkan jam
  const sorted = times.slice().sort();
  // Ubah ke angka jam
  const jamArr = sorted.map((j) => parseInt(j.split(":")[0], 10));
  // Cek apakah semua jam berurutan
  let isConsecutive = true;
  for (let i = 1; i < jamArr.length; i++) {
    if (jamArr[i] !== jamArr[i - 1] + 1) {
      isConsecutive = false;
      break;
    }
  }
  if (isConsecutive && jamArr.length > 1) {
    // Tampilkan sebagai rentang
    return `${sorted[0]} - ${sorted[sorted.length - 1]}`;
  }
  // Jika tidak berurutan, tampilkan satu per satu
  return sorted.join(", ");
}

// Helper untuk cek apakah array jam berurutan
function isTimesConsecutive(times: string[]) {
  if (times.length < 2) return true;
  const sorted = times.slice().sort();
  const jamArr = sorted.map((j) => parseInt(j.split(":")[0], 10));
  for (let i = 1; i < jamArr.length; i++) {
    if (jamArr[i] !== jamArr[i - 1] + 1) return false;
  }
  return true;
}

interface TimeSlot {
  time: string;
  isBooked: boolean;
}

interface FieldSchedule {
  fieldId: string;
  date: string;
  slots: TimeSlot[];
}

const generateDummySchedule = (fieldId: string, date: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let i = 8; i <= 22; i++) {
    const time = `${i < 10 ? "0" : ""}${i}:00`;
    const isBooked = Math.random() > 0.7;
    slots.push({ time, isBooked });
  }
  return slots;
};

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

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function JadwalLapanganPage({ params }: PageProps) {
  const router = useRouter();
  const { id: fieldId } = use(params);

  const availableDates = useMemo(() => getDatesForNext7Days(), []);
  const [selectedFieldId, setSelectedFieldId] = useState(fieldId);
  const [selectedDate, setSelectedDate] = useState(availableDates[0].date);
  const [schedule, setSchedule] = useState<FieldSchedule | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [formError, setFormError] = useState("");

  // Cek apakah ID lapangan valid
  useEffect(() => {
    const fieldExists = dummyFields.some(
      (field) => field.id.toString() === fieldId
    );
    if (!fieldExists) {
      notFound();
    }
  }, [fieldId]);

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
    setSelectedTimes([]); // reset jam jika ganti tanggal/lapangan
  }, [selectedFieldId, selectedDate]);

  const handleTimeSelect = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20 font-poppins">
      <div className="container mx-auto px-4 max-w-7xl ">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-xl p-6 shadow-lg border bg-white border-gray-200"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Bagian Kiri - Pemilihan Lapangan */}
          <FieldSelector
            fields={dummyFields}
            selectedFieldId={selectedFieldId}
            onFieldSelect={setSelectedFieldId}
            currentField={currentField}
          />

          {/* Bagian Kanan - Pemilihan Waktu */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-neutral-800">
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

            {/* Warning jika jam tidak berurutan */}
            {selectedTimes.length > 1 && !isTimesConsecutive(selectedTimes) && (
              <div className="text-yellow-600 bg-yellow-100 border border-yellow-300 rounded-md px-4 py-2 mt-2 text-sm">
                <b>Perhatian:</b> Jam booking berbeda.
              </div>
            )}

            {/* Booking Action */}
            <div className="mt-8 text-center">
              {formError && (
                <div className="text-red-500 text-sm mb-2">{formError}</div>
              )}
              <button
                type="button"
                className={clsx(
                  "inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold shadow-xl transition-all duration-300 ease-in-out",
                  selectedTimes.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
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
            <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg text-lg font-semibold animate-fadeInUp">
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
