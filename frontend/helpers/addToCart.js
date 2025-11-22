import { toast } from "react-toastify";
import apiSummary from "../common";

const addToCart = async (e, productId) => {
 
  e.stopPropagation();
  e.preventDefault();
  const fetchApi = await fetch(apiSummary.addtoCart.url, {
    method: apiSummary.addtoCart.method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ productId }),
  });
  const dataRes = await fetchApi.json();
  if (dataRes.success) {
    toast.success(dataRes.message);
  }
  if (dataRes.error) {
    toast.error(dataRes.message);
  }
};

export default addToCart;
