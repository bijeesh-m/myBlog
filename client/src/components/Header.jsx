import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600"
        >
          MyApp
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            About
          </Link>

          <Link
            to="/users"
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Users
          </Link>

          <Link
            to="/contact"
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Contact
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-gray-700 font-medium hover:text-indigo-600 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Register
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;