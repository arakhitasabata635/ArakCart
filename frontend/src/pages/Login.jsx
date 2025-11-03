import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [animation, setAnimation] = useState("");

  const location = useLocation();

  // 🔹 If user navigated from Header Login → trigger animation
  useEffect(() => {
    if (location.state?.fromHeaderLogin) {
      setAnimation("animate-slide-bounce");
      setTimeout(() => {
        setAnimation("");
      }, 1500);
    }
  }, [location.state]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-3">
      <form
        className={`bg-white shadow-xl rounded-2xl p-7 w-full max-w-sm transition-all duration-300 ${animation}`}
      >
        {/* Profile Image Upload */}
        <div className="flex justify-center mb-6 relative">
          <label htmlFor="profileUpload">
            <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-blue-400 rounded-full flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-200 transition">
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
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full py-2 px-4 pr-12 rounded-lg border border-gray-300 focus:border-blue-500 outline-none"
            />

            {/* Show Hide */}
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-6">
          <Link
            to="/forgot-password"
            className="text-blue-600 text-sm hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 font-semibold rounded-full hover:scale-[1.03] active:scale-[0.98] transition-transform duration-150">
          Login
        </button>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-800 font-medium underline transition duration-200"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
