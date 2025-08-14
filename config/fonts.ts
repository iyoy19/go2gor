import {
  Fira_Code as FontMono,
  Poppins as FontSans,
  Rubik_Dirt,
} from "next/font/google";

export const fontPoppins = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
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
