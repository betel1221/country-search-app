import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gradient-to-br from-slate-50 to-white px-6">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 drop-shadow-md">
        Explore the World
      </h1>
      <p className="max-w-md text-center text-gray-500 leading-relaxed">
        Find detailed information about countries — flags, population, region, and more.
      </p>
      <Link to="/search" aria-label="Go to country search page" tabIndex={0}>
        <Button
          size="lg"
          className="transform transition hover:scale-105 hover:shadow-lg"
          aria-haspopup="true"
        >
          Start Searching
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;
