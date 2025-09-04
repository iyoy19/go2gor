import { Users, Trophy } from "lucide-react";
import { Team } from "@/data/teamData";

interface TeamListProps {
  teams: Team[];
  onTeamClick: (team: Team) => void;
}

export const TeamList = ({ teams, onTeamClick }: TeamListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {teams.map((team) => (
        <div
          key={team.id}
          onClick={() => onTeamClick(team)}
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100 overflow-hidden group"
        >
          <div className="relative p-6">
            {team.live && (
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  LIVE
                </div>
              </div>
            )}

            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img
                  src={team.avatar}
                  alt={team.name}
                  className="w-20 h-20 rounded-2xl object-cover shadow-md border-3 border-white group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm shadow-md">
                  #{team.ranking}
                </div>
              </div>

              <h4 className="font-bold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors">
                {team.name}
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Kapten: {team.captain}
              </p>

              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                  team.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {team.status}
              </div>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{team.members}</span>
                </div>
                {team.winRate && (
                  <div className="flex items-center gap-1">
                    <Trophy size={14} />
                    <span>{team.winRate}%</span>
                  </div>
                )}
              </div>

              {/* Member avatars */}
              <div className="flex -space-x-2 mt-3">
                {team.memberNames.slice(0, 4).map((member, idx) => (
                  <img
                    key={idx}
                    src={`https://i.pravatar.cc/24?img=${idx + 30}`}
                    alt={member}
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                  />
                ))}
                {team.memberNames.length > 4 && (
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                    +{team.memberNames.length - 4}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
