"use client";

import { Accordion, AccordionItem, Button } from "@heroui/react";
import { HelpCircle, Mail, Phone } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      {/* Header */}
      <div className="text-center mb-10 pt-12">
        <HelpCircle className="mx-auto h-12 w-12 text-teal-500" />
        <h1 className="text-3xl font-bold mt-2">Pusat Bantuan</h1>
        <p className="text-gray-500 mt-2">
          Temukan jawaban pertanyaan umum atau hubungi tim kami jika butuh
          bantuan.
        </p>
      </div>

      {/* FAQ */}
      <Accordion variant="splitted">
        <AccordionItem
          key="1"
          aria-label="Apa itu Go2Gor?"
          title="Apa itu Go2Gor?"
        >
          Go2Gor adalah platform penyewaan lapangan olahraga dan komunitas
          olahraga. Kamu bisa booking lapangan, lihat jadwal pertandingan, dan
          terhubung dengan komunitas.
        </AccordionItem>

        <AccordionItem
          key="2"
          aria-label="Bagaimana cara melakukan booking?"
          title="Bagaimana cara melakukan booking?"
        >
          Kamu bisa melakukan booking dengan masuk ke menu <b>Booking</b>, pilih
          lapangan, tanggal, dan waktu. Setelah itu konfirmasi pembayaran sesuai
          instruksi.
        </AccordionItem>

        <AccordionItem
          key="3"
          aria-label="Apakah bisa membatalkan booking?"
          title="Apakah bisa membatalkan booking?"
        >
          Ya, pembatalan bisa dilakukan maksimal 24 jam sebelum jadwal dimulai.
          Silakan cek di menu <b>Profil → Jadwal Saya</b>.
        </AccordionItem>

        <AccordionItem
          key="4"
          aria-label="Bagaimana cara bergabung dengan komunitas?"
          title="Bagaimana cara bergabung dengan komunitas?"
        >
          Buka menu <b>Komunitas</b>, lalu pilih forum atau event. Kamu juga
          bisa bergabung dengan tim olahraga melalui fitur <b>Team Match</b>.
        </AccordionItem>

        <AccordionItem
          key="5"
          aria-label="Apakah ada aplikasi mobile?"
          title="Apakah ada aplikasi mobile?"
        >
          Saat ini Go2Gor tersedia berbasis web, tapi versi aplikasi mobile
          sedang dalam tahap pengembangan.
        </AccordionItem>
      </Accordion>

      {/* Hubungi Kami */}
      <div className="mt-12 text-center">
        <p className="mb-4 text-gray-500">
          Tidak menemukan jawaban yang kamu cari?
        </p>
        <div className="flex justify-center gap-3">
          <Button
            size="lg"
            color="primary"
            radius="lg"
            startContent={<Mail className="h-5 w-5" />}
          >
            Email Kami
          </Button>
          <Button
            size="lg"
            variant="bordered"
            radius="lg"
            startContent={<Phone className="h-5 w-5" />}
          >
            Hubungi via Telepon
          </Button>
        </div>
      </div>
    </div>
  );
}
