import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import apiSummary from "../../common";

const SearchProucts = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async () => {
    const fetchApi = await fetch(
      `${apiSummary.search_products.url}?query=${query}`,
      {
        method: apiSummary.search_products.method,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const dataRes = await fetchApi.json();
    setProducts(dataRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [query]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <h2 className="text-2xl font-semibold mb-4">
          Search results for: <span className="text-blue-600">{query}</span>
        </h2>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-lg text-gray-500">Searching...</p>
        )}

        {/* NO RESULTS */}
        {!loading && products.length === 0 && (
          <p className="text-center text-gray-600 text-lg py-20">
            No products found 😔
          </p>
        )}

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/product-details/${product._id}`}
              className="bg-white rounded-xl shadow hover:shadow-lg p-3 transition"
            >
              <img
                src={product.productImages[0]?.imgUrl}
                alt={product.productName}
                className="w-full h-40 object-contain rounded bg-gray-50"
              />

              <p className="mt-2 font-semibold text-sm line-clamp-1">
                {product.productName}
              </p>

              <p className="text-xs text-gray-500 line-clamp-1">
                {product.brandName}
              </p>

              <div className="flex gap-2 items-center mt-1">
                <span className="text-green-600 font-bold text-sm">
                  ₹{product.sellingPrice}
                </span>

                <span className="line-through text-gray-400 text-xs">
                  ₹{product.price}
                </span>
              </div>

              <span className="text-xs text-green-700 font-semibold">
                {Math.round(
                  ((product.price - product.sellingPrice) / product.price) * 100
                )}
                % off
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchProucts;
