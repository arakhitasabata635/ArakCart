import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#313232] border-t border-gray-200 ">
      {/* Newsletter */}
      <div className=" px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Stay Updated</h3>

          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter email to get offers"
              className="px-4 py-2 w-full md:w-72 text-gray-50 border border-blue-200 rounded-l-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white rounded-r-lg font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-white">
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            <a href="#">ArakCart</a>
          </h4>
          <p className="text-sm text-blue-100 leading-6">
            A multi-seller ecommerce store where users enjoy secure shopping and
            sellers manage products easily.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Shop</h4>
          <ul className="space-y-2 text-blue-100">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="hover:text-blue-600 cursor-pointer">All Products</li>
            <li className="hover:text-blue-600 cursor-pointer">Categories</li>
            <li className="hover:text-blue-600 cursor-pointer">Offers</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
          <ul className="space-y-2 text-blue-100">
            <li className="hover:text-blue-600 cursor-pointer">Help Center</li>
            <li className="hover:text-blue-600 cursor-pointer">
              Return Policy
            </li>
            <li className="hover:text-blue-600 cursor-pointer">Payment</li>
            <li className="hover:text-blue-600 cursor-pointer">Shipping</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
          <p className="text-blue-100 text-sm">📍 India</p>
          <p className="text-blue-100 text-sm">📧 support@arakcart.com</p>
          <p className="text-blue-100 text-sm mb-4">📞 +91 98765 43210</p>

          <div className="flex gap-4 text-xl text-blue-600">
            <span className="hover:text-blue-800 cursor-pointer">🐦</span>
            <span className="hover:text-blue-800 cursor-pointer">📸</span>
            <span className="hover:text-blue-800 cursor-pointer">📘</span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-blue-600 text-white text-center py-4 text-sm">
        © {new Date().getFullYear()} ArakCart • All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
