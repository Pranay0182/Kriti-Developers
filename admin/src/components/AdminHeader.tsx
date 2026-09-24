import Link from "next/link";
import { Plus, Bell, UserCircle } from "lucide-react";

export function AdminHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
      </div>

      <div className="flex items-center gap-4">
        {action}
        <div className="h-6 w-px bg-slate-200" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700">
            <UserCircle className="w-5 h-5 text-slate-600" />
          </div>
          <div className="text-left text-xs hidden sm:block">
            <p className="font-semibold text-slate-800">Admin User</p>
            <p className="text-slate-500">Super Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
