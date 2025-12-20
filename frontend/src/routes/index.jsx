import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import AllUsers from "../pages/AllUsers";
import Products from "../pages/Products";
import CategoryProductPage from "../pages/CategoryProductPage";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProucts from "../pages/SearchProucts";
import UserDetails from "../pages/UserDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "category-products",
        element: <CategoryProductPage />,
      },
      {
        path: "product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "search",
        element: <SearchProucts />,
      },
      {
        path: "user-details",
        element: <UserDetails />,
        children: [
          {
            path: "users",
            element: <AllUsers />,
          },
          {
            path: "products",
            element: <Products />,
          },
        ],
      },
    ],
  },
]);

export default router;
