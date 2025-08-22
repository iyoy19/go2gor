"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardFooter, Tabs, Tab, Button } from "@heroui/react";

// Dummy data generator
const categories = ["All", "Futsal", "Badminton", "Basket", "Volley"];
const generateItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Lapangan ${i + 1}`,
    category: categories[(i % (categories.length - 1)) + 1],
    price: Math.floor(Math.random() * 200_000 + 50_000),
  }));

export default function GalleryPage() {
  const [items, setItems] = useState(generateItems(12));
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12);

  // Filter berdasarkan kategori
  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return items.slice(0, visibleCount);
    return items
      .filter((item) => item.category === selectedCategory)
      .slice(0, visibleCount);
  }, [selectedCategory, items, visibleCount]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setVisibleCount((prev) => prev + 6);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="min-h-screen py-12 px-4 md:px-12 bg-gradient-to-b from-purple-50 to-white">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
          📸{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600">
            Gallery
          </span>{" "}
          Lapangan Favorit
        </h1>
        <p className="text-gray-600 md:text-lg">
          Temukan lapangan favoritmu, scroll terus tanpa henti!
        </p>
      </motion.div>

      {/* Kategori Tabs */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="mb-6 flex justify-start"
      >
        <Tabs
          selectedKey={selectedCategory}
          onSelectionChange={(key) => setSelectedCategory(key.toString())}
          radius="full"
          variant="bordered"
          size="sm"
          classNames={{
            tabList:
              "flex gap-2 bg-white/70 backdrop-blur-xl p-1 rounded-full shadow",
            tab: "px-3 py-1 text-sm font-medium text-gray-600 data-[selected=true]:text-white",
            cursor:
              "bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 rounded-full",
          }}
        >
          {categories.map((cat) => (
            <Tab key={cat} title={cat} />
          ))}
        </Tabs>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
          >
            <Card
              isFooterBlurred
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <CardHeader className="absolute z-10 top-2 left-2 text-left text-white drop-shadow-md">
                <p className="text-xs uppercase font-semibold">
                  {item.category}
                </p>
                <h4 className="font-bold text-base md:text-lg">{item.title}</h4>
              </CardHeader>

              <img
                src={`https://picsum.photos/seed/${item.id}/600/400`}
                alt={item.title}
                className="w-full h-48 object-cover select-none"
              />
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
