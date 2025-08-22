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
import {
  motion,
  AnimatePresence,
  Variants,
  easeInOut,
  easeOut,
} from "framer-motion";

const Lapangan = () => {
  const [selectedSport, setSelectedSport] = useState<string>("all");

  const filteredFields = useMemo(() => {
    if (selectedSport === "all") return dummyFields;
    return dummyFields.filter((field) => field.sport === selectedSport);
  }, [selectedSport]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <section className="py-14 md:py-20 lg:py-28 relative">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="container px-4 md:px-6"
      >
        {/* Heading */}
        <motion.div variants={itemVariants} className="mb-3 text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-poppins tracking-tight text-gray-900 leading-snug">
            Main Seru Cari{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600">
              Lapangan
            </span>{" "}
            Jadi Gampang!
          </h2>
          <p className="max-w-[700px] mt-2 text-sm md:text-base lg:text-lg text-gray-700 dark:text-gray-300 font-inter leading-relaxed">
            Temukan lapangan{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 font-semibold">
              futsal
            </span>{" "}
            &{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 font-semibold">
              badminton
            </span>{" "}
            favoritmu, booking instan, harga transparan, tanpa ribet. Tinggal
            klik, lapangan langsung dapet!
          </p>
        </motion.div>

        {/* Tombol kategori */}
        <motion.div variants={itemVariants} className="flex justify-start mb-5">
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
                px-2 py-0.5 text-[10px] sm:text-xs font-inter font-medium
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
        </motion.div>

        {/* Scrollable Cards */}
        <motion.div
          variants={itemVariants}
          className="overflow-x-auto no-scrollbar"
        >
          <div className="flex gap-6 snap-x snap-mandatory">
            {filteredFields.map((field) => (
              <motion.div
                key={field.id}
                className="snap-start flex-shrink-0 w-[85%] sm:w-[48%] lg:w-[32%]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Card
                  isFooterBlurred
                  className="h-[300px] rounded-2xl overflow-hidden shadow-lg shadow-black/10 relative"
                >
                  {/* Header */}
                  <CardHeader className="absolute z-10 top-2 left-2 flex-col items-start text-left">
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-white text-[10px] uppercase font-inter font-semibold tracking-wide drop-shadow-sm"
                    >
                      {field.sport}
                    </motion.span>
                    <motion.h4
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-white font-bold text-base md:text-lg drop-shadow-md font-poppins"
                    >
                      {field.name}
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-[11px] md:text-sm text-white/90 drop-shadow-sm font-inter"
                    >
                      {field.venue}
                    </motion.p>
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
                  <CardFooter className="absolute bg-gradient-to-t from-black/70 via-black/40 to-transparent bottom-0 z-10 flex justify-between items-center px-3 py-2">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="font-bold text-sm md:text-base font-poppins text-amber-400 text-left"
                    >
                      Rp{field.price.toLocaleString("id-ID")}{" "}
                      <span className="text-white font-medium text-[10px] md:text-sm">
                        /jam
                      </span>
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <Button
                        as={Link}
                        href={`/booking?fieldId=${field.id}`}
                        radius="full"
                        size="sm"
                        className="px-3 py-1 text-xs font-inter font-semibold bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 text-white shadow-md"
                      >
                        Booking
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Link daftar lapangan */}
        <motion.div variants={itemVariants} className="mt-6 flex justify-start">
          <Link
            href="/lapangan"
            className="text-xs md:text-sm font-inter font-medium text-sky-600 dark:text-sky-400 hover:underline"
          >
            Lihat semua lapangan →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Lapangan;
