"use client";

import {
  Phone,
  Mail,
  MapPin,
  Globe,
  MessageSquare,
  Clock,
  Send,
} from "lucide-react";

type ContactInfo = {
  phone: string;
  email: string;
  address: string;
  website: string;
  operationalHours: string;
};

type SocialMedia = {
  name: string;
  username: string;
  url: string;
};

const contactInfo: ContactInfo = {
  phone: "+62 812-3456-7890",
  email: "info@go2gor.com",
  address: "Jl. Sport Center No. 123, Jakarta Selatan",
  website: "www.go2gor.com",
  operationalHours: "Senin - Minggu: 08:00 - 22:00",
};

const socialMedias: SocialMedia[] = [
  {
    name: "Instagram",
    username: "@go2gor",
    url: "https://instagram.com/go2gor",
  },
  {
    name: "Facebook",
    username: "GO2GOR Official",
    url: "https://facebook.com/go2gor",
  },
  {
    name: "Twitter",
    username: "@go2gor",
    url: "https://twitter.com/go2gor",
  },
  {
    name: "LinkedIn",
    username: "GO2GOR",
    url: "https://linkedin.com/company/go2gor",
  },
];

export default function KontakPage() {
  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Hubungi Kami</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Kami siap membantu Anda. Silahkan hubungi kami melalui berbagai
          channel yang tersedia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-6">Kirim Pesan</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Masukkan email"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subjek
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Masukkan subjek pesan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pesan
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Tulis pesan Anda"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Send className="w-4 h-4" />
              Kirim Pesan
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          {/* Contact Details */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-semibold mb-6">Informasi Kontak</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telepon</p>
                  <p className="text-gray-900">{contactInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{contactInfo.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Alamat</p>
                  <p className="text-gray-900">{contactInfo.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <p className="text-gray-900">{contactInfo.website}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Jam Operasional</p>
                  <p className="text-gray-900">
                    {contactInfo.operationalHours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-semibold mb-6">Media Sosial</h2>
            <div className="grid grid-cols-2 gap-4">
              {socialMedias.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50"
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{social.name}</p>
                    <p className="text-sm text-gray-500">{social.username}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
