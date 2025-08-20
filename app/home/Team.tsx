"use client";

import React from "react";
import InfiniteMenu from "@/components/InfiniteMenu/InfiniteMenu";

const items = [
  {
    image: "/images/hero.jpg",
    link: "https://google.com/",
    title: "Tim A",
    description: "UI/UX & Frontend",
  },
  {
    image: "/images/hero1.jpg",
    link: "https://google.com/",
    title: "Tim B",
    description: "Backend & API",
  },
  {
    image: "/images/logo.png",
    link: "https://google.com/",
    title: "Tim C",
    description: "Manajemen Produk",
  },
];

export default function TeamSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start md:items-center">
          {/* Kiri desktop: Heading + Teks + CTA */}
          <div className="flex flex-col gap-6">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 leading-snug mb-2">
              Tim Hebat Bergabung di Sini
            </h2>

            {/* Mobile: Menu muncul setelah Heading */}
            <div className="md:hidden relative rounded-2xl overflow-hidden aspect-square bg-transparent mt-4">
              <InfiniteMenu items={items} />
            </div>

            {/* Deskripsi + CTA */}
            <p className="text-gray-600 font-inter text-base md:text-lg leading-relaxed">
              Banyak tim berbakat dari berbagai bidang telah bergabung bersama
              kami untuk berkolaborasi, berkembang, dan menciptakan karya
              terbaik.
              <br />
              <br />
              Jadilah bagian dari komunitas ini, daftarkan tim Anda, atau ajukan
              tanding melawan tim lain sekarang.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <a
                href="/daftar-tim"
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold font-inter px-5 py-2.5 rounded-xl shadow transition"
              >
                Daftarkan Tim Anda
              </a>
              <a
                href="/ajukan-tanding"
                className="inline-block bg-gradient-to-r from-sky-500 to-emerald-500 hover:opacity-90 text-white font-semibold font-inter px-5 py-2.5 rounded-xl shadow transition"
              >
                Ajukan Match
              </a>
            </div>
          </div>

          {/* Kanan desktop: Menu */}
          <div className="hidden md:block relative rounded-2xl overflow-hidden aspect-square bg-transparent">
            <InfiniteMenu items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}
