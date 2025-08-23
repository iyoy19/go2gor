"use client";

import { Card, CardBody, Button } from "@heroui/react";
import { Users, Target, HeartHandshake } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
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

      {/* Visi & Misi */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card shadow="sm" className="rounded-2xl">
          <CardBody className="flex flex-col items-center text-center p-6">
            <Target className="h-10 w-10 text-teal-500 mb-3" />
            <h3 className="text-lg font-semibold">Visi</h3>
            <p className="text-gray-500 mt-2">
              Menjadi platform olahraga terdepan yang menghubungkan fasilitas,
              pemain, dan komunitas.
            </p>
          </CardBody>
        </Card>

        <Card shadow="sm" className="rounded-2xl">
          <CardBody className="flex flex-col items-center text-center p-6">
            <Users className="h-10 w-10 text-purple-500 mb-3" />
            <h3 className="text-lg font-semibold">Misi</h3>
            <p className="text-gray-500 mt-2">
              Mempermudah booking lapangan, meningkatkan aksesibilitas olahraga,
              dan membangun ekosistem komunitas yang sehat.
            </p>
          </CardBody>
        </Card>

        <Card shadow="sm" className="rounded-2xl">
          <CardBody className="flex flex-col items-center text-center p-6">
            <HeartHandshake className="h-10 w-10 text-pink-500 mb-3" />
            <h3 className="text-lg font-semibold">Komitmen</h3>
            <p className="text-gray-500 mt-2">
              Memberikan layanan yang transparan, mudah digunakan, dan mendukung
              gaya hidup aktif.
            </p>
          </CardBody>
        </Card>
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">Ingin tahu lebih banyak?</h2>
        <p className="text-gray-500 mb-6">
          Bergabunglah dengan komunitas kami dan temukan pengalaman olahraga
          terbaik.
        </p>
        <Button size="lg" color="primary" radius="lg">
          Hubungi Kami
        </Button>
      </div>
    </div>
  );
}
