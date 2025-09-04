"use client";

import { Activity, Award, Calendar, Trophy, Users } from "lucide-react";
import { useState } from "react";

interface ActivityItem {
  id: number;
  type: "match" | "achievement" | "training" | "team" | "other";
  title: string;
  description: string;
  date: string;
  status?: "completed" | "ongoing" | "upcoming";
  icon: JSX.Element;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    type: "match",
    title: "Pertandingan vs Dragon Slayers",
    description: "Kemenangan 3-1 dalam pertandingan liga regional",
    date: "2 September 2025",
    status: "completed",
    icon: <Trophy className="text-yellow-500" />,
  },
  {
    id: 2,
    type: "training",
    title: "Sesi Latihan Tim",
    description: "Latihan taktik dan strategi bersama pelatih",
    date: "1 September 2025",
    status: "completed",
    icon: <Activity className="text-blue-500" />,
  },
  {
    id: 3,
    type: "achievement",
    title: "Pencapaian Baru",
    description: "Mencapai 10 kemenangan beruntun",
    date: "31 Agustus 2025",
    status: "completed",
    icon: <Award className="text-purple-500" />,
  },
  {
    id: 4,
    type: "team",
    title: "Perubahan Formasi Tim",
    description: "Pergantian posisi pemain untuk optimalisasi strategi",
    date: "30 Agustus 2025",
    status: "completed",
    icon: <Users className="text-green-500" />,
  },
  {
    id: 5,
    type: "match",
    title: "Jadwal Pertandingan vs Phoenix Rising",
    description: "Pertandingan final turnamen regional",
    date: "5 September 2025",
    status: "upcoming",
    icon: <Calendar className="text-red-500" />,
  },
];

const filterOptions = [
  { value: "all", label: "Semua" },
  { value: "match", label: "Pertandingan" },
  { value: "training", label: "Latihan" },
  { value: "achievement", label: "Pencapaian" },
  { value: "team", label: "Tim" },
];

export default function ActivityPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredActivities = activities.filter(
    (activity) => selectedFilter === "all" || activity.type === selectedFilter
  );

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Riwayat Aktivitas
        </h1>
        <p className="text-gray-600">
          Pantau semua aktivitas dan pencapaian Anda
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedFilter(option.value)}
            className={`px-4 py-2 text-sm font-medium rounded-full border ${
              selectedFilter === option.value
                ? "bg-indigo-500 text-white border-transparent"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gray-50 rounded-lg">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </h3>
                    {activity.status && (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          activity.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : activity.status === "ongoing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {activity.status === "completed"
                          ? "Selesai"
                          : activity.status === "ongoing"
                            ? "Berlangsung"
                            : "Mendatang"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-1">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400">{activity.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className="mt-6 text-center">
        <button className="px-6 py-3 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none">
          Muat lebih banyak aktivitas
        </button>
      </div>
    </div>
  );
}
