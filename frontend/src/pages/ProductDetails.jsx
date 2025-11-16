import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiSummary from "../../common";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduc]=useState(null)

  const productDetails = async () => {
    const fetchApi = await fetch(apiSummary.productDetails.url, {
      method: apiSummary.productDetails.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    });
    const dataRes = await fetchApi.json();
    console.log(dataRes.data);
    setProduc(dataRes.data)
  };

  useEffect(() => {
    productDetails();
  }, []);

  return <>
  {
    product &&   
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
      <div className="w-[380px] h-[350px] flex items-center justify-center 
                      bg-[#D8DBDB] rounded-lg overflow-hidden">
        <img
          src={product.productImages[0].imgUrl}
          className="max-h-[90%] max-w-[90%] object-contain"
        />
      </div>
    </div>

    {/* RIGHT — Details */}
    <div className="flex flex-col gap-3  py-5 rounded-lg">

      {/* Name */}
      <h2 className="text-xl font-semibold leading-tight">
        {product.productName}
      </h2>

      {/* Brand */}
      <p className="text-sm text-gray-700 italic">
        Brand: {product.brandName}
      </p>

      {/* Prices */}
      <div className="flex items-center gap-3 mt-2">
        <p className="text-2xl font-bold text-green-700">
          ₹{product.sellingPrice}
        </p>
        <p className="text-lg text-gray-500 line-through">
          ₹{product.price}
        </p>
      </div>

      {/* Description */}
      <p className="text-gray-800 leading-relaxed text-sm mt-2">
        {product.description}
      </p>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold
                           hover:bg-orange-600 transition">
          Add to Cart
        </button>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold
                           hover:bg-blue-700 transition">
          Buy Now
        </button>
      </div>

    </div>
  </div>
</div>


  }
  </>
};

export default ProductDetails;
