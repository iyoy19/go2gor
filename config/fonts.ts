import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";
import { Rubik_Dirt } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const rubikDirt = Rubik_Dirt({
  subsets: ["latin"],
  weight: "400", // hanya satu berat tersedia di Rubik Dirt
  display: "swap",
});
