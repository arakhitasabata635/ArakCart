import React from "react";

const ProductDetailsLoading = () => {
  return (
    <div className="w-full bg-[#E3E6E6] py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 px-4">

        {/* LEFT IMAGE SECTION */}
        <div className="flex gap-4">

          {/* Small Thumbnails */}
          <div className="flex flex-col gap-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 rounded-md shimmer bg-[#D8DBDB]"
              ></div>
            ))}
          </div>

          {/* Big Image */}
          <div className="w-[260px] h-[250px] md:w-[380px] md:h-[350px] 
                          rounded-lg shimmer bg-[#D8DBDB]">
          </div>
        </div>

        {/* RIGHT DETAILS */}
        <div className="flex flex-col gap-4 py-4 px-3 bg-[#F5F6F6] rounded-lg w-full">

          {/* Title */}
          <div className="w-3/4 h-6 rounded shimmer bg-gray-300"></div>
          <div className="w-1/3 h-4 rounded shimmer bg-gray-300"></div>

          {/* Ratings */}
          <div className="w-24 h-5 rounded shimmer bg-gray-300"></div>

          {/* Price */}
          <div className="flex gap-3 items-center">
            <div className="w-24 h-7 rounded shimmer bg-gray-300"></div>
            <div className="w-16 h-5 rounded shimmer bg-gray-300"></div>
            <div className="w-16 h-4 rounded shimmer bg-gray-300"></div>
          </div>

          {/* Offers */}
          <div className="space-y-2 mt-2">
            <div className="w-40 h-4 rounded shimmer bg-gray-300"></div>
            <div className="w-60 h-3 rounded shimmer bg-gray-300"></div>
            <div className="w-56 h-3 rounded shimmer bg-gray-300"></div>
            <div className="w-48 h-3 rounded shimmer bg-gray-300"></div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="w-full h-3 rounded shimmer bg-gray-300"></div>
            <div className="w-5/6 h-3 rounded shimmer bg-gray-300"></div>
            <div className="w-4/6 h-3 rounded shimmer bg-gray-300"></div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4 w-full">
            <div className="flex-1 h-10 rounded-lg shimmer bg-gray-300"></div>
            <div className="flex-1 h-10 rounded-lg shimmer bg-gray-300"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailsLoading;
