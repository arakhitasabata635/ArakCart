import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import ROLE from "../../common/role";
import apiSummary from "../../common";
import { toast } from "react-toastify";
import uploadImgCloudnary from "../../helpers/uploadImageInCloudnary";
import deleteImageFromCloudnary from "../../helpers/deleteImageFromCloudnary";
import { useDispatch, useSelector } from "react-redux";
import CommonLoader from "./loadingEffect/CommonLoader";
import { fetchUser } from "../store/userSlice";

const UpdateUserDetails = ({ user, setEditingUser, fetchAllUsers }) => {
  const sessionUser = useSelector((state) => state?.user?.user);
  const modalRef = useRef();
  const [editUser, setEditUser] = useState(user);
  const [editpic, setEditPic] = useState([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setEditPic(files);
  };
  useEffect(() => {
    if (!editpic[0]) return;

    const url = URL.createObjectURL(editpic[0]);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [editpic]);

  //update user
  const updateUser = async (finalData) => {
    const updateUserFetch = await fetch(apiSummary.updateUser.url, {
      method: apiSummary.updateUser.method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(finalData),
    });
    const updateUser = await updateUserFetch.json();
    if (updateUser.success) {
      toast.success(updateUser.message);
      if (editUser.profilePic.publicId) {
        await deleteImageFromCloudnary(editUser?.profilePic?.publicId);
      }
      dispatch(fetchUser());
      setLoading(false);
      setEditingUser(null);
    }
  };
  const handleSave = async () => {
    setLoading(true);
    if (editpic.length) {
      const uploadResults = await uploadImgCloudnary(editpic[0]);
      if (!uploadResults.url) {
        toast.error("user img not update");
        setLoading(false);
        return;
      }
    
      const finalData = {
        ...editUser,
        profilePic: {
          imgUrl: uploadResults.url,
          publicId: uploadResults.public_id,
        },
      };
      await updateUser(finalData);
      return;
    }
    await updateUser(editUser);
  };

  const updateRole = async (editUser) => {
    setLoading(true);
    const updateUserFetch = await fetch(apiSummary.updateUserRole.url, {
      method: apiSummary.updateUserRole.method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(editUser),
    });
    const updateUser = await updateUserFetch.json();
    if (updateUser.success) {
      toast.success(updateUser.message);
      await fetchAllUsers?.();
      setLoading(false);
      setEditingUser(null);
    }
    if (updateUser.error) {
      toast.error(updateUser.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        {/* Inner Box */}
        <div
          ref={modalRef}
          className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-6 relative animate-scaleIn"
        >
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
            onClick={() => setEditingUser(null)}
          >
            <FaTimes size={18} />
          </button>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-800">Update User</h3>

          {/* Profile */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="profileUpload"
              className="w-16 h-16 rounded-full overflow-hidden bg-gray-200"
            >
              {editUser?.profilePic?.imgUrl || editpic.length > 0 ? (
                <img
                  src={previewUrl || editUser?.profilePic?.imgUrl}
                  alt={editUser?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 font-semibold">
                  {editUser?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              <input
                disabled={editUser._id !== sessionUser._id}
                onChange={handleImageUpload}
                id="profileUpload"
                type="file"
                accept="image/*"
                name="profilePic"
                className="hidden"
              />
            </label>

            <div>
              <input
                disabled={editUser._id !== sessionUser._id}
                onChange={handleOnChange}
                name="name"
                type="text"
                value={editUser?.name}
                className="px-1 text-gray-800 outline-blue-100 font-medium capitalize"
              />
              <input
                onChange={handleOnChange}
                disabled={editUser._id !== sessionUser._id}
                name="email"
                type="mail"
                value={editUser?.email}
                className="px-1 text-gray-600 outline-blue-100 text-sm"
              ></input>
            </div>
          </div>

          {/* Role Update */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Role</label>
            {sessionUser.role === "owner" && editUser.role !== "owner" ? (
              <select
                id="roleSelect"
                name="role"
                value={editUser.role}
                onChange={handleOnChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-blue-500"
              >
                {ROLE.map((option, indx) => (
                  <option key={indx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <div className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-blue-500">
                {editUser.role}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              onClick={() => setEditingUser(null)}
            >
              Cancel
            </button>
            {sessionUser?._id !== editUser?._id ? (
              <button
                className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                onClick={() => updateRole(editUser)}
              >
                Save Role
              </button>
            ) : (
              <button
                className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                onClick={handleSave}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
      {loading && <CommonLoader />}
    </>
  );
};

export default UpdateUserDetails;
