import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
      <Header />      
      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
