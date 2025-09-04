"use client";

import { useState } from "react";
import {
  Users,
  Trophy,
  Calendar,
  Zap,
  Plus,
  Sword,
  X,
  Star,
  MapPin,
  Clock,
  Medal,
  ChevronRight,
} from "lucide-react";
import { Team, myTeamData, otherTeamsData } from "@/data/teamData";
import { MyTeamCard } from "@/components/Team/MyTeamCard";
import { TeamList } from "@/components/Team/TeamList";
import { StatCard } from "@/components/Team/StatCard";
import { TeamModal } from "@/components/Team/TeamModal";

// Statistik Tim
interface TeamStats {
  totalTeams: number;
  activeTeams: number;
  top10Teams: string[];
  totalUpcomingMatches: number;
}

const getTeamStats = (myTeam: Team | null, otherTeams: Team[]): TeamStats => {
  const allTeams = myTeam ? [myTeam, ...otherTeams] : otherTeams;

  const totalTeams = allTeams.length;
  const activeTeams = allTeams.filter(
    (team) => team.status === "Active"
  ).length;
  const top10Teams = [...allTeams]
    .sort((a, b) => a.ranking - b.ranking)
    .slice(0, 10)
    .map((team) => team.name);
  const totalUpcomingMatches = allTeams.reduce(
    (acc, team) => acc + (team.upcomingMatches ?? 0),
    0
  );

  return { totalTeams, activeTeams, top10Teams, totalUpcomingMatches };
};

export default function TeamPage() {
  const [myTeam, setMyTeam] = useState<Team | null>(myTeamData);
  const [otherTeams, setOtherTeams] = useState<Team[]>(otherTeamsData);
  const [selectedTeamForModal, setSelectedTeamForModal] = useState<Team | null>(
    null
  );
  const [selectedTeamForChallenge, setSelectedTeamForChallenge] =
    useState<Team | null>(null);

  const stats = getTeamStats(myTeam, otherTeams);

  const handleTeamClick = (team: Team) => {
    setSelectedTeamForModal(team);
  };

  const handleChallengeTeam = (team: Team) => {
    setSelectedTeamForChallenge(team);
  };

  const submitChallenge = () => {
    if (selectedTeamForChallenge) {
      alert(`Tantangan berhasil dikirim ke ${selectedTeamForChallenge.name}!`);
      setSelectedTeamForChallenge(null);
    }
  };

  const handleJoinCreateTeam = () => {
    alert("Navigasi ke halaman buat/gabung tim");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Manajemen Tim
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kelola tim Anda dan tantang tim lain untuk meningkatkan ranking
          </p>
        </div>

        {/* My Team Section */}
        {myTeam ? (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-xl">
                <Users className="text-indigo-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Tim Saya</h2>
            </div>
            <MyTeamCard myTeam={myTeam} />
          </div>
        ) : (
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-dashed border-indigo-200 p-12 text-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users size={40} className="text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Anda Belum Memiliki Tim
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Bergabunglah dengan komunitas esports! Buat tim baru atau
                bergabung dengan tim yang sudah ada untuk mulai bertanding
              </p>
              <button
                onClick={handleJoinCreateTeam}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-3"
              >
                <Plus size={20} />
                Buat / Gabung Tim
              </button>
            </div>
          </div>
        )}

        {/* Statistics Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 rounded-xl">
              <Trophy className="text-yellow-600" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Statistik Komunitas
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard
              icon={<Users size={24} />}
              label="Total Tim"
              value={stats.totalTeams}
              color="blue"
            />
            <StatCard
              icon={<Zap size={24} />}
              label="Tim Aktif"
              value={stats.activeTeams}
              color="green"
            />
            <StatCard
              icon={<Trophy size={24} />}
              label="Top 10 Tim"
              value={stats.top10Teams.length}
              color="purple"
            />
            <StatCard
              icon={<Calendar size={24} />}
              label="Pertandingan"
              value={stats.totalUpcomingMatches}
              color="orange"
            />
          </div>
        </div>

        {/* Teams List Section */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-purple-100 rounded-xl">
                <Medal className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Tim Terdaftar ({otherTeams.length})
                </h3>
                <p className="text-gray-600">
                  Klik pada tim untuk melihat detail dan menantang
                </p>
              </div>
            </div>
          </div>
          <TeamList teams={otherTeams} onTeamClick={handleTeamClick} />
        </div>
      </div>

      {/* Team Detail Modal */}
      {selectedTeamForModal && (
        <TeamModal
          team={selectedTeamForModal}
          onClose={() => setSelectedTeamForModal(null)}
          myTeam={myTeam}
          onChallenge={handleChallengeTeam}
        />
      )}

      {/* Challenge Confirmation Modal */}
      {selectedTeamForChallenge && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setSelectedTeamForChallenge(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sword size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Konfirmasi Tantangan
              </h3>
              <p className="text-gray-600">
                Apakah Anda yakin ingin mengirim tantangan pertandingan ke tim
                ini?
              </p>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 mb-8 border border-gray-200">
              <div className="flex items-center gap-4">
                <img
                  src={selectedTeamForChallenge.avatar}
                  alt={selectedTeamForChallenge.name}
                  className="w-16 h-16 rounded-xl object-cover border-3 border-white shadow-md"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xl font-bold text-gray-800">
                      {selectedTeamForChallenge.name}
                    </h4>
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">
                      #{selectedTeamForChallenge.ranking}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{selectedTeamForChallenge.members} anggota</span>
                    </div>
                    {selectedTeamForChallenge.winRate && (
                      <div className="flex items-center gap-1">
                        <Trophy size={14} />
                        <span>
                          Win Rate {selectedTeamForChallenge.winRate}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setSelectedTeamForChallenge(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-all duration-300"
              >
                Batal
              </button>
              <button
                onClick={submitChallenge}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Kirim Tantangan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
