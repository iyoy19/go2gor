"use client";

import { useState } from "react";
import {
  Users,
  Trophy,
  Star,
  Shield,
  Settings,
  MessageSquare,
  UserPlus,
  Mail,
  BarChart,
} from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  position: string;
  performance: number;
  matchesPlayed: number;
  status: "online" | "offline" | "in-game";
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Captain",
    avatar: "https://i.pravatar.cc/150?img=1",
    position: "Forward",
    performance: 92,
    matchesPlayed: 48,
    status: "online",
  },
  {
    id: 2,
    name: "Sarah Kim",
    role: "Vice Captain",
    avatar: "https://i.pravatar.cc/150?img=2",
    position: "Midfielder",
    performance: 88,
    matchesPlayed: 45,
    status: "in-game",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Member",
    avatar: "https://i.pravatar.cc/150?img=3",
    position: "Defender",
    performance: 85,
    matchesPlayed: 42,
    status: "offline",
  },
  {
    id: 4,
    name: "Lisa Wang",
    role: "Member",
    avatar: "https://i.pravatar.cc/150?img=4",
    position: "Forward",
    performance: 90,
    matchesPlayed: 46,
    status: "online",
  },
  {
    id: 5,
    name: "David Lee",
    role: "Member",
    avatar: "https://i.pravatar.cc/150?img=5",
    position: "Midfielder",
    performance: 87,
    matchesPlayed: 44,
    status: "offline",
  },
];

const teamStats = {
  ranking: 3,
  totalMatches: 50,
  wins: 38,
  losses: 12,
  winRate: 76,
  currentStreak: 5,
};

export default function TeamPage() {
  const [selectedTab, setSelectedTab] = useState<
    "overview" | "members" | "stats"
  >("overview");

  return (
    <div className="container mx-auto">
      {/* Team Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/150?img=10"
                alt="Team Logo"
                className="w-24 h-24 rounded-xl object-cover"
              />
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg">
                #{teamStats.ranking}
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Phoenix Warriors
              </h1>
              <p className="text-gray-500">Dibentuk: September 2023</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Settings className="w-4 h-4 mr-2" />
              Pengaturan
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              <MessageSquare className="w-4 h-4 mr-2" />
              Pesan Tim
            </button>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {teamStats.totalMatches}
            </div>
            <div className="text-sm text-gray-500">Total Match</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {teamStats.wins}
            </div>
            <div className="text-sm text-gray-500">Menang</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {teamStats.losses}
            </div>
            <div className="text-sm text-gray-500">Kalah</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {teamStats.winRate}%
            </div>
            <div className="text-sm text-gray-500">Win Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {teamStats.currentStreak}
            </div>
            <div className="text-sm text-gray-500">Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              #{teamStats.ranking}
            </div>
            <div className="text-sm text-gray-500">Ranking</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex" aria-label="Tabs">
            <button
              onClick={() => setSelectedTab("overview")}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                selectedTab === "overview"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab("members")}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                selectedTab === "members"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Anggota Tim
            </button>
            <button
              onClick={() => setSelectedTab("stats")}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                selectedTab === "stats"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Statistik
            </button>
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === "members" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Anggota Tim ({teamMembers.length})
                </h3>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Tambah Anggota
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            member.status === "online"
                              ? "bg-green-500"
                              : member.status === "in-game"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-900 mb-1">
                          {member.name}
                        </h4>
                        <p className="text-sm text-gray-500 mb-2">
                          {member.position}
                        </p>
                        <div className="flex items-center gap-2">
                          {member.role === "Captain" && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Star className="w-3 h-3 mr-1" />
                              Captain
                            </span>
                          )}
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {member.matchesPlayed} matches
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {member.performance}%
                        </div>
                        <div className="text-xs text-gray-500">Performance</div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-500">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-500">
                        <BarChart className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-500">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === "overview" && (
            <div className="text-center text-gray-500 py-12">
              Overview tab content will go here
            </div>
          )}

          {selectedTab === "stats" && (
            <div className="text-center text-gray-500 py-12">
              Statistics tab content will go here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
