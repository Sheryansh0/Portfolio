import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';

import project1 from '@/assets/project-1.png';
import project2 from '@/assets/project-2.png';
import project3 from '@/assets/project-3.png';
import project4 from '@/assets/project-4.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Food Calorie Estimation',
    description: 'AI-powered system that estimates calorie content from food images using deep learning and computer vision.',
    image: project1,
    techStack: ['Python', 'TensorFlow', 'CNN', 'Flask'],
  },
  {
    title: 'Donation Website',
    description: 'Modern donation platform with secure payment processing and real-time tracking of contributions.',
    image: project2,
    techStack: ['React', 'Node.js', 'Stripe', 'MongoDB'],
  },
  {
    title: 'AI Resume Screener',
    description: 'Intelligent resume parsing and candidate matching system using NLP and machine learning algorithms.',
    image: project3,
    techStack: ['Python', 'NLP', 'FastAPI', 'React'],
  },
  {
    title: 'Pneumonia Detection',
    description: 'Deep learning model for detecting pneumonia from chest X-ray images with high accuracy.',
    image: project4,
    techStack: ['PyTorch', 'CNN', 'Medical AI', 'Docker'],
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const container = cardsContainerRef.current;

    if (!section || !title || !container) return;

    // Title animation
    gsap.fromTo(
      title,
      { y: 60, opacity: 0, filter: 'blur(10px)' },
      {
        y: 0,
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

    // Cards animation
    gsap.fromTo(
      container.children,
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
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
      id="projects"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="glow-orb w-96 h-96 top-1/4 -right-48 opacity-20" />
      <div className="glow-orb glow-orb-cyan w-72 h-72 bottom-1/4 -left-36 opacity-15" />

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A collection of my recent work showcasing AI, machine learning, and web development expertise.
          </p>
        </div>

        {/* Projects horizontal scroll */}
        <div
          ref={cardsContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {projects.map((project) => (
            <div key={project.title} className="snap-start">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        {/* Scroll hint for mobile */}
        <div className="flex justify-center mt-6 md:hidden">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Swipe to explore</span>
            <span className="animate-pulse">→</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
