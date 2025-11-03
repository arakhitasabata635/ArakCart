import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Logo from "../assest/logo-with-text.svg";

const Header = () => {
  const cartCount = 10;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto h-16 flex items-center justify-between px-3">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="ArakCart Logo" className="w-28" />
        </Link>
        {/* Search Bar (Hidden on Mobile) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-6">
          <div className="relative w-full group">
            {/* Gradient focus border */}
            <div
              className="absolute inset-0 rounded-full p-[2px]
                 bg-gradient-to-r from-blue-600 to-blue-400
                 opacity-0 group-focus-within:opacity-100
                 transition-opacity duration-200"
              aria-hidden="true"
            />

            {/* Input + icon container with default border & shadow */}
            <div
              className="relative rounded-full overflow-hidden
             bg-blue-50 border border-blue-100 shadow-sm
             group-focus-within:bg-white
             group-focus-within:shadow-md
             group-focus-within:border-transparent
             transition-all duration-200"
            >
              {/* Input */}
              <input
                type="search"
                aria-label="Search products"
                placeholder="Search products..."
                className="w-full pr-14 pl-4 py-2 rounded-full
                   text-sm placeholder-gray-400
                   bg-white focus:outline-none"
              />

              {/* Search Icon */}
              <button
                type="button"
                aria-label="Search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2
                   bg-gray-100 text-gray-600
                   group-focus-within:bg-gradient-to-r
                   group-focus-within:from-blue-600
                   group-focus-within:to-blue-400
                   group-focus-within:text-white
                   shadow-sm hover:scale-105 active:scale-100
                   transition-all duration-150"
              >
                <FiSearch size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
