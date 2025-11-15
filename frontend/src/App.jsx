import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import apiSummary from "../common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/admin");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(apiSummary.current_user.url, {
      method: apiSummary.current_user.method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.sucess) {
      dispatch(setUserDetails(dataApi.data));
    }
  };
  useEffect(() => {
    //user details
    fetchUserDetails();
  }, []);

  return (
    <>
      <Context.Provider value={{ fetchUserDetails }}>
        <ToastContainer position="top-right" autoClose={1000} />
        <Header />
        <main>
          <Outlet />
        </main>
        {!hideFooter && <Footer></Footer>}
      </Context.Provider>
    </>
  );
}

export default App;
