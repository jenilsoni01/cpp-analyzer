// import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Trophy } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-8 w-8" />
            <span className="font-bold text-xl">CP Analyzer</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="hover:text-indigo-200 transition-colors">
              Dashboard
            </Link>
            {/* <Link to="/leaderboard" className="flex items-center space-x-1 hover:text-indigo-200 transition-colors">
              <Trophy className="h-4 w-4" />
              <span>Leaderboard</span>
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;