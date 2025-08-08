"use client";

export default function CTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 text-white text-center">
      <div className="container mx-auto px-4 max-w-xl">
        <h2 className="text-3xl font-extrabold mb-4 drop-shadow-md">
          Booking Lapangan Jadi Lebih Mudah & Cepat
        </h2>
        <p className="mb-8 text-lg drop-shadow-sm">
          Temukan lapangan favoritmu dan amankan jadwalnya sekarang juga.
          Nikmati proses booking yang simpel, tanpa ribet, langsung dari
          genggaman tangan.
        </p>
        <a
          href="#lapangan"
          className="inline-block bg-white text-black px-8 py-3 font-semibold rounded-full shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-transform ease-in-out"
          aria-label="Mulai booking lapangan"
        >
          Mulai Booking Sekarang
        </a>
      </div>
    </section>
  );
}
