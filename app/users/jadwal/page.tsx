"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Shield, Users } from "lucide-react";

interface Match {
  id: number;
  opponent: string;
  date: string;
  time: string;
  location: string;
  type: string;
  teamLogo: string;
  status: "upcoming" | "completed" | "cancelled";
}

const matches: Match[] = [
  {
    id: 1,
    opponent: "Thunder Warriors",
    date: "5 September 2025",
    time: "15:00",
    location: "Stadion Utama",
    type: "Liga Regional",
    teamLogo: "https://i.pravatar.cc/100?img=1",
    status: "upcoming",
  },
  {
    id: 2,
    opponent: "Phoenix Rising",
    date: "8 September 2025",
    time: "19:30",
    location: "Arena Sport Center",
    type: "Turnamen Nasional",
    teamLogo: "https://i.pravatar.cc/100?img=2",
    status: "upcoming",
  },
  {
    id: 3,
    opponent: "Dragon Force",
    date: "10 September 2025",
    time: "14:00",
    location: "Community Field",
    type: "Pertandingan Persahabatan",
    teamLogo: "https://i.pravatar.cc/100?img=3",
    status: "upcoming",
  },
];

const filterOptions = [
  { value: "all", label: "Semua" },
  { value: "upcoming", label: "Mendatang" },
  { value: "completed", label: "Selesai" },
  { value: "cancelled", label: "Dibatalkan" },
];

export default function JadwalPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("September");

  const months = ["Agustus", "September", "Oktober", "November", "Desember"];

  const filteredMatches = matches.filter(
    (match) => selectedFilter === "all" || match.status === selectedFilter
  );

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Jadwal Pertandingan
        </h1>
        <p className="text-gray-600">
          Kelola dan pantau jadwal pertandingan tim Anda
        </p>
      </div>

      {/* Month Selector and Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <div className="flex gap-2 flex-wrap">
          {months.map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                selectedMonth === month
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-200`}
            >
              {month}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedFilter(option.value)}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                selectedFilter === option.value
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-200`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="p-6">
          <div className="grid grid-cols-7 gap-4 text-center text-sm font-medium text-gray-500 mb-4">
            <div>Min</div>
            <div>Sen</div>
            <div>Sel</div>
            <div>Rab</div>
            <div>Kam</div>
            <div>Jum</div>
            <div>Sab</div>
          </div>
          <div className="grid grid-cols-7 gap-4">
            {/* Calendar days would go here - simplified for demo */}
            {Array.from({ length: 35 }).map((_, index) => {
              const day = index - 4; // Offset to start month on correct day
              return (
                <div
                  key={index}
                  className={`aspect-square flex items-center justify-center rounded-lg ${
                    day > 0 && day <= 30
                      ? "hover:bg-gray-50 cursor-pointer"
                      : "text-gray-300"
                  } ${
                    day === 5 ? "bg-indigo-50 text-indigo-600 font-medium" : ""
                  }`}
                >
                  {day > 0 && day <= 30 ? day : ""}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Matches List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredMatches.map((match) => (
            <div
              key={match.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-6">
                <img
                  src={match.teamLogo}
                  alt={match.opponent}
                  className="w-16 h-16 rounded-full border-2 border-gray-200"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      VS {match.opponent}
                    </h3>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        match.status === "upcoming"
                          ? "bg-blue-100 text-blue-800"
                          : match.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {match.status === "upcoming"
                        ? "Mendatang"
                        : match.status === "completed"
                          ? "Selesai"
                          : "Dibatalkan"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {match.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {match.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {match.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      {match.type}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Match Button */}
      <div className="mt-6 text-center">
        <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          <Users className="w-5 h-5 mr-2" />
          Tambah Pertandingan Baru
        </button>
      </div>
    </div>
  );
}
