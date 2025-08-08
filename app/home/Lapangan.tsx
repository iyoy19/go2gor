"use client";

import React, { useState, useMemo } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";

const lapanganFutsal = [
  {
    name: "Cempaka Arena",
    slug: "lapangan-utama-cempaka",
    description: "Rumput sintetis & lighting mantap buat sparring malam.",
    location: "GOR Cempaka, Jakarta Timur",
    image: "https://picsum.photos/seed/lap1/600/400",
  },
  {
    name: "Melati Pro Court",
    slug: "lapangan-melati-pro",
    description: "Tempat favorit anak komunitas futsal Bekasi.",
    location: "GOR Melati, Bekasi",
    image: "https://picsum.photos/seed/lap2/600/400",
  },
];

const lapanganTenis = [
  {
    name: "Nusantara Open",
    slug: "arena-nusantara",
    description: "Lapangan licin? No way. Vinyl anti-selip terbaik.",
    location: "GOR Nusantara, Depok",
    image: "https://picsum.photos/seed/lap3/600/400",
  },
  {
    name: "Sakura Elite Court",
    slug: "lapangan-sakura-elite",
    description: "Tempat main tenis rasa private club.",
    location: "GOR Sakura, Tangerang",
    image: "https://picsum.photos/seed/lap4/600/400",
  },
];

export default function LapanganSection() {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["default"]));

  const kategori = useMemo(
    () => Array.from(selectedKeys).join(","),
    [selectedKeys]
  ) as "default" | "futsal" | "tenis" | "semua";

  const dataLapangan = useMemo(() => {
    if (kategori === "semua") return [...lapanganFutsal, ...lapanganTenis];
    if (kategori === "tenis") return lapanganTenis;
    if (kategori === "futsal") return lapanganFutsal;
    return [...lapanganFutsal, ...lapanganTenis];
  }, [kategori]);

  const labelMap: Record<typeof kategori, string> = {
    default: "Daftar Lapangan",
    futsal: "Lapangan Futsal",
    tenis: "Lapangan Tenis",
    semua: "Semua Lapangan",
  };

  const Card = ({ field }: { field: (typeof dataLapangan)[0] }) => (
    <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col hover:scale-[1.015] transition-all">
      <div className="relative h-48 md:h-56 w-full">
        <Image
          src={field.image}
          alt={field.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/lapangan/${field.slug}`}>
            <h3 className="text-xl font-semibold text-indigo-800 hover:text-purple-700 transition-colors">
              {field.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 mt-1">{field.location}</p>
          <p className="text-sm text-gray-500 mt-1">{field.description}</p>
        </div>
        <div className="flex justify-between mt-5 items-center">
          <Link
            href={`/lapangan/${field.slug}`}
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            Lihat Detail
          </Link>
          <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 text-sm rounded-xl hover:from-indigo-600 hover:to-purple-600 transition">
            Booking
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="lapangan"
      className="py-20 bg-gradient-to-br from-indigo-100 via-white to-purple-100"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-800">
          Daftar Lapangan
        </h2>
        <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
          Temukan pilihan lapangan terbaik untuk setiap gaya permainanmu — dari
          futsal cepat hingga tenis elegan. Semua dengan fasilitas modern dan
          kenyamanan maksimal.
        </p>
      </div>

      {/* Dropdown Filter */}
      <div className="flex justify-start mb-10 px-6">
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="capitalize flex items-center gap-2"
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
          >
            <DropdownItem key="futsal">Lapangan Futsal</DropdownItem>
            <DropdownItem key="tenis">Lapangan Tenis</DropdownItem>
            <DropdownItem key="semua">Semua Lapangan</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        {kategori === "semua" ? (
          <>
            {/* Grup Futsal */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-indigo-800 mb-4 px-6">
                Lapangan Futsal
              </h3>
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={24}
                slidesPerView={1}
                style={{ paddingBottom: "2rem" }}
              >
                {lapanganFutsal.map((field, idx) => (
                  <SwiperSlide
                    key={`futsal-${idx}`}
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
              <h3 className="text-lg font-bold text-indigo-800 mb-4 px-6">
                Lapangan Tenis
              </h3>
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={24}
                slidesPerView={1}
                style={{ paddingBottom: "2rem" }}
              >
                {lapanganTenis.map((field, idx) => (
                  <SwiperSlide
                    key={`tenis-${idx}`}
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
            style={{ paddingBottom: "2rem" }}
          >
            {dataLapangan.map((field, idx) => (
              <SwiperSlide
                key={idx}
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
        {dataLapangan.map((field, idx) => (
          <Card key={idx} field={field} />
        ))}
      </div>
    </section>
  );
}
