import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import apiSummary from "../common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { setCart } from "./store/cartSlice";
function App() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/admin");

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

  const fetchCartProducts = async () => {
    const fetchApi = await fetch(apiSummary.cartProducts.url, {
      method: apiSummary.cartProducts.method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const dataRes = await fetchApi.json();
    console.log(dataRes.data);
    if (dataRes.success) {
      dispatch(setCart(dataRes.data));
    }
  };
  useEffect(() => {
    //user details
    fetchUserDetails();
    //cart
    fetchCartProducts();
  }, []);

  return (
    <>
      <Context.Provider value={{ fetchUserDetails }}>
        <ToastContainer position="top-right" autoClose={1000} />
        <Header />
        <main className="bg-[#e3e6e6]">
          <Outlet />
        </main>
        {!hideFooter && <Footer></Footer>}
      </Context.Provider>
    </>
  );
}

export default App;
