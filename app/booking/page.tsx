"use client";

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

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import {
  ChevronDownIcon,
  CalendarDaysIcon,
  MapPinIcon,
  TagIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { LapanganType, dummyFields } from "../../data/lapangan";

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

export default function JadwalLapanganPage() {
  const availableDates = useMemo<DateOption[]>(
    () => getDatesForNext7Days(),
    []
  );
  const [selectedFieldId, setSelectedFieldId] = useState<string>(
    dummyFields[0].id.toString()
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    availableDates[0].date
  );
  const [schedule, setSchedule] = useState<FieldSchedule | null>(null);
  const [showDateInput, setShowDateInput] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [namaPemesan, setNamaPemesan] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [formError, setFormError] = useState("");
  const [isVersus, setIsVersus] = useState(false);
  const [namaLawan, setNamaLawan] = useState("");

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const textColorClass = "text-neutral-800";
  const bgColorClass = "bg-white";
  const borderColorClass = "border-gray-200";
  const cardBgClass = "bg-gray-50";
  const cardBorderClass = "border-gray-300";

  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20 font-poppins">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          className={clsx(
            "grid grid-cols-1 md:grid-cols-2 gap-8 rounded-xl p-6 shadow-lg border",
            bgColorClass,
            borderColorClass
          )}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Field Selection (Kiri) */}
          <div className="flex flex-col">
            <h2 className={clsx("text-2xl font-bold mb-4", textColorClass)}>
              Pilih Lapangan Olahraga Anda
            </h2>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className={clsx(
                    "capitalize w-full justify-between border transition-colors",
                    "bg-white text-gray-800 hover:bg-gray-100 border-gray-300"
                  )}
                >
                  {currentField?.name || "Pilih Lapangan..."}
                  <ChevronDownIcon className="w-5 h-5" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Pilih Lapangan"
                selectionMode="single"
                selectedKeys={new Set([selectedFieldId])}
                onSelectionChange={(keys) =>
                  setSelectedFieldId(Array.from(keys)[0] as string)
                }
                className={clsx(
                  "rounded-xl shadow-lg",
                  "bg-white border border-gray-200"
                )}
              >
                {dummyFields.map((field, index) => (
                  <DropdownItem
                    key={field.id.toString()}
                    className={clsx(
                      textColorClass,
                      "hover:bg-gray-100",
                      index < dummyFields.length - 1 &&
                        "border-b border-gray-200"
                    )}
                  >
                    {field.name} ({field.sport})
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            {/* Field Details Card */}
            {currentField && (
              <motion.div
                className={clsx(
                  "mt-6 p-6 rounded-lg shadow-md border",
                  cardBgClass,
                  cardBorderClass
                )}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className={clsx("text-xl font-bold mb-3", textColorClass)}>
                  {currentField.name}
                </h3>
                <img
                  src={currentField.image}
                  alt={currentField.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <p
                  className={clsx(
                    "flex items-center gap-2 mb-2",
                    textColorClass
                  )}
                >
                  <MapPinIcon className="w-5 h-5 text-blue-500" /> Lokasi:{" "}
                  {currentField.venue}
                </p>
                <p
                  className={clsx(
                    "flex items-center gap-2 mb-2",
                    textColorClass
                  )}
                >
                  <TagIcon className="w-5 h-5 text-blue-500" /> Jenis Olahraga:{" "}
                  {currentField.sport}
                </p>
                <p className={clsx("flex items-center gap-2", textColorClass)}>
                  <ClockIcon className="w-5 h-5 text-blue-500" /> Harga:{" "}
                  {formatPrice(currentField.price)} / jam
                </p>
              </motion.div>
            )}
          </div>
          <div className="flex flex-col">
            <h2 className={clsx("text-2xl font-bold mb-4", textColorClass)}>
              Pilih Tanggal dan Waktu Booking
            </h2>

            {/* Date Selection */}
            <div className="flex items-center space-x-3 overflow-x-auto pb-4 hide-scrollbar">
              {/* Icon kalender di kiri, hanya icon */}
              <div className="relative flex items-center">
                <button
                  type="button"
                  onClick={() => setShowDateInput(true)}
                  className="flex items-center justify-center px-2 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors border border-gray-300 mr-2"
                  aria-label="Pilih tanggal manual"
                  style={{ minWidth: 36 }}
                >
                  <CalendarDaysIcon className="w-5 h-5 text-blue-500" />
                </button>
                {showDateInput && (
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setShowDateInput(false);
                    }}
                    className="absolute left-10 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white shadow z-20"
                    style={{ minWidth: 120 }}
                    autoFocus
                    onBlur={() => setShowDateInput(false)}
                  />
                )}
              </div>
              {availableDates.map((dateOption) => (
                <button
                  key={dateOption.date}
                  onClick={() => {
                    setSelectedDate(dateOption.date);
                    setShowDateInput(false);
                  }}
                  className={clsx(
                    "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedDate === dateOption.date
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  )}
                >
                  {dateOption.label}
                </button>
              ))}
            </div>

            {/* Time Slots Grid */}
            <div
              className={clsx(
                "mt-6 p-6 rounded-lg shadow-md grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 border",
                cardBgClass,
                cardBorderClass
              )}
            >
              {schedule?.slots.map((slot) => {
                const isSelected = selectedTimes.includes(slot.time);
                return (
                  <button
                    key={slot.time}
                    className={clsx(
                      "px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200",
                      slot.isBooked
                        ? "bg-red-200 text-red-700 cursor-not-allowed opacity-70"
                        : isSelected
                          ? "bg-blue-600 text-white ring-2 ring-blue-400"
                          : "bg-green-200 text-green-700 hover:bg-green-300"
                    )}
                    disabled={slot.isBooked}
                    onClick={() => {
                      if (slot.isBooked) return;
                      setSelectedTimes((prev) =>
                        isSelected
                          ? prev.filter((t) => t !== slot.time)
                          : [...prev, slot.time]
                      );
                    }}
                    aria-pressed={isSelected}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
            {/* Warning jika jam tidak berurutan */}
            {selectedTimes.length > 1 && !isTimesConsecutive(selectedTimes) && (
              <div className="text-yellow-600 bg-yellow-100 border border-yellow-300 rounded-md px-4 py-2 mt-2 text-sm">
                <b>Perhatian:</b> Jam booking berbeda.
              </div>
            )}

            {/* Booking Action */}
            <div className="mt-8 text-center">
              {formError ===
                "Pilih minimal satu jam booking terlebih dahulu." && (
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
                // tetap disabled jika jam tidak dipilih, agar UX konsisten
                disabled={selectedTimes.length === 0}
              >
                <CalendarDaysIcon className="w-6 h-6" />
                Booking Sekarang
              </button>
            </div>

            {/* Modal detail booking */}
            {showNotif && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
                <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg text-lg font-semibold animate-fadeInUp">
                  Booking berhasil! Silakan lanjut ke pembayaran.
                </div>
              </div>
            )}
            {showModal && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
                onClick={(e) => {
                  if (e.target === e.currentTarget) setShowModal(false);
                }}
              >
                <div className="bg-white/80 rounded-2xl shadow-2xl p-0 max-w-lg w-full relative animate-fadeIn overflow-hidden border border-blue-100">
                  {/* Tombol tutup di pojok kanan atas */}
                  <button
                    className="absolute top-3 right-3 text-gray-500 bg-white/70 hover:bg-gray-200 rounded-full p-1 z-10"
                    onClick={() => setShowModal(false)}
                    aria-label="Tutup"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="p-6">
                    <h3 className="text-2xl font-extrabold mb-2 text-blue-700 flex items-center gap-2">
                      <CalendarDaysIcon className="w-6 h-6 text-blue-400" />{" "}
                      Detail Booking
                    </h3>
                    <div className="flex items-center gap-4 mb-4">
                      {currentField?.image && (
                        <img
                          src={currentField.image}
                          alt={currentField.name}
                          className="w-16 h-16 rounded-lg object-cover border border-blue-100 shadow"
                        />
                      )}
                      <div>
                        <div className="font-bold text-xl text-gray-800 mb-1 flex items-center gap-2">
                          {currentField?.name}
                          <span className="text-xs font-normal bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full ml-2">
                            {currentField?.sport}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 gap-1 mb-1">
                          <MapPinIcon className="w-4 h-4" />{" "}
                          {currentField?.venue}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 gap-1 mb-1">
                          <TagIcon className="w-4 h-4" />{" "}
                          {currentField?.features?.join(", ")}
                        </div>
                      </div>
                    </div>
                    <form
                      className="space-y-2 text-gray-700 text-base mb-2"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      {formError && (
                        <div className="text-red-500 text-sm mb-2">
                          {formError}
                        </div>
                      )}
                      <div>
                        <label
                          className="block text-sm font-semibold mb-1"
                          htmlFor="nama-pemesan"
                        >
                          Nama
                        </label>
                        <input
                          id="nama-pemesan"
                          type="text"
                          className={clsx(
                            "w-full px-3 py-2 rounded-md border focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base bg-white/80 mb-2",
                            !namaPemesan && formError
                              ? "border-red-400"
                              : "border-gray-300"
                          )}
                          placeholder="Masukkan nama/Tim"
                          value={namaPemesan}
                          onChange={(e) => setNamaPemesan(e.target.value)}
                          required
                        />
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            id="is-versus"
                            type="checkbox"
                            checked={isVersus}
                            onChange={(e) => setIsVersus(e.target.checked)}
                            className="accent-blue-600 w-4 h-4"
                          />
                          <label
                            htmlFor="is-versus"
                            className="text-sm select-none cursor-pointer"
                          >
                            Booking Versus
                          </label>
                        </div>
                        {isVersus && (
                          <div className="mt-2">
                            <label
                              htmlFor="nama-lawan"
                              className="block text-sm font-semibold mb-1"
                            >
                              Nama Lawan
                            </label>
                            <input
                              id="nama-lawan"
                              type="text"
                              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base bg-white/80"
                              placeholder="Masukkan nama lawan/tim lawan"
                              value={namaLawan}
                              onChange={(e) => setNamaLawan(e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="font-semibold">Tanggal:</span>{" "}
                        {formatDateIndo(selectedDate)}
                      </div>
                      <div>
                        <span className="font-semibold">Jam:</span>{" "}
                        {selectedTimes.length > 0
                          ? renderJamBooking(selectedTimes)
                          : "-"}
                      </div>
                      <div>
                        <span className="font-semibold">Harga per jam:</span> Rp
                        {currentField?.price?.toLocaleString("id-ID")}
                      </div>
                      <div>
                        <span className="font-semibold">Total harga:</span> Rp
                        {currentField && selectedTimes.length > 0
                          ? (
                              currentField.price * selectedTimes.length
                            ).toLocaleString("id-ID")
                          : "-"}
                      </div>
                    </form>
                    {currentField?.description && (
                      <div className="text-xs text-gray-500 mb-2 border-t pt-2">
                        {currentField.description}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mb-2">
                      *Pastikan jam yang dipilih sudah benar sebelum melanjutkan
                      pembayaran.
                    </div>
                    <button
                      className="mt-4 w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-bold shadow hover:from-blue-600 hover:to-green-600 transition-colors text-lg"
                      onClick={() => {
                        if (!selectedDate) {
                          setFormError("Tanggal booking wajib diisi.");
                          return;
                        }
                        if (!namaPemesan.trim()) {
                          setFormError("Nama pemesan/kelompok wajib diisi.");
                          return;
                        }
                        setFormError("");
                        setShowModal(false);
                        setShowNotif(true);
                        setTimeout(() => setShowNotif(false), 2000);
                      }}
                    >
                      Lanjut Pembayaran
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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
