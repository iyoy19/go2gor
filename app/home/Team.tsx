"use client";

import React from "react";
import InfiniteMenu from "@/components/InfiniteMenu/InfiniteMenu";
import { motion } from "framer-motion";

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
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 md:py-24">
      <motion.div
        className="container mx-auto px-4 md:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start md:items-center">
          {/* Kiri desktop: Heading + Teks + CTA */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 leading-snug"
            >
              Tim Hebat{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600">
                Bergabung
              </span>{" "}
              di Sini
            </motion.h2>

            {/* Mobile: Menu muncul setelah Heading */}
            <motion.div
              variants={itemVariants}
              className="md:hidden relative rounded-2xl overflow-hidden aspect-square bg-transparent"
            >
              <InfiniteMenu items={items} />
            </motion.div>

            {/* Deskripsi + CTA */}
            <motion.p
              variants={itemVariants}
              className="text-gray-600 font-inter text-base md:text-lg leading-relaxed"
            >
              Banyak tim berbakat dari berbagai bidang telah bergabung bersama
              kami untuk berkolaborasi, berkembang, dan menciptakan karya
              terbaik.
              <br />
              <br />
              Jadilah bagian dari komunitas ini, daftarkan tim Anda, atau ajukan
              tanding melawan tim lain sekarang.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mt-2"
            >
              <motion.a
                variants={itemVariants}
                href="/daftar-tim"
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold font-inter px-5 py-2.5 rounded-xl shadow transition"
              >
                Daftarkan Tim Anda
              </motion.a>
              <motion.a
                variants={itemVariants}
                href="/ajukan-tanding"
                className="inline-block bg-gradient-to-r from-sky-500 to-emerald-500 hover:opacity-90 text-white font-semibold font-inter px-5 py-2.5 rounded-xl shadow transition"
              >
                Ajukan Match
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Kanan desktop: Menu */}
          <motion.div
            variants={itemVariants}
            className="hidden md:block relative rounded-2xl overflow-hidden aspect-square bg-transparent"
          >
            <InfiniteMenu items={items} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
