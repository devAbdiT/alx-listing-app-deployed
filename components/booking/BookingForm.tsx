import React, { useState } from "react";
import { PropertyProps } from "@/interfaces";
import { Calendar, Users, CreditCard, MapPin } from "lucide-react";

interface BookingFormProps {
  property: PropertyProps;
  onSubmit: (bookingData: any) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ property, onSubmit }) => {
  const [formData, setFormData] = useState({
    // Contact Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Stay Details
    checkInDate: "",
    checkOutDate: "",
    guests: 2,

    // Payment Information
    cardNumber: "",
    expirationDate: "",
    cvv: "",

    // Billing Address
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.checkInDate)
      newErrors.checkInDate = "Check-in date is required";
    if (!formData.checkOutDate)
      newErrors.checkOutDate = "Check-out date is required";
    if (formData.guests < 1) newErrors.guests = "At least 1 guest is required";

    // Card validation
    if (!formData.cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) {
      newErrors.cardNumber = "Valid card number is required (16 digits)";
    }
    if (!formData.expirationDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      newErrors.expirationDate = "Format: MM/YY";
    }
    if (!formData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = "CVV is required (3-4 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Calculate booking details
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24),
    );
    const bookingFee = property.price * 0.1; // 10% booking fee
    const totalPrice = property.price * nights + bookingFee;

    const bookingData = {
      propertyId: property.id,
      propertyName: property.name,
      ...formData,
      totalNights: nights,
      pricePerNight: property.price,
      bookingFee: Math.round(bookingFee),
      totalPrice: Math.round(totalPrice),
      status: "pending" as const,
    };

    // Submit to parent component
    onSubmit(bookingData);
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const calculateTotal = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0;
    const nights = Math.ceil(
      (new Date(formData.checkOutDate).getTime() -
        new Date(formData.checkInDate).getTime()) /
        (1000 * 3600 * 24),
    );
    return property.price * nights;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl font-bold text-gray-900">
            ${property.price}
          </span>
          <span className="text-gray-500">per night</span>
        </div>
        {property.discount && property.discount !== "" && (
          <div className="text-green-600 font-semibold">
            🎉 Save {property.discount}% on your stay!
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Stay Dates */}
        <div className="space-y-4">
          <div className="flex items-center text-gray-700">
            <Calendar className="w-5 h-5 mr-2" />
            <span className="font-medium">Select Dates</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-in
              </label>
              <input
                type="date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className={`w-full p-3 border rounded-lg ${errors.checkInDate ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.checkInDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.checkInDate}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-out
              </label>
              <input
                type="date"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleChange}
                min={
                  formData.checkInDate || new Date().toISOString().split("T")[0]
                }
                className={`w-full p-3 border rounded-lg ${errors.checkOutDate ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.checkOutDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.checkOutDate}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Guests */}
        <div className="space-y-4">
          <div className="flex items-center text-gray-700">
            <Users className="w-5 h-5 mr-2" />
            <span className="font-medium">Guests</span>
          </div>
          <select
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Contact Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-lg`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-lg`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-3 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-lg`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Payment Information */}
        <div className="space-y-4">
          <div className="flex items-center text-gray-700">
            <CreditCard className="w-5 h-5 mr-2" />
            <span className="font-medium">Payment Information</span>
          </div>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card number"
            value={formData.cardNumber}
            onChange={handleChange}
            maxLength={19}
            className={`w-full p-3 border ${errors.cardNumber ? "border-red-500" : "border-gray-300"} rounded-lg`}
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="expirationDate"
                placeholder="MM/YY"
                value={formData.expirationDate}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.expirationDate ? "border-red-500" : "border-gray-300"} rounded-lg`}
              />
              {errors.expirationDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.expirationDate}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                maxLength={4}
                className={`w-full p-3 border ${errors.cvv ? "border-red-500" : "border-gray-300"} rounded-lg`}
              />
              {errors.cvv && (
                <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>
        </div>

        {/* Billing Address */}
        <div className="space-y-4">
          <div className="flex items-center text-gray-700">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="font-medium">Billing Address</span>
          </div>
          <input
            type="text"
            name="street"
            placeholder="Street address"
            value={formData.street}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="zipCode"
              placeholder="Zip code"
              value={formData.zipCode}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Price Summary */}
        {formData.checkInDate && formData.checkOutDate && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">
                ${property.price} × {calculateTotal() / property.price} nights
              </span>
              <span className="font-medium">${calculateTotal()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Booking fee</span>
              <span className="font-medium">
                ${Math.round(property.price * 0.1)}
              </span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>
                  ${calculateTotal() + Math.round(property.price * 0.1)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            "Confirm & Pay"
          )}
        </button>

        <p className="text-center text-gray-500 text-sm">
          🔒 Your payment is secured with SSL encryption
        </p>
      </form>
    </div>
  );
};

export default BookingForm;
