"use client";

import { useState, useRef } from "react";
import { UploadCloud, CheckCircle2, X, Loader2, FileText, ExternalLink, Download } from "lucide-react";

interface BrochureUploaderProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  helperText?: string;
}

export function BrochureUploader({
  label = "Brochure PDF Document",
  value = "",
  onChange,
  helperText = "Upload high-resolution property brochure in PDF format to Cloudflare R2.",
}: BrochureUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a valid PDF file");
      return;
    }

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
      setError(err.message || "Failed to upload PDF brochure to Cloudflare R2");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const getFileName = (url: string) => {
    try {
      const parts = url.split("/");
      return decodeURIComponent(parts[parts.length - 1]);
    } catch {
      return "Brochure.pdf";
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">{label}</label>

      {value ? (
        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-3 max-w-lg">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-900 truncate">{getFileName(value)}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Stored in Cloudflare R2
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition shadow-xs flex items-center gap-1 text-xs font-semibold"
                title="Download / Preview PDF"
              >
                <Download className="w-3.5 h-3.5 text-[#c69c6d]" />
                <span>Test Download</span>
              </a>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold shadow-xs transition"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-100 hover:text-rose-700 transition"
                title="Remove brochure"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate max-w-[320px] font-mono">{value}</span>
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c69c6d] hover:underline flex items-center gap-1 font-semibold"
            >
              Open <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-[#c69c6d] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50/60 hover:bg-slate-50 transition max-w-lg"
        >
          {uploading ? (
            <div className="flex flex-col items-center py-3">
              <Loader2 className="w-8 h-8 text-[#c69c6d] animate-spin mb-2" />
              <p className="text-xs text-slate-700 font-semibold">Uploading PDF to Cloudflare R2...</p>
              <p className="text-[11px] text-slate-500">Please wait a moment</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-[#c69c6d] mb-2.5">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-slate-800">Click to upload Brochure PDF</p>
              <p className="text-[11px] text-slate-500 mt-1">Upload brochure file directly from your computer (PDF up to 25MB)</p>
            </div>
          )}
        </div>
      )}

      {/* Manual URL input fallback */}
      <div className="max-w-lg">
        <label className="block text-[11px] font-medium text-slate-500 mb-1">
          Or paste direct brochure PDF link:
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://pub-a960e227e6d7427991deaa543564e119.r2.dev/brochure.pdf"
          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#c69c6d]/50"
        />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {helperText && <p className="text-xs text-slate-500">{helperText}</p>}
      {error && <p className="text-xs text-rose-600 font-semibold">{error}</p>}
    </div>
  );
}
