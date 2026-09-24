import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Kriti Developers | Premium Real Estate",
  description: "Creating spaces that stand the test of time. Thoughtfully planned developments for modern living.",
};

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingConcierge } from "@/components/FloatingConcierge";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingConcierge />
        </SmoothScroll>
      </body>
    </html>
  );
}
