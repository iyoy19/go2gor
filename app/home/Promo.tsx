"use client";

export default function Promo() {
  return (
    <section className="py-16" id="promo">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
          Promo & Diskon
        </h2>
        <div className="bg-white/20 dark:bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-md border border-white/30">
          <h3 className="text-2xl font-semibold text-red-400 mb-2">
            Diskon 20%!
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Gunakan kode: <strong>FUTSAL20</strong> saat checkout
          </p>
          <button className="bg-red-400 text-white px-6 py-2 rounded hover:scale-105 transition-transform ease-in-out">
            Gunakan Sekarang
          </button>
        </div>
      </div>
    </section>
  );
}
