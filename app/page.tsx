"use client";

import "@/styles/globals.css";
import Hero from "@/app/home/Hero";
import Lapangan from "@/app/home/Lapangan";
import Testimoni from "@/app/home/Testimoni";
import StepBooking from "@/app/home/StepBooking";
import Event from "@/app/home/Event";
import CTA from "@/app/home/CTA";
import Footer from "@/app/home/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Event />
      <Lapangan />
      <StepBooking />
      <Testimoni />
      <CTA />
      <Footer />
    </main>
  );
}
