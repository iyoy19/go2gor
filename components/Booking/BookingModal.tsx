"use client";

import { useState } from "react";
import {
  CalendarDaysIcon,
  MapPinIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { LapanganType } from "@/data/lapangan";

interface BookingModalProps {
  show: boolean;
  onClose: () => void;
  currentField: LapanganType | undefined;
  selectedDate: string;
  selectedTimes: string[];
  onSubmit: () => void;
}

export default function BookingModal({
  show,
  onClose,
  currentField,
  selectedDate,
  selectedTimes,
  onSubmit,
}: BookingModalProps) {
  const [namaPemesan, setNamaPemesan] = useState("");
  const [isVersus, setIsVersus] = useState(false);
  const [namaLawan, setNamaLawan] = useState("");
  const [formError, setFormError] = useState("");

  if (!show) return null;

  function formatDateIndo(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function renderJamBooking(times: string[]) {
    if (times.length === 0) return "-";
    const sorted = times.slice().sort();
    const jamArr = sorted.map((j) => parseInt(j.split(":")[0], 10));
    let isConsecutive = true;
    for (let i = 1; i < jamArr.length; i++) {
      if (jamArr[i] !== jamArr[i - 1] + 1) {
        isConsecutive = false;
        break;
      }
    }
    if (isConsecutive && jamArr.length > 1) {
      return `${sorted[0]} - ${sorted[sorted.length - 1]}`;
    }
    return sorted.join(", ");
  }

  const handleSubmit = () => {
    if (!selectedDate) {
      setFormError("Tanggal booking wajib diisi.");
      return;
    }
    if (!namaPemesan.trim()) {
      setFormError("Nama pemesan/kelompok wajib diisi.");
      return;
    }
    setFormError("");
    onSubmit();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 pb-10 md:pt-20 md:pb-12 backdrop-blur-sm bg-black/40 overflow-y-auto hide-scrollbar modal-container"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white/80 rounded-2xl shadow-2xl p-0 max-w-lg w-full relative animate-fadeIn overflow-hidden border border-blue-100 my-auto">
        <button
          className="absolute top-3 right-3 text-gray-500 bg-white/70 hover:bg-gray-200 rounded-full p-1 z-10"
          onClick={onClose}
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
            <CalendarDaysIcon className="w-6 h-6 text-blue-400" /> Detail
            Booking
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
                <MapPinIcon className="w-4 h-4" /> {currentField?.venue}
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
              <div className="text-red-500 text-sm mb-2">{formError}</div>
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
              {selectedTimes.length > 0 ? renderJamBooking(selectedTimes) : "-"}
            </div>
            <div>
              <span className="font-semibold">Harga per jam:</span> Rp
              {currentField?.price?.toLocaleString("id-ID")}
            </div>
            <div>
              <span className="font-semibold">Total harga:</span> Rp
              {currentField && selectedTimes.length > 0
                ? (currentField.price * selectedTimes.length).toLocaleString(
                    "id-ID"
                  )
                : "-"}
            </div>
          </form>
          <div className="text-xs mb-2 text-red-500">
            *Pastikan jam yang dipilih sudah benar sebelum melanjutkan
            pembayaran.
          </div>
          <button
            className="mt-4 w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-bold shadow hover:from-blue-600 hover:to-green-600 transition-colors text-lg"
            onClick={handleSubmit}
          >
            Lanjut Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}
