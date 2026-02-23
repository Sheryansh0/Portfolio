import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { DownloadSimple } from "@phosphor-icons/react";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const nameContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLHeadingElement>(null);
  const hiRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const stackItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [currentText, setCurrentText] = useState<'name' | 'title'>('name');
  
  const nameText = "Bachchu Shreyansh";
  const titleText = "AI Engineer";

  const stackItems = [
    { text: "Let's Connect →", isButton: true, hasIcon: false },
    { text: "Response: within 24hrs", isButton: false, hasIcon: false },
    { text: "Location: India / Remote", isButton: false, hasIcon: false },
    { text: "Role: AI/ML Engineer", isButton: false, hasIcon: false },
    { text: "Open to Work", isButton: false, hasIcon: true },
  ];

  // Initial intro animation
  useEffect(() => {
    const tl = gsap.timeline();

    // Badge appears
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      1
    );

    // "Hi, I'm" fades in
    tl.fromTo(
      hiRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
      1.5
    );

    // CTA buttons appear
    tl.fromTo(
      ctaRef.current?.children || [],
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" },
      4
    );

    // Stack container appears
    tl.fromTo(
      stackRef.current,
      { opacity: 0, x: 80 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      3
    );

    // Scroll indicator
    tl.fromTo(
      scrollRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      4.5
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Looping text animation for name
  useEffect(() => {
    const letters = textContainerRef.current?.querySelectorAll('.text-letter');
    if (!letters || letters.length === 0) return;

    const loopTl = gsap.timeline({ repeat: -1 });

    // Type in letters
    loopTl.fromTo(
      letters,
      { opacity: 0, y: 30, rotateX: -90 },
      { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        duration: 0.1,
        stagger: 0.05,
        ease: "back.out(1.7)"
      },
      currentText === 'name' ? 2 : 0
    );

    // Pause to display
    loopTl.to({}, { duration: 2 });

    // Roll back letters (reverse order)
    loopTl.to(
      letters,
      { 
        opacity: 0, 
        y: -30, 
        rotateX: 90,
        duration: 0.08,
        stagger: { each: 0.04, from: "end" },
        ease: "power2.in"
      }
    );

    // Switch text after rollback
    loopTl.call(() => {
      setCurrentText(prev => prev === 'name' ? 'title' : 'name');
    });

    return () => {
      loopTl.kill();
    };
  }, [currentText]);

  // Stack push/pop animation loop
  useEffect(() => {
    const items = stackItemsRef.current.filter(Boolean);
    if (items.length === 0) return;

    // Set initial state - all items hidden
    gsap.set(items, { opacity: 0, y: 30, scale: 0.8 });

    const stackTl = gsap.timeline({ repeat: -1, delay: 3.5 });

    // PUSH phase - items appear from bottom to top (index 0 to 4)
    items.forEach((item, index) => {
      const letters = item?.querySelectorAll('.stack-letter');
      if (!letters) return;
      
      // Item slides up into stack
      stackTl.to(
        item,
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
        index * 0.6
      );
      
      // Letters type in
      stackTl.fromTo(
        letters,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.05, stagger: 0.02, ease: "power2.out" },
        index * 0.6 + 0.1
      );
    });

    // Hold all items visible
    stackTl.to({}, { duration: 2 });

    // POP phase - items disappear from top to bottom (index 4 to 0)
    [...items].reverse().forEach((item, index) => {
      const letters = item?.querySelectorAll('.stack-letter');
      if (!letters) return;
      
      const reverseIndex = items.length - 1 - index;
      
      // Letters roll back
      stackTl.to(
        letters,
        { opacity: 0, y: -10, duration: 0.04, stagger: { each: 0.015, from: "end" }, ease: "power2.in" },
        3 + (items.length * 0.6) + (index * 0.4)
      );
      
      // Item pops off stack
      stackTl.to(
        item,
        { opacity: 0, y: -20, scale: 0.9, duration: 0.3, ease: "power2.in" },
        3 + (items.length * 0.6) + (index * 0.4) + 0.2
      );
    });

    // Brief pause before restart
    stackTl.to({}, { duration: 1 });

    return () => {
      stackTl.kill();
    };
  }, []);

  const displayText = currentText === 'name' ? nameText : titleText;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/main.mp4" type="video/mp4" />
      </video>

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60 pointer-events-none z-10" />

      {/* Content */}
      <div className="container relative z-20 mx-auto px-6 sm:px-8 lg:px-16 flex items-center min-h-screen">
        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center">
          
          {/* Left side - Name and Title */}
          <div 
            ref={nameContainerRef}
            className="lg:w-2/5 xl:w-1/3 text-center lg:text-left lg:-translate-y-20"
          >
            <p 
              ref={hiRef}
              className="text-muted-foreground mb-2 sm:mb-3 text-base sm:text-lg opacity-0"
            >
              Hi, I'm
            </p>

            <h1
              ref={textContainerRef}
              className="font-bold leading-tight mb-3 sm:mb-4 min-h-[2.4em]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", perspective: "1000px" }}
            >
              {currentText === 'name' ? (
                <>
                  <span className="block">
                    {"Bachchu".split('').map((letter, index) => (
                      <span 
                        key={`first-${index}`}
                        className="text-letter inline-block opacity-0"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                  <span className="block">
                    {"Shreyansh".split('').map((letter, index) => (
                      <span 
                        key={`last-${index}`}
                        className="text-letter inline-block opacity-0 gradient-text"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                </>
              ) : (
                displayText.split('').map((letter, index) => (
                  <span 
                    key={`${currentText}-${index}`}
                    className="text-letter inline-block opacity-0"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </span>
                ))
              )}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mt-4 leading-relaxed max-w-md">
              Crafting intelligent solutions with cutting-edge AI & ML
              technologies
            </p>

            <div 
              ref={badgeRef}
              className="mt-6 flex justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/40 backdrop-blur-md border border-primary/30">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <p className="text-primary font-medium tracking-wide text-xs sm:text-sm">
                  Available for opportunities
                </p>
              </div>
            </div>

            <div
              ref={ctaRef}
              className="mt-6 flex justify-center lg:justify-start"
            >
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

          {/* Right side - Status Stack */}
          <div 
            ref={stackRef}
            className="hidden lg:block lg:w-1/4 xl:w-1/5 opacity-0"
          >
            <div className="glass-card rounded-2xl p-4 border border-white/10 backdrop-blur-xl bg-background/30">
              {/* Stack header */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 pb-2 border-b border-white/5">
                <span className="font-mono">stack.status()</span>
                <span className="ml-auto text-primary">● live</span>
              </div>
              
              {/* Stack container - items stack from bottom to top */}
              <div className="flex flex-col-reverse gap-3">
                {stackItems.map((item, idx) => (
                  <div
                    key={idx}
                    ref={el => stackItemsRef.current[idx] = el}
                    className={`px-4 py-4 rounded-lg border transition-all ${
                      item.isButton 
                        ? 'bg-primary/20 border-primary/40 cursor-pointer hover:bg-primary/30' 
                        : idx === stackItems.length - 1
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-white/5 border-white/10'
                    }`}
                    style={{ opacity: 0 }}
                  >
                    {item.isButton ? (
                      <a href="#contact" className="flex items-center justify-center text-sm font-medium">
                        {item.text.split('').map((letter, letterIdx) => (
                          <span 
                            key={letterIdx}
                            className="stack-letter inline-block"
                          >
                            {letter === ' ' ? '\u00A0' : letter}
                          </span>
                        ))}
                      </a>
                    ) : (
                      <p className={`text-sm font-medium text-center flex items-center justify-center ${
                        idx === stackItems.length - 1 ? 'text-green-400' : 'text-foreground'
                      }`}>
                        {item.hasIcon && (
                          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse stack-letter inline-block mr-2" />
                        )}
                        {item.text.split('').map((letter, letterIdx) => (
                          <span 
                            key={letterIdx}
                            className="stack-letter inline-block"
                          >
                            {letter === ' ' ? '\u00A0' : letter}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Stack footer */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-3 pt-2 border-t border-white/5">
                <span className="font-mono">size: {stackItems.length}</span>
                <span className="font-mono">LIFO</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 opacity-0"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
