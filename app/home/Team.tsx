"use client";

import React from "react";
import InfiniteMenu from "@/components/InfiniteMenu/InfiniteMenu";

interface TeamMember {
  id: number;
  name: string;
  role: string;
}

const dummyTeam: TeamMember[] = [
  { id: 1, name: "Alya Putri", role: "UI/UX Designer" },
  { id: 2, name: "Rizky Adi", role: "Frontend Developer" },
  { id: 3, name: "Nadia Salsabila", role: "Backend Developer" },
  { id: 4, name: "Fajar Nugraha", role: "Product Manager" },
];

const items = [
  {
    image: "/images/hero.jpg",
    link: "https://google.com/",
    title: "Item 1",
    description: "",
  },
  {
    image: "/images/hero1.jpg",
    link: "https://google.com/",
    title: "Item 2",
    description: "",
  },
  {
    image: "/images/logo.png",
    link: "https://google.com/",
    title: "Item 3",
    description: "",
  },
];

export default function TeamSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Kiri: list team + penjelasan */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 mb-2 relative inline-block">
              Tim Hebat Kami
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-yellow-400 rounded-full"></span>
            </h2>
            <p className="text-gray-600 mb-6 font-inter text-base md:text-lg">
              Tim kami terdiri dari profesional berpengalaman yang berdedikasi
              tinggi dalam menciptakan produk terbaik.
            </p>
            <ul className="space-y-4">
              {dummyTeam.map((member) => (
                <li
                  key={member.id}
                  className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
                >
                  <span className="text-lg font-semibold font-inter text-gray-900">
                    {member.name}
                  </span>
                  <span className="block text-sm font-medium font-inter text-gray-600">
                    {member.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kanan: InfiniteMenu */}
          <div className="h-[600px] relative rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <InfiniteMenu items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}
