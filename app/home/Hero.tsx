"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

const words = ["Main Hari Ini!", "Booking Mudah!", "Anti Ribet!"];

export default function HomeSectionOne() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full pt-10 md:pt-20 font-poppins">
      {/* Background Decoration */}
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-purple-300 dark:bg-purple-700 opacity-20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-120px] left-[-80px] w-[250px] h-[250px] bg-indigo-300 dark:bg-indigo-700 opacity-20 rounded-full blur-2xl z-0" />

      <div className="relative w-full overflow-x-hidden flex flex-col md:flex-row items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 gap-10 z-10">
        {/* Mobile: Top Headings */}
        <div className="block md:hidden w-full text-left z-10 px-4 mt-2">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center px-4 py-1 text-xs font-bold text-white bg-yellow-400 dark:bg-pink-600 rounded-full shadow-md w-fit"
          >
            #1 Booking Lapangan Online
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg font-medium tracking-wide text-black dark:text-white mt-2"
          >
            Booking Lapangan Gampang & Cepat
          </motion.h2>
        </div>

        {/* Desktop: Left Text */}
        <div className="hidden md:flex w-full md:w-1/2 flex-col justify-start text-left z-10 px-4 md:px-0">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center px-4 py-1 text-xs font-bold text-white bg-yellow-400 dark:bg-pink-600 rounded-full shadow-md w-fit"
          >
            #1 Booking Lapangan Online
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-wide text-black dark:text-white mt-2"
          >
            Booking Lapangan Gampang & Cepat
          </motion.h2>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-2 mb-3 min-h-[4.2rem] flex items-start text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.8rem] xl:text-[4.2rem] font-extrabold tracking-tight leading-tight text-black dark:text-white overflow-hidden drop-shadow-md"
          >
            <span className="inline-flex items-center min-w-[12ch] transition-all duration-300">
              {displayText}
              <motion.span
                className="inline-block w-[3px] h-[1.2em] ml-1 bg-yellow-500 dark:bg-pink-600"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            </span>
          </motion.div>

          {/* Extra Heading (New Line) */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg sm:text-xl font-semibold text-black dark:text-white mt-1 lg:mt-2"
          >
            Tinggal Klik, Lapangan Langsung Dapet!
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-2 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 md:w-4/5 font-medium"
          >
            Nggak perlu ribet datang ke GOR! <br />
            Cukup buka website kami, pilih jadwal & lapangan favorit, langsung
            booking.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 flex flex-row justify-start items-center gap-3 w-full"
          >
            <Link
              href="/lapangan"
              className="basis-1/2 text-center px-4 py-3 text-sm sm:text-base font-semibold text-white bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800 rounded-lg shadow-md transition duration-200 transform hover:scale-105 backdrop-blur-md"
            >
              Cek Lapangan
            </Link>
            <Link
              href="/booking"
              className="basis-1/2 text-center px-4 py-3 text-sm font-semibold text-blue-500 dark:text-blue-700 border-2 border-blue-500 dark:border-blue-700 hover:bg-blue-600 hover:text-white rounded-lg shadow-sm transition duration-200 transform hover:scale-105 backdrop-blur-md"
            >
              Booking Now
            </Link>
          </motion.div>
        </div>

        {/* Mobile: Animation */}
        <div className="block md:hidden w-full flex justify-center items-center z-0">
          <motion.div
            className="w-[250px] sm:w-[350px]"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Player
              autoplay
              loop
              src="/animations/socer.json"
              className="w-full h-full"
            />
          </motion.div>
        </div>

        {/* Mobile: Text */}
        <div className="block md:hidden w-full flex flex-col justify-start text-left z-10 px-4 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-2 mb-3 min-h-[2.5rem] sm:min-h-[3rem] flex items-start text-[2rem] sm:text-[2.5rem] font-extrabold tracking-tight leading-tight text-black dark:text-white overflow-hidden drop-shadow-md"
          >
            <span className="inline-flex items-center min-w-[12ch] transition-all duration-300">
              {displayText}
              <motion.span
                className="inline-block w-[3px] h-[1.2em] ml-1 bg-yellow-500 dark:bg-pink-600"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            </span>
          </motion.div>

          {/* Extra Heading (Mobile) */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-base sm:text-lg font-semibold text-black dark:text-white mt-1"
          >
            Tinggal Klik, Lapangan Langsung Dapet!
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium"
          >
            Nggak perlu ribet datang ke GOR! <br />
            Cukup buka website kami, pilih jadwal & lapangan favorit, langsung
            booking. <br />
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-6 flex flex-row justify-start items-center gap-3 w-full backdrop-blur-md"
          >
            <Link
              href="/lapangan"
              className="basis-1/2 text-center px-4 py-3 text-sm font-semibold text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
            >
              Cek Lapangan
            </Link>
            <Link
              href="/booking"
              className="basis-1/2 text-center px-4 py-3 text-sm font-semibold text-blue-500 dark:text-blue-600 border-2 border-blue-500 dark:border-blue-600 hover:bg-blue-600 hover:text-white rounded-lg shadow-sm transition duration-200 transform hover:scale-105"
            >
              Booking Now
            </Link>
          </motion.div>
        </div>

        {/* Desktop: Animation */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center items-center z-0">
          <motion.div
            className="w-[250px] sm:w-[350px] md:w-[450px]"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Player
              autoplay
              loop
              src="/animations/socer.json"
              className="w-full h-full"
            />
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
          <div className="w-6 h-6 border-b-2 border-r-2 border-black dark:border-white rotate-45 animate-bounce" />
        </motion.div>
      )}
    </section>
  );
}
