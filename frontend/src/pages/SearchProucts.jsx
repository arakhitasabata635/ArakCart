import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import apiSummary from "../../common";

const SearchProucts = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const fetchSearchResults = async () => {
    const fetchApi = await fetch(`${apiSummary.search_products.url}?query=${query}`, {
      method: apiSummary.search_products.method,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataRes = await fetchApi.json();
    console.log(dataRes);
  };

  useEffect(() => {
    fetchSearchResults();

  }, [query]);

  return <div>SearchProucts</div>;
};

export default SearchProucts;
