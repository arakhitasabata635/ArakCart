import React from "react";
import Logo from "../assest/logo-with-text.svg";

const Header = () => {
  return (
    <header className="h-16">
      <div className="container mx-auto">
        <div>
          <img src={Logo} alt="ArakCart Logo" className="w-32" />
        </div>
      </div>
    </header>
  );
};

export default Header;
