"use client";

import { DatePicker } from "@heroui/react";
import { CalendarDate, today } from "@internationalized/date";

interface BookingDatePickerProps {
  selectedDate: CalendarDate | null;
  onDateSelect: (date: CalendarDate) => void;
  minDate: CalendarDate;
  maxDate: CalendarDate;
}

export default function BookingDatePicker({
  selectedDate,
  onDateSelect,
  minDate,
  maxDate,
}: BookingDatePickerProps) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <DatePicker
        value={selectedDate || today("UTC")}
        onChange={(val) => {
          if (val) onDateSelect(val);
        }}
        minValue={minDate}
        maxValue={maxDate}
      />
    </div>
  );
}
