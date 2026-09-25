"use client";

import { useRouter } from "next/navigation";
import { UserCircle, LogOut } from "lucide-react";
import { ADMIN_EMAIL } from "@/lib/auth";

export function AdminHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
      router.push("/login");
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {description && <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{description}</p>}
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {action}
        <div className="h-6 w-px bg-slate-200 hidden sm:block" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-[#c69c6d]">
            <UserCircle className="w-5 h-5" />
          </div>
          <div className="text-left text-xs hidden md:block">
            <p className="font-semibold text-slate-800">{ADMIN_EMAIL}</p>
            <p className="text-slate-500 text-[10px]">Super Administrator</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition border border-transparent hover:border-rose-100 flex items-center gap-1.5 text-xs font-semibold"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
