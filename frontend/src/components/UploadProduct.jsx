import React from "react";
import productCategory from "../../common/productCategory";

const UploadProduct = ({ setUploadProduct }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="w-[420px] bg-white p-6 rounded-xl shadow-lg flex flex-col gap-3 animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
          Add Product
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          // onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-indigo-400 outline-none"
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand Name"
          // onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-indigo-400 outline-none"
        />

        <select
          name="category"
          // onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-indigo-400 outline-none"
        >
          <option value="">Select Category</option>
          {productCategory.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Description"
          // onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-lg h-20 resize-none focus:ring focus:ring-indigo-400 outline-none"
        />

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

        {/* Buttons */}
        <div className="flex justify-between mt-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            onClick={()=>setUploadProduct(false)}
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
      </div>
    </div>
  );
};

export default UploadProduct;
