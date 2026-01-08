import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate name
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 30, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
      }
    );

    // Animate subtitle
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    // Animate progress bar
    tl.to(progressBarRef.current, {
      width: "100%",
      duration: 2,
      ease: "power2.out",
      onUpdate: function () {
        const progress = Math.round(this.progress() * 100);
        if (progressTextRef.current) {
          progressTextRef.current.textContent = `${progress}%`;
        }
      },
    });

    // Fade out preloader
    tl.to(preloaderRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = "none";
        }
        onComplete();
      },
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      {/* Name with gradient */}
      <div ref={nameRef} className="mb-2">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(280,80%,60%)] to-[hsl(var(--accent))] bg-clip-text text-transparent">
          SHREYANSH
        </h1>
      </div>

      {/* Subtitle */}
      <div ref={subtitleRef} className="mb-12">
        <p className="text-lg md:text-xl text-muted-foreground tracking-[0.3em] uppercase">
          AI Engineer
        </p>
      </div>

      {/* Progress text */}
      <span
        ref={progressTextRef}
        className="text-primary text-sm mb-2 font-medium"
      >
        0%
      </span>

      {/* Progress bar container */}
      <div className="w-64 md:w-80 h-1 bg-muted/30 rounded-full overflow-hidden mb-4">
        <div
          ref={progressBarRef}
          className="h-full w-0 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full"
        />
      </div>

      {/* Status text */}
      <div ref={statusRef}>
        <p className="text-sm text-muted-foreground">
          Initializing Portfolio...
        </p>
      </div>
    </div>
  );
};

export default Preloader;
