"use client";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4 text-center space-y-4">
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#" className="hover:underline">
            Syarat & Ketentuan
          </a>
          <a href="#" className="hover:underline">
            Kebijakan Privasi
          </a>
          <a href="#" className="hover:underline">
            Kontak
          </a>
        </div>
        <div className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} GoGor. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
