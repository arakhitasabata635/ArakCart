import React from "react";
import { FaBox, FaUsers } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../store/userSlice";

const UserProfile = ({admin}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  return (
    <aside
      className="w-64 bg-blue-600 text-white p-6  md:flex flex-col gap-6 
        sticky top-16" // top-16 = 64px header height
      style={{ height: "calc(100vh - 64px)" }}
    >
      {/* Profile Section */}
      <div className="text-center">
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
          {admin?.profilePic ? (
            <img
              src={admin?.profilePic}
              alt={admin?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl text-gray-600">
              {admin?.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          )}
        </div>
        <h2 className="mt-3 text-xl font-bold tracking-wide capitalize">
          {admin?.name}
        </h2>
        <p className="text-sm opacity-90 mt-1 capitalize font-semibold">
          {admin?.role}
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4 mt-5 text-[15px] font-medium">
        <Link
          to="/admin/users"
          className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-500 transition"
        >
          <FaUsers /> All Users
        </Link>

        <Link
          to="/admin/products"
          className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-500 transition"
        >
          <FaBox /> Products
        </Link>
        <button
        onClick={()=> {
          dispatch(logoutUser());
          navigate("/login");
        }}
         className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-500 transition">
        <FiLogOut />
        Logout
      </button>
      </nav>
      
    </aside>
  );
};

export default UserProfile;
