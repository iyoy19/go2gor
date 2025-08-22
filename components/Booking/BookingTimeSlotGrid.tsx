"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

export interface TimeSlot {
  time: string;
  isBooked: boolean;
}

interface BookingTimeSlotGridProps {
  slots: TimeSlot[];
  selectedTimes: string[];
  onTimeSelect: (time: string) => void;
}

export default function BookingTimeSlotGrid({
  slots,
  selectedTimes,
  onTimeSelect,
}: BookingTimeSlotGridProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-4">
      {slots.map((slot) => (
        <motion.button
          key={slot.time}
          layout
          whileHover={{ scale: slot.isBooked ? 1 : 1.05 }}
          whileTap={{ scale: slot.isBooked ? 1 : 0.95 }}
          className={clsx(
            "py-2 rounded-lg font-medium transition-all",
            slot.isBooked
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : selectedTimes.includes(slot.time)
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          )}
          disabled={slot.isBooked}
          onClick={() => onTimeSelect(slot.time)}
        >
          {slot.time}
        </motion.button>
      ))}
    </div>
  );
}
