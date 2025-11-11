import { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import apiSummary from "../../common";
import { toast } from "react-toastify";

const Products = () => {
  const [uploadProduct, setUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const fetchApi = await fetch(apiSummary.allProducts.url, {
      method: apiSummary.allProducts.method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const apiRes = await fetchApi.json();
    console.log(apiRes);
    if (apiRes.success) {
      toast.success(apiRes.message);
      setAllProduct(apiRes.data || []);
    }
    if (apiRes.error) {
      toast.error(apiRes.message);
    }
  };

  useEffect(() => {
    fetchAllProduct();

  }, []);
  console.log(allProduct);
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

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProduct?.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition relative group"
          >
            {/* Product Image */}
            <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
              <img
                src={item.productImages[0]?.imgUrl}
                alt={item.productName}
                className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
              />

              {/* Hover Buttons */}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                {/* Edit */}
                <button
                  // onClick={() => handleEdit(item._id)}
                  className="bg-white p-2 rounded-full shadow hover:bg-blue-100"
                >
                  ✏️
                </button>

                {/* Delete */}
                <button
                  // onClick={() => handleDelete(item._id)}
                  className="bg-white p-2 rounded-full shadow hover:bg-red-100"
                >
                  🗑️
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.productName}
              </h3>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-[#FF385C] font-semibold mt-1">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {uploadProduct && <UploadProduct setUploadProduct={setUploadProduct} />}
    </div>
  );
};

export default Products;
