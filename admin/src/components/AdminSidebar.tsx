"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Building2, MessageSquareText, Image as ImageIcon, Settings, ExternalLink, ShieldCheck, LogOut } from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Projects", href: "/projects", icon: Building2 },
    { label: "Enquiries & Leads", href: "/enquiries", icon: MessageSquareText },
    { label: "Media Gallery", href: "/gallery", icon: ImageIcon },
    { label: "Site Settings", href: "/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
    }
  };

  return (
    <aside className="w-64 bg-[#0b1528] text-white flex flex-col min-h-screen border-r border-slate-800">
      {/* Brand Header with seamless vector branding */}
      <div className="p-6 border-b border-slate-800/80">
        <Link href="/" className="block">
          <div className="flex items-center gap-3">
            <svg width="36" height="36" viewBox="0 0 100 100" fill="none" className="text-[#c69c6d] shrink-0" stroke="currentColor">
              <rect x="10" y="10" width="80" height="80" rx="6" strokeWidth="2.5" className="text-[#c69c6d]/30" />
              <path d="M32 26v48" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M32 50l28-24" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M44 40l20 34" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M42 74h24" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
            <div className="flex flex-col">
              <span className="font-serif text-base font-bold tracking-wider text-white leading-tight">
                KRITI <span className="text-[#c69c6d]">DEVELOPERS</span>
              </span>
              <span className="text-[8px] font-semibold tracking-[0.2em] text-[#c69c6d] uppercase mt-0.5">
                Admin Portal
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#c69c6d] text-slate-950 shadow-md font-semibold"
                  : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-slate-950" : "text-slate-400"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / System Status & Logout */}
      <div className="p-4 border-t border-slate-800/80 space-y-3">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 rounded border border-slate-700/60 transition"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Live Website
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>

        <div className="flex items-center gap-2 px-3 py-2 text-[11px] text-slate-400 bg-slate-900/40 rounded">
          <ShieldCheck className="w-4 h-4 text-[#c69c6d]" />
          <span>Cloudflare R2 & Supabase</span>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 rounded border border-rose-800/30 transition cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
