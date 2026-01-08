import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, House } from "@phosphor-icons/react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log 404 errors in development
    if (import.meta.env.DEV) {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative text-center max-w-md">
        {/* 404 Number */}
        <h1 
          className="text-[10rem] md:text-[12rem] font-bold leading-none gradient-text opacity-80"
          aria-label="Error 404"
        >
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 -mt-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
          >
            <ArrowLeft size={20} weight="bold" />
            Go Back
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <House size={20} weight="bold" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
