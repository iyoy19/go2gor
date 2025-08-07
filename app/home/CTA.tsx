"use client";

export default function CTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Siap Booking Lapangan?</h2>
        <p className="mb-6">
          Klik tombol di bawah untuk mulai booking sekarang juga.
        </p>
        <a
          href="#lapangan"
          className="bg-white text-black px-6 py-3 font-semibold rounded hover:scale-105 transition-transform ease-in-out"
        >
          Booking Sekarang
        </a>
      </div>
    </section>
  );
}
