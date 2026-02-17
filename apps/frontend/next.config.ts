import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
   //  remotePatterns: [
   //    {
   //      protocol: "https",
   //      hostname: "res.cloudinary.com",
   //    },
   //  ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ezystaff.b-cdn.net",
      },
    ],
  },
};

export default nextConfig;
