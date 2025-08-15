"use client";
import React, { useState, useEffect } from "react";
import { Button, Link } from "@nextui-org/react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Users, Ticket, MapPin, Trophy } from "lucide-react";

const Hero = () => {
  const [time, setTime] = useState(new Date());
  const [onlineUsers, setOnlineUsers] = useState(1337);
  const [dailyBookings, setDailyBookings] = useState(256);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    const userCounter = setInterval(() => {
      setOnlineUsers((prev) => prev + Math.floor(Math.random() * 3) - 1);
    }, 2500);
    const bookingCounter = setInterval(() => {
      if (Math.random() > 0.7) setDailyBookings((prev) => prev + 1);
    }, 5000);
    return () => {
      clearInterval(timer);
      clearInterval(userCounter);
      clearInterval(bookingCounter);
    };
  }, []);

  const StatItem = ({ icon, value, label }: any) => (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="font-semibold text-white text-sm sm:text-base">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </div>
  );

  return (
    <section className="relative flex flex-col bg-black text-white overflow-hidden">
      {/* Top Hero */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10 py-20 px-6">
        {/* Left - Text */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            GOR Margono — Sport & Community Hub
          </motion.h1>
          <motion.p
            className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Booking lapangan futsal & badminton, ikut event, dan rasakan
            pengalaman olahraga premium di GOR Margono.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              as={Link}
              href="/lapangan"
              color="primary"
              size="lg"
              endContent={<ArrowRight className="h-5 w-5" />}
              className="font-bold px-8 py-6 text-lg shadow-lg hover:scale-105 transition-transform"
              variant="shadow"
            >
              Pesan Lapangan Sekarang
            </Button>
          </motion.div>
        </div>

        {/* Right - Image */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <img
            src="/images/hero.jpg"
            alt="Lapangan GOR Margono"
            className="rounded-2xl shadow-2xl w-full object-cover"
          />
        </motion.div>
      </div>

      {/* Bottom Stats */}
      <div className="w-full border-t border-white/10 bg-black/20 py-4 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center">
          <StatItem
            icon={<Clock className="h-7 w-7 text-primary-300" />}
            value={isMounted ? time.toLocaleTimeString("en-GB") : "00:00:00"}
            label="Waktu Lokal"
          />
          <StatItem
            icon={<Users className="h-7 w-7 text-primary-300" />}
            value={isMounted ? onlineUsers.toLocaleString() : "..."}
            label="Pengguna Online"
          />
          <StatItem
            icon={<Ticket className="h-7 w-7 text-primary-300" />}
            value={isMounted ? dailyBookings.toString() : "..."}
            label="Booking Hari Ini"
          />
          <StatItem
            icon={<MapPin className="h-7 w-7 text-primary-300" />}
            value="Jakarta & Bandung"
            label="Lokasi Tersedia"
          />
          <StatItem
            icon={<Trophy className="h-7 w-7 text-primary-300" />}
            value="Futsal & Badminton"
            label="Olahraga Populer"
          />
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg
          className="w-full h-24 lg:h-32"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,256L60,240C120,224,240,192,360,186.7C480,181,600,203,720,197.3C840,192,960,160,1080,170.7C1200,181,1320,235,1380,261.3L1440,288L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
