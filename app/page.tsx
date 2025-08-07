"use client";

import Hero from "@/app/home/Hero";
import Event from "@/app/home/Event";
import Lapangan from "@/app/home/Lapangan";
import Testimoni from "@/app/home/Testimoni";
import StepBooking from "@/app/home/StepBooking";
import Promo from "@/app/home/Promo";
import FAQ from "@/app/home/FAQ";
import CTA from "@/app/home/CTA";
import Footer from "@/app/home/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Event />
      <Lapangan />
      <Testimoni />
      <StepBooking />
      <Promo />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
