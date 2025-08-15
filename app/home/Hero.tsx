"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Card, CardBody } from "@nextui-org/react";
import { ArrowRight, Clock, Calendar, MapPin } from "lucide-react";

export default function Hero() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const scheduleToday = [
    { time: "08:00 - 10:00", activity: "Futsal", status: "Booked" },
    { time: "10:00 - 12:00", activity: "Badminton", status: "Available" },
    { time: "13:00 - 15:00", activity: "Futsal", status: "Available" },
  ];

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      {/* Overlay gelap agar teks terbaca */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative container mx-auto flex flex-col lg:flex-row items-center gap-10 py-20 px-6">
        {/* Kiri - Teks */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            GOR Margono — Sport & Community Hub
          </motion.h1>
          <motion.p
            className="mt-6 text-lg sm:text-xl text-gray-200 leading-relaxed"
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

        {/* Kanan - Card Jadwal */}
        <motion.div
          className="flex-1 max-w-md w-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-white">
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Calendar className="h-5 w-5" /> Jadwal Hari Ini
                </h3>
                <span className="flex items-center gap-2 text-sm text-gray-300">
                  <Clock className="h-4 w-4" />{" "}
                  {time.toLocaleTimeString("en-GB")}
                </span>
              </div>
              <ul className="space-y-3">
                {scheduleToday.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center border-b border-white/10 pb-2"
                  >
                    <div>
                      <p className="font-medium">{item.time}</p>
                      <p className="text-sm text-gray-300">{item.activity}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Available"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" /> Lokasi: Serang, Banten
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
