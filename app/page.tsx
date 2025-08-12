"use client";

import "@/styles/globals.css";
import Hero from "@/app/home/Hero";
import Lapangan from "@/app/home/Lapangan";
import Testimoni from "@/app/home/Testimoni";
import StepBooking from "@/app/home/StepBooking";
import Event from "@/app/home/Event";
import CTA from "@/app/home/CTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <Lapangan />
        <Event />
        <StepBooking />
        <Testimoni />
        <CTA />
      </div>
    </main>
  );
}
