import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://pentanet.com"
  ),
  title: {
    default: "Pentanet Engineering PLC",
    template: "%s | Pentanet Engineering PLC",
  },
  description:
    "Pentanet Engineering PLC — Ethiopia's trusted partner for telecom installation, tower erection, power systems, solar installation, and data center engineering across East Africa.",
  keywords: [
    "engineering",
    "Ethiopia",
    "Addis Ababa",
    "telecom installation",
    "tower erection",
    "solar installation",
    "power installation",
    "data center",
    "civil works",
    "East Africa",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Pentanet Engineering PLC",
    title: "Pentanet Engineering PLC",
    description:
      "Telecom installation, tower erection, power, solar, and data center engineering in Ethiopia and East Africa.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pentanet Engineering PLC",
    description:
      "End-to-end telecom, power, solar & data center engineering across Ethiopia.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Anti-flash script: sets dark class before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('pnet-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d))document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-cloud dark:bg-graphite antialiased transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
