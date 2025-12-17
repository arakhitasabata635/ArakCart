import { toast } from "react-toastify";
import apiSummary from "../common";
import { useDispatch, useSelector } from "react-redux";
import { addToCartLocal } from "../src/store/cartSlice";

const addToCart = async (e, productId) => {
  e.stopPropagation();
  e.preventDefault();
  const disPatch = useDispatch();

  // const user = useSelector((state) => state?.user?.user);
  // if (!user) {
  //   console.log(user);
  // } 

  const fetchApi = await fetch(apiSummary.addtoCart.url, {
    method: apiSummary.addtoCart.method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ productId }),
  });

  const dataRes = await fetchApi.json();
  if (dataRes.success) {
    toast.success(dataRes.message);
    disPatch(addToCartLocal());
  }
  if (dataRes.error) {
    toast.error(dataRes.message);
  }
};

export default addToCart;
