"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function LoginPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Agar tidak render dulu sebelum theme ready (untuk menghindari mismatch SSR)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={clsx(
        "flex items-center justify-center flex-grow p-4 sm:p-6 lg:p-8 pt-24 sm:pt-28 lg:pt-20",
        "bg-gradient-to-b from-cyan-100 to-yellow-200",
        "dark:bg-gradient-to-b dark:from-gray-900 dark:to-black"
      )}
    >
      <div
        className={clsx(
          "w-full max-w-md rounded-3xl p-8 sm:p-10 shadow-2xl border transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl",
          theme === "dark"
            ? "bg-gray-800/80 backdrop-blur-xl border-gray-600/50 shadow-gray-900/50"
            : "bg-white/80 backdrop-blur-xl border-gray-200/50 shadow-gray-200/50"
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
            <Link
              href="/forgot-password"
              className={clsx(
                "transition duration-200 focus:outline-none focus:underline",
                theme === "dark"
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-indigo-600 hover:text-indigo-500"
              )}
            >
              Lupa Password?
            </Link>
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
