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

      </div>
    </header>
  );
};

export default Header;
