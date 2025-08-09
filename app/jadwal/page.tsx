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
import { ChevronDownIcon, CalendarDaysIcon, MapPinIcon, TagIcon, ClockIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { useTheme } from "next-themes";

// Dummy Data
interface Field {
  id: string;
  name: string;
  type: 'Futsal' | 'Tenis';
  location: string;
  pricePerHour: number;
  image: string;
}

interface TimeSlot {
  time: string; // e.g., "08:00", "09:00"
  isBooked: boolean;
}

interface FieldSchedule {
  fieldId: string;
  date: string; // YYYY-MM-DD
  slots: TimeSlot[];
}

const dummyFields: Field[] = [
  { id: "futsal-cempaka", name: "Cempaka Arena", type: "Futsal", location: "GOR Cempaka", pricePerHour: 75000, image: "https://picsum.photos/seed/futsal1/600/400" },
  { id: "futsal-melati", name: "Melati Pro Court", type: "Futsal", location: "GOR Melati", pricePerHour: 80000, image: "https://picsum.photos/seed/futsal2/600/400" },
  { id: "tenis-nusantara", name: "Nusantara Open", type: "Tenis", location: "GOR Nusantara", pricePerHour: 100000, image: "https://picsum.photos/seed/tenis1/600/400" },
  { id: "tenis-sakura", name: "Sakura Elite Court", type: "Tenis", location: "GOR Sakura", pricePerHour: 120000, image: "https://picsum.photos/seed/tenis2/600/400" },
];

const generateDummySchedule = (fieldId: string, date: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let i = 8; i <= 22; i++) { // 8 AM to 10 PM
    const time = `${i < 10 ? '0' : ''}${i}:00`;
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
    const dateString = d.toISOString().split('T')[0]; // YYYY-MM-DD
    const label = i === 0 ? "Hari Ini" : d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' });
    dates.push({ date: dateString, label });
  }
  return dates;
};

export default function JadwalLapanganPage() {
  const { theme } = useTheme();
  const availableDates = useMemo(() => getDatesForNext7Days(), []);
  const [selectedFieldId, setSelectedFieldId] = useState<string>(dummyFields[0].id);
  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].date);
  const [schedule, setSchedule] = useState<FieldSchedule | null>(null);

  const currentField = useMemo(() => dummyFields.find(f => f.id === selectedFieldId), [selectedFieldId]);

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
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  const textColorClass = theme === "light" ? "text-black" : "text-white";
  const bgColorClass = theme === "light" ? "bg-yellow-50" : "bg-gray-800";
  const borderColorClass = theme === "light" ? "border-yellow-200" : "border-gray-700";
  const cardBgClass = theme === "light" ? "bg-yellow-100/80" : "bg-gray-800/80";
  const cardBorderClass = theme === "light" ? "border-yellow-200" : "border-gray-700";

  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20 font-poppins"> {/* Adjusted padding for Navbar */} 
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.h1
          className={clsx("text-4xl md:text-5xl font-extrabold text-center mb-10", textColorClass)}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Jadwal Lapangan
        </motion.h1>

        <motion.div
          className={clsx("grid grid-cols-1 lg:grid-cols-3 gap-8", bgColorClass, "rounded-xl p-6 shadow-lg", borderColorClass, "border")}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Field Selection */}
          <div className="lg:col-span-1">
            <h2 className={clsx("text-2xl font-bold mb-4", textColorClass)}>Pilih Lapangan</h2>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className={clsx(
                    "capitalize w-full justify-between",
                    "bg-yellow-100 dark:bg-gray-700 text-black dark:text-white",
                    "border border-yellow-200 dark:border-gray-600 hover:border-blue-500",
                    "hover:bg-yellow-200 dark:hover:bg-gray-600"
                  )}
                >
                  {currentField?.name || "Pilih Lapangan"}
                  <ChevronDownIcon className="w-5 h-5" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Pilih Lapangan"
                selectionMode="single"
                selectedKeys={new Set([selectedFieldId])}
                onSelectionChange={(keys) => setSelectedFieldId(Array.from(keys)[0] as string)}
                className={clsx(
                  "bg-yellow-50 dark:bg-gray-900",
                  "border border-yellow-200 dark:border-gray-700",
                  "rounded-xl shadow-lg"
                )}
              >
                {dummyFields.map((field, index) => (
                  <DropdownItem 
                    key={field.id} 
                    className={clsx(
                      textColorClass, 
                      "hover:bg-yellow-100 dark:hover:bg-gray-700",
                      index < dummyFields.length - 1 && "border-b border-yellow-200 dark:border-gray-700"
                    )}
                  >
                    {field.name} ({field.type})
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            {/* Field Details Card */}
            {currentField && (
              <motion.div
                className={clsx("mt-6 p-6 rounded-lg shadow-md", cardBgClass, cardBorderClass, "border")}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className={clsx("text-xl font-bold mb-3", textColorClass)}>{currentField.name}</h3>
                <img src={currentField.image} alt={currentField.name} className="w-full h-48 object-cover rounded-md mb-4" />
                <p className={clsx("flex items-center gap-2 mb-2", textColorClass)}><MapPinIcon className="w-5 h-5 text-blue-500" /> {currentField.location}</p>
                <p className={clsx("flex items-center gap-2 mb-2", textColorClass)}><TagIcon className="w-5 h-5 text-blue-500" /> {currentField.type}</p>
                <p className={clsx("flex items-center gap-2", textColorClass)}><ClockIcon className="w-5 h-5 text-blue-500" /> {formatPrice(currentField.pricePerHour)} / jam</p>
              </motion.div>
            )}
          </div>

          {/* Schedule Display */}
          <div className="lg:col-span-2">
            <h2 className={clsx("text-2xl font-bold mb-4", textColorClass)}>Pilih Tanggal & Waktu</h2>
            
            {/* Date Selection */}
            <div className="flex space-x-3 overflow-x-auto pb-4 hide-scrollbar">
              {availableDates.map(dateOption => (
                <button
                  key={dateOption.date}
                  onClick={() => setSelectedDate(dateOption.date)}
                  className={clsx(
                    "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedDate === dateOption.date
                      ? "bg-blue-400 text-white shadow-md"
                      : clsx("bg-yellow-100 dark:bg-gray-700", textColorClass, "hover:bg-yellow-200 dark:hover:bg-gray-600")
                  )}
                >
                  {dateOption.label}
                </button>
              ))}
            </div>

            {/* Time Slots Grid */}
            <div className={clsx("mt-6 p-6 rounded-lg shadow-md grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4", cardBgClass, cardBorderClass, "border")}>
              {schedule?.slots.map(slot => (
                <button
                  key={slot.time}
                  className={clsx(
                    "px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200",
                    slot.isBooked
                      ? "bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-200 cursor-not-allowed opacity-70"
                      : "bg-green-200 text-green-700 dark:bg-green-800 dark:text-green-100 hover:bg-green-300 dark:hover:bg-green-700"
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
                href="/booking" // Link to a generic booking page or form
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out"
              >
                <CalendarDaysIcon className="w-6 h-6" />
                Booking Sekarang
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}