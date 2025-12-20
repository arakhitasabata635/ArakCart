import { FaBox, FaUsers } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/userSlice";

const UserProfile = ({ setUserDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  return (
    <>
      {/* Profile Section */}
      <div className="text-center">
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
          {user?.profilePic ? (
            <img
              src={user?.profilePic}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl text-gray-600">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          )}
        </div>
        <h2 className="mt-3 text-xl font-bold tracking-wide capitalize">
          {user?.name}
        </h2>
        <p className="text-sm opacity-90 mt-1 capitalize font-semibold">
          {user?.role}
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4 mt-5 text-[15px] font-medium">
        {(user?.role === "admin" || user?.role === "owner") && (
          <div>
            <div
              onClick={() => {
                navigate("/user-details/users");
                setUserDrawer?.(false);
              }}
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-500 transition"
            >
              <FaUsers /> All Users
            </div>

            <div
              onClick={() => {
                navigate("/user-details/products");
                setUserDrawer(false);
              }}
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-500 transition"
            >
              <FaBox /> Products
            </div>
          </div>
        )}
        <button
          onClick={async () => {
            await dispatch(logoutUser());
            navigate("/login");
          }}
          className="flex items-center gap-3 py-2 px-3 text-[15px] font-medium rounded-lg hover:bg-blue-500 transition"
        >
          <FiLogOut />
          Logout
        </button>
      </nav>
    </>
  );
};

export default UserProfile;
