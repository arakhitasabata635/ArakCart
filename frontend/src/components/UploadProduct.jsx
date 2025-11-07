import React from "react";

const UploadProduct = ({ setUploadProduct }) => {
  return (
    <div
      // onClick={() => setOpenAddPopup(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <form
        // onClick={(e) => e.stopPropagation()}
        // onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 animate-fadeIn"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Add New Product
        </h3>

        <div className="grid gap-3">
          <input
            type="text"
            name="name"
            // value={data.name}
            // onChange={handleOnChange}
            placeholder="Product Name"
            required
            className="inputBox"
          />

          <input
            type="text"
            name="brand"
            // value={data.brand}
            // onChange={handleOnChange}
            placeholder="Brand Name"
            required
            className="inputBox"
          />

          <textarea
            name="description"
            // value={data.description}
            // onChange={handleOnChange}
            placeholder="Description"
            rows="3"
            className="inputBox resize-none"
          />

          <input
            type="number"
            name="price"
            // value={data.price}
            // onChange={handleOnChange}
            placeholder="Price"
            required
            className="inputBox"
          />

          <input
            type="number"
            name="sellingPrice"
            // value={data.sellingPrice}
            // onChange={handleOnChange}
            placeholder="Selling Price"
            required
            className="inputBox"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            type="button"
            onClick={() => setUploadProduct(false)}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadProduct;
