import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
import apiSummary from "../../common";
import { Link } from "react-router-dom";
import CategoryLoading from "./loadingEffect/CategoryLoading";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -130, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 130, behavior: "smooth" });
  };

  const fetchCategoryProdut = async () => {
    const fetchCategory = await fetch(apiSummary.getCategory.url);
    const dataRes = await fetchCategory.json();
    setCategoryProduct(dataRes.data);
    setLoading(false)
  };

  useEffect(() => {
    fetchCategoryProdut();
  }, []);

  return (
    <div className="container mx-auto w-full relative pt-6 pb-2">
  {loading ? (
    <CategoryLoading />
  ) : (
    <>
      {/* Mobile Arrows */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full 
                   bg-white shadow-md md:hidden z-10"
      >
        <FaChevronLeft size={20} />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full 
                   bg-white shadow-md md:hidden z-10"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Category Scroll List */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto no-scrollbar px-2"
      >
        {categoryProduct?.map((product) => (
          <Link
            to={`/category-products?category=${product.category}`}
            key={product._id}
            className="min-w-[120px] flex flex-col items-center cursor-pointer 
                       transition-all duration-300 hover:-translate-y-1"
          >
            {/* Round Image */}
            <div className="h-24 w-24 rounded-full overflow-hidden shadow-md shadow-gray-300 
                            flex items-center justify-center bg-white 
                            hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <img
                src={product.productImages[0].imgUrl}
                alt={product.category}
                className="h-[70%] w-[70%] object-contain transition duration-300 hover:scale-105"
              />
            </div>

            <p className="mt-2 text-sm font-medium text-gray-700 text-center capitalize">
              {product.category}
            </p>
          </Link>
        ))}
      </div>
    </>
  )}
</div>

  );
};

export default CategoryList;
