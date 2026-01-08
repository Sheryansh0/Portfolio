# Bachchu Shreyansh Portfolio

A modern, production-ready portfolio website built with React, TypeScript, Vite, and Tailwind CSS featuring stunning 3D animations and glassmorphism design.

## ✨ Features

- **Modern Design**: Glassmorphism UI with neon accents and 3D Three.js background
- **Performance Optimized**: Code splitting, lazy loading, optimized images
- **SEO Ready**: Meta tags, Open Graph, sitemap, robots.txt
- **Accessibility**: ARIA labels, skip links, keyboard navigation
- **Responsive**: Mobile-first design that works on all devices
- **Contact Form**: Integrated with Web3Forms for email delivery
- **Animations**: Smooth GSAP scroll-triggered animations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:8080
```

### Production Build

```bash
# Type check and build
npm run build

# Preview production build locally
npm run preview

# Or build and preview in one command
npm run preview:build
```

## 📁 Project Structure

```
├── public/
│   ├── _headers          # Security headers (Netlify/Cloudflare)
│   ├── _redirects        # SPA routing redirects
│   ├── robots.txt        # Search engine crawling rules
│   ├── sitemap.xml       # SEO sitemap
│   └── site.webmanifest  # PWA manifest
├── src/
│   ├── components/       # React components
│   │   ├── ui/           # Reusable UI components
│   │   └── ErrorBoundary.tsx
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── assets/           # Images and static assets
├── .env.example          # Environment variables template
├── vercel.json           # Vercel deployment config
└── vite.config.ts        # Vite configuration
```

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Contact Form
VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here

# Site Configuration
VITE_SITE_URL=https://yourdomain.com
VITE_CONTACT_EMAIL=your@email.com
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy automatically

### Netlify

1. Push to GitHub
2. Import on [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### Manual Deployment

```bash
npm run build
# Upload contents of `dist/` folder to your hosting
```

## 🔧 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type check and production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run type-check` | TypeScript type checking |
| `npm run analyze` | Analyze bundle size |

## 📦 Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Animations**: GSAP, Three.js
- **UI Components**: Radix UI, shadcn/ui
- **Form Handling**: Web3Forms

## 📝 Production Checklist

- [ ] Update canonical URL in `index.html`
- [ ] Update sitemap.xml with your domain
- [ ] Update robots.txt sitemap URL
- [ ] Configure Web3Forms access key
- [ ] Update social media handles
- [ ] Optimize and compress images (use WebP)
- [ ] Test on multiple devices
- [ ] Run Lighthouse audit

## 🖼️ Image Optimization

For best performance, optimize your images:

```bash
# Convert images to WebP format (recommended)
# Use tools like squoosh.app or imagemin

# Recommended sizes:
# - Project images: 800x450px (16:9), WebP, < 100KB
# - Profile image: 500x500px, WebP, < 150KB
# - Logo: 192x192px, PNG/WebP
```

## 📄 License

MIT License - feel free to use this template for your own portfolio!

---

Built by Bachchu Shreyansh
