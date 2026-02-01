import React from "react";
import { Clock, AlertCircle, Home } from "lucide-react";

const CancellationPolicy: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center mb-3">
          <Clock className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">
            Cancellation Policy
          </h2>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 font-bold">✓</span>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                Flexible Cancellation
              </h3>
              <p className="text-gray-600 mt-1">
                Free cancellation up to 48 hours before check-in. After that,
                cancel before check-in for a 50% refund (minus service fees).
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center mb-3">
          <AlertCircle className="w-5 h-5 text-gray-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">
            Important Information
          </h2>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span className="text-gray-600">
                Check-in: 3:00 PM - 10:00 PM
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span className="text-gray-600">Check-out: 11:00 AM</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span className="text-gray-600">Self check-in with lockbox</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span className="text-gray-600">No smoking allowed</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span className="text-gray-600">Not suitable for pets</span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div className="flex items-center mb-3">
          <Home className="w-5 h-5 text-gray-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">House Rules</h2>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
              Follow the house rules provided by your host
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
              Treat the property with respect
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
              Keep noise levels reasonable after 10 PM
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
              Report any damages or issues immediately
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
              No parties or events without prior approval
            </li>
          </ul>
        </div>
      </div>

      <div className="text-sm text-gray-500 italic">
        <p>
          By completing this booking, you agree to the terms and conditions,
          cancellation policy, and house rules.
        </p>
      </div>
    </div>
  );
};

export default CancellationPolicy;
