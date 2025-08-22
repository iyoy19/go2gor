'use client';

import { fasilitas } from "@/data/fasilitas";
import { FasilitasCard } from "./FasilitasCard";

export const FasilitasList = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fasilitas.map((item, index) => (
            <FasilitasCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};
