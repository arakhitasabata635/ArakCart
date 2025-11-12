import React, { useState } from "react";
import productCategory from "../../common/productCategory";
import { FaUpload } from "react-icons/fa";
import uploadImgCloudnary from "../../helpers/uploadImageInCloudnary";
import ProductImage from "./ProductImage";
import apiSummary from "../../common";
import { toast } from "react-toastify";

const UploadProduct = ({ setUploadProduct , setAllProduct }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImages: [],
    price: "",
    sellingPrice: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

 
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadRes = await uploadImgCloudnary(file);
    setData((prev) => {
      return {
        ...prev,
        productImages: [
          ...prev.productImages,
          { imgUrl: uploadRes.url, public_id: uploadRes.public_id },
        ],
      };
    });
  };

  const heandleOnSubmit = async (e) => {
    e.preventDefault();
    const fetchUploadProductApi = await fetch(apiSummary.UploadProduct.url, {
      method: apiSummary.UploadProduct.method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const dataRes = await fetchUploadProductApi.json();
    if (dataRes.success) {
      toast.success(dataRes.message);
      setAllProduct(prev =>[...prev, dataRes.data])
      setUploadProduct(false)
      
    }
    if (dataRes.error) {
      toast.error(dataRes.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <form
        onSubmit={heandleOnSubmit}
        className="w-[520px] h-[520px] overflow-y-scroll  bg-white p-6 rounded-xl shadow-lg flex flex-col gap-3 animate-fadeIn"
      >
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
          Add Product
        </h2>

        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={data.productName}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-indigo-400 outline-none"
          required
        />

        <input
          type="text"
          name="brandName"
          placeholder="Brand Name"
          value={data.brandName}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-indigo-400 outline-none"
          required
        />

        <select
          name="category"
          value={data.category}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-indigo-400 outline-none"
          required
        >
          <option value="" hidden>
            Select Category
          </option>
          {productCategory.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {/* upload image */}
        <div className="space-y-2">
          <p className="text-gray-800 font-medium">Product Images</p>

          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-indigo-400 bg-indigo-50 cursor-pointer rounded-lg p-4 hover:bg-indigo-100 transition">
            <FaUpload className="text-indigo-600 text-xl" />
            <span className="text-sm text-gray-600">
              Click to upload images
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          {/* Preview Images */}
          {data.productImages.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {data.productImages?.map((img, index) => (
                <ProductImage img={img} key={index} setData={setData} />
              ))}
            </div>
          ) : (
            <p className="text-red-500 "> *please upload product image.</p>
          )}
        </div>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={data.price}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-indigo-400 outline-none"
          required
        />

        <input
          type="number"
          name="sellingPrice"
          placeholder="Selling Price"
          value={data.sellingPrice}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-indigo-400 outline-none"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={data.description}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full min-h-[80px] max-h-[150px] resize-none  overflow-y-auto outline-none focus:ring-indigo-400 focus:border-indigo-400 bg-white text-gray-800
          "
        />

        {/* Buttons */}
        <div className="flex justify-between mt-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            onClick={() => setUploadProduct(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadProduct;
