import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/userSlice";
import { fetchCart } from "./store/cartSlice";
function App() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/admin");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchCart());
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
      <Header />
      <main className="bg-[#e3e6e6]">
        <Outlet />
      </main>
      {!hideFooter && <Footer></Footer>}
    </>
  );
}

export default App;
