import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Logo from "../assest/logo-with-text.svg";
import { useSelector } from "react-redux";

const Header = () => {
  const cartCount = 10;
  const user = useSelector((state) => state?.user?.user);
  console.log("user", user);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto h-16 flex items-center justify-between px-3">
        {/* Logo */}
        <Link to="/" className="relative select-none group">
          <img
            src={Logo}
            alt="ArakCart Logo"
            className="w-28 transition-all duration-300 
             group-hover:scale-[1.07] group-hover:drop-shadow-md
             animate-logoFade"
          />

          {/* Subtle ripple animation on click */}
          <span className="absolute inset-0 rounded-lg scale-0 bg-blue-500/10 group-active:scale-100 transition-transform duration-300"></span>
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
        {/* Icons + Login */}
        <div className="flex items-center gap-5">
          {/* User */}
          <Link to="/profile" className="group">
            {user?.profilePic ? (
              <div
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-400 
               shadow-md cursor-pointer transition-all group-hover:scale-110 
               hover:border-blue-600 hover:shadow-lg"
              >
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <FaUser
                size={22}
                className=" text-gray-700 transition  hover:text-blue-600 group-hover:scale-110 animate-logoFade"
              />
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <FaShoppingCart
              className=" text-gray-700 transition  hover:text-blue-600 hover:scale-105"
              size={22}
            />
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs
              w-5 h-5 flex items-center justify-center rounded-full"
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* Login */}
          <Link
            to="/login"
            className="hidden sm:block bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-blue-700 hover:to-blue-500 transition-all hover:scale-105"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
