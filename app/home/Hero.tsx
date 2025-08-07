"use client";

import { useState, useEffect } from "react";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { subtitle } from "@/Components/primitives";
import RotatingText from "@/Components/TextAnimations/RotatingText/RotatingText";
import dynamic from "next/dynamic";
import Link from "next/link";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function HomeSectionOne() {
  const [rotationKey, setRotationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationKey((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="w-full min-h-screen bg-gradient-to-tr from-[#FFDEE9] via-[#B5FFFC] to-[#FEE140]
 pt-20"
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 gap-14 md:gap-20">
        {/* TEKS */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-[2.3rem] lg:text-5xl font-bold tracking-tight leading-tight font-poppins text-gray-900 dark:text-white">
            Booking Lapangan
          </h1>

          <div className="mt-2 mb-4 flex justify-center md:justify-start">
            <RotatingText
              key={rotationKey}
              texts={["Gampang!", "Nggak Ribet!", "Anti Drama!"]}
              mainClassName="px-3 bg-yellow-300 text-black overflow-hidden py-2 rounded-lg font-bold text-xl sm:text-2xl font-poppins"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>

          <h1 className="text-[2.3rem] lg:text-5xl font-bold tracking-tight leading-tight font-poppins text-gray-900 dark:text-white">
            Cukup dari HP aja
          </h1>

          <p
            className={subtitle({
              class:
                "mt-4 text-lg lg:text-xl text-default-600 md:w-4/5 mx-auto md:mx-0",
            })}
          >
            Tinggal buka website-nya, pilih lapangan favorit, langsung booking
            tanpa nunggu! <br />
            Buat kamu yang aktif, spontan, dan suka ngumpul bareng temen — ini
            solusi kekinianmu!
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/lapangan"
              className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transform transition-transform duration-300 ease-in-out hover:scale-110"
            >
              Cek Lapangan
            </Link>
            <Link
              href="/booking"
              className="px-6 py-3 text-lg font-semibold text-blue-600 border-2 border-blue-600 hover:bg-blue-100 rounded-xl shadow-sm transform transition-transform duration-300 ease-in-out hover:scale-110"
            >
              Booking Sekarang
            </Link>
          </div>
        </div>

        {/* LOTTIE ANIMATION */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="w-[250px] sm:w-[350px] md:w-[450px] transition-transform duration-300 ease-in-out hover:scale-110">
            <Player
              autoplay
              loop
              src="/animations/socer.json"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
