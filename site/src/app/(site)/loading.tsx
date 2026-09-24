import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white w-full">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-slate-100 border-t-[#c69c6d] rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-[#c69c6d] rounded-full animate-ping"></div>
        </div>
      </div>
      <p className="mt-6 text-[#c69c6d] font-serif uppercase tracking-widest text-xs font-bold animate-pulse">
        Loading
      </p>
    </div>
  );
}
