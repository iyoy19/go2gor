/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn-icons-png.flaticon.com", // ← ini biar Flaticon bisa dipakai
      "picsum.photos", // ← ini untuk dummy event image
    ],
  },
};

module.exports = nextConfig;
