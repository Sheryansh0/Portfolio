import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Trophy,
  Target,
  Code,
  Medal,
  ArrowSquareOut,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    id: 1,
    icon: Trophy,
    category: "Competition",
    categoryColor: "bg-primary",
    year: "2024",
    title: "2nd Prize - TechXcelerate Hackathon",
    description:
      "Secured second position in a competitive hackathon with innovative AI solution (₹15,000 cash prize)",
    featured: true,
    link: "https://res.cloudinary.com/djfhbyk7a/image/upload/v1755975763/hackathon_certificate_ee5a4x.jpg",
    linkLabel: "View Certificate",
  },
  {
    id: 2,
    icon: Target,
    category: "Ranking",
    categoryColor: "bg-accent",
    year: "2024",
    title: "Top 36 - GeeksForGeeks University Level",
    description:
      "Ranked among top 36 performers in competitive programming at university level",
    featured: true,
    link: "https://www.geeksforgeeks.org/profile/bachchushreyansh?tab=activity",
    linkLabel: "View Profile",
  },
  {
    id: 3,
    icon: Code,
    category: "Coding",
    categoryColor: "bg-secondary",
    year: "Ongoing",
    title: "400+ LeetCode Problems Solved",
    description:
      "Demonstrated strong problem-solving skills across various algorithmic challenges",
    featured: false,
    link: "https://leetcode.com/u/bachchushreyansh/",
    linkLabel: "View Profile",
  },
  {
    id: 4,
    icon: Medal,
    category: "Recognition",
    categoryColor: "bg-primary",
    year: "2024",
    title: "Code360 Topper",
    description:
      "Achieved top position on Code360 platform in March and October 2024",
    featured: false,
    link: "https://www.naukri.com/code360/profile/Bachchu",
    linkLabel: "View Profile",
  },
];

const AchievementsSection = () => {
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
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const featuredAchievements = achievements.filter((a) => a.featured);
  const otherAchievements = achievements.filter((a) => !a.featured);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="glow-orb w-80 h-80 top-20 -right-40 opacity-20" />
      <div className="glow-orb glow-orb-cyan w-64 h-64 bottom-40 -left-32 opacity-15" />

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">ACHIEVEMENTS</span>
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Milestones that mark my journey in technology and innovation
          </p>
        </div>

        {/* Featured achievements - 2 columns */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {featuredAchievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 border border-primary/10 hover:border-primary/30"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--card) / 0.6) 0%, hsl(var(--card) / 0.3) 100%)",
                  backdropFilter: "blur(20px)",
                  boxShadow:
                    "0 8px 32px hsl(var(--background) / 0.5), inset 0 1px 0 hsl(var(--foreground) / 0.05)",
                }}
              >
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--accent) / 0.1))",
                    }}
                  >
                    <Icon
                      size={40}
                      weight="fill"
                      className="text-primary"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${achievement.categoryColor} text-white`}
                      >
                        {achievement.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {achievement.year}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {achievement.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-3">
                      {achievement.description}
                    </p>

                    {achievement.link && (
                      <a
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors duration-300"
                      >
                        {achievement.linkLabel}
                        <ArrowSquareOut size={16} weight="bold" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Other achievements - 2 columns */}
        <div className="grid md:grid-cols-2 gap-6">
          {otherAchievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.id}
                ref={(el) =>
                  (cardsRef.current[featuredAchievements.length + index] = el)
                }
                className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 border border-primary/10 hover:border-primary/30"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--card) / 0.6) 0%, hsl(var(--card) / 0.3) 100%)",
                  backdropFilter: "blur(20px)",
                  boxShadow:
                    "0 8px 32px hsl(var(--background) / 0.5), inset 0 1px 0 hsl(var(--foreground) / 0.05)",
                }}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div
                    className="p-4 rounded-xl mb-4"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--secondary) / 0.2), hsl(var(--primary) / 0.1))",
                    }}
                  >
                    <Icon
                      size={32}
                      weight="fill"
                      className="text-secondary"
                    />
                  </div>

                  {/* Category */}
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${achievement.categoryColor} text-white mb-3`}
                  >
                    {achievement.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {achievement.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-3">
                    {achievement.description}
                  </p>

                  {/* Year */}
                  <span className="text-sm text-muted-foreground font-medium mb-3">
                    {achievement.year}
                  </span>

                  {/* Link */}
                  {achievement.link && (
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors duration-300"
                    >
                      {achievement.linkLabel}
                      <ArrowSquareOut size={16} weight="bold" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
