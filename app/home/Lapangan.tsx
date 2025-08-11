"use client";

import React, { useState, useMemo } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

import { LapanganType, dummyFields } from "@/data/lapangan";

export default function LapanganSection() {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["default"]));

  const kategori = useMemo(
    () => Array.from(selectedKeys).join(","),
    [selectedKeys]
  ) as "default" | "futsal" | "tenis" | "semua";

  const dataLapangan = useMemo(() => {
    if (kategori === "semua") return dummyFields;
    if (kategori === "tenis") return dummyFields.filter(field => field.sport === "Tenis");
    if (kategori === "futsal") return dummyFields.filter(field => field.sport === "Futsal");
    return dummyFields; // Default to all fields
  }, [kategori]);

  const labelMap: Record<typeof kategori, string> = {
    default: "Daftar Lapangan",
    futsal: "Lapangan Futsal",
    tenis: "Lapangan Tenis",
    semua: "Semua Lapangan",
  };

  const Card = ({ field }: { field: LapanganType }) => (
    <motion.div 
      className="group bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-300 dark:border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="relative h-48 md:h-56 w-full overflow-hidden">
        <Image
          src={field.image}
          alt={field.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/lapangan/${field.id}`}
            className="text-xl font-semibold text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {field.name}
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{field.venue}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{field.description}</p>
        </div>
        <div className="flex justify-between mt-5 items-center">
          <Link
            href={`/lapangan/${field.id}`}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Lihat Detail
          </Link>
          <button className="bg-gradient-to-r from-purple-600 dark:from-purple-500 to-indigo-600 dark:to-indigo-500 text-white px-4 py-2 text-sm rounded-xl hover:from-indigo-700 dark:hover:from-indigo-600 hover:to-purple-700 dark:hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
            Booking
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section
      id="lapangan"
      className="py-20"
    >
      {/* Header */}
      <motion.div 
        className="max-w-6xl mx-auto px-4 text-center mb-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-black dark:text-white">
          Daftar Lapangan
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
          Temukan pilihan lapangan terbaik untuk setiap gaya permainanmu — dari
          futsal cepat hingga tenis elegan. Semua dengan fasilitas modern dan
          kenyamanan maksimal.
        </p>
      </motion.div>

      {/* Dropdown Filter */}
      <motion.div 
        className="flex justify-start mb-10 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="capitalize flex items-center gap-2 text-black dark:text-white border-gray-400 dark:border-gray-600 hover:border-black dark:hover:border-white transition-colors"
            >
              {labelMap[kategori]}
              <ChevronDownIcon className="w-4 h-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Pilih kategori lapangan"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={(keys) =>
              setSelectedKeys(new Set(Array.from(keys) as string[]))
            }
            className="text-black dark:text-white bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700"
          >
            <DropdownItem key="futsal">Lapangan Futsal</DropdownItem>
            <DropdownItem key="tenis">Lapangan Tenis</DropdownItem>
            <DropdownItem key="semua">Semua Lapangan</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </motion.div>

      {/* Mobile */}
      <div className="block lg:hidden">
        {kategori === "semua" ? (
          <>
            {/* Grup Futsal */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-black dark:text-white mb-4 px-6">
                Lapangan Futsal
              </h3>
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={24}
                slidesPerView={1}
                className="pb-10"
              >
                {dummyFields.filter(field => field.sport === "Futsal").map((field) => (
                  <SwiperSlide
                    key={field.id}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div className="w-[90%]">
                      <Card field={field} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Grup Tenis */}
            <div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-4 px-6">
                Lapangan Tenis
              </h3>
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={24}
                slidesPerView={1}
                className="pb-10"
              >
                {dummyFields.filter(field => field.sport === "Tenis").map((field) => (
                  <SwiperSlide
                    key={field.id}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div className="w-[90%]">
                      <Card field={field} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        ) : (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1}
            className="pb-10"
          >
            {dataLapangan.map((field) => (
              <SwiperSlide
                key={field.id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="w-[90%]">
                  <Card field={field} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Desktop - Grid */}
      <div className="hidden lg:grid gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {dataLapangan.map((field) => (
          <Card key={field.id} field={field} />
        ))}
      </div>
    </section>
  );
}