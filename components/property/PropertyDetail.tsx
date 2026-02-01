import React from "react";
import Image from "next/image";
import { PropertyProps } from "@/interfaces"; // Changed from "@/types"

interface PropertyDetailProps {
  property: PropertyProps;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-96 bg-gray-200 relative">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="w-full h-full object-cover"
          sizes="100vw"
          priority
        />
        {property.discount && property.discount !== "" && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-bold">
            {property.discount}% OFF
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-2xl mb-1">{property.name}</h3>
            <p className="text-gray-600 text-base mb-2">
              {property.address.city}, {property.address.state},{" "}
              {property.address.country}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">
              ${property.price}
              <span className="text-gray-600 text-base font-normal">
                {" "}
                / night
              </span>
            </div>
            {property.discount && property.discount !== "" && (
              <p className="text-red-600 text-sm mt-1">
                Save {property.discount}% on your stay!
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center mb-6">
          <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="ml-1 text-sm font-bold">{property.rating}</span>
          </div>
          <span className="mx-3 text-gray-300">•</span>
          <div className="text-sm text-gray-500">
            {property.offers.bed} bed • {property.offers.shower} shower •{" "}
            {property.offers.occupants} guests
          </div>
        </div>

        {/* Display all categories */}
        {property.category && property.category.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold mb-2 text-gray-700">
              Features & Amenities
            </h4>
            <div className="flex flex-wrap gap-2">
              {property.category.map((cat, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 text-sm px-3 py-1.5 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetail;
