import React, { useState } from "react";
import FullImage from "./FullImage";
import { FaTrash } from "react-icons/fa";

const ProductImage = ({ img, index }) => {
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <div key={index} className="relative group">
      <img
        src={img}
        alt="preview"
        className="w-full h-24 object-cover rounded-lg border"
        onClick={() => {
          setPreviewImage(img);
        }}
      />

      {/* Delete button */}
      <button
        // onClick={() => removeImage(index)}
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
