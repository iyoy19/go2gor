"use client";

import { FC, useState, useEffect } from "react";
import { Switch, SwitchProps } from "@nextui-org/react";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { FaSun, FaMoon } from "react-icons/fa"; // New import

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Pastikan komponen sudah mount agar theme sudah valid (hindari SSR mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      aria-label="Toggle theme"
      isSelected={theme === "dark"}
      onValueChange={(selected) => setTheme(selected ? "dark" : "light")}
      size="lg"
      // Removed color="primary" to prevent yellow color
      thumbIcon={({ isSelected, className: thumbClassName }) =>
        isSelected ? (
          <FaMoon className={clsx(thumbClassName, "text-white w-6 h-6")} /> // Changed to FaMoon
        ) : (
          <FaSun className={clsx(thumbClassName, "text-black w-6 h-6")} /> // Changed to FaSun
        )
      }
      classNames={{
        base: clsx("w-10 h-10 p-0 bg-transparent", className, classNames?.base),
        wrapper: clsx(
          "w-full h-full rounded-full border border-current backdrop-blur-sm",
          theme === "light"
            ? "bg-white/10 border-gray-300"
            : "bg-black/20 border-gray-600",
          "focus:outline-none focus:ring-0",
          classNames?.wrapper
        ),
        thumb: clsx(
          "w-9 h-9 flex items-center justify-center rounded-full", // Adjusted thumb size and ensured rounded-full
          theme === "light" ? "bg-white" : "bg-gray-700",
          "shadow-lg",
          classNames?.thumb
        ),
        startContent: "hidden",
        endContent: "hidden",
      }}
    />
  );
};
