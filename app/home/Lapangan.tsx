"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const lapanganFutsal = [
  {
    name: "Lapangan Utama Cempaka",
    slug: "lapangan-utama-cempaka",
    description: "Lapangan indoor dengan rumput sintetis standar nasional.",
    location: "GOR Cempaka, Jakarta Timur",
    image: "https://picsum.photos/seed/lap1/600/400",
  },
  {
    name: "Lapangan Melati Pro",
    slug: "lapangan-melati-pro",
    description: "Cocok untuk turnamen dengan fasilitas pencahayaan lengkap.",
    location: "GOR Melati, Bekasi",
    image: "https://picsum.photos/seed/lap2/600/400",
  },
];

const lapanganTenis = [
  {
    name: "Arena Nusantara",
    slug: "arena-nusantara",
    description: "Lapangan vinyl anti-selip untuk performa maksimal.",
    location: "GOR Nusantara, Depok",
    image: "https://picsum.photos/seed/lap3/600/400",
  },
  {
    name: "Lapangan Sakura Elite",
    slug: "lapangan-sakura-elite",
    description: "Lapangan eksklusif untuk penyewa VIP dan komunitas.",
    location: "GOR Sakura, Tangerang",
    image: "https://picsum.photos/seed/lap4/600/400",
  },
];

export default function LapanganSection() {
  const swiperRef = useRef<any>(null);
  const [kategori, setKategori] = useState<"futsal" | "tenis">("futsal");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Tambahkan fungsi handleSelect di sini
  const handleSelect = (kategoriBaru: "futsal" | "tenis") => {
    setKategori(kategoriBaru);
    setOpen(false);
  };

  const dataLapangan = useMemo(
    () => (kategori === "tenis" ? lapanganTenis : lapanganFutsal),
    [kategori]
  );

  const selectedLabel =
    kategori === "futsal" ? "Lapangan Futsal" : "Lapangan Tenis";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section
      id="lapangan"
      className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    >
      <div className="max-w-6xl mx-auto px-4 text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Pilihan Lapangan Unggulan
        </h2>
        <p className="text-gray-600 mt-2">
          Booking lapangan terbaik sesuai kebutuhan turnamen dan latihan kamu.
        </p>
      </div>

      {/* Dropdown */}
      <div
        className="flex justify-start mb-6 px-4 relative z-10"
        ref={dropdownRef}
      >
        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-white border border-gray-300 shadow-sm px-3 py-1.5 text-sm text-gray-700 rounded-md hover:bg-gray-50 transition-all"
        >
          {selectedLabel}
          <ChevronDownIcon
            className={`w-4 h-4 text-gray-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 left-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            >
              <button
                onClick={() => handleSelect("futsal")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md"
              >
                Lapangan Futsal
              </button>
              <button
                onClick={() => handleSelect("tenis")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-md"
              >
                Lapangan Tenis
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Swiper */}
      <div
        onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay?.start()}
      >
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop={true}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={4000}
          freeMode={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          style={{ padding: "0 10px" }}
        >
          {dataLapangan.map((field, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col"
              >
                <div className="relative h-48 md:h-56 w-full">
                  <Image
                    src={field.image}
                    alt={field.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <Link href={`/lapangan/${field.slug}`}>
                      <h3 className="text-lg font-semibold text-blue-700 hover:text-indigo-600 transition-colors cursor-pointer">
                        {field.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500">{field.location}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {field.description}
                    </p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Link
                      href={`/lapangan/${field.slug}`}
                      className="text-sm text-blue-600 hover:underline font-medium"
                    >
                      Lihat Selengkapnya
                    </Link>
                    <button className="bg-indigo-600 text-white px-4 py-2 text-sm rounded hover:bg-indigo-700 transition">
                      Booking Sekarang
                    </button>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
