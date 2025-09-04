import {
  Star,
  Users,
  MapPin,
  Clock,
  X,
  Sword,
  Plus,
  ChevronRight,
} from "lucide-react";
import { Team } from "@/data/teamData";

interface TeamModalProps {
  team: Team | null;
  onClose: () => void;
  myTeam: Team | null;
  onChallenge: (team: Team) => void;
}

export const TeamModal = ({
  team,
  onClose,
  myTeam,
  onChallenge,
}: TeamModalProps) => {
  if (!team) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>

          {/* Team Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src={team.avatar}
                  alt={team.name}
                  className="w-32 h-32 rounded-2xl object-cover shadow-lg border-4 border-white"
                />
                {team.live && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                    LIVE
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg">
                  #{team.ranking}
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mt-4">
                {team.name}
              </h2>
              <div
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                  team.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {team.status}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <p className="text-gray-600 text-lg">{team.description}</p>

              {/* Team Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-blue-600">
                    {team.wins || 0}
                  </div>
                  <div className="text-xs text-gray-600">Menang</div>
                </div>
                <div className="bg-red-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-red-500">
                    {team.losses || 0}
                  </div>
                  <div className="text-xs text-gray-600">Kalah</div>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-green-600">
                    {team.winRate || 0}%
                  </div>
                  <div className="text-xs text-gray-600">Win Rate</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-purple-600">
                    {team.upcomingMatches || 0}
                  </div>
                  <div className="text-xs text-gray-600">Mendatang</div>
                </div>
              </div>

              {/* Team Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-gray-700">
                  <Star className="text-yellow-500" size={18} />
                  <span>
                    <strong>Kapten:</strong> {team.captain}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Users className="text-blue-500" size={18} />
                  <span>
                    <strong>Anggota:</strong> {team.members}
                  </span>
                </div>
                {team.location && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="text-green-500" size={18} />
                    <span>
                      <strong>Lokasi:</strong> {team.location}
                    </span>
                  </div>
                )}
                {team.founded && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="text-purple-500" size={18} />
                    <span>
                      <strong>Didirikan:</strong> {team.founded}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Anggota Tim
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {team.memberNames.map((member, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <img
                    src={`https://i.pravatar.cc/40?img=${idx + 20}`}
                    alt={member}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  />
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {member}
                    </p>
                    {member === team.captain && (
                      <p className="text-xs text-yellow-600 font-medium">
                        Kapten
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge Button */}
          {myTeam && team.status === "Active" && (
            <div className="border-t pt-6">
              <button
                onClick={() => {
                  onChallenge(team);
                  onClose();
                }}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <Sword size={20} />
                Tantang Tim Ini
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {!myTeam && (
            <div className="border-t pt-6 text-center">
              <p className="text-gray-600 mb-4">
                Anda perlu memiliki tim untuk menantang tim lain
              </p>
              <button className="bg-gray-100 text-gray-600 py-3 px-6 rounded-xl font-medium cursor-not-allowed">
                <Plus size={16} className="inline mr-2" />
                Buat Tim Terlebih Dahulu
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
