"use client";
import { Card, CardHeader, CardFooter, Image, Button } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Swiper as SwiperClass } from "swiper/types";

const lapanganData = [
  {
    id: "futsal-1",
    type: "Futsal",
    name: "Lapangan 1",
    img: "https://heroui.com/images/card-example-6.jpeg",
    price: "Rp 120.000/jam",
    rating: "4.8",
  },
  {
    id: "futsal-2",
    type: "Futsal",
    name: "Lapangan 2",
    img: "https://heroui.com/images/card-example-6.jpeg",
    price: "Rp 120.000/jam",
    rating: "4.9",
  },
  {
    id: "badminton-1",
    type: "Badminton",
    name: "Lapangan 1",
    img: "https://heroui.com/images/card-example-6.jpeg",
    price: "Rp 75.000/jam",
    rating: "4.7",
  },
  {
    id: "badminton-2",
    type: "Badminton",
    name: "Lapangan 2",
    img: "https://heroui.com/images/card-example-6.jpeg",
    price: "Rp 75.000/jam",
    rating: "4.6",
  },
  {
    id: "futsal-3",
    type: "Futsal",
    name: "Lapangan 3",
    img: "https://heroui.com/images/card-example-6.jpeg",
    price: "Rp 150.000/jam",
    rating: "5.0",
  },
];

export default function LapanganSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const selectedLapangan = selectedId
    ? lapanganData.find((l) => l.id === selectedId)
    : null;

  useEffect(() => {
    if (swiper) {
      if (selectedId) {
        swiper.autoplay.stop();
      } else {
        swiper.autoplay.start();
      }
    }
  }, [selectedId, swiper]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full py-12"
    >
      <div className="text-left px-4">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
          Daftar Lapangan
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Temukan dan booking lapangan futsal atau badminton favoritmu dengan
          mudah.
        </p>
      </div>

      <Swiper
        onSwiper={setSwiper}
        spaceBetween={20}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        centeredSlides={true}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2.5, spaceBetween: 15 },
          1024: { slidesPerView: 4.5, spaceBetween: 20 },
        }}
        className="w-full -mx-8 px-4" // Extend Swiper to edges
      >
        {lapanganData.map((lapangan) => (
          <SwiperSlide key={lapangan.id}>
            <motion.div
              onClick={() => setSelectedId(lapangan.id)}
              className="cursor-pointer rounded-lg overflow-visible shadow-2xl hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] transition-shadow duration-300" // Removed px-8
              whileHover={{ scale: 1.05 }}
              transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
            >
              <Card isFooterBlurred className="w-full h-[300px]">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                  <p className="text-tiny text-white/60 uppercase font-bold">
                    {lapangan.type}
                  </p>
                  <h4 className="text-black font-medium text-2xl">
                    {lapangan.name}
                  </h4>
                </CardHeader>
                <Image
                  removeWrapper
                  alt="Card example background"
                  className="z-0 w-full h-full scale-125 -translate-y-6 object-cover drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
                  src={lapangan.img}
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between backdrop-blur-md">
                  <div>
                    <p className="text-black font-semibold text-sm">
                      {lapangan.price}
                    </p>
                    <p className="text-yellow-500 text-xs">
                      ★ {lapangan.rating}
                    </p>
                  </div>
                  <Button
                    className="text-tiny"
                    color="primary"
                    radius="full"
                    size="sm"
                  >
                    Booking
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <AnimatePresence>
        {selectedId && selectedLapangan && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              className="rounded-lg max-w-xl w-full mx-4 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Card isFooterBlurred className="w-full h-[400px]">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                  <p className="text-tiny text-white/60 uppercase font-bold">
                    {selectedLapangan.type}
                  </p>
                  <h4 className="text-black font-medium text-2xl">
                    {selectedLapangan.name}
                  </h4>
                </CardHeader>
                <Image
                  removeWrapper
                  alt="Card example background"
                  className="z-0 w-full h-full object-cover drop-shadow-[0_25px_50px_rgba(0,0,0,0.35)]"
                  src={selectedLapangan.img}
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between backdrop-blur-md">
                  <div>
                    <p className="text-black font-semibold text-sm">
                      {selectedLapangan.price}
                    </p>
                    <p className="text-yellow-500 text-xs">
                      ★ {selectedLapangan.rating}
                    </p>
                  </div>
                  <Button
                    className="text-tiny"
                    color="primary"
                    radius="full"
                    size="sm"
                  >
                    Booking
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}