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
      </div>
    </div>
  );
};

export default Login;
