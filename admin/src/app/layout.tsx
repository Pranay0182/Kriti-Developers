import type { Metadata } from "next";
import "./globals.css";
import { AdminSidebar } from "@/components/AdminSidebar";

export const metadata: Metadata = {
  title: "Kriti Developers - Admin Panel",
  description: "Enterprise management panel for Kriti Developers properties, enquiries, and media.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900 min-h-screen">
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
