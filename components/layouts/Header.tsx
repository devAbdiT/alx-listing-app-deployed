import React, { useState } from "react";
import Link from "next/link";

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const accommodationTypes = [
    "Rooms",
    "Mansion",
    "Countryside",
    "Beachfront",
    "Cabins",
    "Luxury",
    "Apartments",
    "Villas",
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">AirBnB</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search destinations, properties, or amenities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <button className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              Sign In
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Accommodation Types Navigation */}
      <nav className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto py-3">
            {accommodationTypes.map((type) => (
              <button
                key={type}
                className="whitespace-nowrap text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium px-2 py-1 rounded hover:bg-gray-50"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
