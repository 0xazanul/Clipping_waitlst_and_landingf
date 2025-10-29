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
        {/* Fixed Background Animation - Global and truly fixed to viewport */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}
        >
          <VideoMetricsBackground />
        </div>
        
        {/* Gradient overlay - LIGHTER to show animation colors */}
        <div
          className="fixed inset-0 z-[1] bg-gradient-to-b from-black/30 via-slate-950/40 to-blue-950/40 pointer-events-none"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}
        ></div>

        {/* Content rendered over the background */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
