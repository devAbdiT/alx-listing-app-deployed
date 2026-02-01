import React from "react";
import { PropertyProps } from "@/interfaces"; // Changed from "@/types"
import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  property: PropertyProps;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link href={`/property/${property.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
        <div className="h-48 bg-gray-200 relative">
          <Image
            src={property.image}
            alt={property.name}
            fill
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {property.discount && property.discount !== "" && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
              {property.discount}% OFF
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{property.name}</h3>
          <p className="text-gray-600 text-sm mb-2">
            {property.address.city}, {property.address.country}
          </p>
          <div className="flex items-center mb-2">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-sm font-medium">{property.rating}</span>
          </div>
          <div className="text-xs text-gray-500 mb-3">
            {property.offers.bed} bed • {property.offers.shower} shower •{" "}
            {property.offers.occupants} guests
          </div>
          <div className="font-bold text-lg">
            ${property.price}{" "}
            <span className="text-gray-600 text-sm">/ night</span>
          </div>
          {/* Display categories */}
          {property.category && property.category.length > 0 && (
            <div className="mt-2">
              <div className="flex flex-wrap gap-1">
                {property.category.slice(0, 2).map((cat, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {cat}
                  </span>
                ))}
                {property.category.length > 2 && (
                  <span className="text-gray-500 text-xs px-2 py-1">
                    +{property.category.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
