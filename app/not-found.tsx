"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import NotFoundAnimation from "@/public/animations/404.json";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full flex items-center justify-center">
      <Lottie
        animationData={NotFoundAnimation}
        className="w-[500px] h-[500px]"
        loop
      />
    </div>
  );
}
