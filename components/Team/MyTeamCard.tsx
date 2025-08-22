"use client";

import { useState } from "react";
import clsx from "clsx";

export interface Team {
  id: number;
  name: string;
  members: number;
  ranking: number;
  status: "Active" | "Inactive";
  avatar: string;
  description: string;
  live: boolean; // pastikan wajib
  captain: string;
  memberNames: string[];
}

export default function MyTeamCard({ myTeam }: { myTeam: Team }) {
  const [expanded, setExpanded] = useState(false);

  const getRandomAvatar = (size: number = 40) =>
    `https://i.pravatar.cc/${size}?img=${Math.floor(Math.random() * 70) + 1}`;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 relative w-full hover:shadow-2xl transition-shadow">
      {/* LIVE badge */}
      {myTeam.live && (
        <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
          LIVE
        </span>
      )}

      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Kiri: Detail, teks align kanan */}
        <div className="flex-1 text-right">
          <h2 className="text-2xl font-bold text-indigo-800">{myTeam.name}</h2>
          <p className="text-gray-600 text-sm">
            Status:{" "}
            <span
              className={clsx(
                myTeam.status === "Active" ? "text-green-600" : "text-gray-400"
              )}
            >
              {myTeam.status}
            </span>
          </p>
          <p className="text-gray-600 text-sm">Ranking: #{myTeam.ranking}</p>
          <p className="text-gray-600 text-sm">Anggota: {myTeam.members}</p>
        </div>

        {/* Tengah: Avatar Tim */}
        <div className="flex-none">
          <img
            src={myTeam.avatar || getRandomAvatar(96)}
            alt={myTeam.name}
            className={clsx(
              "w-28 h-28 rounded-full object-cover border-4",
              myTeam.live ? "border-red-500 animate-pulse" : "border-purple-500"
            )}
          />
        </div>

        {/* Kanan: Deskripsi */}
        <div className="flex-1 flex flex-col gap-2">
          {myTeam.description && (
            <p className="text-gray-700 text-sm">{myTeam.description}</p>
          )}
        </div>
      </div>

      {/* Expandable Section: Kapten & Anggota */}
      <div
        className={clsx(
          "mt-4 transition-all duration-300",
          expanded ? "max-h-96" : "max-h-0 overflow-hidden"
        )}
      >
        <h4 className="text-indigo-800 font-semibold mb-3">Kapten & Anggota</h4>

        <div className="flex flex-col gap-4">
          {/* Kapten */}
          <div className="flex items-center gap-3">
            <img
              src={getRandomAvatar(40)}
              alt={myTeam.captain}
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-indigo-800">Kapten</span>
              <span className="text-gray-700 text-sm">{myTeam.captain}</span>
            </div>
          </div>

          {/* Anggota grid 2 row */}
          <div className="grid grid-cols-4 grid-rows-2 gap-4">
            {myTeam.memberNames.map((m, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <img
                  src={getRandomAvatar(32)}
                  alt={m}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                />
                <span className="text-xs mt-1">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons: Expand di kiri + Keluar Grup di kanan */}
      <div className="mt-4 flex justify-between">
        <button
          className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-semibold shadow hover:scale-105 transition transform"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Sembunyikan Detail" : "Tampilkan Detail"}
        </button>
        <button className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold shadow hover:scale-105 transition transform">
          Keluar Grup
        </button>
      </div>
    </div>
  );
}
