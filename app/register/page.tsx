export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 pt-16 md:pt-20 px-4 md:px-8 flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-white bg-opacity-10 rounded-xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Daftar Akun Baru
        </h1>
        <form>
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="w-full mb-4 px-4 py-2 rounded-lg text-black"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 rounded-lg text-black"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 rounded-lg text-black"
          />
          <input
            type="password"
            placeholder="Konfirmasi Password"
            className="w-full mb-4 px-4 py-2 rounded-lg text-black"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold transition"
          >
            Daftar
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Sudah punya akun?{" "}
          <a href="/login" className="text-pink-300 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
