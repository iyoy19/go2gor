"use client";

import { useState } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface DateOption {
  date: string;
  label: string;
}

interface BookingDatePickerProps {
  availableDates: DateOption[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export default function BookingDatePicker({
  availableDates,
  selectedDate,
  onDateSelect,
}: BookingDatePickerProps) {
  const [showDateInput, setShowDateInput] = useState(false);

  return (
    <div className="flex items-center space-x-3 overflow-x-auto pb-4 hide-scrollbar">
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
              onDateSelect(e.target.value);
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
            onDateSelect(dateOption.date);
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
  );
}
