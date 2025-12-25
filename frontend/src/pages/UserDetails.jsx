import { Outlet } from "react-router-dom";
import UserProfile from "../components/UserProfile";

const UserDetails = () => {
  return (
    <div className=" flex bg-gray-100">
      {/* user details and links */}
      <aside
        className="hidden sm:block w-52 md:w-62 bg-blue-600 text-white p-6  md:flex flex-col gap-6 
        sticky top-16"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <UserProfile />

      </aside>

      {/*  Main Content */}
      <main className=" md:flex-1 p-1 bg-white overflow-x-auto ">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDetails;
