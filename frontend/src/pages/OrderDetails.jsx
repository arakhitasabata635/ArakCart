import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import handlePayment from "../../helpers/handlePayment";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const [receiver, setreceiver] = useState({
    receiverName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const { totalPrice, cartItems } = location.state || {};
  if (!cartItems) {
    navigate("/cart");
  }
  const handleChange = (e) => {
    e.preventDefault();
    setreceiver({ ...receiver, [e.target.name]: e.target.value });
  };

  const handleProceed = async (e) => {
    e.preventDefault();
    // validate
    if (
      !receiver.receiverName ||
      !receiver.phone ||
      !receiver.address ||
      !receiver.city ||
      !receiver.pincode
    ) {
      return toast.error("Please fill all required fields");
    }
    await handlePayment(cartItems, receiver);
  };
  console.log(receiver);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Delivery Details */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Delivery Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Receiver Name</label>
              <input
                onChange={handleChange}
                name="receiverName"
                value={receiver.receiverName}
                type="text"
                placeholder="Full name"
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Mobile Number</label>
              <input
                onChange={handleChange}
                name="phone"
                value={receiver.phone}
                type="number"
                placeholder="+91 XXXXX XXXXX"
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Full Address</label>
              <textarea
                onChange={handleChange}
                name="address"
                value={receiver.address}
                rows="3"
                placeholder="House no, Street, Area"
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">City</label>
              <input
                onChange={handleChange}
                name="city"
                value={receiver.city}
                type="text"
                placeholder="City"
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Pincode</label>
              <input
                onChange={handleChange}
                name="pincode"
                value={receiver.pincode}
                type="text"
                placeholder="Pincode"
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Order Summary
          </h3>

          {/* Price Details */}
          <div className="border-t mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-800 text-base">
              <span>Total</span>
              <span>{totalPrice}</span>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handleProceed}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-medium"
          >
            Place Order & Pay
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Secure payment powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
};
export default OrderDetails;
