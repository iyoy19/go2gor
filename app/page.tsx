"use client";

import "@/styles/globals.css";
import Hero from "@/app/home/Hero";
import Konten from "@/app/home/Konten";
import Lapangan from "@/app/home/Lapangan";
import StepBooking from "@/app/home/StepBooking";
import Event from "@/app/home/Event";
import CTA from "@/app/home/CTA";
import TeamSection from "@/app/home/Team";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <Konten />
        <Lapangan />
        <Event />
        <TeamSection />
        <StepBooking />
        <CTA />
      </div>
    </main>
  );
}
