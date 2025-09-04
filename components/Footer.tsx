"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="font-poppins text-gray-700 dark:text-gray-300 border-t border-gray-200/80 dark:border-slate-800/80">
      <div className="container mx-auto px-4 sm:px-6 py-4 max-w-7xl flex flex-col items-center gap-2">
        {/* Logo */}
        <Image
          src="/images/logo1.png"
          alt="Go2Gor Logo"
          width={140} // lebih kecil dari 220
          height={140}
          className="object-contain mx-auto"
          priority
        />

        {/* Copyright */}
        <p className="text-gray-500 dark:text-gray-500 text-xs sm:text-sm text-center">
          © {year ?? ""} Go2Gor. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
