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
          Butuh bantuan? Temukan jawaban pertanyaan umum di bawah atau hubungi
          tim kami.
        </p>
      </div>

      {/* FAQ */}
      <Accordion variant="splitted">
        {/* Akun */}
        <AccordionItem
          key="akun"
          aria-label="Akun & Registrasi"
          title="Akun & Registrasi"
        >
          <p>
            Untuk menggunakan Go2Gor, kamu perlu mendaftar menggunakan email
            atau akun Google. Setelah registrasi, semua fitur seperti booking
            dan komunitas bisa langsung digunakan.
          </p>
        </AccordionItem>

        {/* Booking */}
        <AccordionItem
          key="booking"
          aria-label="Booking Lapangan"
          title="Booking Lapangan"
        >
          <p>
            Masuk ke menu <b>Booking</b>, pilih lapangan, tanggal, dan waktu.
            Lanjutkan ke pembayaran untuk mengamankan slotmu.
          </p>
        </AccordionItem>

        <AccordionItem
          key="batal"
          aria-label="Pembatalan Booking"
          title="Pembatalan Booking"
        >
          <p>
            Pembatalan bisa dilakukan maksimal <b>24 jam</b> sebelum jadwal
            mulai. Buka <b>Profil → Jadwal Saya</b> untuk membatalkan.
          </p>
        </AccordionItem>

        {/* Komunitas */}
        <AccordionItem
          key="komunitas"
          aria-label="Komunitas & Event"
          title="Komunitas & Event"
        >
          <p>
            Masuk ke menu <b>Komunitas</b> untuk gabung forum, event olahraga,
            atau cari tim. Kamu juga bisa membuat tim baru lewat fitur{" "}
            <b>Team Match</b>.
          </p>
        </AccordionItem>

        {/* Lainnya */}
        <AccordionItem
          key="aplikasi"
          aria-label="Aplikasi Mobile"
          title="Aplikasi Mobile"
        >
          <p>
            Saat ini Go2Gor berbasis web. Aplikasi mobile sedang dalam tahap
            pengembangan dan segera hadir di Play Store & App Store.
          </p>
        </AccordionItem>
      </Accordion>

      {/* Hubungi Kami */}
      <div className="mt-12 text-center">
        <p className="mb-4 text-gray-500">
          Tidak menemukan jawaban yang kamu cari?
        </p>
        <div className="flex justify-center gap-3">
          <Button
            as="a"
            href="mailto:support@go2gor.com"
            size="lg"
            color="primary"
            radius="lg"
            startContent={<Mail className="h-5 w-5" />}
          >
            Email Kami
          </Button>
          <Button
            as="a"
            href="tel:+62123456789"
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
