import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import fetchCategoryWiseProduct from "../../helpers/fetchCategoryWiseProduct";
import { useEffect } from "react";
import VerticalCardShimmer from "./loadingEffect/VerticalCardShimmer";
import { Link } from "react-router-dom";

const VerticalCardProduct = ({ category, heading }) => {
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
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container bg-white mx-auto px-4 py-3 rounded-lg mt-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg md:text-xl font-bold capitalize">{heading}</h2>

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
                <VerticalCardShimmer key={i} />
              ))}
            </>
          ) : (
            <>
              {data?.map((product) => (
                <Link
                  to={`/product-details/${product._id}`}
                  key={product._id}
                  className="flex-shrink-0 w-[280px]  bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300  border border-gray-200
                        p-3 cursor-pointer hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="w-full h-[150px] flex items-center justify-center overflow-hidden">
                    <img
                      src={product.productImages[0].imgUrl}
                      alt={product.productName}
                      className="h-full object-contain"
                    />
                  </div>

                  {/* Name */}
                  <p className="text-sm font-medium mt-3 line-clamp-2">
                    {product.productName}
                  </p>

                  {/* Brand */}
                  <p className="text-xs text-gray-500">{product.brandName}</p>

                  {/* Prices */}
                  <div className="flex justify-between items-center gap-2 mt-2 pr-8 ">
                    <p className="text-lg font-semibold text-green-600">
                      ₹{product.sellingPrice}
                    </p>
                    <p className="text-sm text-gray-500 line-through">
                      ₹{product.price}
                    </p>
                  </div>

                  {/* Button */}
                  <button
                  onClick={(e)=>addToCart(e,product._id)}
                    className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded-lg 
                         text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Add to Cart
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

export default VerticalCardProduct;
