import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code,
  Brain,
  Database,
  Cloud,
  Terminal,
  Cube,
  Flask,
  FileCode,
  LinuxLogo,
  GitBranch,
} from "@phosphor-icons/react";
import profileImage from "@/assets/profile-Photoroom.png";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "Python", icon: Code },
  { name: "C++", icon: FileCode },
  { name: "PyTorch", icon: Brain },
  { name: "TensorFlow", icon: Brain },
  { name: "Flask", icon: Flask },
  { name: "spaCy", icon: Terminal },
  { name: "scikit-learn", icon: Brain },
  { name: "Docker", icon: Cube },
  { name: "Azure", icon: Cloud },
  { name: "MongoDB", icon: Database },
  { name: "Git", icon: GitBranch },
  { name: "Linux", icon: LinuxLogo },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const skillsContainer = skillsRef.current;

    if (!section || !image || !content || !skillsContainer) return;

    // Image animation
    gsap.fromTo(
      image,
      { x: -100, opacity: 0, filter: "blur(10px)" },
      {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Content animation
    gsap.fromTo(
      content,
      { y: 60, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Skills stagger animation
    gsap.fromTo(
      skillsContainer.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: skillsContainer,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="glow-orb w-60 sm:w-80 h-60 sm:h-80 -top-40 right-1/4 opacity-30" />
      <div className="glow-orb glow-orb-cyan w-48 sm:w-64 h-48 sm:h-64 bottom-0 -left-32 opacity-20" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative order-1 lg:order-none">
            <div className="relative max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:mx-0">
              {/* Outer ambient glow */}
              <div className="absolute -inset-16 rounded-full bg-gradient-to-r from-primary/30 via-accent/20 to-secondary/30 blur-3xl opacity-40" />

              {/* Spinning gradient ring - thinner and more elegant */}
              <div
                className="absolute -inset-[3px] rounded-full animate-spin"
                style={{
                  animationDuration: "4s",
                  background:
                    "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--secondary)), hsl(var(--primary)))",
                  opacity: 0.8,
                }}
              />

              {/* Dark inner ring for depth */}
              <div className="absolute inset-0 rounded-full bg-background" />

              {/* 3D Sphere container */}
              <div
                className="relative rounded-full overflow-hidden aspect-square"
                style={{
                  background:
                    "linear-gradient(145deg, hsl(var(--muted) / 0.8), hsl(var(--background)))",
                  boxShadow: `
                    inset 0 -40px 80px hsl(var(--background)),
                    inset 0 40px 60px hsl(var(--primary) / 0.08),
                    inset 0 0 30px hsl(var(--background) / 0.5),
                    0 25px 50px -12px hsl(var(--background)),
                    0 0 80px hsl(var(--primary) / 0.15)
                  `,
                }}
              >
                {/* Top highlight - makes it look 3D/glossy */}
                <div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(var(--foreground) / 0.12), transparent 50%)",
                  }}
                />

                {/* Side rim light - left */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 5% 50%, hsl(var(--primary) / 0.25), transparent 35%)",
                  }}
                />

                {/* Side rim light - right */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 95% 50%, hsl(var(--accent) / 0.2), transparent 35%)",
                  }}
                />

                {/* Bottom shadow gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, hsl(var(--background) / 0.7) 0%, transparent 40%)",
                  }}
                />

                {/* Image */}
                <img
                  src={profileImage}
                  alt="Bachchu Shreyansh"
                  className="relative z-10 w-full h-full object-contain object-center hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Glass reflection overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-30"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--foreground) / 0.05) 0%, transparent 50%, hsl(var(--background) / 0.1) 100%)",
                  }}
                />
              </div>

              {/* Floating particles effect */}
              <div
                className="absolute -top-2 left-1/4 w-1.5 h-1.5 rounded-full bg-primary/80 animate-ping"
                style={{ animationDuration: "2s" }}
              />
              <div
                className="absolute bottom-1/4 -right-2 w-1.5 h-1.5 rounded-full bg-accent/80 animate-ping"
                style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
              />
              <div
                className="absolute top-1/3 -right-1 w-1 h-1 rounded-full bg-secondary/80 animate-ping"
                style={{ animationDuration: "3s", animationDelay: "1s" }}
              />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-none">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-center lg:text-left">
              About <span className="gradient-text">Me</span>
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 text-center lg:text-left">
              I'm a passionate AI Engineer with expertise in building intelligent
              systems that solve real-world problems. With a strong foundation in
              machine learning, deep learning, and natural language processing, I
              create solutions that push the boundaries of what's possible.
            </p>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
              My journey in AI began with a curiosity about how machines can learn
              and adapt. Today, I specialize in developing end-to-end ML pipelines,
              computer vision applications, and AI-powered automation tools that
              drive efficiency and innovation.
            </p>

            {/* Tech Stack Title */}
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Tech Stack</h3>

            {/* Skills Grid */}
            <div ref={skillsRef} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3 mb-8">
              {skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 p-2.5 sm:p-4 rounded-lg sm:rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 group"
                  >
                    <Icon
                      size={20}
                      weight="light"
                      className="text-muted-foreground group-hover:text-primary transition-colors sm:w-6 sm:h-6"
                    />
                    <span className="text-[10px] sm:text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
