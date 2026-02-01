import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-lg font-bold">AirBnB</span>
            <span className="text-gray-400 text-sm">
              © {currentYear} All rights reserved.
            </span>
          </div>

          {/* Links */}
          <div className="flex space-x-6 text-sm">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <SocialIcon href="#" icon="twitter" />
            <SocialIcon href="#" icon="facebook" />
            <SocialIcon href="#" icon="instagram" />
          </div>
        </div>
      </div>
    </footer>
  );
};

// Simple Social Icon Component
const SocialIcon: React.FC<{ href: string; icon: string }> = ({
  href,
  icon,
}) => {
  return (
    <Link
      href={href}
      className="text-gray-400 hover:text-white transition-colors"
      aria-label={icon}
    >
      {icon === "twitter" && "🐦"}
      {icon === "facebook" && "📘"}
      {icon === "instagram" && "📷"}
    </Link>
  );
};

export default Footer;
