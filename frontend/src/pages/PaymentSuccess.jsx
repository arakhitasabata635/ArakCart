import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen   justify-center bg-green-50 px-4 pt-16">
      <div className="max-w-md mx-auto  w-full bg-white rounded-xl shadow-lg p-8 text-center">
        
        <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-4 animate-bounce" />

        <h2 className="text-3xl font-bold text-green-700 mb-2">
          Payment Successful!
        </h2>

        <p className="text-gray-600 mb-6">
          Thank you! Your payment has been processed successfully.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/orders"
            className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            View Your Orders
          </Link>

          <Link
            to="/"
            className="border border-green-600 text-green-700 py-2 rounded-lg hover:bg-green-100 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
