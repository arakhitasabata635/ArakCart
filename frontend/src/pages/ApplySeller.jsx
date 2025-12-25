import { useState } from "react";
import { FaStore, FaIdCard, FaCheckCircle } from "react-icons/fa";

const ApplySeller = () => {
  const [seller, setSeller] = useState({
    shopName: "",
    ShopMail: "",
    phone: "",
    address: "",
    gstNumber: "",
    documents: {},
  });
  const heandleOnChange = (e) => {
    setSeller({ ...seller, [e.target.name]: e.target.value });
  };
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* ===== Header ===== */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FaStore /> Become a Seller
          </h1>
          <p className="mt-2 text-blue-100">
            Sell your products to thousands of customers on our platform
          </p>
        </div>

        {/* ===== Content ===== */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* ===== Left: Benefits ===== */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Why sell with us?
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1" />
                <p className="text-gray-600">
                  Reach a large customer base across India
                </p>
              </div>

              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1" />
                <p className="text-gray-600">
                  Easy product management & order tracking
                </p>
              </div>

              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1" />
                <p className="text-gray-600">
                  Secure payments & transparent settlements
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Seller accounts are verified manually by
                our team to ensure quality and trust.
              </p>
            </div>
          </div>

          {/* ===== Right: Seller Form ===== */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Seller Information
            </h2>

            <form className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Shop Name</label>
                <input
                  name="shopName"
                  onChange={heandleOnChange}
                  value={seller.shopName}
                  type="text"
                  placeholder="Your shop name"
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Business Email</label>
                <input
                  name="ShopMail"
                  onChange={heandleOnChange}
                  value={seller.ShopMail}
                  type="email"
                  placeholder="shop@email.com"
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">GST Number</label>
                <input
                  name="gstNumber"
                  onChange={heandleOnChange}
                  value={seller.gstNumber}
                  type="text"
                  placeholder="Enter gst Number"
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Business Phone</label>
                <input
                  name="phone"
                  value={seller.phone}
                  onChange={heandleOnChange}
                  type="text"
                  placeholder="+91 XXXXX XXXXX"
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Business Address
                </label>
                <textarea
                  name="address"
                  onChange={heandleOnChange}
                  rows="3"
                  placeholder="Shop address"
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">GST / ID Proof</label>
                <div className="mt-1 flex items-center gap-3 border rounded-lg px-3 py-2">
                  <FaIdCard className="text-gray-400" />
                  <input type="file" className="text-sm text-gray-600" />
                </div>
              </div>

              <button
                type="button"
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
              >
                Submit for Verification
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Our team will review your request within 24–48 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplySeller;
