import { Link, Outlet } from "react-router-dom";
import { FaUsers, FaBox } from "react-icons/fa";
import { useSelector } from "react-redux";

const AdminPannel = () => {
  const admin = useSelector((state) => state?.user?.user);

  return (
    <div className="flex bg-gray-100">
      {/* ✅ Sidebar (Sticky + Height Fixed + Improved Colors + Bigger Text) */}
      <aside
        className="w-64 bg-blue-600 text-white p-6 hidden md:flex flex-col gap-6 
        sticky top-16" // top-16 = 64px header height
        style={{ height: "calc(100vh - 64px)" }}
      >
        {/* Profile Section */}
        <div className="text-center">
          <img
            src={admin?.profilePic}
            alt={admin?.name}
            className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-lg"
          />
          <h2 className="mt-3 text-xl font-bold tracking-wide capitalize">
            {admin?.name}
          </h2>
          <p className="text-sm opacity-90 mt-1 capitalize font-semibold">
            {admin?.role}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4 mt-5 text-[15px] font-medium">
          <Link
            to="/admin/users"
            className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-500 transition"
          >
            <FaUsers /> All Users
          </Link>

          <Link
            to="/admin/products"
            className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-500 transition"
          >
            <FaBox /> Products
          </Link>
        </nav>
      </aside>

      {/*  Main Content */}
      <main className="flex-1 p-6 bg-white">
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminPannel;
