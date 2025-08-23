"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // contoh: hapus token dari localStorage
    localStorage.removeItem("token");
    // redirect ke halaman login
    router.push("/login");
  }, [router]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Logout...</h1>
      <p className="mt-2 text-gray-600">Sedang keluar dari akun Anda.</p>
    </div>
  );
}
