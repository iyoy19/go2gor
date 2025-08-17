"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Users, CalendarDays, MapPin, Trophy } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

const Hero = () => {
  const [time, setTime] = useState(new Date());
  const [teams, setTeams] = useState(120);
  const [events] = useState(8);
  const [isMounted, setIsMounted] = useState(false);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const [marqueeWidth, setMarqueeWidth] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    const teamCounter = setInterval(() => {
      if (Math.random() > 0.9) setTeams((prev) => prev + 1);
    }, 4000);
    return () => {
      clearInterval(timer);
      clearInterval(teamCounter);
    };
  }, []);

  useEffect(() => {
    if (isMounted && marqueeRef.current) {
      // The timeout gives the browser a moment to calculate the layout
      setTimeout(() => {
        if (marqueeRef.current) {
          setMarqueeWidth(marqueeRef.current.scrollWidth / 2);
        }
      }, 100);
    }
  }, [isMounted]);

  const StatItem = ({ icon, value, label }: StatItemProps) => (
    <div className="flex items-center gap-0 py-2 rounded-lg flex-shrink-0 w-auto px-4 sm:w-auto">
      <div className="flex-shrink-0 text-primary-300">{icon}</div>
      <div className="flex flex-col ml-2">
        <motion.p
          whileHover={{ color: "#38bdf8", textShadow: "0px 0px 6px #38bdf8" }}
          transition={{ duration: 0.3 }}
          className="font-semibold text-white text-xs sm:text-sm"
        >
          {label}
        </motion.p>
        <motion.p
          whileHover={{ color: "#38bdf8", textShadow: "0px 0px 8px #38bdf8" }}
          transition={{ duration: 0.3 }}
          className="text-[10px] sm:text-xs text-gray-300"
        >
          {value}
        </motion.p>
      </div>
    </div>
  );

  return (
    <section className="relative flex flex-col text-white">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <img
            src="/images/hero1.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover md:object-center object-[80%] select-none"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-36 sm:py-20 mt-10 px-4 sm:px-6">
        {/* Kiri - Teks */}
        <div className="flex flex-col items-start gap-4 text-left">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Temukan Energi Baru di GOR Margono
          </motion.h1>
          <motion.p
            className="max-w-2xl text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Dari futsal seru hingga badminton penuh semangat, GOR Margono hadir
            sebagai pusat olahraga & komunitas modern. Nikmati atmosfer
            kompetitif sekaligus kebersamaan dalam satu arena.
          </motion.p>
        </div>

        {/* Kanan - Kosong */}
        <div className="hidden lg:block"></div>
      </div>

      {/* Bottom Stats */}
      <div className="relative w-full border-t border-white/20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          {/* Desktop: grid */}
          <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 stats-grid-container">
            <StatItem
              icon={<Clock className="h-4 w-4 sm:h-5 sm:w-5" />}
              value={isMounted ? time.toLocaleTimeString("en-GB") : "00:00:00"}
              label="Waktu Lokal"
            />
            <StatItem
              icon={<Users className="h-4 w-4 sm:h-5 sm:w-5" />}
              value={isMounted ? teams.toString() : "..."}
              label="Team"
            />
            <StatItem
              icon={<CalendarDays className="h-4 w-4 sm:h-5 sm:w-5" />}
              value={isMounted ? events.toString() : "..."}
              label="Event Bulan Ini"
            />
            <StatItem
              icon={<MapPin className="h-4 w-4 sm:h-5 sm:w-5" />}
              value="Jakarta & Bandung"
              label="Lokasi"
            />
            <StatItem
              icon={<Trophy className="h-4 w-4 sm:h-5 sm:w-5" />}
              value="Futsal & Badminton"
              label="Olahraga Populer"
            />
          </div>

          {/* Mobile: auto-scrolling marquee */}
          <div className="sm:hidden marquee-container">
            <motion.div
              ref={marqueeRef}
              className="flex"
              animate={{
                x: [0, -marqueeWidth],
              }}
              transition={{
                ease: "linear",
                duration: marqueeWidth / 20,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <StatItem
                icon={<Clock className="h-4 w-4 sm:h-5 sm:w-5" />}
                value={
                  isMounted ? time.toLocaleTimeString("en-GB") : "00:00:00"
                }
                label="Waktu"
              />
              <StatItem
                icon={<Users className="h-4 w-4 sm:h-5 sm:w-5" />}
                value={isMounted ? teams.toString() : "..."}
                label="Team"
              />
              <StatItem
                icon={<CalendarDays className="h-4 w-4 sm:h-5 sm:w-5" />}
                value={isMounted ? events.toString() : "..."}
                label="Event Bulan Ini"
              />
              <StatItem
                icon={<MapPin className="h-4 w-4 sm:h-5 sm:w-5" />}
                value="Labuan"
                label="Lokasi"
              />
              <StatItem
                icon={<Trophy className="h-4 w-4 sm:h-5 sm:w-5" />}
                value="Futsal & Badminton"
                label="Arena"
              />
              {/* Duplicated for seamless scroll */}
              <StatItem
                icon={<Clock className="h-4 w-4 sm:h-5 sm:w-5" />}
                value={
                  isMounted ? time.toLocaleTimeString("en-GB") : "00:00:00"
                }
                label="Waktu"
              />
              <StatItem
                icon={<Users className="h-4 w-4 sm:h-5 sm:w-5" />}
                value={isMounted ? teams.toString() : "..."}
                label="Team"
              />
              <StatItem
                icon={<CalendarDays className="h-4 w-4 sm:h-5 sm:w-5" />}
                value={isMounted ? events.toString() : "..."}
                label="Event Bulan Ini"
              />
              <StatItem
                icon={<MapPin className="h-4 w-4 sm:h-5 sm:w-5" />}
                value="Labuan"
                label="Lokasi"
              />
              <StatItem
                icon={<Trophy className="h-4 w-4 sm:h-5 sm:w-5" />}
                value="Futsal & Badminton"
                label="Arena"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
