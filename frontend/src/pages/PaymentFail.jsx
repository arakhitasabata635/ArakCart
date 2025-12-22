import React from "react";
import { Link } from "react-router-dom";

const PaymentFail = () => {
  return (
    <div className="min-h-screen   justify-center bg-green-50 px-4 pt-16">
      <div className="max-w-md mx-auto  w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-red-500 text-6xl mb-4">✖</div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Failed!
        </h1>

        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be completed. Please try again or use another payment method.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/cart"
            className="bg-red-500 hover:bg-red-600 transition text-white py-2 px-4 rounded-lg font-medium"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="text-gray-700 underline hover:text-gray-900 transition font-medium"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;
