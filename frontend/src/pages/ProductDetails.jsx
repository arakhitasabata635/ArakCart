import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiSummary from "../../common";
import ProductDetailsLoading from "../components/loadingEffect/ProductDetailsLoading";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduc] = useState(null);
  const [isloading, setIsLoading] = useState(true);

  const productDetails = async () => {
    const fetchApi = await fetch(apiSummary.productDetails.url, {
      method: apiSummary.productDetails.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const dataRes = await fetchApi.json();
    setProduc(dataRes.data);
    setIsLoading(false);
  };

  useEffect(() => {
    productDetails();
  }, []);

  return (
    <>
      {isloading ? (
        <ProductDetailsLoading />
      ) : (
        <div className="w-full bg-[#E3E6E6] py-6">
          <div className="max-w-6xl mx-auto md:px-4">
            {/* MAIN FLEX — MOBILE COLUMN / DESKTOP ROW */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* LEFT SECTION — IMAGES */}
              <div className="flex gap-4 md:w-1/2">
                {/* SMALL IMAGES (VERTICAL ON DESKTOP / HORIZONTAL SCROLL IN MOBILE) */}
                <div className="flex flex-col gap-3 overflow-x-auto no-scrollbar">
                  {product.productImages.map((img, i) => (
                    <img
                      key={i}
                      src={img.imgUrl}
                      className="w-16 h-16 md:w-16 md:h-16 flex-shrink-0
                           rounded-md bg-[#D8DBDB] object-contain p-1
                           cursor-pointer hover:scale-105 transition"
                    />
                  ))}
                </div>

                {/* BIG IMAGE */}
                <div
                  className="flex-1 h-[280px] md:h-[360px] flex items-center justify-center
                       bg-[#D8DBDB] rounded-lg overflow-hidden"
                >
                  <img
                    src={product.productImages[0].imgUrl}
                    className="max-h-[95%] max-w-[95%] object-contain"
                  />
                </div>
              </div>

              {/* RIGHT SECTION — DETAILS */}
              <div className="md:w-1/2 flex flex-col gap-4 py-4 px-3 bg-[#F5F6F6] rounded-lg">
                {/* TITLE */}
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  {product.productName}
                </h2>

                {/* BRAND */}
                <p className="text-sm text-gray-600">
                  Brand:
                  <span className="font-medium text-gray-800 ml-1">
                    {product.brandName}
                  </span>
                </p>

                {/* RATINGS */}
                <div className="flex items-center gap-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-md">
                    4.3 ★
                  </span>
                  <p className="text-xs text-gray-600">(12,430 ratings)</p>
                </div>

                {/* PRICES */}
                <div className="flex items-center gap-3 mt-2">
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

                {/* OFFERS */}
                <div>
                  <p className="font-semibold text-sm text-gray-900">
                    Available Offers
                  </p>
                  <ul className="list-disc ml-5 mt-1 text-sm text-gray-600 space-y-1">
                    <li>10% instant discount with SBI Credit Card</li>
                    <li>Special Price: Extra ₹200 off</li>
                    <li>No Cost EMI from ₹199/month</li>
                  </ul>
                </div>

                {/* DESCRIPTION */}
                <div className="text-gray-800 text-sm leading-relaxed">
                  <p className="font-semibold  text-sm text-gray-900">
                    Description :
                  </p>
                  <span className="pl-1">{product.description}</span>
                </div>

                {/* DELIVERY INFO */}
                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-semibold">Delivery:</span> 3–5 days
                  </p>
                  <p>
                    <span className="font-semibold">Return Policy:</span> 7-Day
                    Replacement
                  </p>
                </div>

                {/* BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-3 mt-3">
                  <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
                    Add to Cart
                  </button>
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
