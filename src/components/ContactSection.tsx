import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GithubLogo, 
  LinkedinLogo, 
  EnvelopeSimple,
  PaperPlaneTilt,
  DownloadSimple
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const form = formRef.current;
    const socials = socialsRef.current;

    if (!section || !title || !form || !socials) return;

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

    // Form inputs animation
    gsap.fromTo(
      form.querySelectorAll('.form-field'),
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: form,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Socials animation
    gsap.fromTo(
      socials.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: socials,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);

    // Animate button
    const button = formRef.current?.querySelector('button[type="submit"]');
    if (button) {
      gsap.fromTo(
        button,
        { scale: 1 },
        { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' }
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="glow-orb w-80 h-80 top-0 left-1/4 opacity-20" />
      <div className="glow-orb glow-orb-cyan w-64 h-64 bottom-20 right-1/4 opacity-15" />

      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          {/* Section header */}
          <div ref={titleRef} className="text-center mb-12">
            <h2 className="section-title">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Have a project in mind? Let's work together to create something amazing.
            </p>
          </div>

          {/* Contact form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-card p-8 space-y-6"
          >
            <div className="form-field">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-glass"
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-glass"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="input-glass resize-none"
                placeholder="Tell me about your project..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-neon w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <PaperPlaneTilt size={20} weight="bold" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Social links */}
          <div
            ref={socialsRef}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-card rounded-full hover:border-primary transition-all duration-300 group"
            >
              <GithubLogo
                size={24}
                weight="light"
                className="text-muted-foreground group-hover:text-primary transition-colors"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-card rounded-full hover:border-primary transition-all duration-300 group"
            >
              <LinkedinLogo
                size={24}
                weight="light"
                className="text-muted-foreground group-hover:text-primary transition-colors"
              />
            </a>
            <a
              href="mailto:shreyansh@example.com"
              className="p-3 glass-card rounded-full hover:border-primary transition-all duration-300 group"
            >
              <EnvelopeSimple
                size={24}
                weight="light"
                className="text-muted-foreground group-hover:text-primary transition-colors"
              />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-card rounded-full hover:border-primary transition-all duration-300 group"
            >
              <DownloadSimple
                size={24}
                weight="light"
                className="text-muted-foreground group-hover:text-primary transition-colors"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
