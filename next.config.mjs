/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // protocol: "https", // Optional: Include the protocol if needed
        hostname: "m.media-amazon.com", // Provide a string, not an array
      },
      {
        hostname: "indjyxbujwaemfzqwamg.supabase.co", // New domain
        pathname: "/storage/v1/object/public/posters/**", // Include path for security
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
