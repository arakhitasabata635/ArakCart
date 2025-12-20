import { useEffect, useState } from "react";
import apiSummary from "../../common";
import { FaEdit } from "react-icons/fa";
import moment from "moment";
import { toast } from "react-toastify";
import ChengeUserRole from "../components/ChengeUserRole";
const AllUsers = () => {
  const [alluser, setAlluser] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  //fetch all users
  const fetchAllUsers = async () => {
    const fetchData = await fetch(apiSummary.allUser.url, {
      method: apiSummary.allUser.method,
      credentials: "include",
    });

    const dataResponce = await fetchData.json();
    if (dataResponce.success) {
      toast.success(dataResponce.message);
      setAlluser(dataResponce.data);
    }
    if (dataResponce.error) {
      toast.error(dataResponce.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <section className="md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">All Users</h2>
        <p className="text-sm text-gray-500">{alluser?.length} users</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Table wrapper for horizontal scroll on mobile */}
        <div className="overflow-x-auto no-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {alluser?.map((user, idx) => (
                <tr key={user._id || idx} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {idx + 1}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        {user.profilePic ? (
                          <img
                            src={user.profilePic}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 capitalize">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.email}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {moment(user.createdAt).format("LL")}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => setEditingUser(user)}
                      title="Edit user"
                      className="inline-flex items-center justify-center p-2 rounded-md text-blue-600 hover:bg-blue-100 transition"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editingUser && (
        <ChengeUserRole
          setEditingUser={setEditingUser}
          user={editingUser}
          setAlluser={setAlluser}
        />
      )}
    </section>
  );
};

export default AllUsers;
