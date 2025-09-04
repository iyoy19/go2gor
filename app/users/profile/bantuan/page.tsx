"use client";

import {
  Search,
  ChevronRight,
  HelpCircle,
  Book,
  MessageSquare,
  LifeBuoy,
  Phone,
  Mail,
  Video,
} from "lucide-react";

const faqs = [
  {
    question: "Bagaimana cara memesan lapangan?",
    answer:
      "Untuk memesan lapangan, Anda dapat mengikuti langkah berikut:\n1. Login ke akun Anda\n2. Pilih menu 'Booking'\n3. Pilih lapangan yang tersedia\n4. Pilih tanggal dan waktu\n5. Lakukan pembayaran",
  },
  {
    question: "Bagaimana cara membatalkan pesanan?",
    answer:
      "Pembatalan dapat dilakukan melalui menu 'Pesanan Saya' minimal 24 jam sebelum jadwal yang dipesan. Biaya pembatalan mungkin berlaku sesuai dengan kebijakan yang ada.",
  },
  {
    question: "Metode pembayaran apa saja yang tersedia?",
    answer:
      "Kami menerima berbagai metode pembayaran termasuk:\n- Transfer Bank\n- E-wallet (GoPay, OVO, DANA)\n- Kartu Kredit\n- Tunai di tempat",
  },
  {
    question: "Berapa lama waktu konfirmasi pembayaran?",
    answer:
      "Konfirmasi pembayaran biasanya membutuhkan waktu 5-15 menit untuk pembayaran digital dan 1-2 hari kerja untuk transfer bank manual.",
  },
];

const helpCategories = [
  {
    icon: Book,
    title: "Panduan Pengguna",
    description: "Pelajari cara menggunakan fitur-fitur aplikasi",
    items: ["Cara Booking", "Pembayaran", "Profil", "Tim"],
  },
  {
    icon: MessageSquare,
    title: "FAQ",
    description: "Pertanyaan yang sering ditanyakan",
    items: ["Booking", "Pembayaran", "Pembatalan", "Kebijakan"],
  },
  {
    icon: LifeBuoy,
    title: "Bantuan Langsung",
    description: "Hubungi tim support kami",
    items: ["Chat", "Email", "Telepon", "WhatsApp"],
  },
];

const supportChannels = [
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat dengan tim support kami",
    available: "24/7",
    action: "Mulai Chat",
  },
  {
    icon: Phone,
    title: "Telepon",
    description: "+62 812-3456-7890",
    available: "Senin - Jumat, 09:00 - 17:00",
    action: "Hubungi",
  },
  {
    icon: Mail,
    title: "Email",
    description: "support@go2gor.com",
    available: "Respon dalam 24 jam",
    action: "Kirim Email",
  },
  {
    icon: Video,
    title: "Video Call",
    description: "Konsultasi langsung via video",
    available: "Dengan Appointment",
    action: "Jadwalkan",
  },
];

export default function BantuanPage() {
  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Pusat Bantuan</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Temukan jawaban untuk pertanyaan Anda atau hubungi tim support kami
          untuk bantuan lebih lanjut.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari bantuan..."
            className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {helpCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className="w-full flex items-center justify-between p-2 text-left text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    <span>{item}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Support Channels */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Hubungi Kami
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {channel.title}
                </h3>
                <p className="text-gray-600 mb-2">{channel.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {channel.available}
                </p>
                <button className="w-full px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
                  {channel.action}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Pertanyaan Umum
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                {faq.question}
              </h3>
              <p className="text-gray-600 ml-8 whitespace-pre-line">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
