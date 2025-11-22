import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import apiSummary from "../../common";
import { useDispatch } from "react-redux";
import { fetchUser } from "../store/userSlice";
import { fetchCart } from "../store/cartSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get the user inputs
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // heandle on submit
  const hendleOnSubmit = async (e) => {
    e.preventDefault();
    const jsonResponsData = await fetch(apiSummary.login.url, {
      method: apiSummary.login.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const resData = await jsonResponsData.json();
    if (resData.success) {
      toast.success(resData.message);
      dispatch(fetchUser());
      dispatch(fetchCart());
      navigate("/");
    }
    if (resData.error) {
      toast.error(resData.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-3">
      <form
        onSubmit={hendleOnSubmit}
        className={`bg-white shadow-xl rounded-2xl p-7 w-full max-w-sm transition-all duration-300 animate-slide-bounce`}
      >
        {/* Profile Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-20 h-20 rounded-full flex justify-center items-center
                               bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md"
          >
            <FaUserAlt size={28} />
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <input
            name="email"
            onChange={handleOnChange}
            value={data.email}
            type="email"
            placeholder="example@email.com"
            required
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
              name="password"
              onChange={handleOnChange}
              value={data.password}
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              className="w-full py-2 px-4 pr-12 rounded-lg border border-gray-300 focus:border-blue-500 outline-none"
            />

            {/* Show Hide */}
            <button
              type="submit"
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
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 font-semibold rounded-full hover:scale-[1.03] active:scale-[0.98] transition-transform duration-150 cursor-pointer">
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
