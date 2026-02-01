import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/layouts/Layout";
import BookingForm from "@/components/booking/BookingForm";
import OrderSummary from "@/components/booking/OrderSummary";
import CancellationPolicy from "@/components/booking/CancellationPolicy";
import { PropertyProps, BookingData } from "@/interfaces";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function BookingPage() {
  const router = useRouter();
  const { propertyId } = router.query;
  const [property, setProperty] = useState<PropertyProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [bookingResult, setBookingResult] = useState<any>(null);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  // Fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) return;

      try {
        const response = await axios.get(`/api/properties/${propertyId}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  const handleBookingSubmit = async (bookingData: any) => {
    setBookingStatus("loading");
    setBookingResult(null);

    try {
      const response = await axios.post("/api/bookings", bookingData);

      setBookingStatus("success");
      setBookingResult(response.data);
      setBookingDetails(bookingData);

      // Store booking in localStorage for confirmation page
      localStorage.setItem(
        "lastBooking",
        JSON.stringify(response.data.booking),
      );

      // Redirect to confirmation page after 2 seconds
      setTimeout(() => {
        router.push(`/booking/confirmation/${response.data.bookingId}`);
      }, 2000);
    } catch (error: any) {
      setBookingStatus("error");
      setBookingResult({
        error:
          error.response?.data?.error ||
          "Failed to process booking. Please try again.",
      });
      console.error("Booking error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Property Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The property you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
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
          Back to Property
        </button>

        {/* Booking Status Messages */}
        {bookingStatus === "success" && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start">
            <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
            <div>
              <h3 className="font-semibold text-green-800">
                Booking Successful!
              </h3>
              <p className="text-green-700">
                Your booking has been confirmed. Redirecting to confirmation
                page...
              </p>
              <p className="text-sm text-green-600 mt-1">
                Booking ID: {bookingResult.bookingId}
              </p>
            </div>
          </div>
        )}

        {bookingStatus === "error" && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start">
            <AlertCircle className="w-6 h-6 text-red-500 mr-3 mt-1" />
            <div>
              <h3 className="font-semibold text-red-800">Booking Failed</h3>
              <p className="text-red-700">{bookingResult.error}</p>
              <button
                onClick={() => setBookingStatus("idle")}
                className="text-sm text-red-600 hover:text-red-800 mt-2"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Complete Your Booking
              </h1>
              <p className="text-gray-600 mb-6">
                You're booking{" "}
                <span className="font-semibold text-blue-600">
                  {property.name}
                </span>
              </p>

              <BookingForm property={property} onSubmit={handleBookingSubmit} />
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <CancellationPolicy />
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary
                property={property}
                bookingDetails={bookingDetails}
              />

              {/* Booking Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Booking Information
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Free cancellation up to 48 hours before check-in
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Best price guarantee
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    24/7 customer support
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Secure payment processing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
