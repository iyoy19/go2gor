"use client";

import { motion } from "framer-motion";
import { MapPinIcon, TagIcon, ClockIcon } from "@heroicons/react/24/outline";
import { LapanganType } from "@/data/lapangan";

interface FieldDetailsProps {
  field: LapanganType;
}

export default function FieldDetails({ field }: FieldDetailsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      className="mt-6 p-6 rounded-lg shadow-md border bg-gray-50 border-gray-300"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-bold mb-3 text-neutral-800">{field.name}</h3>
      <img
        src={field.image}
        alt={field.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <p className="flex items-center gap-2 mb-2 text-neutral-800">
        <MapPinIcon className="w-5 h-5 text-blue-500" /> Lokasi: {field.venue}
      </p>
      <p className="flex items-center gap-2 mb-2 text-neutral-800">
        <TagIcon className="w-5 h-5 text-blue-500" /> Jenis Olahraga:{" "}
        {field.sport}
      </p>
      <p className="flex items-center gap-2 text-neutral-800">
        <ClockIcon className="w-5 h-5 text-blue-500" /> Harga:{" "}
        {formatPrice(field.price)} / jam
      </p>
    </motion.div>
  );
}
