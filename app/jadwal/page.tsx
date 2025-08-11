"use client";

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

// Dummy Data
import { LapanganType, dummyFields } from "@/data/lapangan";

interface TimeSlot {
  time: string; // e.g., "08:00", "09:00"
  isBooked: boolean;
}

interface FieldSchedule {
  fieldId: string;
  date: string; // YYYY-MM-DD
  slots: TimeSlot[];
}

const generateDummySchedule = (fieldId: string, date: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let i = 8; i <= 22; i++) {
    // 8 AM to 10 PM
    const time = `${i < 10 ? "0" : ""}${i}:00`;
    // Randomly book some slots
    const isBooked = Math.random() > 0.7;
    slots.push({ time, isBooked });
  }
  return slots;
};

const getDatesForNext7Days = (): { date: string; label: string }[] => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateString = d.toISOString().split("T")[0]; // YYYY-MM-DD
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
  const availableDates = useMemo(() => getDatesForNext7Days(), []);
  const [selectedFieldId, setSelectedFieldId] = useState<string>(
    dummyFields[0].id.toString()
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    availableDates[0].date
  );
  const [schedule, setSchedule] = useState<FieldSchedule | null>(null);

  const currentField = useMemo(
    () => dummyFields.find((f) => f.id.toString() === selectedFieldId),
    [selectedFieldId]
  );

  useEffect(() => {
    // Simulate fetching schedule data
    const fetchedSchedule = {
      fieldId: selectedFieldId,
      date: selectedDate,
      slots: generateDummySchedule(selectedFieldId, selectedDate),
    };
    setSchedule(fetchedSchedule);
  }, [selectedFieldId, selectedDate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Hardcoded light mode classes
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
            "grid grid-cols-1 gap-8 rounded-xl p-6 shadow-lg border",
            bgColorClass,
            borderColorClass
          )}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Field Selection */}
          <div className="lg:col-span-1">
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
                  <MapPinIcon className="w-5 h-5 text-blue-500" />{" "}
                  Lokasi: {currentField.venue}
                </p>
                <p
                  className={clsx(
                    "flex items-center gap-2 mb-2",
                    textColorClass
                  )}
                >
                  <TagIcon className="w-5 h-5 text-blue-500" />{" "}
                  Jenis Olahraga: {currentField.sport}
                </p>
                <p className={clsx("flex items-center gap-2", textColorClass)}>
                  <ClockIcon className="w-5 h-5 text-blue-500" />{" "}
                  Harga: {formatPrice(currentField.price)} / jam
                </p>
              </motion.div>
            )}
          </div>

          {/* Schedule Display */}
          <div className="lg:col-span-2">
            <h2 className={clsx("text-2xl font-bold mb-4", textColorClass)}>
              Pilih Tanggal dan Waktu Booking
            </h2>

            {/* Date Selection */}
            <div className="flex space-x-3 overflow-x-auto pb-4 hide-scrollbar">
              {availableDates.map((dateOption) => (
                <button
                  key={dateOption.date}
                  onClick={() => setSelectedDate(dateOption.date)}
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
              {schedule?.slots.map((slot) => (
                <button
                  key={slot.time}
                  className={clsx(
                    "px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200",
                    slot.isBooked
                      ? "bg-red-200 text-red-700 cursor-not-allowed opacity-70"
                      : "bg-green-200 text-green-700 hover:bg-green-300"
                  )}
                  disabled={slot.isBooked}
                >
                  {slot.time}
                </button>
              ))}
            </div>

            {/* Booking Action */}
            <div className="mt-8 text-center">
              <Link
                href="/booking"
                className={clsx(
                  "inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold shadow-xl transition-all duration-300 ease-in-out",
                  "bg-blue-600 text-white hover:bg-blue-700"
                )}
              >
                <CalendarDaysIcon className="w-6 h-6" />
                Pesan Sekarang
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}