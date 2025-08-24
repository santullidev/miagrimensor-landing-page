/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimización de imágenes
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Configuración específica para SVGs
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Deshabilitar optimización para SVGs locales
    unoptimized: false,
  },

  // Optimización de compresión
  compress: true,
  
  // Headers de seguridad
  poweredByHeader: false,
  
  // Configuración de trailing slash
  trailingSlash: false,

  // Configuración de distDir
  distDir: '.next',

  // Configuración de generateEtags
  generateEtags: true,

  // Configuración de pageExtensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  // Configuración de reactStrictMode
  reactStrictMode: true,

  // Configuración de compiler
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Configuración de webpack para manejar SVGs
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
