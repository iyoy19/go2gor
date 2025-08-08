"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";

// Dynamic import untuk Lottie
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

const words = ["Main Hari Ini!", "Booking Mudah!", "Anti Ribet!"];

// Set kumpulan gradient
const gradients = [
  "linear-gradient(135deg, #FFDEE9, #B5FFFC)",
  "linear-gradient(135deg, #FEE140, #FA709A)",
  "linear-gradient(135deg, #A1FFCE, #FAFFD1)",
  "linear-gradient(135deg, #FF9A9E, #FAD0C4)",
  "linear-gradient(135deg, #89F7FE, #66A6FF)"
];

export default function HomeSectionOne() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [bgIndex, setBgIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    const currentWord = words[index];
    let typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index]);

  // Scroll listener untuk indikator scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ganti background gradient otomatis setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % gradients.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      key={bgIndex} // supaya animasi fade jalan
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{
        background: gradients[bgIndex],
        transition: "background 1.5s ease-in-out"
      }}
      className="relative w-full pt-10 md:pt-20 font-poppins overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-pink-400 opacity-20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-120px] left-[-80px] w-[250px] h-[250px] bg-blue-400 opacity-20 rounded-full blur-2xl z-0" />
      <div className="absolute inset-0 bg-black/20 md:hidden z-[1]" />

      {/* Main Content */}
      <div className="relative w-full overflow-x-hidden flex flex-col md:flex-row items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 gap-10 z-10">
        {/* Desktop: Left Text */}
        <div className="hidden md:flex w-full md:w-1/2 flex-col justify-start text-left z-10">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center px-4 py-1 text-xs font-bold text-white bg-pink-600 rounded-full shadow-md w-fit"
          >
            #1 Booking Lapangan Online
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl font-medium tracking-wide text-black mt-2"
          >
            Booking Lapangan Gampang & Cepat
          </motion.h2>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-2 mb-3 min-h-[4rem] flex items-start text-[3rem] font-extrabold tracking-tight leading-tight text-black overflow-hidden"
          >
            <span className="inline-flex items-center">
              {displayText}
              <motion.span
                className="inline-block w-[3px] h-[1.2em] ml-1 bg-pink-600"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-2 text-lg text-black/80 font-medium"
          >
            Nggak perlu ribet datang ke GOR! <br />
            Cukup buka website kami, pilih jadwal & lapangan favorit, langsung
            booking. <br />
            Cocok buat futsal, badminton, basket, dan olahraga lainnya di kota kamu.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 flex gap-3"
          >
            <Link
              href="/lapangan"
              className="px-4 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition transform hover:scale-105"
            >
              Cek Lapangan
            </Link>
            <Link
              href="/booking"
              className="px-4 py-3 text-base font-semibold text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white rounded-lg shadow-sm transition transform hover:scale-105"
            >
              Booking Now
            </Link>
          </motion.div>
        </div>

        {/* Desktop: Animation */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center items-center z-0">
          <motion.div
            className="w-[450px]"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Player autoplay loop src="/animations/socer.json" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="w-6 h-6 border-b-2 border-r-2 border-black rotate-45 animate-bounce" />
        </motion.div>
      )}
    </motion.section>
  );
}
