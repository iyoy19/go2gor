"use client";

import { Card, CardBody, Button } from "@heroui/react";
import { Users, Target, HeartHandshake, Clock, Trophy } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      {/* Header */}
      <div className="text-center mb-12 pt-12">
        <h1 className="text-4xl font-bold">Tentang Kami</h1>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Go2Gor hadir untuk memudahkan akses penyewaan lapangan olahraga dan
          membangun komunitas olahraga yang lebih solid. Kami percaya olahraga
          bukan hanya aktivitas, tapi juga cara untuk mempererat hubungan
          sosial.
        </p>
      </div>

      {/* Visi, Misi, Komitmen */}
      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <Card shadow="sm" className="rounded-2xl h-full">
          <CardBody className="flex flex-col items-center text-center justify-between p-6">
            <Target className="h-12 w-12 text-teal-500 mb-4" />
            <h3 className="text-lg font-semibold">Visi</h3>
            <p className="text-gray-500 mt-2">
              Menjadi platform olahraga terdepan yang menghubungkan fasilitas,
              pemain, dan komunitas.
            </p>
          </CardBody>
        </Card>

        <Card shadow="sm" className="rounded-2xl h-full">
          <CardBody className="flex flex-col items-center text-center justify-between p-6">
            <Users className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold">Misi</h3>
            <p className="text-gray-500 mt-2">
              Mempermudah booking lapangan, meningkatkan aksesibilitas olahraga,
              dan membangun ekosistem komunitas yang sehat.
            </p>
          </CardBody>
        </Card>

        <Card shadow="sm" className="rounded-2xl h-full">
          <CardBody className="flex flex-col items-center text-center justify-between p-6">
            <HeartHandshake className="h-12 w-12 text-pink-500 mb-4" />
            <h3 className="text-lg font-semibold">Komitmen</h3>
            <p className="text-gray-500 mt-2">
              Memberikan layanan yang transparan, mudah digunakan, dan mendukung
              gaya hidup aktif.
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Nilai Inti */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card shadow="sm" className="rounded-2xl h-full">
          <CardBody className="flex items-center md:items-start gap-4 p-6">
            <Clock className="h-10 w-10 text-indigo-500 shrink-0" />
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold">Cepat & Efisien</h3>
              <p className="text-gray-500 mt-1">
                Kami menghargai waktu pengguna dengan sistem booking yang
                praktis dan proses instan.
              </p>
            </div>
          </CardBody>
        </Card>

        <Card shadow="sm" className="rounded-2xl h-full">
          <CardBody className="flex items-center md:items-start gap-4 p-6">
            <Trophy className="h-10 w-10 text-amber-500 shrink-0" />
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold">Komunitas & Prestasi</h3>
              <p className="text-gray-500 mt-1">
                Go2Gor mendorong terciptanya komunitas aktif sekaligus mendukung
                lahirnya prestasi olahraga lokal.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">Bergabung dengan Go2Gor</h2>
        <p className="text-gray-500 mb-6 max-w-xl mx-auto">
          Mari jadi bagian dari komunitas olahraga modern dan nikmati kemudahan
          booking lapangan terbaik di sekitarmu.
        </p>
        <Button size="lg" color="primary" radius="lg">
          Mulai Sekarang
        </Button>
      </div>
    </div>
  );
}
