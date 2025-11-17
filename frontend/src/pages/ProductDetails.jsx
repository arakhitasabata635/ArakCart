import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiSummary from "../../common";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduc] = useState(null);

  const productDetails = async () => {
    const fetchApi = await fetch(apiSummary.productDetails.url, {
      method: apiSummary.productDetails.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const dataRes = await fetchApi.json();
    console.log(dataRes.data);
    setProduc(dataRes.data);
  };

  useEffect(() => {
    productDetails();
  }, []);

  return (
    <>
      {product && (
        <div className="w-full bg-[#E3E6E6] py-8">
          <div className="max-w-6xl mx-auto flex gap-8 px-4">
            {/* LEFT — Images */}
            <div className="flex gap-4">
              {/* Small Thumbnails */}
              <div className="flex flex-col gap-3">
                {product.productImages.map((img, i) => (
                  <img
                    key={i}
                    src={img.imgUrl}
                    className="w-16 h-16 rounded-md object-contain bg-[#D8DBDB] p-1 cursor-pointer
                       hover:scale-105 transition"
                  />
                ))}
              </div>

              {/* Big Image */}
              <div
                className="w-[380px] h-[350px] flex items-center justify-center 
                      bg-[#D8DBDB] rounded-lg overflow-hidden"
              >
                <img
                  src={product.productImages[0].imgUrl}
                  className="max-h-[90%] max-w-[90%] object-contain"
                />
              </div>
            </div>

            {/* RIGHT — Details */}
            <div className="flex flex-col gap-4 py-4 px-2 bg-[#F5F6F6] rounded-lg">
              {/* Name */}
              <h2 className="text-2xl font-semibold leading-snug text-gray-900">
                {product.productName}
              </h2>

              {/* Brand */}
              <p className="text-sm text-gray-600">
                Brand:{" "}
                <span className="font-medium text-gray-800">
                  {product.brandName}
                </span>
              </p>

              {/* Ratings (Fake for UI) */}
              <div className="flex items-center gap-2">
                <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-md">
                  4.3 ★
                </span>
                <p className="text-xs text-gray-600">
                  (12,430 Ratings & 540 Reviews)
                </p>
              </div>

              {/* Prices */}
              <div className="flex items-center gap-3 mt-1">
                <p className="text-3xl font-bold text-green-700">
                  ₹{product.sellingPrice}
                </p>
                <p className="text-lg text-gray-500 line-through">
                  ₹{product.price}
                </p>
                <p className="text-green-600 text-sm font-semibold">
                  {Math.round(
                    ((product.price - product.sellingPrice) / product.price) *
                      100
                  )}
                  % Off
                </p>
              </div>

              {/* Offers */}
              <div className="mt-1">
                <p className="text-sm font-semibold text-gray-900">
                  Available Offers
                </p>
                <ul className="text-sm text-gray-600 list-disc ml-5 mt-1 space-y-1">
                  <li>Bank Offer: 10% Instant Discount on SBI Credit Cards</li>
                  <li>Special Price: Get extra ₹200 off</li>
                  <li>No Cost EMI starting from ₹199/month</li>
                </ul>
              </div>

              {/* Description */}
              <p className="text-gray-800 text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Delivery Info */}
              <div className="text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Delivery:</span> Within 3–5
                  days
                </p>
                <p>
                  <span className="font-semibold">Return Policy:</span> 7-Day
                  Replacement
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-4 w-full">
                <button
                  className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold
                       hover:bg-orange-600 transition shadow-sm"
                >
                  Add to Cart
                </button>
                <button
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold
                       hover:bg-blue-700 transition shadow-sm"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
