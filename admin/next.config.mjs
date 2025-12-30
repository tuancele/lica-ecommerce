/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "cdn.lica.vn" },
      { protocol: "https", hostname: "**" }, // Cho phép load ảnh từ mọi nguồn để test cho dễ
    ],
  },
};
export default nextConfig;
