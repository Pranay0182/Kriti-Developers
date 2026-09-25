import type { Metadata } from "next";
import "./globals.css";
import { AdminSidebar } from "@/components/AdminSidebar";

export const metadata: Metadata = {
  title: "Kriti Developers - Admin Panel",
  description: "Enterprise management panel for Kriti Developers properties, enquiries, and media.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-icon.png",
  },
};

import { AdminLayoutShell } from "@/components/AdminLayoutShell";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900 min-h-screen">
        <AdminLayoutShell>{children}</AdminLayoutShell>
      </body>
    </html>
  );
}
