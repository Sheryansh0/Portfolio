import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { DownloadSimple } from '@phosphor-icons/react';

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
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
    );

    // Subtitle animation
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    // CTA buttons animation
    tl.fromTo(
      ctaRef.current?.children || [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power3.out' },
      '-=0.4'
    );

    // Spline container animation
    tl.fromTo(
      splineRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
      '-=0.8'
    );

    // Floating orbs animation
    gsap.to('.hero-orb', {
      y: -30,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5,
    });

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

      {/* Floating orbs */}
      <div className="hero-orb glow-orb w-64 h-64 -top-20 -left-20 opacity-60" />
      <div className="hero-orb glow-orb glow-orb-cyan w-96 h-96 top-1/4 -right-32 opacity-40" />
      <div className="hero-orb glow-orb w-48 h-48 bottom-20 left-1/4 opacity-50" />

      {/* Spline 3D Background */}
      <div
        ref={splineRef}
        className="absolute inset-0 z-0"
      >
        <iframe
          src="https://my.spline.design/orb-wkMkZ5NwjRAdEHVgkdLhF6lB/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="absolute inset-0"
          title="3D Orb"
        />
        {/* Overlay to allow text interaction */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background pointer-events-none" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 pt-24">
        <div className="max-w-3xl">
          <p className="text-primary font-medium mb-4 tracking-widest uppercase text-sm">
            Welcome to my portfolio
          </p>

          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Hi, I'm{' '}
            <span className="gradient-text">Bachchu Shreyansh</span>
            <br />
            <span className="text-glow">AI Engineer</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
          >
            Crafting intelligent solutions at the intersection of machine learning, 
            deep learning, and modern web technologies. Let's build the future together.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-neon inline-flex items-center justify-center gap-2"
            >
              <span className="relative z-10">Hire Me</span>
            </a>

            <a
              href="/resume.pdf"
              className="btn-glass inline-flex items-center justify-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
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
