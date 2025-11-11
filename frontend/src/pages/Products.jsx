import { useState } from "react";
import UploadProduct from "../components/UploadProduct";

const Products = () => {
  const [uploadProduct, setUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          All Products
        </h2>

        <button
          onClick={() => setUploadProduct(true)}
          className="px-5 py-2 rounded-md font-semibold text-white text-sm
          bg-gradient-to-r from-blue-600 to-blue-400 shadow-md
          hover:scale-[1.05] hover:from-blue-700 hover:to-blue-500
          transition-all duration-200"
        >
          + Add Product
        </button>
      </div>

      {/* Temporary placeholder for products list */}
      <div className="text-gray-600 border border-gray-300 rounded-md p-6 text-center">
        Products List Here (Coming next )
      </div>
      {uploadProduct && <UploadProduct setUploadProduct={setUploadProduct} />}
    </div>
  );
};

export default Products;
