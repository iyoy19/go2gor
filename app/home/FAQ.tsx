"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Bagaimana cara booking lapangan?",
    answer:
      "Pilih lapangan, jadwal, dan lakukan pembayaran melalui website kami.",
  },
  {
    question: "Apakah bisa membatalkan booking?",
    answer: "Ya, pembatalan bisa dilakukan maksimal 24 jam sebelum jadwal.",
  },
  {
    question: "Apakah saya bisa booking untuk grup atau tim?",
    answer:
      "Tentu saja! Anda bisa booking lapangan untuk grup dengan memilih slot yang tersedia sesuai jumlah pemain.",
  },
  {
    question: "Metode pembayaran apa saja yang diterima?",
    answer:
      "Kami menerima pembayaran melalui transfer bank, kartu kredit, dan e-wallet populer seperti OVO dan GoPay.",
  },
  {
    question: "Apakah ada biaya pembatalan?",
    answer:
      "Pembatalan yang dilakukan kurang dari 24 jam sebelum jadwal akan dikenakan biaya sesuai kebijakan.",
  },
  {
    question: "Berapa lama durasi booking lapangan?",
    answer:
      "Durasi booking standar adalah 1 jam, namun bisa disesuaikan sesuai kebutuhan dan ketersediaan.",
  },
  {
    question: "Apakah tersedia fasilitas parkir?",
    answer:
      "Ya, semua lokasi lapangan kami menyediakan fasilitas parkir yang aman dan luas.",
  },
  {
    question: "Apakah saya bisa booking lapangan untuk event besar?",
    answer:
      "Tentu, silakan hubungi customer service kami untuk pengaturan khusus event besar.",
  },
];

function splitArray<T>(arr: T[], parts: number): T[][] {
  const result: T[][] = [];
  const partSize = Math.ceil(arr.length / parts);
  for (let i = 0; i < parts; i++) {
    result.push(arr.slice(i * partSize, (i + 1) * partSize));
  }
  return result;
}

export default function FAQ() {
  const columns = 4;
  const splitFaqs = splitArray(faqs, columns);

  const columnTitles = [
    "Pertanyaan Umum",
    "Pembatalan & Booking",
    "Fasilitas & Layanan",
    "Event & Khusus",
  ];

  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleIndex = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section className="bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Pertanyaan Umum
          </h2>

          <p className="mt-4 text-gray-300">
            Berikut adalah beberapa pertanyaan yang sering diajukan tentang
            Go2Gor.
          </p>
        </div>

        <div className="flow-root mt-12">
          <div className="-my-8 divide-y divide-gray-700">
            <details className="py-8 group" open>
              <summary className="flex items-center justify-between cursor-pointer">
                <h3 className="text-lg font-medium text-white">
                  Bagaimana cara memesan lapangan di Go2Gor?
                </h3>

                <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </summary>

              <p className="mt-4 leading-relaxed text-gray-400">
                Anda dapat memesan lapangan dengan mudah melalui platform kami.
                Cari lapangan yang Anda inginkan, pilih jadwal yang tersedia,
                dan lakukan pembayaran secara online.
              </p>
            </details>

            <details className="py-8 group">
              <summary className="flex items-center justify-between cursor-pointer">
                <h3 className="text-lg font-medium text-white">
                  Apakah saya bisa membatalkan pesanan?
                </h3>

                <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </summary>

              <p className="mt-4 leading-relaxed text-gray-400">
                Kebijakan pembatalan bervariasi tergantung pada penyedia
                lapangan. Silakan periksa syarat dan ketentuan saat memesan.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
