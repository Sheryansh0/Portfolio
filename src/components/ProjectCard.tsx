import { ArrowUpRight } from '@phosphor-icons/react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  link?: string;
}

const ProjectCard = ({ title, description, image, techStack, link = '#' }: ProjectCardProps) => {
  return (
    <div className="glass-card-hover group flex-shrink-0 w-[320px] sm:w-[380px] p-1">
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={link}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all duration-300"
        >
          View Project
          <ArrowUpRight size={16} weight="bold" />
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
