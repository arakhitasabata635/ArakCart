import apiSummary from "../common";
const addToCart = async (productId) => {
  console.log(productId);
  const fetchApi = await fetch(apiSummary.addtoCart.url, {
    method: apiSummary.addtoCart.method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ productId })
  });

  return await fetchApi.json();
};

export default addToCart;
