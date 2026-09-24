"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Volume2, VolumeX, Maximize2, Minimize2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function FloatingVideoPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Audio is ON by default!
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Playback starter with audio by default
  const startPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Unmute and set full volume by default
    video.muted = false;
    video.volume = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
          setIsPlaying(true);
        })
        .catch(() => {
          // If browser policy temporarily blocks unmuted autoplay before document interaction,
          // play and instantly unmute on the user's scroll / touch / click
          video.muted = true;
          video
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {});

          const forceUnmute = () => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              videoRef.current.volume = 1.0;
              setIsMuted(false);
            }
            ["scroll", "wheel", "touchstart", "touchmove", "pointerdown", "click"].forEach((evt) => {
              window.removeEventListener(evt, forceUnmute);
            });
          };

          ["scroll", "wheel", "touchstart", "touchmove", "pointerdown", "click"].forEach((evt) => {
            window.addEventListener(evt, forceUnmute, { passive: true, once: true });
          });
        });
    }
  }, []);

  // Listen to scroll down to reveal and start playing
  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem("kriti_video_dismissed");
      if (dismissed === "true") {
        setIsDismissed(true);
        return;
      }
    } catch {
      // Ignore storage errors
    }

    const handleScroll = () => {
      // Reveal popup when user scrolls down past 180px
      if (window.scrollY > 180) {
        setIsVisible(true);
        // Explicitly unmute and ensure playback on scroll gesture
        if (videoRef.current) {
          videoRef.current.muted = false;
          videoRef.current.volume = 1.0;
          setIsMuted(false);
          videoRef.current.play().catch(() => {});
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll in case page loaded midway
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // When visible, trigger playback with audio
  useEffect(() => {
    if (isVisible) {
      startPlayback();

      // Ensure audio is on whenever user interacts
      const onUserAction = () => {
        if (videoRef.current && videoRef.current.muted) {
          videoRef.current.muted = false;
          videoRef.current.volume = 1.0;
          setIsMuted(false);
        }
      };

      window.addEventListener("click", onUserAction, { passive: true });
      window.addEventListener("touchstart", onUserAction, { passive: true });
      window.addEventListener("wheel", onUserAction, { passive: true });

      return () => {
        window.removeEventListener("click", onUserAction);
        window.removeEventListener("touchstart", onUserAction);
        window.removeEventListener("wheel", onUserAction);
      };
    }
  }, [isVisible, startPlayback]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    try {
      sessionStorage.setItem("kriti_video_dismissed", "true");
    } catch {
      // Ignore
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleVideoClick = () => {
    if (!videoRef.current) return;

    // If somehow muted, tap immediately activates audio
    if (videoRef.current.muted) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      setIsMuted(false);
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    // Toggle pause/play
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  if (isDismissed) return null;

  return (
    <>
      {/* Dimmed backdrop when expanded */}
      {isExpanded && (
        <div
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 animate-in fade-in duration-300"
        />
      )}

      <div
        className={`fixed z-40 transition-all duration-700 ease-out ${
          isExpanded
            ? "inset-4 sm:inset-auto sm:bottom-10 sm:right-10 sm:w-[460px] sm:max-h-[85vh] z-50 flex flex-col justify-center items-center"
            : `bottom-16 sm:bottom-20 right-3 sm:right-6 w-48 sm:w-60 md:w-68 ${
                isVisible
                  ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                  : "opacity-0 translate-y-16 scale-90 pointer-events-none"
              }`
        }`}
      >
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#050b14] border border-amber-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.65)] group">
          {/* Top Bar with Live Badge & Close (Cross) Button */}
          <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none">
            {/* Live Indicator Badge */}
            <div className="pointer-events-auto backdrop-blur-md bg-slate-950/80 border border-white/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full flex items-center gap-1.5 shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#dfba8e]">
                Project Tour
              </span>
            </div>

            {/* Controls Group */}
            <div className="pointer-events-auto flex items-center gap-1.5">
              {/* Sound Toggle Button */}
              <button
                type="button"
                onClick={toggleSound}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition-colors shadow hover:border-amber-300/50"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={12} className="text-slate-300" /> : <Volume2 size={12} className="text-amber-400" />}
              </button>

              {/* Expand / Minimize Button */}
              <button
                type="button"
                onClick={toggleExpand}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition-colors shadow hover:border-amber-300/50"
                aria-label={isExpanded ? "Minimize video" : "Expand video"}
                title={isExpanded ? "Minimize" : "Expand"}
              >
                {isExpanded ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
              </button>

              {/* Close (Cross/Cut) Button */}
              <button
                type="button"
                onClick={handleDismiss}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-md border border-white/20 cursor-pointer"
                aria-label="Close and cut video popup"
                title="Cut / Close"
              >
                <X size={13} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Video Player */}
          <div
            onClick={handleVideoClick}
            className={`relative bg-black cursor-pointer overflow-hidden ${
              isExpanded ? "aspect-video sm:aspect-square md:aspect-[4/5] max-h-[70vh]" : "aspect-[9/14] sm:aspect-[4/5]"
            }`}
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              onCanPlay={startPlayback}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover select-none"
            >
              {/* Cloudflare R2 Stream URL */}
              <source src="https://pub-a960e227e6d7427991deaa543564e119.r2.dev/video-popup-1790265204903.mp4" type="video/mp4" />
              {/* Local Fallback URLs */}
              <source src="/video-popup.mp4" type="video/mp4" />
              <source src="/manjula%20mp4%202.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Subtle Gradient Overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-transparent pointer-events-none" />

            {/* Play Indicator if paused */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold-gradient text-slate-950 flex items-center justify-center shadow-lg">
                  <span className="text-base sm:text-lg font-bold ml-0.5">▶</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Card Footer with CTA */}
          <div className="p-2.5 sm:p-3 bg-[#050b14] border-t border-white/10 flex items-center justify-between gap-2">
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold text-white font-serif">Kriti Developers</p>
              <p className="text-[8px] sm:text-[9px] text-[#dfba8e] uppercase font-semibold tracking-wider">Sanctuary of Luxury</p>
            </div>

            <Link
              href="/enquiry"
              prefetch={true}
              onClick={(e) => e.stopPropagation()}
              className="bg-gold-gradient hover:brightness-105 active:scale-95 text-slate-950 font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] uppercase tracking-wider transition-all shadow flex items-center gap-1 shrink-0"
            >
              <span>Enquire</span>
              <ArrowRight size={10} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
