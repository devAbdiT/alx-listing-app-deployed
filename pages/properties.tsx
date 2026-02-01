import { GetServerSideProps } from "next";
import PropertyCard from "@/components/property/PropertyCard";
import { PropertyProps } from "@/interfaces";
import Link from "next/link";

interface PropertiesPageProps {
  properties: PropertyProps[];
}

const PropertiesPage = ({ properties }: PropertiesPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">All Properties</h1>
          <p className="text-gray-600 mt-2">
            Browse our complete collection of {properties.length} properties
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {properties.length} of {properties.length} properties
            </div>
            <div className="flex gap-4">
              <select className="border rounded-lg px-3 py-2">
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: Highest First</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
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

        {/* View More Button (if you have pagination) */}
        <div className="text-center mt-12">
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            Load More Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
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

export default PropertiesPage;
