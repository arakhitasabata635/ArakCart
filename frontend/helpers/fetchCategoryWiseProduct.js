import apiSummary from "../common";

const fetchCategoryWiseProduct = async (category) => {
  const fetchApi = await fetch(apiSummary.categoryWiseProduct.url, {
    method: apiSummary.categoryWiseProduct.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category }),
  });
  return await fetchApi.json();
};

export default fetchCategoryWiseProduct;
