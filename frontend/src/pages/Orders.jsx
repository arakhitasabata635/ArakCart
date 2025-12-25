import React, { useEffect, useState } from "react";
import apiSummary from "../../common";
import { toast } from "react-toastify";
import { FaBoxOpen } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState();
  const fetchAllOrder = async () => {
    const fetchApi = await fetch(apiSummary.allOrders.url, {
      method: apiSummary.allOrders.method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await fetchApi.json();
    if (res.success) {
      setOrders(res.data);
    }
    if (res.error) {
      toast.error(res.message);
    }
  };
  useEffect(() => {
    fetchAllOrder();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      {orders?.length ? (
        <div className="max-w-6xl mx-auto px-6">
          {/* Page Title */}
          <h1 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h1>

          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-lg mb-12 overflow-hidden"
            >
              {/* ===== Order Header ===== */}
              <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="font-semibold text-gray-800">
                    #{order._id.slice(-6)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium
      ${
        order.paymentDetails.payment_status === "paid"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
                >
                  {order.paymentDetails.payment_status}
                </span>
              </div>

              {/* ===== CONTENT GRID ===== */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                {/* ================= LEFT: PRODUCTS ================= */}
                <div className="lg:col-span-2 space-y-5">
                  {order.productDetails.map((product, index) => (
                    <div
                      key={index}
                      className="flex gap-5 border rounded-xl p-4 hover:shadow transition"
                    >
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg border"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 line-clamp-2">
                          {product.name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Qty: {product.quantity}
                        </p>

                        <p className="text-sm text-gray-500">
                          Price: ₹{product.price.toLocaleString()}
                        </p>
                      </div>

                      <div className="text-right font-semibold text-gray-800">
                        ₹{(product.price * product.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ================= RIGHT: SUMMARY ================= */}
                <div className="bg-gray-50 rounded-xl border p-5 space-y-4 h-fit sticky top-6">
                  {/* Receiver */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      📍 Delivery Details
                    </p>
                    <div className="text-sm text-gray-600 leading-relaxed">
                      <p className="font-medium text-gray-800">
                        {order.receiver?.receiverName}
                      </p>
                      <p>{order.receiver?.phone}</p>
                      <p>
                        {order.receiver?.address}, {order.receiver?.city} –{" "}
                        {order.receiver?.pincode}
                      </p>
                    </div>
                  </div>

                  <hr />

                  {/* Payment */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      💳 Payment Info
                    </p>
                    <p className="text-sm text-gray-600">
                      Method:{" "}
                      <span className="font-medium text-gray-800">
                        {order.paymentDetails.payment_method_type?.[0] ||
                          "Card"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Payment ID:{" "}
                      <span className="font-medium text-gray-800">
                        {order.paymentDetails.paymentId?.slice(-8)}
                      </span>
                    </p>
                  </div>

                  <hr />

                  {/* Price */}
                  <div className="flex justify-between font-semibold text-lg text-gray-900">
                    <span>Total</span>
                    <span>₹{order.totalAmount.toLocaleString()}</span>
                  </div>

                  <button className="w-full mt-2 py-2 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition">
                    View Order Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center 
                h-[60vh] text-center text-gray-500"
        >
          <FaBoxOpen className="text-5xl mb-4 text-gray-300" />
          <p className="text-lg font-medium">No orders found</p>
          <p className="text-sm">Your completed orders will show here</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
