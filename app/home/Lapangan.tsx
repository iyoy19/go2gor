"use client";

import React, { useState, useMemo } from "react";
import { dummyFields } from "@/data/lapangan";
import Image from "next/image";
import {
  Button,
  Link,
  Tabs,
  Tab,
  Card,
  CardHeader,
  CardFooter,
} from "@heroui/react";

const Lapangan = () => {
  const [selectedSport, setSelectedSport] = useState<string>("all");

  const filteredFields = useMemo(() => {
    if (selectedSport === "all") return dummyFields;
    return dummyFields.filter((field) => field.sport === selectedSport);
  }, [selectedSport]);

  return (
    <section className="py-12 md:py-20 lg:py-28 relative">
      <div className="container px-4 md:px-6">
        {/* Heading */}
        <div className="mb-3 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-poppins tracking-tight text-gray-900">
            Main Seru Cari Lapangan Jadi Gampang!
          </h2>
          <p className="max-w-[700px] mt-2 text-xs md:text-sm text-gray-600 dark:text-gray-400 font-inter leading-relaxed">
            Temukan lapangan futsal & badminton favoritmu, booking instan, harga
            transparan, tanpa ribet.
          </p>
        </div>

        {/* Tombol kategori (lebih kecil & kiri atas) */}
        <div className="flex justify-start mb-5">
          <Tabs
            aria-label="Kategori Lapangan"
            selectedKey={selectedSport}
            onSelectionChange={(key) => setSelectedSport(key.toString())}
            radius="full"
            variant="bordered"
            size="sm"
            classNames={{
              tabList: `
                bg-white/80 dark:bg-zinc-800/60
                backdrop-blur-xl shadow
                px-1 py-0.5 rounded-full
              `,
              tab: `
                px-2 py-0.5 text-[10px] sm:text-xs font-medium
                text-gray-600 dark:text-gray-300
                data-[selected=true]:text-white
              `,
              cursor: `
                bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500
                rounded-full
              `,
            }}
          >
            <Tab key="all" title="Semua" />
            <Tab key="Futsal" title="Futsal" />
            <Tab key="Badminton" title="Badminton" />
          </Tabs>
        </div>

        {/* Scrollable Cards */}
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-6 snap-x snap-mandatory">
            {filteredFields.map((field) => (
              <Card
                key={field.id}
                isFooterBlurred
                className="snap-start flex-shrink-0 w-[85%] sm:w-[48%] lg:w-[32%] h-[300px] rounded-2xl overflow-hidden shadow-lg shadow-black/10"
              >
                {/* Header */}
                <CardHeader className="absolute z-10 top-2 left-2 flex-col items-start">
                  <span className="text-white text-[10px] uppercase font-semibold font-inter tracking-wide drop-shadow-sm">
                    {field.sport}
                  </span>
                  <h4 className="text-white font-bold text-base md:text-lg drop-shadow-md font-poppins">
                    {field.name}
                  </h4>
                  <p className="text-[11px] md:text-sm text-white/90 drop-shadow-sm font-inter">
                    {field.venue}
                  </p>
                </CardHeader>

                {/* Background */}
                <Image
                  alt={field.name}
                  src={field.image}
                  fill
                  draggable={false}
                  className="z-0 w-full h-full object-cover select-none"
                />

                {/* Footer */}
                <CardFooter className="absolute bg-gradient-to-t from-black/70 via-black/40 to-transparent bottom-0 z-10 flex justify-between items-center">
                  <p className="font-bold text-sm md:text-base font-poppins text-amber-400">
                    Rp{field.price.toLocaleString("id-ID")}{" "}
                    <span className="text-white font-medium text-[10px] md:text-sm">
                      /jam
                    </span>
                  </p>
                  <Button
                    as={Link}
                    href={`/booking/${field.id}`}
                    radius="full"
                    size="sm"
                    className="px-3 py-1 text-xs font-semibold font-inter bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 text-white shadow-md"
                  >
                    Booking
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Link daftar lapangan */}
        <div className="mt-6 flex justify-end">
          <Link
            href="/lapangan"
            className="text-xs md:text-sm font-medium text-sky-600 dark:text-sky-400 hover:underline"
          >
            Lihat semua lapangan →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Lapangan;
