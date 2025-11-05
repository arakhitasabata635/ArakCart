import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import apiSummary from "../common";

function App() {
  console.log("hii");
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(apiSummary.current_user.url, {
      method: apiSummary.current_user.method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const dataApi= await dataResponse.json();
    console.log("data_user", dataApi);
  };
  useEffect(() => {
    //user details
    fetchUserDetails()
  }, []);
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
