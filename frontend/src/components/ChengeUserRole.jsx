import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import ROLE from "../../common/role";

const ChangeUserRole = ({ user, setEditingUser }) => {
  const modalRef = useRef();

  // Close modal when clicking outside content box
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      console.log(modalRef.current);
      setEditingUser(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSave = () => {
    const updatedRole = document.getElementById("roleSelect").value;
    onSave(user._id, updatedRole);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      {/* Inner Box */}
      <div
        ref={modalRef}
        className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-6 relative animate-scaleIn"
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
          onClick={() => setEditingUser(false)}
        >
          <FaTimes size={18} />
        </button>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800">
          Update User Role
        </h3>

        {/* Profile */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 font-semibold">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
          </div>

          <div>
            <p className="text-gray-800 font-medium capitalize">{user?.name}</p>
            <p className="text-gray-600 text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Role Update */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Role</label>
          <select
            id="roleSelect"
            defaultValue={user?.role}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-blue-500"
          >
            {ROLE.map((option, indx) => (
              <option key={indx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            onClick={() => setEditingUser(false)}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            // onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;
