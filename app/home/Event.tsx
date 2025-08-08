"use client";

import Image from "next/image";
import { useState } from "react";

// ✅ Tambahkan type untuk Event
type EventType = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const events: EventType[] = [
  {
    id: 1,
    title: "Turnamen Futsal Komunitas",
    description:
      "Ayo uji skill kamu di turnamen futsal antar komunitas se-kota!",
    image: "/images/event-futsal.jpg",
  },
  {
    id: 2,
    title: "Fun Match Badminton",
    description:
      "Gabung fun match badminton santai bareng komunitas tiap minggu.",
    image: "/images/event-badminton.jpg",
  },
];

export default function EventSection() {
  // ✅ Gunakan EventType atau null sebagai tipe
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  return (
    <section className="relative w-full bg-white py-16 px-4 sm:px-6 lg:px-8 font-poppins overflow-hidden">
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>
            <Image
              src={selectedEvent.image}
              alt={selectedEvent.title}
              width={500}
              height={300}
              className="rounded-lg mb-4 object-cover w-full h-48"
            />
            <h3 className="text-xl font-bold mb-2">{selectedEvent.title}</h3>
            <p className="text-gray-700 font-medium">
              {selectedEvent.description}
            </p>
          </div>
        </div>
      )}

      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-2">
          Event Futsal & Badminton
        </h2>
        <p className="text-base md:text-lg text-gray-700 font-medium">
          Ikuti berbagai event seru atau buat turnamenmu sendiri!
        </p>
      </div>

      <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => setSelectedEvent(event)}
            className="cursor-pointer relative overflow-hidden rounded-xl shadow-lg transform transition duration-300 hover:scale-105 group"
          >
            <Image
              src={event.image}
              alt={event.title}
              width={500}
              height={300}
              className="w-full h-64 object-cover group-hover:brightness-90"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white text-xl font-semibold mb-1">
                {event.title}
              </h3>
              <p className="text-white text-sm">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
