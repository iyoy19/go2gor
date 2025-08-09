"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Textarea,
  Button,
  Link,
  Divider,
} from "@nextui-org/react";
import { title } from "@/components/primitives";
import { MailIcon } from "@/components/icons/MailIcon";
import { PhoneIcon } from "@/components/icons/PhoneIcon";
import { MapPinIcon } from "@/components/icons/MapPinIcon";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-blue-950 p-4 sm:p-6 lg:p-8 text-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Main Heading */}
        <h1
          className={title({
            class:
              "text-center mb-12 text-white text-5xl md:text-6xl drop-shadow-lg font-extrabold",
          })}
        >
          Hubungi Kami
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information Section */}
          <div className="flex flex-col space-y-10 max-w-md">
            <Card className="p-8 bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-600 transform transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="p-6 flex-col items-start">
                <h2 className="text-3xl font-semibold text-white mb-3">
                  Informasi Kontak
                </h2>
                <p className="text-base text-gray-300 leading-relaxed">
                  Kami senang mendengar dari Anda!
                </p>
              </CardHeader>
              <CardBody className="overflow-visible py-6">
                <div className="flex items-center space-x-4 mb-7 text-gray-200">
                  <MailIcon className="text-blue-400 w-6 h-6 flex-shrink-0" />
                  <p className="text-lg">info@go2gor.com</p>
                </div>
                <div className="flex items-center space-x-4 mb-7 text-gray-200">
                  <PhoneIcon className="text-blue-400 w-6 h-6 flex-shrink-0" />
                  <p className="text-lg">+1 (234) 567-890</p>
                </div>
                <div className="flex items-center space-x-4 mb-7 text-gray-200">
                  <MapPinIcon className="text-blue-400 w-6 h-6 flex-shrink-0" />
                  <p className="text-lg">
                    123 Futsal Street, Sport City, 12345
                  </p>
                </div>
                <Divider className="my-8 bg-gray-600" />
                <h3 className="text-2xl font-semibold text-white mb-5">
                  Ikuti Kami
                </h3>
                <div className="flex space-x-8 text-lg">
                  <Link
                    href="#"
                    isExternal
                    className="text-blue-400 hover:text-blue-300 transition duration-200"
                  >
                    Facebook
                  </Link>
                  <Link
                    href="#"
                    isExternal
                    className="text-blue-400 hover:text-blue-300 transition duration-200"
                  >
                    Twitter
                  </Link>
                  <Link
                    href="#"
                    isExternal
                    className="text-blue-400 hover:text-blue-300 transition duration-200"
                  >
                    Instagram
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Contact Form Section */}
          <div className="flex flex-col space-y-10 max-w-md">
            <Card className="p-8 bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-600 transform transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="p-6 flex-col items-start">
                <h2 className="text-3xl font-semibold text-white mb-3">
                  Kirim Pesan kepada Kami
                </h2>
                <p className="text-base text-gray-300 leading-relaxed">
                  Isi formulir di bawah ini dan kami akan segera menghubungi
                  Anda.
                </p>
              </CardHeader>
              <CardBody className="overflow-visible py-6">
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-gray-300 font-semibold"
                    >
                      Nama
                    </label>
                    <Input
                      id="name"
                      isRequired
                      type="text"
                      placeholder="Masukkan nama Anda"
                      variant="bordered"
                      classNames={{
                        inputWrapper:
                          "bg-gray-700 border-gray-600 group-data-[focus=true]:border-blue-500 rounded-lg",
                        input: "placeholder:text-gray-400 text-white",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-gray-300 font-semibold"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      isRequired
                      type="email"
                      placeholder="Masukkan email Anda"
                      variant="bordered"
                      classNames={{
                        inputWrapper:
                          "bg-gray-700 border-gray-600 group-data-[focus=true]:border-blue-500 rounded-lg",
                        input: "placeholder:text-gray-400 text-white",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block mb-2 text-gray-300 font-semibold"
                    >
                      Subjek
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Masukkan subjek"
                      variant="bordered"
                      classNames={{
                        inputWrapper:
                          "bg-gray-700 border-gray-600 group-data-[focus=true]:border-blue-500 rounded-lg",
                        input: "placeholder:text-gray-400 text-white",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-2 text-gray-300 font-semibold"
                    >
                      Pesan
                    </label>
                    <Textarea
                      id="message"
                      isRequired
                      placeholder="Masukkan pesan Anda"
                      variant="bordered"
                      classNames={{
                        inputWrapper:
                          "bg-gray-700 border-gray-600 group-data-[focus=true]:border-blue-500 rounded-lg",
                        input: "placeholder:text-gray-400 text-white",
                      }}
                    />
                  </div>

                  <Button
                    color="primary"
                    type="submit"
                    className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow-lg transform transition duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Kirim Pesan
                  </Button>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
