import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Brain, 
  Database, 
  Cloud,
  Terminal,
  Cube,
  DownloadSimple
} from '@phosphor-icons/react';
import profileImage from '@/assets/profile.png';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'Python', icon: Code },
  { name: 'TensorFlow', icon: Brain },
  { name: 'PyTorch', icon: Brain },
  { name: 'React', icon: Code },
  { name: 'FastAPI', icon: Terminal },
  { name: 'Docker', icon: Cube },
  { name: 'AWS', icon: Cloud },
  { name: 'MongoDB', icon: Database },
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
      { x: -100, opacity: 0, filter: 'blur(10px)' },
      {
        x: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Content animation
    gsap.fromTo(
      content,
      { y: 60, opacity: 0, filter: 'blur(10px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
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
        ease: 'power3.out',
        scrollTrigger: {
          trigger: skillsContainer,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
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
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="glow-orb w-80 h-80 -top-40 right-1/4 opacity-30" />
      <div className="glow-orb glow-orb-cyan w-64 h-64 bottom-0 -left-32 opacity-20" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary via-accent to-secondary opacity-30 blur-2xl animate-pulse-glow" />
              
              {/* Image container */}
              <div className="relative rounded-full overflow-hidden aspect-square border-2 border-primary/30">
                <img
                  src={profileImage}
                  alt="Bachchu Shreyansh"
                  className="relative z-10 w-full h-full object-cover object-top scale-100"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <h2 className="section-title">
              About <span className="gradient-text">Me</span>
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              I'm a passionate AI Engineer with expertise in machine learning, 
              deep learning, and full-stack development. I love building intelligent 
              systems that solve real-world problems and create meaningful impact.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              With a strong foundation in data science and software engineering, 
              I specialize in developing AI-powered applications, from computer vision 
              systems to natural language processing solutions. My goal is to push the 
              boundaries of what's possible with artificial intelligence.
            </p>

            {/* Tech Stack Title */}
            <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>

            {/* Skills Grid */}
            <div ref={skillsRef} className="grid grid-cols-4 gap-3 mb-8">
              {skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 group"
                  >
                    <Icon size={24} weight="light" className="text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{skill.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Resume button */}
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border/50 bg-card/30 text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadSimple size={20} weight="light" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
