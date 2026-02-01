import React from "react";
import { PropertyProps } from "@/interfaces";

interface OrderSummaryProps {
  property: PropertyProps;
  bookingDetails?: any;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  property,
  bookingDetails,
}) => {
  const calculateTotal = () => {
    if (!bookingDetails) return 0;
    const nights = bookingDetails.totalNights || 1;
    const subtotal = property.price * nights;
    const fee = bookingDetails.bookingFee || Math.round(property.price * 0.1);
    return subtotal + fee;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Booking Summary
      </h2>

      {/* Property Info */}
      <div className="flex items-start mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <h3 className="font-semibold text-gray-900">{property.name}</h3>
          <div className="flex items-center mt-1">
            <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
              <span className="text-yellow-600 font-bold mr-1">★</span>
              <span className="text-sm font-medium">{property.rating}</span>
            </div>
            <span className="text-gray-500 text-sm ml-2">
              ({345} reviews) {/* FIXED: Hardcoded value */}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {property.address.city}, {property.address.country}
          </p>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">
            ${property.price} × {bookingDetails?.totalNights || 1} nights
          </span>
          <span className="font-medium">
            ${property.price * (bookingDetails?.totalNights || 1)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Booking fee</span>
          <span className="font-medium">
            ${bookingDetails?.bookingFee || Math.round(property.price * 0.1)}
          </span>
        </div>
        {property.discount && property.discount !== "" && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({property.discount}%)</span>
            <span>
              -$
              {Math.round((property.price * parseInt(property.discount)) / 100)}
            </span>
          </div>
        )}
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${calculateTotal()}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Includes taxes and fees</p>
        </div>
      </div>

      {/* Security Features */}
      <div className="bg-blue-50 rounded-xl p-4 mb-6">
        <div className="flex items-center mb-2">
          <span className="mr-2">🛡️</span>
          <span className="font-medium text-blue-800">Secure Booking</span>
        </div>
        <ul className="text-sm text-blue-700 space-y-1">
          <li className="flex items-center">
            <span className="mr-2">✓</span>
            SSL encrypted payment
          </li>
          <li className="flex items-center">
            <span className="mr-2">✓</span>
            Privacy protected
          </li>
          <li className="flex items-center">
            <span className="mr-2">✓</span>
            No hidden fees
          </li>
        </ul>
      </div>

      {/* Payment Methods */}
      <div className="border-t pt-4">
        <div className="flex items-center mb-3">
          <span className="mr-2">💳</span>
          <span className="text-sm text-gray-600">
            Accepted payment methods
          </span>
        </div>
        <div className="flex space-x-2">
          <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-600">VISA</span>
          </div>
          <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-600">MC</span>
          </div>
          <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-600">AMEX</span>
          </div>
          <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-600">PP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
