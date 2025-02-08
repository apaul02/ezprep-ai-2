/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        allowedOrigins: [
          'localhost:3000',
          'musical-cod-gw9xrr7ww4fvwr7-3000.app.github.dev',
          'https://musical-cod-gw9xrr7ww4fvwr7.github.dev/'
        ],
        allowedForwardedHosts: [
          'musical-cod-gw9xrr7ww4fvwr7-3000.app.github.dev',
          'https://musical-cod-gw9xrr7ww4fvwr7.github.dev/'
        ]
      }
    }
  }
  
  export default nextConfig;
  