"use client";

import { Player } from "@lottiefiles/react-lottie-player";

interface Props {
  src: string;
  className?: string;
}

export default function LottiePlayer({ src, className }: Props) {
  return <Player autoplay loop src={src} className={className} />;
}
