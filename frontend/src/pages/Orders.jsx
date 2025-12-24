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
  console.log(orders);
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      {orders?.length ? (
        <div className="max-w-6xl mx-auto px-6">
          {/* Page Title */}
          <h1 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h1>

          {/* Orders */}
          {orders?.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden"
            >
              {/* ===== Order Header ===== */}
              <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold text-gray-800">
                    #{order._id.slice(-6)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <span className="px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    {order.paymentDetails.payment_status}
                  </span>
                  <p className="mt-2 text-lg font-bold text-gray-900">
                    ₹{order.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* ===== Products ===== */}
              <div className="px-6 py-6">
                <div className="grid grid-cols-1 gap-5">
                  {order.productDetails.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-6 border rounded-xl p-4 hover:shadow transition"
                    >
                      {/* Product Image */}
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg border"
                      />

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3
                          className="font-semibold text-gray-800 
               line-clamp-2 
               sm:line-clamp-none"
                        >
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Quantity: {product.quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          Price: ₹{product.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Product Total */}
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">
                          ₹{(product.price * product.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ===== Order Footer ===== */}
              <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t">
                <div className="text-sm text-gray-600">
                  Payment ID:
                  <span className="ml-1 font-medium text-gray-800">
                    {order.paymentDetails.paymentId.slice(-8)}
                  </span>
                </div>

                <button className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition">
                  View Details
                </button>
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
