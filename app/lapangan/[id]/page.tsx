"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiTag,
  FiDollarSign,
  FiCheckCircle,
  FiCalendar,
  FiArrowRight,
} from "react-icons/fi";
import { FaFutbol } from "react-icons/fa";
import { GiWhistle } from "react-icons/gi";
import Link from "next/link";
import { Button } from "@nextui-org/react";

import { dummyFields } from "@/data/lapangan";

export default function LapanganDetailPage() {
  const params = useParams();
  const fieldId = params.id;

  const field = useMemo(() => {
    // Ensure fieldId is a string, handling cases where it might be an array or undefined
    let idToParse: string | undefined;
    if (Array.isArray(fieldId)) {
      idToParse = fieldId[0]; // Take the first element if it's an array
    } else if (typeof fieldId === "string") {
      idToParse = fieldId;
    }

    // In a real app, you'd fetch this data. Here we find it from the dummy array.
    // The ID could be a slug or a number. We'll handle both.
    return dummyFields.find(
      (f) =>
        (idToParse && f.id === parseInt(idToParse, 10)) || // Use idToParse here
        (idToParse && f.name.toLowerCase().replace(/ /g, "-") === idToParse) // Use idToParse here
    );
  }, [fieldId]);

  if (!field) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white pt-28 pb-16">
        <h1 className="text-4xl font-bold">Lapangan Tidak Ditemukan</h1>
        <p className="text-gray-400 mt-4">
          Maaf, kami tidak dapat menemukan detail untuk lapangan ini.
        </p>
        <Link href="/lapangan" className="mt-8">
          <Button color="primary" variant="ghost">
            Kembali ke Daftar Lapangan
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-900 pt-24 pb-16 font-poppins">
      {/* Hero Image Section */}
      <motion.div
        className="relative w-full h-[50vh] md:h-[60vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={field.image}
          alt={`Gambar ${field.name}`}
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-12">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {field.name}
          </motion.h1>
          <motion.p
            className="mt-2 text-lg md:text-xl text-gray-300 flex items-center gap-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <FiMapPin /> {field.venue}
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Detail Lapangan
            </h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              {field.description}
            </p>

            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Fasilitas Unggulan
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
              {field.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <FiCheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Galeri Foto
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {field.gallery.map((imgSrc, index) => (
                <motion.div
                  key={index}
                  className="relative h-40 rounded-lg overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={imgSrc}
                    alt={`Galeri ${field.name} ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Booking Card */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="sticky top-28 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-indigo-600">Mulai dari</p>
                  <p className="text-3xl font-bold text-gray-900">
                    Rp {field.price.toLocaleString("id-ID")}
                    <span className="text-base font-normal text-indigo-700">
                      /jam
                    </span>
                  </p>
                </div>
                <div className="bg-indigo-500 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center gap-2 shadow-md">
                  {field.sport === "Futsal" ? <FaFutbol /> : <GiWhistle />}
                  <span>{field.sport}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Harga dapat bervariasi tergantung waktu dan hari.
              </p>
              <Link
                href={`/lapangan/${field.id}/booking`}
                className="block w-full"
              >
                <Button
                  color="primary"
                  fullWidth
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white font-bold text-lg shadow-lg border-0"
                  endContent={<FiArrowRight />}
                >
                  Lihat Jadwal & Booking
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
