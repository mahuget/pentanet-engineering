/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },

  // Next.js 15: experimental features
  experimental: {
    // Opt into React 19 features
  },

  async headers() {
    const cspDirectives = isDev
      ? [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com data:",
          "img-src 'self' data: blob: https://images.unsplash.com https://cdn.sanity.io https://plus.unsplash.com",
          "connect-src 'self' ws: wss: https://api.resend.com https://cdn.sanity.io https://*.sanity.io",
          "frame-src https://challenges.cloudflare.com",
          "frame-ancestors 'none'",
        ]
      : [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com data:",
          "img-src 'self' data: blob: https://images.unsplash.com https://cdn.sanity.io https://plus.unsplash.com",
          "connect-src 'self' https://api.resend.com https://cdn.sanity.io https://*.sanity.io",
          "frame-src https://challenges.cloudflare.com",
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "form-action 'self'",
        ];

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          ...(!isDev ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }] : []),
          { key: "Content-Security-Policy", value: cspDirectives.join("; ") },
        ],
      },
    ];
  },
};

export default nextConfig;
