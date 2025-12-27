import { FaBox, FaShoppingCart, FaStore, FaUsers } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/userSlice";
import { useEffect, useState } from "react";
import pendingApplications from "../../helpers/pendingApplications";
import UpdateUserDetails from "./UpdateUserDetails";

const UserProfile = ({ setUserDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editingUser, setEditingUser] = useState(null);
  const user = useSelector((state) => state?.user?.user);
  let [pendingCount, setPendingCount] = useState([]);
  useEffect(() => {
    const fetchReq = async () => {
      const req = await pendingApplications();
      setPendingCount(req);
    };
    fetchReq();
  }, []);
  return (
    <>
      {/* Profile Section */}
      <div className="text-center">
        <div
          onClick={() => setEditingUser(true)}
          className="w-24 h-24 cursor-pointer mx-auto rounded-full overflow-hidden bg-gray-100 flex items-center justify-center"
        >
          {user?.profilePic?.imgUrl ? (
            <img
              src={user?.profilePic?.imgUrl}
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
        {user?.role !== "user" && (
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
                setUserDrawer?.(false);
              }}
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-500 transition"
            >
              <FaBox /> Products
            </div>
          </div>
        )}
        <div
          onClick={() => {
            navigate("/orders");
            setUserDrawer?.(false);
          }}
          className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-500 transition cursor-pointer"
        >
          <FaShoppingCart /> Orders
        </div>

        {user?.role === "user" && (
          <div
            onClick={() => {
              navigate("/user/apply-seller");
              setUserDrawer?.(false);
            }}
            className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-500 transition cursor-pointer"
          >
            <FaStore />
            Become a Seller
          </div>
        )}
        {user?.role === "owner" && (
          <div
            onClick={() => {
              navigate("/owner/seller-requests");
              setUserDrawer?.(false);
            }}
            className="
      relative flex items-center justify-between
      px-4 py-2.5 rounded-xl cursor-pointer
      transition-all duration-200
      hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500
      hover:shadow-md
      group
    "
          >
            {/* Left */}
            <div className="flex items-center gap-3 text-white">
              <FaStore className="text-lg opacity-90 group-hover:scale-110 transition" />
              <span className="font-medium tracking-wide">Seller Requests</span>
            </div>

            {/* 🔔 Badge */}
            {pendingCount?.length > 0 && (
              <span
                className="
          absolute right-3 top-1/2 -translate-y-1/2
          min-w-[22px] h-[22px] px-1
          text-xs font-bold text-white
          bg-red-500 rounded-full
          flex items-center justify-center
          shadow
          animate-pulse
        "
              >
                {pendingCount?.length}
              </span>
            )}
          </div>
        )}

        <button
          onClick={async () => {
            await dispatch(logoutUser());
            setUserDrawer?.(false);
            navigate("/login");
          }}
          className="flex items-center gap-3 py-2 px-3 text-[15px] font-medium rounded-lg hover:bg-blue-500 transition"
        >
          <FiLogOut />
          Logout
        </button>
      </nav>
      {editingUser && (
        <UpdateUserDetails setEditingUser={setEditingUser} user={user} />
      )}
    </>
  );
};

export default UserProfile;
