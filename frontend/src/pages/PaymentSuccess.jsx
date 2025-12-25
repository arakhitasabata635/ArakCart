import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import apiSummary from "../../common";

const PaymentSuccess = () => {
  const sessionId = new URLSearchParams(window.location.search).get(
    "session_id"
  );

  const [status, setStatus] = useState("pending");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const fetchApi = await fetch(
          apiSummary.sessionOrder.url + `${sessionId}`,
          {
            method: apiSummary.sessionOrder.method,
            credentials: "include",
          }
        );
        const res = await fetchApi.json();
        if (res.data.status === "paid") {
          clearInterval(interval);
          setStatus("paid");

          setTimeout(() => {
            navigate("/orders");
          }, 1000);
        }
      } catch (err) {
        console.error(err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [navigate, sessionId]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-4 animate-bounce" />

        <h2 className="text-2xl font-bold text-green-700">
          Payment Successful
        </h2>

        <p className="text-gray-600 mt-2 mb-6">
          {status === "pending"
            ? "Finalizing your order..."
            : "Order confirmed! Redirecting..."}
        </p>

        {/* Truck animation */}
        <div className="relative h-12 overflow-hidden">
          {status === "pending" && (
            <div className="absolute left-0 animate-truck">🚚</div>
          )}
        </div>
      </div>

      {/* Tailwind animation */}
      <style>
        {`
          @keyframes truck {
            0% { transform: translateX(-50px); }
            100% { transform: translateX(300px); }
          }
          .animate-truck {
            animation: truck 1.2s linear infinite;
            font-size: 2rem;
          }
        `}
      </style>
    </div>
  );
};

export default PaymentSuccess;
