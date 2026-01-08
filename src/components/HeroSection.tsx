import { useEffect, useRef, useState, lazy, Suspense } from "react";
import gsap from "gsap";
import { DownloadSimple } from "@phosphor-icons/react";

const ThreeBackground = lazy(() => import("./ThreeBackground"));

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.8 });

    // Headline animation
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 60, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" }
    );

    // Subtitle animation
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

    // CTA buttons animation
    tl.fromTo(
      ctaRef.current?.children || [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power3.out" },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />

      {/* Three.js 3D Background */}
      <Suspense fallback={<div className="absolute inset-0 z-0" />}>
        <ThreeBackground />
      </Suspense>

      {/* Overlay to allow text interaction */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60 pointer-events-none z-10" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 flex items-center justify-center min-h-screen -mt-16 sm:-mt-20">
        <div className="text-center max-w-4xl w-full">
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <p className="text-primary font-medium tracking-wide text-xs sm:text-sm">
              Available for opportunities
            </p>
          </div>

          <p className="text-muted-foreground mb-2 sm:mb-4 text-base sm:text-lg">
            Hi, I'm
          </p>

          <h1
            ref={headlineRef}
            className="font-bold leading-tight mb-4 sm:mb-6 whitespace-nowrap"
            style={{ fontSize: "clamp(1.75rem, 8vw, 6rem)" }}
          >
            Bachchu <span className="gradient-text">Shreyansh</span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-6 sm:mb-8">
            AI Engineer
          </p>

          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
          >
            Crafting intelligent solutions with cutting-edge AI & ML
            technologies
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-neon inline-flex items-center justify-center gap-2"
            >
              <span className="relative z-10">Hire Me</span>
            </a>

            <a
              href="/resume.pdf"
              className="btn-glass inline-flex items-center justify-center gap-2"
              download="Bachchu_Shreyansh_Resume.pdf"
            >
              <DownloadSimple size={20} weight="light" />
              Download Resume
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
