"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, CheckCircle2, X, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  helperText?: string;
}

export function ImageUploader({ label, value, onChange, helperText }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to upload to Cloudflare R2");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>

      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100 group max-w-md h-48">
          <img
            src={value}
            alt="Uploaded preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-white/90 hover:bg-white text-slate-800 text-xs font-semibold rounded shadow transition"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded shadow transition flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Remove
            </button>
          </div>
          <div className="absolute bottom-2 left-2 bg-emerald-600/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 shadow">
            <CheckCircle2 className="w-3 h-3" /> Stored in Cloudflare R2
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-[#c69c6d] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50/60 hover:bg-slate-50 transition max-w-md"
        >
          {uploading ? (
            <div className="flex flex-col items-center py-4">
              <Loader2 className="w-8 h-8 text-[#c69c6d] animate-spin mb-2" />
              <p className="text-xs text-slate-600 font-medium">Uploading to Cloudflare R2...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-[#c69c6d] mb-2">
                <UploadCloud className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-700">Click to upload file</p>
              <p className="text-[11px] text-slate-500 mt-0.5">PNG, JPG, WebP up to 10MB</p>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {helperText && <p className="text-xs text-slate-500">{helperText}</p>}
      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
    </div>
  );
}
