"use client";

import { useParams } from "next/navigation";

const colors: Record<string, string> = {
  profil: "bg-purple-500",
  pengaturan: "bg-pink-500",
  notifikasi: "bg-indigo-500",
  "riwayat-booking": "bg-teal-500",
  "jadwal-saya": "bg-orange-500",
  aktivitas: "bg-cyan-500",
  "tim-saya": "bg-lime-500",
};

// Helper untuk capitalize tiap kata
function formatTitle(str?: string) {
  if (!str) return "";
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function ProfileSectionPage() {
  const { section } = useParams<{ section: string }>();
  const bg = colors[section] || "bg-gray-500";

  return (
    <div
      className={`min-h-screen flex items-center justify-center text-white ${bg}`}
    >
      <h1 className="text-4xl font-bold text-center">
        {formatTitle(section)} Page
      </h1>
    </div>
  );
}
