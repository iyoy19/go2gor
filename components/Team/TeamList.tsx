/* eslint-disable react/prop-types */
"use client";

import { useState, FC } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

// Definisi tipe Team
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

interface TeamListProps {
  teams: Team[];
}

const TeamList: FC<TeamListProps> = ({ teams }) => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const getRandomAvatar = (size: number = 40) =>
    `https://i.pravatar.cc/${size}?img=${Math.floor(Math.random() * 70) + 1}`;

  // Modal Tim
  const TeamModal: FC<{ team: Team | null; onClose: () => void }> = ({
    team,
    onClose,
  }) => {
    if (!team) return null;

    return (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold"
          >
            ×
          </button>

          <div className="flex flex-col items-center">
            <img
              src={getRandomAvatar(96)}
              alt={team.name}
              className={clsx(
                "w-24 h-24 rounded-full object-cover mb-4 border-2",
                team.live ? "border-red-500 animate-pulse" : "border-purple-500"
              )}
            />
            <h2 className="text-2xl font-bold text-indigo-800 mb-2">
              {team.name}
            </h2>
            <p className="text-gray-600 mb-1">Status: {team.status}</p>
            <p className="text-gray-600 mb-1">Anggota: {team.members}</p>
            {team.live && (
              <span className="text-white bg-red-500 px-3 py-1 rounded-full text-xs font-bold animate-pulse mt-2">
                LIVE
              </span>
            )}
            <p className="text-gray-700 mt-2 text-center">{team.description}</p>

            <div className="flex items-center gap-3 mt-4">
              <img
                src={getRandomAvatar(40)}
                alt={team.captain}
                className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-indigo-800">Kapten</span>
                <span className="text-gray-700 text-sm">{team.captain}</span>
              </div>
            </div>

            <div className="grid grid-flow-col grid-rows-2 gap-2 mt-4">
              {team.memberNames.map((m, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img
                    src={getRandomAvatar(40)}
                    alt={m}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  />
                  <span className="text-xs mt-1">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {teams.map((team) => (
          <motion.div
            key={team.id}
            whileHover={{ scale: 1.05 }}
            className={clsx(
              "bg-white rounded-xl shadow p-4 flex flex-col items-center text-center cursor-pointer relative overflow-hidden",
              team.live ? "ring-2 ring-red-400 animate-pulse" : ""
            )}
            onClick={() => setSelectedTeam(team)}
          >
            {team.live && (
              <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold animate-pulse">
                LIVE
              </span>
            )}

            <img
              src={getRandomAvatar(40)}
              alt={team.name}
              className={clsx(
                "w-16 h-16 rounded-full object-cover mb-2 border-2",
                team.live ? "border-red-500 animate-pulse" : "border-purple-400"
              )}
            />
            <h4 className="text-indigo-800 font-semibold">{team.name}</h4>
            <p className="text-gray-500 text-sm">Kapten: {team.captain}</p>

            <div className="flex -space-x-2 mt-2">
              {team.memberNames.map((m, idx) => (
                <img
                  key={idx}
                  src={getRandomAvatar(32)}
                  alt={m}
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {selectedTeam && (
        <TeamModal team={selectedTeam} onClose={() => setSelectedTeam(null)} />
      )}
    </>
  );
};

export default TeamList;
