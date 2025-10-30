import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-900 hover:opacity-80 transition-opacity"
        >
          Evently<span className="text-gray-500">.</span>
        </Link>

        {/* User Initial Logo */}
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white font-semibold text-lg shadow-md hover:scale-105 transition-transform cursor-pointer">
            R
          </div>
        </div>
      </div>
    </nav>
  );
}
