"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPinIcon } from "@/components/icons/MapPinIcon";
import { PhoneIcon } from "@/components/icons/PhoneIcon";
import { MailIcon } from "@/components/icons/MailIcon";
import { FaWhatsapp, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

export default function KontakPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your form submission logic here
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      title: "Telepon & WhatsApp",
      details: [
        { label: "Telepon", value: "+62 123 4567 890" },
        { label: "WhatsApp", value: "+62 123 4567 890", isWhatsApp: true },
      ],
    },
    {
      icon: <MailIcon className="w-6 h-6" />,
      title: "Email",
      details: [{ label: "Email", value: "info@go2gor.com" }],
    },
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      title: "Alamat",
      details: [
        {
          label: "Lokasi",
          value:
            "Jl. Kebayoran Lama No.123, Jakarta Selatan, DKI Jakarta 12220",
        },
      ],
    },
  ];

  const operatingHours = [
    { day: "Senin - Jumat", hours: "08:00 - 22:00" },
    { day: "Sabtu", hours: "09:00 - 23:00" },
    { day: "Minggu", hours: "10:00 - 22:00" },
  ];

  const socialMedia = [
    {
      name: "Instagram",
      icon: <FaInstagram size={24} />,
      link: "https://instagram.com/go2gor",
      color: "hover:text-pink-600 hover:bg-pink-50",
    },
    {
      name: "Facebook",
      icon: <FaFacebook size={24} />,
      link: "https://facebook.com/go2gor",
      color: "hover:text-blue-600 hover:bg-blue-50",
    },
    {
      name: "TikTok",
      icon: <FaTiktok size={24} />,
      link: "https://tiktok.com/@go2gor",
      color: "hover:text-black hover:bg-gray-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column - Form */}
          <div>
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-100 hover:shadow-3xl transition-all duration-300">
              <h2 className="text-3xl font-extrabold text-green-700 mb-8 tracking-tight">
                Form Kontak Online
              </h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-base font-medium text-gray-700 mb-1"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="Masukkan nama lengkap"
                    className="mt-1 block w-full rounded-xl border border-gray-200 px-5 py-3 text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-base font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="contoh@email.com"
                    className="mt-1 block w-full rounded-xl border border-gray-200 px-5 py-3 text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-base font-medium text-gray-700 mb-1"
                  >
                    Pesan
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    required
                    placeholder="Tulis pesan Anda di sini..."
                    className="mt-1 block w-full rounded-xl border border-gray-200 px-5 py-3 text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full rounded-xl px-6 py-4 text-base font-semibold text-white shadow-md transition-all duration-300 tracking-wide
                    ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"}`}
                >
                  {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-10">
            {/* Contact Info Cards */}
            {contactInfo.map((info) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl p-7 sm:p-9 hover:shadow-2xl border border-gray-100 transition-all duration-300 group"
              >
                <div className="flex items-center gap-5 mb-5">
                  <div className="rounded-full bg-green-100/80 p-4 text-green-600 shadow-sm group-hover:bg-green-200/80 group-hover:text-green-700 transition-all duration-300">
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {info.title}
                  </h3>
                </div>
                <div className="space-y-1">
                  {info.details.map((detail, index) => (
                    <p key={index} className="text-gray-600 text-base">
                      {detail.isWhatsApp ? (
                        <a
                          href={`https://wa.me/${detail.value.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                        >
                          <FaWhatsapp className="w-5 h-5" />
                          {detail.value}
                        </a>
                      ) : (
                        detail.value
                      )}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Operating Hours Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-7 sm:p-9 hover:shadow-2xl border border-gray-100 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-5">
                Jam Operasional
              </h3>
              <div className="space-y-2">
                {operatingHours.map((schedule) => (
                  <div
                    key={schedule.day}
                    className="flex justify-between items-center text-base"
                  >
                    <span className="text-gray-600">{schedule.day}</span>
                    <span className="text-gray-900 font-medium">
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Media Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-7 sm:p-9 hover:shadow-2xl border border-gray-100 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-5">
                Media Sosial
              </h3>
              <div className="flex gap-5">
                {socialMedia.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100/80 text-gray-700 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md ${social.color}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all duration-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2904059689647!2d106.78237731476884!3d-6.224196395493599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14d30079f01%3A0x2e74f2341fff266d!2sKebayoran%20Lama%2C%20Jakarta%20Selatan%2C%20Jakarta!5e0!3m2!1sid!2sid!4v1628825722793!5m2!1sid!2sid"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title="Google Maps Location"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
