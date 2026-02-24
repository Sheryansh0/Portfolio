import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
  EnvelopeSimple,
  Phone,
  MapPin,
  PaperPlaneTilt,
  CheckCircle,
  XCircle,
} from "@phosphor-icons/react";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: EnvelopeSimple,
    label: "Email",
    value: "bachchushreyansh@gmail.com",
    href: "mailto:bachchushreyansh@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9182593182",
    href: "tel:+919182593182",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "India",
    href: null,
  },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
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
      { y: 60, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
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

    // Form inputs animation
    gsap.fromTo(
      form.querySelectorAll(".form-field"),
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: form,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Info cards animation
    gsap.fromTo(
      info.querySelectorAll(".info-card"),
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: info,
          start: "top 80%",
          toggleActions: "play none none reverse",
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

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "1f74f990-c0b4-4754-8eef-2226dcfd2d36";
      const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "bachchushreyansh@gmail.com";
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to_email: contactEmail,
          subject: `Portfolio Contact: Message from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Reset form on success
        setFormData({ name: "", email: "", message: "" });
        toast.success("Message sent successfully!", {
          description: "I'll get back to you soon.",
          icon: <CheckCircle size={20} weight="fill" className="text-green-400" />,
          style: {
            background: "rgba(10, 10, 20, 0.95)",
            border: "1px solid rgba(168, 85, 247, 0.3)",
            color: "#fff",
            backdropFilter: "blur(20px)",
          },
        });
      } else {
        toast.error("Failed to send message", {
          description: "Please try again or email me directly.",
          icon: <XCircle size={20} weight="fill" className="text-red-400" />,
          style: {
            background: "rgba(10, 10, 20, 0.95)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#fff",
            backdropFilter: "blur(20px)",
          },
        });
      }
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again or email me directly.",
        icon: <XCircle size={20} weight="fill" className="text-red-400" />,
        style: {
          background: "rgba(10, 10, 20, 0.95)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          color: "#fff",
          backdropFilter: "blur(20px)",
        },
      });
    }

    setIsSubmitting(false);

    // Animate button
    const button = formRef.current?.querySelector('button[type="submit"]');
    if (button) {
      gsap.fromTo(
        button,
        { scale: 1 },
        {
          scale: 1.05,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        }
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="glow-orb w-60 sm:w-80 h-60 sm:h-80 top-0 left-1/4 opacity-20" />
      <div className="glow-orb glow-orb-cyan w-48 sm:w-64 h-48 sm:h-64 bottom-20 right-1/4 opacity-15" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-8 sm:mb-12">
          <p className="text-primary font-medium mb-3 sm:mb-4 tracking-widest uppercase text-xs sm:text-sm">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Have a project in mind? Let's discuss how we can bring your ideas to
            life with AI.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {/* Contact form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            <div className="form-field">
              <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-card/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors text-sm sm:text-base"
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-card/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors text-sm sm:text-base"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-field">
              <label
                htmlFor="message"
                className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-card/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none text-sm sm:text-base"
                placeholder="Tell me about your project..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 sm:py-4 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 text-sm sm:text-base"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message
                  <PaperPlaneTilt size={20} weight="bold" />
                </>
              )}
            </button>
          </form>

          {/* Contact info */}
          <div ref={infoRef} className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            {/* Info cards */}
            {contactInfo.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="info-card flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card/30 border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="p-2 sm:p-3 rounded-md sm:rounded-lg bg-primary/10 border border-primary/30">
                    <Icon size={20} weight="light" className="text-primary sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="font-medium text-foreground text-sm sm:text-base">{item.value}</p>
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
            <div className="border-t border-border/30 pt-4 sm:pt-6">
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                Connect with me
              </p>

              <div className="flex items-center gap-3 sm:gap-4">
                <a
                  href="https://github.com/Sheryansh0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card/30 border border-border/50 hover:border-primary/50 hover:bg-card/50 transition-all duration-300 group"
                >
                  <GithubLogo
                    size={24}
                    weight="light"
                    className="text-muted-foreground group-hover:text-foreground transition-colors sm:w-8 sm:h-8"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/bachchu-shreyansh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card/30 border border-border/50 hover:border-primary/50 hover:bg-card/50 transition-all duration-300 group"
                >
                  <LinkedinLogo
                    size={24}
                    weight="light"
                    className="text-muted-foreground group-hover:text-foreground transition-colors sm:w-8 sm:h-8"
                  />
                </a>
                <a
                  href="https://x.com/BACHCHUSHR37310"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card/30 border border-border/50 hover:border-primary/50 hover:bg-card/50 transition-all duration-300 group"
                >
                  <TwitterLogo
                    size={24}
                    weight="light"
                    className="text-muted-foreground group-hover:text-foreground transition-colors sm:w-8 sm:h-8"
                  />
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
