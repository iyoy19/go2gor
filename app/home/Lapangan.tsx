"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
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
import { motion, AnimatePresence } from "framer-motion";

const Lapangan = () => {
  const [selectedSport, setSelectedSport] = useState<string>("all");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  const filteredFields = useMemo(() => {
    if (selectedSport === "all") return dummyFields;
    return dummyFields.filter((field) => field.sport === selectedSport);
  }, [selectedSport]);

  useEffect(() => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const offsetWidth = carouselRef.current.offsetWidth;
      setWidth(scrollWidth - offsetWidth);
    }
  }, [filteredFields]);

  return (
    <section className="py-12 md:py-20 lg:py-28 relative">
      <div className="container px-4 md:px-6">
        {/* Heading */}
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-poppins tracking-tight text-gray-900">
            Main Seru Cari Lapangan Jadi Gampang!
          </h2>
          <p className="max-w-[800px] mx-auto mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400 font-inter leading-relaxed">
            Temukan lapangan futsal & badminton favoritmu, booking instan, harga
            transparan, tanpa ribet.
          </p>
        </div>

        {/* Tabs desktop */}
        <div className="hidden md:flex mb-6 justify-start">
          <Tabs
            aria-label="Kategori Lapangan"
            selectedKey={selectedSport}
            onSelectionChange={(key) => setSelectedSport(key.toString())}
            radius="full"
            variant="bordered"
            classNames={{
              tabList: `
      bg-white/80 dark:bg-zinc-800/60
      backdrop-blur-xl shadow-md
      px-2 py-1 rounded-full
    `,
              tab: `
      px-4 py-1.5 font-inter text-sm font-medium
      text-gray-600 dark:text-gray-300
      data-[selected=true]:text-white
      hover:text-gray-900 dark:hover:text-white
      transition-colors duration-300
    `,
              cursor: `
      bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500
      shadow-md shadow-cyan-500/30
      rounded-full
    `,
            }}
          >
            <Tab key="all" title="Semua" />
            <Tab key="Futsal" title="Futsal" />
            <Tab key="Badminton" title="Badminton" />
          </Tabs>
        </div>

        {/* Carousel */}
        <div className="relative">
          <motion.div ref={carouselRef} className="overflow-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ left: -width, right: 0 }}
              dragElastic={0.05}
              className="flex gap-6 select-none cursor-grab active:cursor-grabbing"
            >
              <AnimatePresence mode="popLayout">
                {filteredFields.map((field) => (
                  <motion.div
                    key={field.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="flex-shrink-0 w-[85%] sm:w-[48%] lg:w-[30%]"
                  >
                    <Card
                      isFooterBlurred
                      className="h-[340px] rounded-2xl overflow-hidden shadow-lg shadow-black/10"
                    >
                      {/* Header */}
                      <CardHeader className="absolute z-10 top-2 left-2 flex-col items-start">
                        <span className="text-white text-[11px] uppercase font-semibold font-inter tracking-wide drop-shadow-sm">
                          {field.sport}
                        </span>
                        <h4 className="text-white font-bold text-2xl drop-shadow-md font-poppins">
                          {field.name}
                        </h4>
                        <p className="text-sm text-white/90 drop-shadow-sm font-inter">
                          {field.venue}
                        </p>
                      </CardHeader>

                      {/* Background Image */}
                      <Image
                        alt={field.name}
                        src={field.image}
                        fill
                        draggable={false}
                        className="z-0 w-full h-full object-cover select-none"
                      />

                      {/* Footer */}
                      <CardFooter className="absolute bg-gradient-to-t from-black/70 via-black/40 to-transparent bottom-0 z-10 flex justify-between items-center">
                        <div className="flex flex-col">
                          <p className="font-bold text-lg font-poppins text-amber-400">
                            Rp{field.price.toLocaleString("id-ID")}{" "}
                            <span className="text-white font-medium text-sm">
                              /jam
                            </span>
                          </p>
                          <Link
                            href={`/lapangan/${field.id}`}
                            className="text-xs text-white/80 underline hover:text-white font-inter"
                          >
                            selengkapnya
                          </Link>
                        </div>
                        <Button
                          as={Link}
                          href={`/booking/${field.id}`}
                          radius="full"
                          size="sm"
                          className="font-semibold font-inter bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 text-white shadow-md hover:opacity-90 transition"
                        >
                          Booking
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Tabs mobile */}
          <div className="md:hidden absolute bottom-0 right-0 translate-y-full mt-4 pt-4">
            <Tabs
              aria-label="Kategori Lapangan"
              selectedKey={selectedSport}
              onSelectionChange={(key) => setSelectedSport(key.toString())}
              radius="full"
              variant="bordered"
              classNames={{
                tabList: `
      bg-white/80 dark:bg-zinc-800/60
      backdrop-blur-xl shadow-md
      px-2 py-1 rounded-full
    `,
                tab: `
      px-4 py-1.5 font-inter text-sm font-medium
      text-gray-600 dark:text-gray-300
      data-[selected=true]:text-white
      hover:text-gray-900 dark:hover:text-white
      transition-colors duration-300
    `,
                cursor: `
      bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500
      shadow-md shadow-cyan-500/30
      rounded-full
    `,
              }}
            >
              <Tab key="all" title="Semua" />
              <Tab key="Futsal" title="Futsal" />
              <Tab key="Badminton" title="Badminton" />
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lapangan;
