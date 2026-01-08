import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GithubLogo, 
  LinkedinLogo, 
  TwitterLogo,
  EnvelopeSimple,
  Phone,
  MapPin,
  PaperPlaneTilt,
  DownloadSimple
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: EnvelopeSimple,
    label: 'Email',
    value: 'shreyansh@example.com',
    href: 'mailto:shreyansh@example.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9876543210',
    href: 'tel:+919876543210',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
    href: null,
  },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

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
    const info = infoRef.current;

    if (!section || !title || !form || !info) return;

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

    // Info cards animation
    gsap.fromTo(
      info.querySelectorAll('.info-card'),
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: info,
          start: 'top 80%',
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
        { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' }
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
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-12">
          <p className="text-primary font-medium mb-4 tracking-widest uppercase text-sm">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="section-subtitle mx-auto">
            Have a project in mind? Let's discuss how we can bring your ideas to life with AI.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
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
                className="w-full px-4 py-3 rounded-lg bg-card/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
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
                className="w-full px-4 py-3 rounded-lg bg-card/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
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
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-card/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                placeholder="Tell me about your project..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  Send Message
                  <PaperPlaneTilt size={20} weight="bold" />
                </>
              )}
            </button>
          </form>

          {/* Contact info */}
          <div ref={infoRef} className="space-y-6">
            {/* Info cards */}
            {contactInfo.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="info-card flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                    <Icon size={24} weight="light" className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>
                </div>
              );

              return item.href ? (
                <a key={item.label} href={item.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}

            {/* Separator */}
            <div className="border-t border-border/30 pt-6">
              <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
              
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-card/30 border border-border/50 hover:border-primary/50 transition-colors group"
                >
                  <GithubLogo
                    size={20}
                    weight="light"
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                  />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-card/30 border border-border/50 hover:border-primary/50 transition-colors group"
                >
                  <LinkedinLogo
                    size={20}
                    weight="light"
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                  />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-card/30 border border-border/50 hover:border-primary/50 transition-colors group"
                >
                  <TwitterLogo
                    size={20}
                    weight="light"
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                  />
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center gap-2 text-sm font-medium"
                >
                  <DownloadSimple size={18} weight="light" />
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
