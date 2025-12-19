import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productCategory from "../../common/productCategory";
import apiSummary from "../../common";

const CategoryProductPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState(
    category ? category.split(",") : []
  );
  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${apiSummary.category_prouct.url}?category=${selectedCategories.join(
          ","
        )}`,
        {
          method: apiSummary.category_prouct.method,
          "application/json": "Content-Type",
        }
      );
      const data = await response.json();
      setProducts(data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    navigate(`/category-products?category=${selectedCategories.join(",")}`);
    fetchProducts();
  }, [selectedCategories]);

  const handleSortChange = (sortValue) => {
    if (sortValue === "low") {
      const sortedProducts = [...products].sort(
        (a, b) => a.sellingPrice - b.sellingPrice
      );
      setProducts(sortedProducts);
    } else if (sortValue === "high") {
      const sortedProducts = [...products].sort(
        (a, b) => b.sellingPrice - a.sellingPrice
      );
      setProducts(sortedProducts);
    }
  }

  return (
    <div className="h-screen bg-gray-100 ">
      <div className="max-w-7xl mx-auto flex gap-2 h-full">
        {/* LEFT FILTER → STICKY */}
        <aside className="w-64 bg-white p-5 rounded-xl shadow-lg sticky top-20 h-fit self-start">
          <h3 className="text-xl font-semibold mb-5">Filters</h3>

          {/* SORT */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">Sort by price</h4>

            <label className="flex items-center gap-2 text-sm">
              <input onClick={(e)=>handleSortChange(e.target.value)} type="radio" name="sort" value="low" />
              Price: Low to High
            </label>

            <label className="flex items-center gap-2 text-sm mt-2">
              <input onClick={(e)=>handleSortChange(e.target.value)} type="radio" name="sort" value="high" />
              Price: High to Low
            </label>
          </div>

          {/* CATEGORIES */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Category</h4>

            {productCategory.map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-sm my-1">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </aside>

        {/* RIGHT SECTION */}
        <div className="flex-1 flex flex-col bg-white relative ">
          {/* FIXED HEADING */}
          <h2 className="text-2xl font-bold mt-2 capitalize sticky top-0.5 bg-white p-2 z-10">
            Search Results :- {products.length}
          </h2>

          {/* SCROLLABLE PRODUCTS ONLY */}
          <main className="flex-1 bg-white rounded-xl shadow p-6 overflow-y-auto">
            {products.length === 0 && (
              <p className="text-center text-gray-600 py-20 text-lg">
                No products found.
              </p>
            )}

            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <Link
                to={`/product-details/${product._id}`}
                  key={product._id}
                  className="bg-white p-4 rounded-xl border hover:shadow-xl transition"
                >
                  <img
                    src={product.productImages[0]?.imgUrl}
                    alt={product.productName}
                    className="w-full h-40 object-contain rounded bg-gray-50"
                  />

                  <p className="mt-3 font-semibold text-sm line-clamp-1">
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
                      ((product.price - product.sellingPrice) / product.price) *
                        100
                    )}
                    % off
                  </span>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CategoryProductPage;
