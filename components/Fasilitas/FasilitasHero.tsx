"use client";

import { Button } from "@heroui/button";

export const FasilitasHero = () => {
  return (
    <section
      className="relative h-[400px] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Fasilitas Modern & Lengkap
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Semua yang kamu butuhkan untuk pengalaman bermain terbaik ada di
            sini.
          </p>
          <Button color="primary" size="lg">
            Booking Sekarang
          </Button>
        </div>
      </div>
    </section>
  );
};
