import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate logo
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
    );

    // Animate progress bar
    tl.to(progressBarRef.current, {
      width: '100%',
      duration: 2,
      ease: 'power2.out',
      onUpdate: function() {
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
      ease: 'power2.inOut',
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
        onComplete();
      },
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow-orb w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
      </div>

      {/* Logo */}
      <div ref={logoRef} className="preloader-logo">
        Shreyansh
      </div>

      {/* Progress bar */}
      <div className="progress-container">
        <div ref={progressBarRef} className="progress-bar" />
      </div>

      {/* Progress text */}
      <span ref={progressTextRef} className="progress-text">0%</span>
    </div>
  );
};

export default Preloader;
