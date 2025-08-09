"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { useTheme } from "next-themes";

import { ThemeSwitch } from "@/components/theme-switch"; // sesuaikan path import

export default function LoginPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Agar tidak render dulu sebelum theme ready (untuk menghindari mismatch SSR)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center flex-grow p-4 sm:p-6 lg:p-8">
      <div
        className={clsx(
          "w-full max-w-md rounded-2xl p-8 sm:p-10 shadow-2xl border transform transition-all duration-300 hover:scale-[1.01]",
          theme === "dark"
            ? "bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg border-gray-700"
            : "bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg border-gray-300"
        )}
      >
        <h1
          className={clsx(
            "text-4xl font-extrabold mb-6 text-center tracking-tight",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}
        >
          Selamat Datang Kembali
        </h1>

        <p
          className={clsx(
            "text-center mb-8",
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          )}
        >
          Masuk untuk melanjutkan ke akun Anda.
        </p>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              htmlFor="email"
              className={clsx(
                "block text-sm font-medium mb-2",
                theme === "dark" ? "text-gray-300" : "text-gray-900"
              )}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Masukkan email Anda"
              className={clsx(
                "w-full px-5 py-3 rounded-lg border placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition duration-200",
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-500"
              )}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className={clsx(
                "block text-sm font-medium mb-2",
                theme === "dark" ? "text-gray-300" : "text-gray-900"
              )}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Masukkan password Anda"
              className={clsx(
                "w-full px-5 py-3 rounded-lg border placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition duration-200",
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-500"
              )}
              required
            />
          </div>

          <div className="flex justify-end text-sm">
            <a
              href="#"
              className={clsx(
                "transition duration-200",
                theme === "dark"
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-indigo-600 hover:text-indigo-500"
              )}
            >
              Lupa Password?
            </a>
          </div>

          <button
            type="submit"
            className={clsx(
              "w-full py-3 rounded-lg font-bold text-lg shadow-lg transform transition duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50",
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
                : "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500"
            )}
          >
            Masuk
          </button>
        </form>

        <p
          className={clsx(
            "mt-8 text-center text-sm",
            theme === "dark" ? "text-gray-400" : "text-gray-700"
          )}
        >
          Belum punya akun?{" "}
          <a
            href="/register"
            className={clsx(
              "underline transition duration-200",
              theme === "dark"
                ? "text-blue-400 hover:text-blue-300"
                : "text-indigo-600 hover:text-indigo-500"
            )}
          >
            Daftar Sekarang
          </a>
        </p>
      </div>
    </div>
  );
}
