"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Volume2, VolumeX, Maximize2, Minimize2, ArrowRight } from "lucide-react";
import Link from "next/link";

const VIDEO_SRC = "https://pub-a960e227e6d7427991deaa543564e119.r2.dev/video-popup-1790265204903.mp4";

export function FloatingVideoPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Audio by default!
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const unlockListenersAttached = useRef(false);

  // Unlocks audio on any user gesture across the document
  const attachGlobalAudioUnlock = useCallback(() => {
    if (unlockListenersAttached.current) return;
    unlockListenersAttached.current = true;

    const unlock = () => {
      const video = videoRef.current;
      if (video) {
        video.muted = false;
        video.volume = 1.0;
        setIsMuted(false);
        if (video.paused) {
          video.play().catch(() => {});
        }
      }
      cleanup();
    };

    const cleanup = () => {
      ["pointerdown", "touchstart", "touchend", "mousedown", "click", "keydown", "wheel"].forEach((evt) => {
        window.removeEventListener(evt, unlock);
      });
      unlockListenersAttached.current = false;
    };

    ["pointerdown", "touchstart", "touchend", "mousedown", "click", "keydown", "wheel"].forEach((evt) => {
      window.addEventListener(evt, unlock, { passive: true, once: true });
    });
  }, []);

  // Playback function: starts video and attempts audio
  const startPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try unmuted playback first (audio ON by default)
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
          // If browser autoplay policy blocks unmuted audio on scroll:
          // Immediately play muted so the video moves smoothly without delay
          video.muted = true;
          video
            .play()
            .then(() => {
              setIsPlaying(true);
              setIsMuted(true);
              // Attach gesture listener to instantly unmute on first tap / click
              attachGlobalAudioUnlock();
            })
            .catch(() => {});
        });
    }
  }, [attachGlobalAudioUnlock]);

  // Scroll detection: appears and plays when scrolled down; hides and pauses at top
  useEffect(() => {
    if (isDismissed) return;

    const checkScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || 0;

      // When scrolled down past 120px: show popup & start playback
      if (scrollPos > 120) {
        setIsVisible(true);
        const video = videoRef.current;
        if (video && video.paused) {
          startPlayback();
        }
      } else {
        // At the top hero: hide popup & pause video so no audio plays
        setIsVisible(false);
        const video = videoRef.current;
        if (video && !video.paused) {
          video.pause();
          setIsPlaying(false);
        }
      }
    };

    // Run check immediately on mount (in case page loaded at a scroll offset)
    checkScroll();

    window.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("wheel", checkScroll, { passive: true });
    window.addEventListener("touchmove", checkScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("wheel", checkScroll);
      window.removeEventListener("touchmove", checkScroll);
    };
  }, [isDismissed, startPlayback]);

  // When popup is dismissed with X button
  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    setIsVisible(false);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Toggle sound explicitly
  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      videoRef.current.volume = 1.0;
      setIsMuted(nextMuted);
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    // If muted, clicking anywhere on the video immediately unmutes and plays
    if (video.muted) {
      video.muted = false;
      video.volume = 1.0;
      setIsMuted(false);
      if (video.paused) {
        video.play().catch(() => {});
        setIsPlaying(true);
      }
      return;
    }

    // Otherwise toggle play/pause
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  if (isDismissed) return null;

  return (
    <>
      {/* Dimmed backdrop when expanded */}
      {isExpanded && isVisible && (
        <div
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 animate-in fade-in duration-300"
        />
      )}

      {/* Floating Popup - Only visible when user scrolls down */}
      <div
        className={`fixed z-40 transition-all duration-700 ease-out ${
          isExpanded && isVisible
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
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition-colors shadow hover:border-amber-300/50 cursor-pointer"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={12} className="text-amber-400" /> : <Volume2 size={12} className="text-emerald-400" />}
              </button>

              {/* Expand / Minimize Button */}
              <button
                type="button"
                onClick={toggleExpand}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition-colors shadow hover:border-amber-300/50 cursor-pointer"
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

          {/* Video Player - Only active when visible */}
          <div
            onClick={handleVideoClick}
            className={`relative bg-black cursor-pointer overflow-hidden ${
              isExpanded ? "aspect-video sm:aspect-square md:aspect-[4/5] max-h-[70vh]" : "aspect-[9/14] sm:aspect-[4/5]"
            }`}
          >
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              loop
              playsInline
              preload="auto"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover select-none"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
              <source src="/video-popup.mp4" type="video/mp4" />
              <source src="/manjula%20mp4%202.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Subtle Gradient Overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-transparent pointer-events-none" />

            {/* Tap for Sound Floating Badge if currently muted */}
            {isMuted && isPlaying && (
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                <span className="backdrop-blur-md bg-slate-950/90 border border-amber-400/50 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg tracking-wide">
                  <VolumeX size={11} className="text-amber-400 animate-pulse" />
                  <span>Tap for Sound 🔊</span>
                </span>
              </div>
            )}

            {/* Audio Live indicator if unmuted */}
            {!isMuted && isPlaying && (
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                <span className="backdrop-blur-md bg-emerald-950/90 border border-emerald-400/40 text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow tracking-wider uppercase">
                  <Volume2 size={10} className="text-emerald-400 animate-pulse" />
                  <span>Sound On</span>
                </span>
              </div>
            )}

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
