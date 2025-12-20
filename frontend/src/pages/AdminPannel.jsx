import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import UserProfile from "../components/UserProfile";

const AdminPannel = () => {
  const admin = useSelector((state) => state?.user?.user);

  return (
    <div className="hidden md:flex bg-gray-100">
      {/* user details and links */}
      <UserProfile admin={admin} />
      {/*  Main Content */}
      <main className=" md:flex-1 p-1 bg-white ">
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminPannel;
