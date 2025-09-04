"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  Check,
  X,
  Mail,
  Filter,
} from "lucide-react";

interface Invitation {
  id: number;
  type: "match" | "tournament" | "friendly" | "training";
  title: string;
  from: {
    name: string;
    avatar: string;
    team: string;
  };
  date: string;
  time: string;
  location: string;
  status: "pending" | "accepted" | "declined";
  description: string;
}

const invitations: Invitation[] = [
  {
    id: 1,
    type: "match",
    title: "Pertandingan Liga Regional",
    from: {
      name: "Dragon Slayers",
      avatar: "https://i.pravatar.cc/150?img=1",
      team: "Dragon Slayers",
    },
    date: "10 September 2025",
    time: "15:00",
    location: "Stadion Utama",
    status: "pending",
    description:
      "Undangan pertandingan liga regional musim baru. Harap konfirmasi kehadiran tim Anda.",
  },
  {
    id: 2,
    type: "tournament",
    title: "Turnamen Regional Cup 2025",
    from: {
      name: "Regional Sports Committee",
      avatar: "https://i.pravatar.cc/150?img=2",
      team: "Committee",
    },
    date: "15 September 2025",
    time: "09:00",
    location: "Sports Complex",
    status: "accepted",
    description:
      "Undangan partisipasi dalam turnamen regional tahunan. Total hadiah mencapai 50 juta rupiah.",
  },
  {
    id: 3,
    type: "friendly",
    title: "Pertandingan Persahabatan",
    from: {
      name: "Thunder Warriors",
      avatar: "https://i.pravatar.cc/150?img=3",
      team: "Thunder Warriors",
    },
    date: "12 September 2025",
    time: "16:30",
    location: "Community Field",
    status: "pending",
    description:
      "Mari bermain dalam pertandingan persahabatan untuk meningkatkan chemistry antar tim.",
  },
  {
    id: 4,
    type: "training",
    title: "Sesi Latihan Bersama",
    from: {
      name: "Pro Training Center",
      avatar: "https://i.pravatar.cc/150?img=4",
      team: "Training Center",
    },
    date: "8 September 2025",
    time: "10:00",
    location: "Training Ground",
    status: "declined",
    description:
      "Undangan untuk mengikuti sesi latihan intensif dengan pelatih profesional.",
  },
];

const filterOptions = [
  { value: "all", label: "Semua" },
  { value: "pending", label: "Menunggu" },
  { value: "accepted", label: "Diterima" },
  { value: "declined", label: "Ditolak" },
];

export default function UndanganPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredInvitations = invitations.filter(
    (invitation) =>
      selectedFilter === "all" || invitation.status === selectedFilter
  );

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Undangan</h1>
        <p className="text-gray-600">
          Kelola undangan pertandingan dan acara tim Anda
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Filter className="w-5 h-5" />
          <span className="text-sm font-medium">Filter:</span>
        </div>
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

      {/* Invitations List */}
      <div className="space-y-6">
        {filteredInvitations.map((invitation) => (
          <div
            key={invitation.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-start gap-6">
                <img
                  src={invitation.from.avatar}
                  alt={invitation.from.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {invitation.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Dari: {invitation.from.team}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        invitation.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : invitation.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {invitation.status === "pending"
                        ? "Menunggu"
                        : invitation.status === "accepted"
                          ? "Diterima"
                          : "Ditolak"}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{invitation.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {invitation.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {invitation.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {invitation.location}
                    </div>
                  </div>
                </div>
              </div>

              {invitation.status === "pending" && (
                <div className="mt-6 flex justify-end gap-3">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <X className="w-4 h-4 mr-2" />
                    Tolak
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    <Check className="w-4 h-4 mr-2" />
                    Terima
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredInvitations.length === 0 && (
        <div className="text-center py-12">
          <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tidak ada undangan
          </h3>
          <p className="text-gray-500">
            Tidak ada undangan{" "}
            {selectedFilter !== "all" ? "yang " + selectedFilter : ""} saat ini
          </p>
        </div>
      )}
    </div>
  );
}
