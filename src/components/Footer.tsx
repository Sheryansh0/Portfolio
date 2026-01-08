import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  Heart,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    gsap.fromTo(
      footer.children,
      { y: 40, opacity: 0, filter: "blur(5px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-12 border-t border-border overflow-hidden"
    >
      {/* Background particles */}
      <div className="glow-orb w-40 h-40 bottom-0 left-1/4 opacity-10" />
      <div className="glow-orb glow-orb-cyan w-32 h-32 top-0 right-1/3 opacity-10" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Tagline */}
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              Building the future with AI
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {["Home", "About", "Projects", "Achievements", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(`#${item.toLowerCase()}`);
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download="Bachchu_Shreyansh_Resume.pdf"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Resume
            </a>
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Sheryansh0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <GithubLogo size={20} weight="light" />
            </a>
            <a
              href="https://www.linkedin.com/in/bachchu-shreyansh/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <LinkedinLogo size={20} weight="light" />
            </a>
            <a
              href="mailto:bachchushreyansh@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <EnvelopeSimple size={20} weight="light" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Made by Bachchu Shreyansh © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
