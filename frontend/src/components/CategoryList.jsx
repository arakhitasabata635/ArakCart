import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
import apiSummary from "../../common";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
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
  };

  useEffect(() => {
    fetchCategoryProdut();
  }, []);
  console.log(categoryProduct);

  return (
    <div className="w-full relative mt-6 pb-2">
      {/* Mobile arrows */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full 
                   bg-white shadow-md md:hidden z-10"
      >
        <FaChevronLeft size={20} />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full 
                   bg-white shadow-md md:hidden z-10"
      >
        <FaChevronRight size={20} />
      </button>

      <h2 className="text-xl font-semibold mb-3 px-1">Categories</h2>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar px-1"
      >
        {categoryProduct?.map((product) => (
          <div
            key={product._id}
            className="min-w-[120px] flex flex-col items-center cursor-pointer 
                       transition-all duration-300 hover:-translate-y-1"
          >
            {/* Round Image */}
            <div className="h-24 w-24 rounded-full overflow-hidden shadow-lg shadow-gray-300 flex items-center justify-center bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <img
                src={product.productImages[0].imgUrl}
                alt={product.category}
                className="max-h-[70%] max-w-[70%] object-contain transition duration-300 hover:scale-105"
              />
            </div>

            <p className="mt-2 text-sm font-medium text-gray-700 text-center capitalize">
              {product.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
