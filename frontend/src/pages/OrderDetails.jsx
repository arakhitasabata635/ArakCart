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

  return (
   <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

    {/* LEFT – Delivery Details */}
    <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-100 p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        📦 Delivery Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="text-sm font-medium text-gray-600">
            Receiver Name
          </label>
          <input
            name="receiverName"
            value={receiver.receiverName}
            onChange={handleChange}
            placeholder="Full name"
            className="mt-2 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">
            Mobile Number
          </label>
          <input
            name="phone"
            value={receiver.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className="mt-2 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-600">
            Full Address
          </label>
          <textarea
            rows="3"
            name="address"
            value={receiver.address}
            onChange={handleChange}
            placeholder="House no, Street, Area"
            className="mt-2 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">City</label>
          <input
            name="city"
            value={receiver.city}
            onChange={handleChange}
            placeholder="City"
            className="mt-2 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">Pincode</label>
          <input
            name="pincode"
            value={receiver.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="mt-2 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>
    </div>

    {/* RIGHT – Order Summary */}
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24 h-fit">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        🧾 Order Summary
      </h3>

      {/* Receiver Preview */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
        <p className="text-sm font-semibold text-blue-700 mb-1">
          Deliver To
        </p>

        {receiver.receiverName ? (
          <div className="text-sm text-gray-700 space-y-1">
            <p className="font-medium">{receiver.receiverName}</p>
            <p>{receiver.phone}</p>
            <p className="text-gray-600">
              {receiver.address}, {receiver.city} – {receiver.pincode}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-400">
            Enter delivery details to continue
          </p>
        )}
      </div>

      {/* Price */}
      <div className="border-t pt-4 space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{totalPrice}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Delivery</span>
          <span className="text-green-600 font-medium">FREE</span>
        </div>

        <div className="flex justify-between text-lg font-semibold text-gray-800">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleProceed}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
      >
        Place Order & Pay
      </button>

      <p className="text-xs text-center text-gray-500 mt-3">
        🔒 Secure payment powered by Stripe
      </p>
    </div>
  </div>
</div>

  );
};
export default OrderDetails;
