import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 h-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white flex items-center font-bold text-xl">

            <Link to="/"> <span className="ml-[-250px]">React App</span></Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="text-white font-bold hover:underline">Login</Link>
            <Link to="/signup" className="text-white font-bold hover:underline">Sign Up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
