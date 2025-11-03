import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const Login = () => {
  const [profileImage, setProfileImage] = useState(null);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-3">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm">
        {/* Profile Image Upload */}
        <div className="flex justify-center mb-6 relative">
          <label htmlFor="profileUpload">
            <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-blue-400 rounded-full flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-200">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">Upload</span>
              )}
            </div>
          </label>

          <input
            id="profileUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        {/* Email Input */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            className="w-full py-2 px-4 mt-1 rounded-lg border border-gray-300 focus:border-blue-500 outline-none"
          />
        </div>
        {/* Password Input */}
        <div className="mb-2">
          <label className="text-sm font-semibold text-gray-700">
            Password
          </label>
          <div className="relative mt-1">
            <input
              type="password"
              placeholder="••••••••"
              className="w-full py-2 px-4 pr-12 rounded-lg border border-gray-300 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
        {/* Login Button */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 font-semibold rounded-full hover:opacity-90 transition">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
