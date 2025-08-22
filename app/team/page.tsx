"use client";

import { useEffect, useState } from "react";
import MyTeamCard, { Team } from "@/components/Team/MyTeamCard";
import TeamList from "@/components/Team/TeamList";

export default function TeamPage() {
  const [myTeam, setMyTeam] = useState<Team | null>(null);
  const [otherTeams, setOtherTeams] = useState<Team[]>([]);

  useEffect(() => {
    // Dummy data tim saya
    setMyTeam({
      id: 0,
      name: "Team Saya",
      members: 8,
      ranking: 1,
      status: "Active",
      avatar: "/images/my-team-avatar.jpg",
      description: "Tim saya solid dan berpengalaman di futsal dan badminton.",
      live: true,
      captain: "Alice",
      memberNames: ["Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hank"],
    });

    // Dummy data tim lain
    const others: Team[] = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Team ${i + 1}`,
      members: Math.floor(Math.random() * 10) + 5,
      ranking: i + 2,
      status: ["Active", "Inactive"][Math.floor(Math.random() * 2)] as
        | "Active"
        | "Inactive",
      avatar: `/images/team${i + 1}-avatar.jpg`,
      description: `Deskripsi singkat untuk Team ${i + 1}.`,
      live: Math.random() < 0.3,
      captain: `Kapten ${i + 1}`,
      memberNames: Array.from(
        { length: Math.floor(Math.random() * 8) + 3 },
        (_, idx) => `Anggota ${idx + 1}`
      ),
    }));

    setOtherTeams(others);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 py-10 px-4 md:px-20">
      {/* My Team */}
      <div className="pt-12 mb-10">
        {myTeam ? (
          <MyTeamCard myTeam={myTeam} />
        ) : (
          <div className="flex flex-col items-center w-full">
            <p className="text-gray-700 mb-4">
              Anda belum terdaftar pada tim manapun.
            </p>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-full font-semibold shadow hover:scale-105 transition">
              Daftar Tim
            </button>
          </div>
        )}
      </div>

      {/* List Tim Lain */}
      <h3 className="text-2xl font-bold text-indigo-800 mb-4">Tim Terdaftar</h3>
      <TeamList teams={otherTeams} />
    </div>
  );
}
