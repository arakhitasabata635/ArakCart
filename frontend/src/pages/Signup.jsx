import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import imageToBase64 from "../../helpers/imageToBase64";
import apiSummary from "../../common";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const conformPassword = useRef("");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
  });
  // image to base64
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageToBase64(file);
    setData((prev) => ({
      ...prev,
      profilePic: imagePic,
    }));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const hendleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if (data.password === conformPassword.current.value) {
      const jsonResponsData = await fetch(apiSummary.SignUP.url, {
        method: apiSummary.SignUP.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const userdata = await jsonResponsData.json();
      console.log(userdata);
    } else {
      console.log("check the conform password");
    }
  };

  return (
    <section className="h-screen flex justify-center items-center bg-slate-50">
      <form
        onSubmit={hendleOnSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm
                   border border-blue-100 animate-slide-bounce"
      >
        {/* Profile Image Upload */}
        <div className="flex justify-center mb-6 relative">
          <label htmlFor="profileUpload" className="cursor-pointer">
            <div
              className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 
      bg-gradient-to-br from-blue-50 to-white shadow-md 
      flex flex-col items-center justify-center gap-1 transition-all
      hover:scale-105 hover:shadow-lg relative"
            >
              {data.profilePic ? (
                <img
                  src={data.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover animate-fadeIn"
                />
              ) : (
                <div className="flex flex-col items-center justify-center animate-pulse">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 4h4l1-1h2l1 1h4v12H4V4zm6 3a3 3 0 100 6 3 3 0 000-6z" />
                  </svg>
                  <span className="text-[11px] text-blue-500 font-medium">
                    Upload Photo
                  </span>
                </div>
              )}
            </div>
          </label>

          <input
            id="profileUpload"
            type="file"
            accept="image/*"
            name="profilePic"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create Account
        </h2>

        {/* Input Fields */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleOnChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleOnChange}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type="text"
              name="confirmPassword"
              ref={conformPassword}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 font-semibold rounded-full hover:scale-[1.03] active:scale-[0.98] transition-transform duration-150 cursor-pointer"
          >
            Sign Up
          </button>
        </div>

        {/* Link */}
        <p className="text-center text-gray-600 mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Signup;
