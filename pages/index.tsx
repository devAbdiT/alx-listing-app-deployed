// import React, { useState } from "react";
// import IMAGES from "../public/assets/image1.png";
// import Pill from "../components/Pill";
// import PropertyCard from "../components/PropertyCard";
// import { PROPERTYLISTINGSAMPLE } from "@/constants";

// const filters = [
//   "Top Villa",
//   "Self Checkin",
//   "Amazing Views",
//   "Luxury",
//   "Beachfront",
//   "Cabins",
//   "Countryside",
//   "Mansions",
// ];

// const Home: React.FC = () => {
//   const [activeFilters, setActiveFilters] = useState<string[]>([]);

//   const toggleFilter = (label: string) => {
//     setActiveFilters((prev) =>
//       prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]
//     );
//   };

//   return (
//     <div>
//       {/* Hero Section */}
//       <section
//         className="relative h-screen bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: `url(${IMAGES.src})` }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-40" />
//         <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
//           <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
//             Find your favorite place here!
//           </h1>
//           <p className="text-xl md:text-2xl lg:text-3xl">
//             The best prices for over 2 million properties worldwide.
//           </p>
//         </div>
//       </section>

//       {/* Filter Section */}
//       <section className="py-8 bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex flex-wrap gap-3">
//             {filters.map((filter) => (
//               <Pill
//                 key={filter}
//                 label={filter}
//                 isActive={activeFilters.includes(filter)}
//                 onClick={() => toggleFilter(filter)}
//               />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Listing Section */}
//       <section className="py-12 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {PROPERTYLISTINGSAMPLE.map((property, index) => (
//               <PropertyCard key={index} property={property} />
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import PropertyCard from "@/components/property/PropertyCard"; // Assume this component exists

// export default function Home() {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await axios.get("/api/properties");
//         setProperties(response.data);
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="grid grid-cols-3 gap-4">
//       {properties.map((property) => (
//         <PropertyCard key={property.id} property={property} />
//       ))}
//     </div>
//   );
// }

import { GetServerSideProps } from "next";
import PropertyCard from "@/components/property/PropertyCard";
import { PropertyProps } from "@/interfaces";

interface HomePageProps {
  properties: PropertyProps[];
}

const HomePage = ({ properties }: HomePageProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center text-white py-24 md:py-32"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/assets/image1.png")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10">
              Discover amazing properties around the world
            </p>
            <div className="bg-white p-6 rounded-xl shadow-2xl max-w-3xl">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="flex-1 p-4 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold whitespace-nowrap">
                  Search Properties
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Properties
            </h2>
            <p className="text-gray-600 mt-2">
              {properties.length} amazing properties available
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
              Filter
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
              Sort by
            </button>
          </div>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">4.8+</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
            <div className="text-gray-600">Properties Worldwide</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Customer Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetch from your local API
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/properties`,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }

    const properties = await res.json();

    return {
      props: {
        properties,
      },
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
    return {
      props: {
        properties: [],
      },
    };
  }
};

export default HomePage;
