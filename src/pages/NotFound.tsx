import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-terminal-bg">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-orbitron font-black neon-text">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! This terminal is offline</p>
        <p className="mb-8 text-muted-foreground">The page you're looking for doesn't exist in our blockchain.</p>
        <Link 
          to="/" 
          className="inline-block bg-neon-lime text-terminal-bg px-6 py-3 rounded-lg font-orbitron font-bold hover:bg-neon-gold transition-colors"
        >
          Return to Terminal
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
