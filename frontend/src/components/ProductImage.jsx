import React, { useState } from "react";
import FullImage from "./FullImage";
import { FaTrash } from "react-icons/fa";

const ProductImage = ({ imgUrl, index, setSelectedImgfiles }) => {
  const [previewImage, setPreviewImage] = useState(null);

  //delete image from cloudnary
  // const removeImage = async (public_id) => {
  //   const dataRes = await deleteImageFromCloudnary(public_id);
  //   if (dataRes.success) {
  //     toast.success(dataRes.message);
  //     setData((prev) => ({
  //       ...prev,
  //       productImages: prev.productImages.filter(
  //         (img) => img.public_id !== public_id
  //       ),
  //     }));
  //   }
  //   if (dataRes.error) {
  //     toast.error(dataRes.message);
  //   }
  // };

  const removeImage = (index) => {
    setSelectedImgfiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="relative group">
      <img
        src={imgUrl}
        alt="preview"
        className="w-full h-24 object-cover rounded-lg border"
        onClick={() => {
          setPreviewImage(imgUrl);
        }}
      />

      {/* Delete button */}
      <button
        onClick={() => removeImage(index)}
        className="absolute top-1 right-1 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        <FaTrash size={12} />
      </button>
      {previewImage && (
        <FullImage
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        />
      )}
    </div>
  );
};

export default ProductImage;
