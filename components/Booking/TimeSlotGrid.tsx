"use client";

import clsx from "clsx";

interface TimeSlot {
  time: string;
  isBooked: boolean;
}

interface TimeSlotGridProps {
  slots: TimeSlot[];
  selectedTimes: string[];
  onTimeSelect: (time: string) => void;
}

export default function TimeSlotGrid({
  slots,
  selectedTimes,
  onTimeSelect,
}: TimeSlotGridProps) {
  return (
    <div className="mt-6 p-6 rounded-lg shadow-md grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 border bg-gray-50 border-gray-300">
      {slots.map((slot) => {
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
                  : "bg-green-200 text-green-700 hover:bg-green-300",
            )}
            disabled={slot.isBooked}
            onClick={() => {
              if (slot.isBooked) return;
              onTimeSelect(slot.time);
            }}
            aria-pressed={isSelected}
          >
            {slot.time}
          </button>
        );
      })}
    </div>
  );
}
