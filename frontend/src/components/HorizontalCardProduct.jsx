import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import fetchCategoryWiseProduct from "../../helpers/fetchCategoryWiseProduct";
import { useEffect } from "react";
import HorizontalCardShimmer from "./loadingEffect/HorizontalCardShimmer";
import { Link } from "react-router-dom";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  const fetchData = async () => {
    const categoryProducts = await fetchCategoryWiseProduct(category);
    setData(categoryProducts.data);
    setIsLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container bg-white mx-auto px-4 py-4 rounded-lg mt-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold md:text-xl ">{heading}</h2>

        {/* Desktop Arrows */}
        <div className="hidden md:flex gap-3">
          <button
            onClick={scrollLeft}
            className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200"
          >
            <FaChevronLeft size={18} />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200"
          >
            <FaChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Scroll Container */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar "
        >
          {isLoading ? (
            <>
              {[...Array(10)].map((_, i) => (
                <HorizontalCardShimmer key={i} />
              ))}
            </>
          ) : (
            <>
              {data?.map((product) => (
                <Link
                to={`/product-details/${product._id}`}
                  key={product._id}
                  className="min-w-[260px] bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 border  border-gray-400
                        p-3 cursor-pointer hover:-translate-y-1"
                >
                  <div className="flex gap-3 items-center">
                    {/* Product Image */}
                    <img
                      src={product.productImages[0].imgUrl}
                      alt={product.name}
                      className="w-20 h-20 rounded-lg object-contain hover:scale-105 transition duration-300 bg-gray-50 p-1"
                    />

                    {/* Product Info */}
                    <div className="flex flex-col justify-between">
                      <p className="font-medium text-sm line-clamp-1">
                        {product.productName}
                      </p>

                      <p className="text-xs text-gray-500 capitalize">
                        {product.brandName}
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-green-600 font-semibold text-sm">
                          ₹{product.sellingPrice}
                        </p>
                        <p className="text-gray-400 text-sm line-through">
                          ₹{product.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    className="mt-3 w-full py-1.5 rounded-lg bg-blue-600 text-white text-sm 
                           hover:bg-blue-700 transition-all"
                  >
                    Add To Cart
                  </button>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
