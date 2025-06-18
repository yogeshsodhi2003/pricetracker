// components/Navbar.tsx

import { Search, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-xl font-bold tracking-tight text-black">
        PriceTrackr
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4">
        {/* Search Icon */}
        <button className="text-gray-600 hover:text-black transition">
          <Search size={20} />
        </button>

        {/* User Icon */}
        <button className="text-gray-600 hover:text-black transition">
          <User size={20} />
        </button>
      </div>
    </nav>
  );
}
