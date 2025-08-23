import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Optimización de imágenes
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 año
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Optimización de compresión
  compress: true,
  
  // Headers de seguridad
  poweredByHeader: false,
  
  // Optimización de bundle
  experimental: {
    // optimizeCss: true, // Deshabilitado temporalmente por error de critters
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Configuración de webpack
  webpack: (config, { dev, isServer }) => {
    // Optimización para producción
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }

    return config;
  },

  // Headers de seguridad adicionales
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/public/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },

  // Redirecciones
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Configuración de i18n (opcional para futuro)
  // i18n: {
  //   locales: ['es-AR', 'en'],
  //   defaultLocale: 'es-AR',
  // },

  // Configuración de trailing slash
  trailingSlash: false,

  // Configuración de base path (si es necesario)
  // basePath: '',

  // Configuración de asset prefix (si es necesario)
  // assetPrefix: '',

  // Configuración de output (para exportación estática si es necesario)
  // output: 'export',

  // Configuración de distDir
  distDir: '.next',

  // Configuración de generateEtags
  generateEtags: true,

  // Configuración de onDemandEntries
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Configuración de pageExtensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  // Configuración de reactStrictMode
  reactStrictMode: true,

  // Configuración de swcMinify (removido en Next.js 15)
  // swcMinify: true,

  // Configuración de compiler
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Configuración de env
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Configuración de serverRuntimeConfig
  serverRuntimeConfig: {
    // Solo disponible en el servidor
    mySecret: process.env.MY_SECRET,
  },

  // Configuración de publicRuntimeConfig
  publicRuntimeConfig: {
    // Disponible tanto en servidor como cliente
    staticFolder: '/static',
  },
};

export default nextConfig;
