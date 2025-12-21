import React, { useState } from "react";
import productCategory from "../../common/productCategory";
import { FaUpload } from "react-icons/fa";
import uploadImgCloudnary from "../../helpers/uploadImageInCloudnary";
import ProductImage from "./ProductImage";
import apiSummary from "../../common";
import { toast } from "react-toastify";
import deleteImageFromCloudnary from "../../helpers/deleteImageFromCloudnary";

const AdminEditProduct = ({ product, setEditProduct, setAllProduct }) => {
  const [selectedImgFiles, setSelectedImgfiles] = useState([]);
  const [oldImgToBeDelete, setOldImgToBeDelete] = useState([]);
  const [data, setData] = useState({
    _id: product?._id,
    productName: product?.productName,
    brandName: product?.brandName,
    category: product?.category,
    productImages: product?.productImages,
    price: product?.price,
    sellingPrice: product?.sellingPrice,
    description: product?.description,
  });

  const handleSelectImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    // store all selected files in state
    setSelectedImgfiles((prev) => [...prev, ...files]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadAllImages = async () => {
    if (selectedImgFiles.length === 0) return [];
    try {
      const uploadResults = await Promise.all(
        selectedImgFiles.map((file) => uploadImgCloudnary(file))
      );
      setSelectedImgfiles([]);
      return uploadResults.map((res) => ({
        imgUrl: res.url,
        public_id: res.public_id,
      }));
    } catch (err) {
      console.log("error while uploading img", err);
    }
  };

  const removeImage = (index) => {
    setOldImgToBeDelete((prev) => [
      ...prev,
      data.productImages[index].public_id,
    ]);
    setData((prev) => {
      return {
        ...prev,
        productImages: prev.productImages.filter((_, i) => i !== index),
      };
    });
  };
  const heandleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const allImgs = (await handleUploadAllImages()) || [];
      const finaldata = {
        ...data,
        productImages: [...data.productImages, ...allImgs],
      };

      const fetchEditProductApi = await fetch(apiSummary.editProduct.url, {
        method: apiSummary.editProduct.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(finaldata),
      });
      const dataRes = await fetchEditProductApi.json();
      if (dataRes.success) {
        toast.success(dataRes.message);
        //delete old img from cloudnary
        Promise.all(
          oldImgToBeDelete.map((public_id) =>
            deleteImageFromCloudnary(public_id)
          )
        );

        setAllProduct((prev) => {
          return prev.map((product) =>
            product._id === dataRes.data._id ? dataRes.data : product
          );
        });
        setEditProduct(false);
      }
      if (dataRes.error) {
        toast.error(dataRes.message);
      }
    } catch (err) {
      toast.error("Something went wrong while updating the product");
      console.error(err);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <form
        onSubmit={heandleOnSubmit}
        className="w-[520px] h-[520px] overflow-y-scroll  bg-white p-6 rounded-xl shadow-lg flex flex-col gap-3 animate-fadeIn"
      >
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
          Edit Product
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
              onChange={handleSelectImages}
            />
          </label>

          {/* Preview Images */}
          {data.productImages.length > 0 ? (
            <div className="grid grid-cols-4 gap-1 mt-2">
              {data.productImages?.map((img, index) => (
                <ProductImage
                  key={index}
                  img={img}
                  index={index}
                  removeImage={removeImage}
                />
              ))}
              {selectedImgFiles.length > 0 &&
                selectedImgFiles.map((file, index) => (
                  <ProductImage
                    key={index}
                    img={URL.createObjectURL(file)}
                    index={index}
                    setSelectedImgfiles={setSelectedImgfiles}
                  />
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
            onClick={() => setEditProduct(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Edit Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProduct;
