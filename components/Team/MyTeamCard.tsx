import { Star, Users, MapPin, Clock } from "lucide-react";
import { Team } from "@/data/teamData";

interface MyTeamCardProps {
  myTeam: Team;
}

export const MyTeamCard = ({ myTeam }: MyTeamCardProps) => {
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-2xl shadow-xl border border-blue-200 overflow-hidden">
      <div className="relative p-8">
        {/* Live indicator */}
        {myTeam.live && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              LIVE
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Team Avatar & Basic Info */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="relative">
              <img
                src={myTeam.avatar}
                alt={myTeam.name}
                className="w-32 h-32 rounded-2xl object-cover shadow-lg border-4 border-white"
              />
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-lg">
                #{myTeam.ranking}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-2">
              {myTeam.name}
            </h2>
            <p className="text-gray-600 mb-4 max-w-xs">{myTeam.description}</p>
          </div>

          {/* Team Stats & Info */}
          <div className="flex-1 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50">
                <div className="text-2xl font-bold text-blue-600">
                  {myTeam.wins || 0}
                </div>
                <div className="text-sm text-gray-600">Menang</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50">
                <div className="text-2xl font-bold text-red-500">
                  {myTeam.losses || 0}
                </div>
                <div className="text-sm text-gray-600">Kalah</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50">
                <div className="text-2xl font-bold text-green-600">
                  {myTeam.winRate || 0}%
                </div>
                <div className="text-sm text-gray-600">Win Rate</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50">
                <div className="text-2xl font-bold text-purple-600">
                  {myTeam.upcomingMatches || 0}
                </div>
                <div className="text-sm text-gray-600">Mendatang</div>
              </div>
            </div>

            {/* Team Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <Star className="text-yellow-500" size={20} />
                  <span className="font-medium">Kapten: {myTeam.captain}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Users className="text-blue-500" size={20} />
                  <span>{myTeam.members} anggota aktif</span>
                </div>
                {myTeam.location && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="text-green-500" size={20} />
                    <span>{myTeam.location}</span>
                  </div>
                )}
                {myTeam.founded && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="text-purple-500" size={20} />
                    <span>Didirikan {myTeam.founded}</span>
                  </div>
                )}
              </div>

              {/* Member Avatars */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Anggota Tim:
                </p>
                <div className="flex flex-wrap gap-2">
                  {myTeam.memberNames.map((member, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-3 py-2 border border-white/50"
                    >
                      <img
                        src={`https://i.pravatar.cc/32?img=${idx + 10}`}
                        alt={member}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-700">{member}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
