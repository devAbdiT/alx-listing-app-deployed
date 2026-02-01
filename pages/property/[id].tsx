import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import PropertyDetail from "@/components/property/PropertyDetail";
import { PropertyProps } from "@/interfaces"; // Changed from "@/types"

interface PropertyPageProps {
  property: PropertyProps;
}

const PropertyDetailPage = ({ property }: PropertyPageProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading property details...</p>
        </div>
      </div>
    );
  }

  const calculateDiscountPrice = () => {
    if (property.discount && property.discount !== "") {
      const discount = parseInt(property.discount);
      return property.price - (property.price * discount) / 100;
    }
    return null;
  };

  const discountedPrice = calculateDiscountPrice();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => router.push("/properties")}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Properties
        </button>

        {/* Main property detail */}
        <PropertyDetail property={property} />

        {/* Additional details section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Property info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">About this property</h2>
              <p className="text-gray-700">
                Experience luxury and comfort at {property.name}. Located in the
                heart of {property.address.city}, this property offers
                exceptional amenities and stunning views. Perfect for{" "}
                {property.offers.occupants}
                guests looking for a memorable stay.
              </p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">What this place offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.category.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Booking info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4">Booking Information</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per night:</span>
                  <span className="font-bold">${property.price}</span>
                </div>

                {discountedPrice && (
                  <>
                    <div className="flex justify-between text-red-600">
                      <span>Discount ({property.discount}%):</span>
                      <span>
                        -${(property.price - discountedPrice).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Final price:</span>
                      <span className="text-green-600">
                        ${discountedPrice.toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Accommodates: {property.offers.occupants} guests</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.2 6.5 10.266a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Rating: {property.rating} stars</span>
                </div>
              </div>

              <button
                onClick={() => alert(`Booking ${property.name}`)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Book Now
              </button>

              <p className="text-center text-gray-500 text-sm mt-3">
                No booking fees • Free cancellation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/properties/${id}`,
    );

    if (!res.ok) {
      return {
        notFound: true,
      };
    }

    const property = await res.json();

    return {
      props: {
        property,
      },
    };
  } catch (error) {
    console.error("Error fetching property:", error);
    return {
      notFound: true,
    };
  }
};

export default PropertyDetailPage;
