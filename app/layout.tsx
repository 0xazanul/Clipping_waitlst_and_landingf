import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import PostHogInit from "@/components/PostHogInit";
import Navbar from "@/components/Navbar";

const ppEditorial = localFont({
  src: [
    {
      path: "../public/fonts/PPEditorialNew-Ultralight-BF644b21500d0c0.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/PPEditorialNew-UltralightItalic-BF644b214ff1e9b.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/PPEditorialNew-Regular-BF644b214ff145f.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/PPEditorialNew-Italic-BF644b214fb0c0a.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/PPEditorialNew-Ultrabold-BF644b21500840c.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/PPEditorialNew-UltraboldItalic-BF644b214faef01.otf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-custom",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Clipping Company",
  description: "Monetize your influence with authentic brand clips. Join creators earning today.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ppEditorial.variable} font-sans antialiased bg-slate-950`}>

        <div
          className="fixed inset-0 z-[1] bg-gradient-to-b from-black/40 via-slate-950/50 to-slate-900/40 pointer-events-none"
        ></div>

        <div className="relative">
          <Navbar />
          <div className="relative z-20">
            <PostHogInit />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
