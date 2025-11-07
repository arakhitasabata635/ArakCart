import React, { useState } from "react";
import productCategory from "../../common/productCategory";
import { FaUpload, FaTrash } from "react-icons/fa";
import uploadImgCloudnary from "../../helpers/uploadImageInCloudnary";

const UploadProduct = ({ setUploadProduct }) => {
 
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImages: [],
    price: "",
    sellingPrice: "",
    description: "",
  });

  // image d in cloudnary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadRes = await uploadImgCloudnary(file);
    setData((prev)=>{
      return {
        ...prev,
        productImages:[...prev.productImages, uploadRes.url]
      }
    })
  };
  console.log("uploadImgInCloudnary", data);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <form className="w-[520px] h-[520px] overflow-y-scroll  bg-white p-6 rounded-xl shadow-lg flex flex-col gap-3 animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
          Add Product
        </h2>

        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          // onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-indigo-400 outline-none"
        />

        <input
          type="text"
          name="brandName"
          placeholder="Brand Name"
          // onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-indigo-400 outline-none"
        />

        <select
          name="category"
          // onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-indigo-400 outline-none"
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
          {data.productImages.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {data.productImages?.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt="preview"
                    className="w-full h-24 object-cover rounded-lg border"
                  />

                  {/* Delete button */}
                  <button
                    // onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          type="number"
          name="price"
          placeholder="Price"
          // onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-indigo-400 outline-none"
        />

        <input
          type="number"
          name="sellingPrice"
          placeholder="Selling Price"
          // onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-indigo-400 outline-none"
        />
        <textarea
          name="description"
          placeholder="Description"
          // onChange={handleChange}
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
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            // onClick={handleSubmit}
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadProduct;
