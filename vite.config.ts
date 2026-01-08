import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Production optimizations
  build: {
    // Target modern browsers for smaller bundle
    target: "es2020",
    // Enable minification with esbuild (faster than terser)
    minify: "esbuild",
    // Generate source maps for production debugging
    sourcemap: mode === "production" ? "hidden" : true,
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // Animation libraries
          "animation-vendor": ["gsap"],
          // UI components
          "ui-vendor": ["@radix-ui/react-tooltip", "@radix-ui/react-toast"],
          // Query client
          "query-vendor": ["@tanstack/react-query"],
        },
        // Clean chunk naming
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || "";
          if (/\.(gif|jpe?g|png|svg|webp)$/i.test(info)) {
            return "assets/images/[name]-[hash][extname]";
          }
          if (/\.css$/i.test(info)) {
            return "assets/css/[name]-[hash][extname]";
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(info)) {
            return "assets/fonts/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
    // Warn if chunks are too large
    chunkSizeWarningLimit: 500,
    // CSS code splitting
    cssCodeSplit: true,
    // Inline assets smaller than 4kb
    assetsInlineLimit: 4096,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "gsap"],
  },
  // Environment variable prefix
  envPrefix: "VITE_",
}));
