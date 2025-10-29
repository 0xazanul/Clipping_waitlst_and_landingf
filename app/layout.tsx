import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import VideoMetricsBackground from "@/components/background/VideoMetricsBackground";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ppEditorial.variable} font-sans antialiased bg-slate-950`}>
        
        {/* Gradient overlay */}
        <div
          className="fixed inset-0 z-[1] bg-gradient-to-b from-black/30 via-slate-950/40 to-blue-950/40 pointer-events-none"
        ></div>

        {/* Content rendered over the background */}
        <div className="relative z-10">
          {/* Fixed background in hero section - scrolls with content */}
          <VideoMetricsBackground />
          {children}
        </div>
      </body>
    </html>
  );
}
