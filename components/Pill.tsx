import React from "react";

interface PillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Pill: React.FC<PillProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border transition-colors duration-200 ${
        isActive
          ? "bg-black text-white border-black"
          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
      }`}
    >
      {label}
    </button>
  );
};

export default Pill;
