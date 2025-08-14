"use client";
import { Card, CardHeader, CardFooter, Image, Button } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lapanganData = [
  {
    id: "futsal-1",
    type: "Futsal",
    name: "Lapangan 1",
    img: "https://heroui.com/images/card-example-6.jpeg",
  },
  {
    id: "futsal-2",
    type: "Futsal",
    name: "Lapangan 2",
    img: "https://heroui.com/images/card-example-6.jpeg",
  },
  {
    id: "badminton-1",
    type: "Badminton",
    name: "Lapangan 1",
    img: "https://heroui.com/images/card-example-6.jpeg",
  },
  {
    id: "badminton-2",
    type: "Badminton",
    name: "Lapangan 2",
    img: "https://heroui.com/images/card-example-6.jpeg",
  },
  {
    id: "futsal-3",
    type: "Futsal",
    name: "Lapangan 3",
    img: "https://heroui.com/images/card-example-6.jpeg",
  },
];

export default function LapanganSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedLapangan = selectedId
    ? lapanganData.find((l) => l.id === selectedId)
    : null;

  return (
    <div className="w-full px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-4">Daftar Lapangan</h2>

      <Swiper
        spaceBetween={20}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        breakpoints={{
          0: { slidesPerView: 1 }, // Mobile
          640: { slidesPerView: 2 }, // Tablet
          1024: { slidesPerView: 4 }, // Desktop
        }}
      >
        {lapanganData.map((lapangan) => (
          <SwiperSlide key={lapangan.id}>
            <motion.div
              layoutId={lapangan.id}
              onClick={() => setSelectedId(lapangan.id)}
              className="cursor-pointer rounded-lg overflow-visible shadow-2xl hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] transition-shadow duration-300"
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
                    <p className="text-black text-tiny">desc1</p>
                    <p className="text-black text-tiny">desc2</p>
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
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={selectedId}
              className="rounded-lg max-w-xl w-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
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
                    <p className="text-black text-tiny">desc1</p>
                    <p className="text-black text-tiny">desc2</p>
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
    </div>
  );
}
