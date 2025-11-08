import React from "react";

const FullImage = ({ previewImage, setPreviewImage }) => {
  return (
    <div
      onClick={() => {
        setPreviewImage(null);
      }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <div className="relative">
        <img
          src={previewImage}
          className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-xl"
          alt="preview"
        />
        <button
          onClick={() => {
            setPreviewImage(null);
          }}
          className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 font-bold text-black shadow"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default FullImage;
