import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";

import project1 from "@/assets/project-1.png";
import project2 from "@/assets/project-2.png";
import project3 from "@/assets/project-3.png";
import project4 from "@/assets/project-4.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Pneumonia Detection System",
    description:
      "Ensemble deep learning model (ConvNeXt-Tiny + EfficientNetV2-S) achieving 90% accuracy with Grad-CAM heatmaps for medical interpretability and real-time predictions.",
    image: project4,
    techStack: ["PyTorch", "ConvNeXt", "EfficientNet", "Grad-CAM"],
    githubUrl: "https://github.com/Sheryansh0/pneumonet-ai-detection",
    liveUrl: "https://pneumonet.me/",
  },
  {
    id: 2,
    title: "Sahayata - Donation Platform",
    description:
      "Secure P2P donation platform with Razorpay integration, real-time payment tracking, and multi-cause support for charitable initiatives.",
    image: project2,
    techStack: ["React", "Node.js", "Razorpay", "MongoDB"],
    githubUrl: "https://github.com/Sheryansh0/Sahayata_Backend",
    liveUrl: "https://sahayata0.vercel.app/",
  },
  {
    id: 3,
    title: "AI Food Analyzer",
    description:
      "End-to-end AI food image analysis app with PyTorch inference pipeline (ViT, EfficientNetV2, ConvNeXt) for food classification and nutrition assessment.",
    image: project1,
    techStack: ["PyTorch", "Flask", "Docker", "Azure"],
    githubUrl: "https://github.com/Sheryansh0/AI-FOOD-ANALYZER",
    liveUrl: "https://calorieai.me/",
  },
  {
    id: 4,
    title: "AI Resume Screening Tool",
    description:
      "AI-driven resume analysis with NLP-based skill matching, BERT sentiment analysis for cultural fit, and spaCy NER for accelerated profile generation.",
    image: project3,
    techStack: ["Python", "BERT", "spaCy", "NLP"],
    githubUrl: "https://github.com/Sheryansh0/smart-resume-screening",
    liveUrl: "",
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section || !title) return;

    // Title animation
    gsap.fromTo(
      title,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Cards animation
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="glow-orb w-72 sm:w-96 h-72 sm:h-96 top-1/4 -right-48 opacity-20" />
      <div className="glow-orb glow-orb-cyan w-56 sm:w-72 h-56 sm:h-72 bottom-1/4 -left-36 opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-10 sm:mb-16">
          <p className="text-primary font-medium mb-3 sm:mb-4 tracking-widest uppercase text-xs sm:text-sm">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            A collection of my recent work showcasing AI, machine learning, and
            web development expertise.
          </p>
        </div>

        {/* Projects grid - Bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative overflow-hidden rounded-2xl transition-all duration-500 border border-primary/10 hover:border-primary/30"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--card) / 0.6) 0%, hsl(var(--card) / 0.3) 100%)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px hsl(var(--background) / 0.5), inset 0 1px 0 hsl(var(--foreground) / 0.05)',
              }}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                <img
                  src={project.image}
                  alt={`Screenshot of ${project.title} project`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                {/* Links overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} source code on GitHub`}
                    className="p-2 rounded-full border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    style={{
                      background: 'hsl(var(--card) / 0.8)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <GithubLogo size={18} weight="bold" aria-hidden="true" />
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} live demo`}
                      className="p-2 rounded-full border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      style={{
                        background: 'hsl(var(--card) / 0.8)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs border border-primary/20 text-muted-foreground rounded-full"
                      style={{
                        background: 'hsl(var(--primary) / 0.1)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View project link */}
                <a
                  href={project.liveUrl}
                  className="inline-flex items-center gap-2 mt-4 text-primary text-sm font-medium hover:gap-3 transition-all duration-300"
                >
                  View Project
                  <ArrowUpRight size={16} weight="bold" />
                </a>
              </div>

              {/* Glowing border on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 blur-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
