import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import productCategory from "../../common/productCategory";
import apiSummary from "../../common";

const CategoryProductPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState(
    category ? category.split(",") : []
  );

  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const fetchProducts = async () => {
    const response = await fetch(
      `${apiSummary.category_prouct.url}?category=${selectedCategories.join(",")}`,
      { method: apiSummary.category_prouct.method }
    );

    const data = await response.json();
    setProducts(data.data || []);
  };

  useEffect(() => {
    navigate(`/category-products?category=${selectedCategories.join(",")}`);
    fetchProducts();
  }, [selectedCategories]);

  const handleSortChange = (sortValue) => {
    const sorted = [...products];

    if (sortValue === "low") {
      sorted.sort((a, b) => a.sellingPrice - b.sellingPrice);
    } else {
      sorted.sort((a, b) => b.sellingPrice - a.sellingPrice);
    }

    setProducts(sorted);
  };

  return (
    <div className="h-screen bg-gray-100">
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsFilterOpen(true)}
        className="md:hidden fixed bottom-5 right-5 bg-blue-600 text-white p-3 rounded-full shadow-lg text-sm flex items-center gap-2 z-50"
      >
        <FaFilter /> Filter
      </button>

      <div className="max-w-7xl mx-auto flex gap-2 h-full">

        {/* LEFT FILTER – visible only on desktop */}
        <aside className="hidden md:block w-64 bg-white p-5 rounded-xl shadow-lg sticky top-20 h-fit self-start">
          <h3 className="text-xl font-semibold mb-5">Filters</h3>

          {/* SORT BY */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">Sort by price</h4>

            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="sort" value="low" onClick={(e)=>handleSortChange(e.target.value)} />
              Low to High
            </label>

            <label className="flex items-center gap-2 text-sm mt-2">
              <input type="radio" name="sort" value="high" onClick={(e)=>handleSortChange(e.target.value)} />
              High to Low
            </label>
          </div>

          {/* CATEGORY FILTER */}
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

        {/* RIGHT PRODUCT AREA */}
        <div className="flex-1 flex flex-col bg-white relative">
          <h2 className="text-2xl font-bold mt-2 capitalize sticky top-0.5 bg-white p-2 z-10">
            Search Results :- {products.length}
          </h2>

          <main className="flex-1 bg-white rounded-xl shadow p-6 overflow-y-auto">

            {products.length === 0 && (
              <p className="text-center text-gray-600 py-20 text-lg">No products found.</p>
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
                    <span className="text-green-600 font-bold text-sm">₹{product.sellingPrice}</span>
                    <span className="line-through text-gray-400 text-xs">₹{product.price}</span>
                  </div>

                  <span className="text-xs text-green-700 font-semibold">
                    {Math.round(((product.price - product.sellingPrice) / product.price) * 100)}% off
                  </span>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* MOBILE DRAWER FILTER */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">

          <div className="bg-white w-72 p-6 h-full shadow-xl animate-slide-left">

            <button
              className="mb-4 text-red-600 font-semibold"
              onClick={() => setIsFilterOpen(false)}
            >
              Close ✕
            </button>

            {/* Same Filters */}
            <h3 className="text-xl font-semibold mb-4">Filters</h3>

            <div className="mb-6">
              <h4 className="font-semibold mb-2">Sort by price</h4>
              <label className="flex gap-2 text-sm">
                <input type="radio" name="sort" value="low" onClick={(e)=>handleSortChange(e.target.value)} />
                Low to High
              </label>

              <label className="flex gap-2 mt-2 text-sm">
                <input type="radio" name="sort" value="high" onClick={(e)=>handleSortChange(e.target.value)} />
                High to Low
              </label>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Category</h4>
              {productCategory.map((cat) => (
                <label key={cat} className="flex items-center gap-2 my-1 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default CategoryProductPage;
