"use client";

import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { dummyFields } from "@/data/lapangan";
import NextImage from "next/image";
import {
  Button,
  Link,
  Tabs,
  Tab,
  Card,
  CardHeader,
  CardFooter,
} from "@heroui/react";
import { motion, Variants } from "framer-motion";
import { Grid, PanelsTopLeft } from "lucide-react";

type SportType = "all" | "Futsal" | "Badminton";
type MobileMode = "grid" | "slide";

interface DragConstraints {
  left: number;
  right: number;
}

const Lapangan = () => {
  const [selectedSport, setSelectedSport] = useState<SportType>("all");
  const [mobileMode, setMobileMode] = useState<MobileMode>("slide");
  const [isClient, setIsClient] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState<DragConstraints>({
    left: 0,
    right: 0,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredFields = useMemo(() => {
    return selectedSport === "all"
      ? dummyFields
      : dummyFields.filter((field) => field.sport === selectedSport);
  }, [selectedSport]);

  const updateConstraints = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollWidth, offsetWidth } = containerRef.current;
    const newLeft =
      scrollWidth > offsetWidth ? -(scrollWidth - offsetWidth) : 0;
    setConstraints({ left: newLeft, right: 0 });
  }, []);

  useEffect(() => {
    if (mobileMode === "slide" && typeof window !== "undefined") {
      filteredFields.forEach((field) => {
        const img = new window.Image();
        img.src = field.image;
      });
    }
  }, [filteredFields, mobileMode]);

  useEffect(() => {
    if (mobileMode !== "slide") return;
    updateConstraints();
    const handleResize = () => setTimeout(updateConstraints, 100);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [filteredFields, mobileMode, updateConstraints]);

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const FieldCard = ({
    field,
    isSlideMode = false,
  }: {
    field: (typeof dummyFields)[0];
    isSlideMode?: boolean;
  }) => (
    <Card className="h-[300px] rounded-2xl overflow-hidden shadow-lg relative">
      <CardHeader className="absolute z-10 top-2 left-2 flex-col items-start text-left">
        <span className="text-white text-[10px] uppercase font-semibold drop-shadow-sm">
          {field.sport}
        </span>
        <h4 className="text-white font-bold text-lg drop-shadow-md">
          {field.name}
        </h4>
        <p className="text-sm text-white/90 drop-shadow-sm">{field.venue}</p>
      </CardHeader>

      <NextImage
        alt={field.name}
        src={field.image}
        fill
        draggable={false}
        className="z-0 w-full h-full object-cover select-none"
        sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
        priority={isSlideMode}
      />

      <CardFooter className="absolute bg-gradient-to-t from-black/70 via-black/40 to-transparent bottom-0 z-10 flex justify-between items-center px-3 py-2">
        <p className="font-bold text-base text-amber-400">
          Rp{field.price.toLocaleString("id-ID")}{" "}
          <span className="text-white text-sm">/jam</span>
        </p>
        <Button
          as={Link}
          href={`/booking?fieldId=${field.id}`}
          radius="full"
          size="sm"
          className="px-3 py-1 text-xs bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 text-white shadow-md hover:scale-105 transition-transform"
        >
          Booking
        </Button>
      </CardFooter>
    </Card>
  );

  if (!isClient) return null;

  return (
    <section className="py-14 md:py-20 lg:py-28 relative">
      <div className="container px-4 md:px-6">
        {/* Heading */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 text-left"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Main Seru Cari{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600">
              Lapangan
            </span>{" "}
            Jadi Gampang!
          </h2>
          <p className="max-w-[700px] mt-2 text-base lg:text-lg text-gray-700 dark:text-gray-300">
            Temukan lapangan favoritmu, booking instan, harga transparan, tanpa
            ribet. Tinggal klik, lapangan langsung dapet!
          </p>
        </motion.div>

        {/* Tabs + Toggle */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <Tabs
            aria-label="Kategori Lapangan"
            selectedKey={selectedSport}
            onSelectionChange={(key) =>
              setSelectedSport(key.toString() as SportType)
            }
            radius="full"
            variant="bordered"
            size="sm"
          >
            <Tab key="all" title="Semua" />
            <Tab key="Futsal" title="Futsal" />
            <Tab key="Badminton" title="Badminton" />
          </Tabs>

          {/* Toggle hanya muncul di mobile */}
          <div className="flex items-center gap-1 bg-white dark:bg-zinc-800 rounded-full p-1 shadow md:hidden">
            <button
              onClick={() => setMobileMode("grid")}
              className={`p-2 rounded-full ${
                mobileMode === "grid"
                  ? "bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 text-white"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMode("slide")}
              className={`p-2 rounded-full ${
                mobileMode === "slide"
                  ? "bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 text-white"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              <PanelsTopLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grid Mode (desktop) */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFields.map((field) => (
            <motion.div
              key={field.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <FieldCard field={field} />
            </motion.div>
          ))}
        </div>

        {/* Grid khusus mobile */}
        {mobileMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden">
            {filteredFields.map((field) => (
              <FieldCard key={`grid-${field.id}`} field={field} />
            ))}
          </div>
        )}

        {/* Slide Mode di mobile */}
        {mobileMode === "slide" && (
          <div className="overflow-x-auto snap-x snap-mandatory flex gap-4 md:hidden pb-2 cursor-grab">
            {filteredFields.map((field) => (
              <motion.div
                key={`slide-${field.id}`}
                className="flex-shrink-0 w-[85%] snap-start"
                whileTap={{ scale: 0.98 }}
              >
                <FieldCard field={field} isSlideMode />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Lapangan;
