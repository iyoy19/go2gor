"use client";
import { Card, CardHeader, CardFooter, Image } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function App() {
  const cards = [
    {
      id: "1",
      title: "Event 1",
      type: "Event",
      img: "https://heroui.com/images/card-example-4.jpeg",
    },
    {
      id: "2",
      title: "Event 2",
      type: "Event",
      img: "https://heroui.com/images/card-example-3.jpeg",
    },
    {
      id: "3",
      title: "Tournament 1",
      type: "Tournament",
      img: "https://heroui.com/images/card-example-2.jpeg",
    },
    {
      id: "4",
      title: "Event 3",
      type: "Event",
      img: "https://heroui.com/images/card-example-4.jpeg",
    },
    {
      id: "5",
      title: "Tournament 2",
      type: "Tournament",
      img: "https://heroui.com/images/card-example-2.jpeg",
    },
  ];

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedCard = selectedId
    ? cards.find((c) => c.id === selectedId)
    : null;

  return (
    <motion.div
      className="text-center py-2"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Judul */}
      <h2 className="text-3xl pt-8 sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 text-gray-900 leading-snug drop-shadow-lg">
        Event{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600">
          Seru Bareng
        </span>{" "}
        Komunitas!
      </h2>

      {/* Deskripsi */}
      <p className="text-base sm:text-lg md:text-xl text-gray-900 dark:text-gray-100 mb-4 leading-relaxed font-sans">
        Event bukan cuma soal{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 font-semibold">
          menang-kalah
        </span>
        , tapi juga tempat{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 font-semibold">
          ketemu temen baru
        </span>
        , nambah{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 font-semibold">
          relasi
        </span>
        , dan pastinya bikin{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 font-semibold">
          momen tak terlupakan
        </span>
        . Siapin raket, sepatu, dan energi terbaikmu!
      </p>

      {/* Swiper */}
      <Swiper
        spaceBetween={20}
        freeMode={true}
        speed={600}
        autoplay={
          selectedId
            ? false
            : {
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        loop={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        centeredSlides={false}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2.5, spaceBetween: 15 },
          1024: { slidesPerView: 3.5, spaceBetween: 20 },
        }}
        className="w-full"
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <motion.div
              layoutId={card.id}
              style={{ willChange: "transform" }}
              className="h-[300px] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
              onClick={() => setSelectedId(card.id)}
            >
              <Card className="w-full h-full rounded-lg overflow-hidden">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                  <p className="text-tiny text-white/60 uppercase font-bold">
                    {card.type}
                  </p>
                  <h4 className="text-white font-medium text-large">
                    {card.title}
                  </h4>
                </CardHeader>
                <Image
                  removeWrapper
                  alt={card.title}
                  className="z-0 w-full h-full object-cover rounded-lg drop-shadow-md"
                  src={card.img}
                />
              </Card>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal */}
      <AnimatePresence>
        {selectedId && selectedCard && (
          <>
            {/* Backdrop → cuma animasi opacity */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => setSelectedId(null)}
            />

            {/* Box → animasi scale + opacity */}
            <motion.div
              role="dialog"
              aria-modal="true"
              style={{ willChange: "opacity, transform" }}
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1], // smooth easeOutQuint
              }}
              onClick={() => setSelectedId(null)}
            >
              <div
                className="relative rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto mx-4 shadow-2xl bg-white/5"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Tombol close */}
                <button
                  className="absolute top-2 right-2 text-white bg-black/40 rounded-full p-2 hover:bg-black/60 z-20"
                  onClick={() => setSelectedId(null)}
                >
                  ✕
                </button>

                <Card className="w-full h-[400px] rounded-lg overflow-hidden">
                  <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">
                      {selectedCard.type}
                    </p>
                    <h4 className="text-white font-medium text-2xl">
                      {selectedCard.title}
                    </h4>
                  </CardHeader>
                  <Image
                    removeWrapper
                    alt={selectedCard.title}
                    className="z-0 w-full h-full object-cover rounded-lg drop-shadow-md"
                    src={selectedCard.img}
                  />
                  <CardFooter className="absolute bg-white/10 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between backdrop-blur-sm">
                    <div>
                      <p className="text-white text-tiny">desc1</p>
                      <p className="text-white text-tiny">desc2</p>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
