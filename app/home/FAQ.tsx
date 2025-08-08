"use client";

import { useState } from "react";
import { Accordion, AccordionItem } from "@heroui/react";

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
    <section
      className="py-16 bg-gradient-to-tr from-[#FFDEE9] via-[#B5FFFC] to-[#FEE140]"
      id="faq"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-10">FAQ</h2>

        {/* Mobile */}
        <div className="md:hidden space-y-4">
          {splitFaqs.map((faqsPart, idx) => {
            const isOpen = openIndexes.includes(idx);
            return (
              <div
                key={idx}
                className="rounded-lg outline outline-gray-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full text-left px-4 py-3 font-semibold bg-white flex justify-between items-center"
                  aria-expanded={isOpen}
                >
                  {columnTitles[idx] || `Bagian ${idx + 1}`}
                  <span
                    className={`transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <Accordion variant="light" className="space-y-3 p-4 bg-white">
                    {faqsPart.map(({ question, answer }, i) => (
                      <AccordionItem
                        key={i}
                        aria-label={question}
                        title={question}
                        className="light-0"
                      >
                        <p className="text-gray-600">{answer}</p>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-4 gap-8">
          {splitFaqs.map((faqsPart, idx) => (
            <div
              key={idx}
              className="rounded-lg outline outline-gray-300 p-6 bg-white"
            >
              <h3 className="text-xl font-semibold mb-6">
                {columnTitles[idx] || `Bagian ${idx + 1}`}
              </h3>
              <Accordion variant="light" className="space-y-4">
                {faqsPart.map(({ question, answer }, i) => (
                  <AccordionItem
                    key={i}
                    aria-label={question}
                    title={question}
                    className="light-0"
                  >
                    <p className="text-gray-600">{answer}</p>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
