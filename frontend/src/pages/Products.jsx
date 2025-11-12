import { useEffect, useState } from "react";
import apiSummary from "../../common";
import { toast } from "react-toastify";
import AdminProductCard from "../components/AdminProductCard";
import UploadProduct from "../components/UploadProduct copy";

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
        {allProduct?.map((product, indx) => (
          <AdminProductCard key={indx} product={product} setAllProduct={setAllProduct} />
        ))}
      </div>

      {uploadProduct && <UploadProduct setUploadProduct={setUploadProduct} setAllProduct={setAllProduct}/>}
    </div>
  );
};

export default Products;
