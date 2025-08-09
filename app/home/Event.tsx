"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { motion, AnimatePresence } from "framer-motion";

type EventType = {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
  eventDate: string;
  createdAt: string;
};

// ✅ Dummy Images
const randomImages = Array.from(
  { length: 10 },
  (_, i) => `https://picsum.photos/seed/event-${i + 1}/500/300`
);

// ✅ Semua Event
const dummyEvents: EventType[] = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: `Event Seru #${i + 1}`,
  description: "Ikuti keseruan olahraga bareng komunitas!",
  image: randomImages[i],
  slug: `event-seru-${i + 1}`,
  eventDate: new Date(Date.now() + i * 86400000).toISOString(), // +i hari
  createdAt: new Date(Date.now() - i * 86400000).toISOString(), // -i hari
}));

export default function EventSection() {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const swiperRef = useRef<any>(null);

  // ✅ Filter event hanya yang tanggalnya di masa depan
  const now = new Date();
  const events: EventType[] = dummyEvents.filter(
    (e) => new Date(e.eventDate) > now
  );

  return (
    <section className="bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-white sm:text-3xl">
          Event & Komunitas
        </h2>
        
          <p className="max-w-md mt-4 text-gray-300">
            Ikuti event seru dan bergabunglah dengan komunitas olahraga kami.
            Temukan teman baru dan tingkatkan permainanmu!
          </p>
        </header>

        {events.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3"            >
              {events.map((event) => (
                <li key={event.id}>
                  <Link
                  href={`/event/${event.slug}`}
                    className="block p-4 border border-gray-800 shadow-sm rounded-xl focus:outline-none focus:ring hover:border-gray-700 hover:ring-1 hover:ring-gray-700 transition"
                >
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={400}
                        height={200}
                        className="object-cover w-full h-56 rounded-md"
                  />

                  <h2 className="mt-2 font-bold text-white">{event.title}</h2>

                  <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-400">
                    {event.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center mt-8 text-center">
            <Image
              src="/images/noevent1.svg"
              alt="No Event"
              width={200}
              height={200}
            />
                      <h3 className="mt-4 text-lg font-semibold text-gray-400">
              Belum Ada Event
</h3>
                      <p className="max-w-md mt-2 text-gray-500">
              Saat ini belum ada event yang tersedia. Silakan cek kembali nanti.
            </p>
          </div>
)}

                    <div className="mt-12 text-center">
            <Link
              href="/event"
              className="inline-block px-6 py-3 text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition"
            >
              Lihat Semua Event
            </Link>
          </div>
        </div>
    </section>
  );
}
