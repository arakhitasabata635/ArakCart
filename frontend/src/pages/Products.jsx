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
    <div className="reletive bg-gray-200 flex flex-col overflow-y-auto h-[calc(100vh-64px)]">
      {/* 🔹 Sticky Header */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-white/90 border-b shadow-sm flex items-center justify-between p-4">
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

      {/* 🔹 Product Section */}
      <main>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {allProduct?.map((product, i) => (
            <AdminProductCard
              key={i}
              product={product}
              setAllProduct={setAllProduct}
            />
          ))}
        </div>
      </main>

      {/* 🔹 Upload Modal */}
      {uploadProduct && (
        <UploadProduct
          setUploadProduct={setUploadProduct}
          setAllProduct={setAllProduct}
        />
      )}
    </div>
  );
};

export default Products;
