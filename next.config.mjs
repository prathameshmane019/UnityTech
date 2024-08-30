/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: process.env.API_URL + '/api/:path*', // Adjust this if your API has a different base path
        },
      ];
    },
  };
  
  export default nextConfig;