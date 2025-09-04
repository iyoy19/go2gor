// Team interface
export interface Team {
  id: number;
  name: string;
  members: number;
  ranking: number;
  status: "Active" | "Inactive";
  avatar: string;
  description: string;
  live: boolean;
  captain: string;
  memberNames: string[];
  upcomingMatches?: number;
  wins?: number;
  losses?: number;
  winRate?: number;
  location?: string;
  founded?: string;
}

// Mock data for my team
export const myTeamData: Team = {
  id: 1,
  name: "Phoenix Warriors",
  members: 5,
  ranking: 3,
  status: "Active",
  avatar: "https://i.pravatar.cc/150?img=1",
  description: "Tim esports profesional dengan dedikasi tinggi",
  live: true,
  captain: "Alex Chen",
  memberNames: [
    "Alex Chen",
    "Sarah Kim",
    "Mike Johnson",
    "Lisa Wang",
    "David Lee",
  ],
  upcomingMatches: 3,
  wins: 45,
  losses: 12,
  winRate: 78.9,
  location: "Jakarta",
  founded: "2023",
};

// Mock data for other teams
export const otherTeamsData: Team[] = [
  {
    id: 2,
    name: "Dragon Slayers",
    members: 5,
    ranking: 1,
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=2",
    description: "Tim terbaik di region ini",
    live: false,
    captain: "Kevin Zhang",
    memberNames: [
      "Kevin Zhang",
      "Emma Liu",
      "Tom Wilson",
      "Anna Park",
      "Ryan Smith",
    ],
    upcomingMatches: 5,
    wins: 62,
    losses: 8,
    winRate: 88.6,
    location: "Bandung",
    founded: "2022",
  },
  {
    id: 3,
    name: "Storm Breakers",
    members: 4,
    ranking: 2,
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=3",
    description: "Strategi dan teamwork yang solid",
    live: true,
    captain: "Jessica Chen",
    memberNames: ["Jessica Chen", "Mark Kim", "Sophie Lee", "James Park"],
    upcomingMatches: 2,
    wins: 38,
    losses: 15,
    winRate: 71.7,
    location: "Surabaya",
    founded: "2023",
  },
  {
    id: 4,
    name: "Night Hunters",
    members: 5,
    ranking: 4,
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=4",
    description: "Spesialis pertandingan malam",
    live: false,
    captain: "Chris Wong",
    memberNames: [
      "Chris Wong",
      "Maya Singh",
      "Jack Brown",
      "Lucy Chen",
      "Sam Davis",
    ],
    upcomingMatches: 1,
    wins: 29,
    losses: 18,
    winRate: 61.7,
    location: "Medan",
    founded: "2024",
  },
  {
    id: 5,
    name: "Ice Legends",
    members: 3,
    ranking: 8,
    status: "Inactive",
    avatar: "https://i.pravatar.cc/150?img=5",
    description: "Tim veteran dengan pengalaman luas",
    live: false,
    captain: "Robert Kim",
    memberNames: ["Robert Kim", "Nina Lee", "Max Chen"],
    upcomingMatches: 0,
    wins: 15,
    losses: 25,
    winRate: 37.5,
    location: "Yogyakarta",
    founded: "2021",
  },
];
