"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, AlertTriangle, Loader2 } from "lucide-react";

export default function LogoutPage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Hapus token dari localStorage
    localStorage.removeItem("token");
    // Redirect ke halaman login dengan delay untuk animasi
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          {isLoggingOut ? (
            <>
              <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Sedang Keluar...
              </h1>
              <p className="text-gray-600">
                Mohon tunggu sebentar, Anda akan diarahkan ke halaman login.
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                <LogOut className="w-8 h-8 text-red-600" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Keluar dari Akun
              </h1>
              <p className="text-gray-600 mb-8">
                Apakah Anda yakin ingin keluar dari akun Anda?
              </p>

              {/* Warning */}
              <div className="bg-amber-50 rounded-lg p-4 flex items-start gap-3 mb-8">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 text-left">
                  Mengeluarkan akun akan mengakhiri sesi Anda. Anda perlu login
                  kembali untuk mengakses akun Anda.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                  onClick={() => window.history.back()}
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="flex-1 px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                  onClick={handleLogout}
                >
                  Keluar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
