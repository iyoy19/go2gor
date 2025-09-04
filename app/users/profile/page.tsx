"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Clock,
  Award,
  Edit,
  Camera,
} from "lucide-react";
import Image from "next/image";

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  bio: string;
  avatar: string;
  stats: {
    gamesPlayed: number;
    wins: number;
    rating: number;
    favoritePosition: string;
  };
};

type Activity = {
  id: string;
  type: "booking" | "game" | "achievement";
  title: string;
  description: string;
  date: string;
  status?: "upcoming" | "completed" | "cancelled";
};

const userProfile: UserProfile = {
  name: "Johan Doe",
  email: "johan.doe@example.com",
  phone: "+62 812-3456-7890",
  location: "Jakarta Selatan",
  joinDate: "September 2023",
  bio: "Passionate football player with 5 years of experience. Love to play as a striker and always looking for new challenges.",
  avatar: "/images/users/default-avatar.jpg",
  stats: {
    gamesPlayed: 48,
    wins: 32,
    rating: 4.8,
    favoritePosition: "Striker",
  },
};

const recentActivities: Activity[] = [
  {
    id: "1",
    type: "booking",
    title: "Booking Lapangan",
    description: "Lapangan Futsal A - 2 Jam",
    date: "2025-09-05",
    status: "upcoming",
  },
  {
    id: "2",
    type: "game",
    title: "Pertandingan Friendly",
    description: "vs Tim Garuda FC",
    date: "2025-09-02",
    status: "completed",
  },
  {
    id: "3",
    type: "achievement",
    title: "Top Scorer",
    description: "Mencetak 5 gol dalam satu pertandingan",
    date: "2025-08-28",
  },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="relative">
              <div className="w-32 h-32 mx-auto relative">
                <Image
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="rounded-full"
                  width={128}
                  height={128}
                />
                <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center mt-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {userProfile.name}
              </h1>
              <div className="flex items-center justify-center gap-1 text-yellow-500 mt-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm">{userProfile.stats.rating}</span>
              </div>
              <p className="text-gray-500 mt-2">{userProfile.bio}</p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5" />
                <span>{userProfile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5" />
                <span>{userProfile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{userProfile.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>Bergabung {userProfile.joinDate}</span>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Statistik
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">
                  {userProfile.stats.gamesPlayed}
                </div>
                <div className="text-sm text-gray-500">Pertandingan</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">
                  {userProfile.stats.wins}
                </div>
                <div className="text-sm text-gray-500">Kemenangan</div>
              </div>
              <div className="col-span-2 text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-gray-900">
                  {userProfile.stats.favoritePosition}
                </div>
                <div className="text-sm text-gray-500">Posisi Favorit</div>
              </div>
            </div>
          </div>
        </div>

        {/* Activities and Info */}
        <div className="lg:col-span-2">
          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Aktivitas Terbaru
            </h2>
            <div className="space-y-6">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-gray-100"
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    {activity.type === "booking" ? (
                      <Clock className="w-5 h-5 text-indigo-600" />
                    ) : activity.type === "game" ? (
                      <User className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <Award className="w-5 h-5 text-indigo-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        {activity.title}
                      </h3>
                      {activity.status && (
                        <span
                          className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                            activity.status === "upcoming"
                              ? "bg-blue-100 text-blue-800"
                              : activity.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {activity.status === "upcoming"
                            ? "Akan Datang"
                            : activity.status === "completed"
                              ? "Selesai"
                              : "Dibatalkan"}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 mt-1">{activity.description}</p>
                    <time className="text-sm text-gray-400 mt-2 block">
                      {new Date(activity.date).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges or Achievements could be added here */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Pencapaian
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg border border-gray-100">
                <div className="w-12 h-12 mx-auto rounded-full bg-indigo-50 flex items-center justify-center">
                  <Award className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-medium text-gray-900 mt-2">Top Striker</h3>
                <p className="text-sm text-gray-500">15 Gol</p>
              </div>
              <div className="text-center p-4 rounded-lg border border-gray-100">
                <div className="w-12 h-12 mx-auto rounded-full bg-indigo-50 flex items-center justify-center">
                  <Star className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-medium text-gray-900 mt-2">MVP</h3>
                <p className="text-sm text-gray-500">5 Pertandingan</p>
              </div>
              <div className="text-center p-4 rounded-lg border border-gray-100">
                <div className="w-12 h-12 mx-auto rounded-full bg-indigo-50 flex items-center justify-center">
                  <Award className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-medium text-gray-900 mt-2">Team Player</h3>
                <p className="text-sm text-gray-500">10 Assist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
