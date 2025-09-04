"use client";

import { useState } from "react";
import {
  Search,
  MessageSquare,
  UserPlus,
  Settings,
  Star,
  Archive,
  Trash2,
  Send,
} from "lucide-react";

interface Message {
  id: number;
  sender: string;
  avatar: string;
  subject: string;
  content: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  labels?: string[];
}

const messages: Message[] = [
  {
    id: 1,
    sender: "Alex Chen",
    avatar: "https://i.pravatar.cc/40?img=1",
    subject: "Persiapan Pertandingan Besok",
    content:
      "Halo tim, untuk persiapan pertandingan besok, kita akan mengadakan briefing final pukul 09.00 WIB...",
    date: "09:30",
    isRead: false,
    isStarred: true,
    labels: ["Penting", "Tim"],
  },
  {
    id: 2,
    sender: "Sarah Kim",
    avatar: "https://i.pravatar.cc/40?img=2",
    subject: "Laporan Latihan Mingguan",
    content:
      "Berikut saya lampirkan laporan perkembangan tim selama sesi latihan minggu ini...",
    date: "Kemarin",
    isRead: true,
    isStarred: false,
    labels: ["Laporan"],
  },
  {
    id: 3,
    sender: "Mike Johnson",
    avatar: "https://i.pravatar.cc/40?img=3",
    subject: "Undangan Turnamen Regional",
    content:
      "Dengan ini kami mengundang tim Anda untuk berpartisipasi dalam turnamen regional...",
    date: "2 Sep",
    isRead: true,
    isStarred: true,
    labels: ["Turnamen", "Penting"],
  },
  {
    id: 4,
    sender: "Lisa Wang",
    avatar: "https://i.pravatar.cc/40?img=4",
    subject: "Update Jadwal Latihan",
    content: "Mulai minggu depan, jadwal latihan akan disesuaikan menjadi...",
    date: "1 Sep",
    isRead: true,
    isStarred: false,
  },
];

export default function PesanPage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden min-h-[600px]">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari pesan..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="p-4 border-b border-gray-200">
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Pesan Baru
              </button>
            </div>

            {/* Folders */}
            <nav className="flex-1 p-4 space-y-1">
              <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-indigo-50 text-indigo-600">
                <MessageSquare className="w-4 h-4 mr-3" />
                Kotak Masuk
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50">
                <Star className="w-4 h-4 mr-3" />
                Berbintang
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50">
                <Archive className="w-4 h-4 mr-3" />
                Arsip
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50">
                <Trash2 className="w-4 h-4 mr-3" />
                Sampah
              </button>
            </nav>

            {/* Settings */}
            <div className="p-4 border-t border-gray-200">
              <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50">
                <Settings className="w-4 h-4 mr-3" />
                Pengaturan
              </button>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 flex flex-col">
            <div className="border-b border-gray-200">
              <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Kotak Masuk
                </h2>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Tandai semua telah dibaca
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`flex items-center gap-4 p-4 border-b border-gray-200 cursor-pointer ${
                    message === selectedMessage
                      ? "bg-indigo-50"
                      : "hover:bg-gray-50"
                  } ${!message.isRead ? "bg-blue-50" : ""}`}
                >
                  <img
                    src={message.avatar}
                    alt={message.sender}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3
                        className={`text-sm font-medium ${
                          !message.isRead ? "text-gray-900" : "text-gray-600"
                        }`}
                      >
                        {message.sender}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {message.date}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 truncate mb-1">
                      {message.subject}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {message.content}
                    </p>
                    {message.labels && (
                      <div className="flex gap-2 mt-2">
                        {message.labels.map((label) => (
                          <span
                            key={label}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {message.isStarred && (
                    <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>

            {/* Compose Bar */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Ketik pesan..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700">
                  <Send className="w-4 h-4 mr-2" />
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
