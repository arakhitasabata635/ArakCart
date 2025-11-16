import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import AdminEditProduct from "./AdminEditProduct";

const AdminProductCard = ({ product, setAllProduct }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
   <>
  <div
    key={product._id}
    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300
               relative group w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px] h-[280px]
               flex flex-col overflow-hidden"
  >
    {/* Product Image */}
    <div className="relative h-40 w-full overflow-hidden">
      <img
        src={product.productImages[0]?.imgUrl}
        alt={product.productName}
        className="h-full w-full object-contain group-hover:scale-105 transition duration-300"
      />

      {/* Hover Buttons */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={() => setEditProduct(true)}
          className="bg-white p-2 rounded-full shadow hover:bg-blue-100 transition"
        >
          <RiEdit2Fill className="text-xl text-blue-600 hover:scale-110 transition" />
        </button>

        <button
          // onClick={() => handleDelete(product._id)}
          className="bg-white p-2 rounded-full shadow hover:bg-red-100 transition"
        >
          <MdDelete className="text-xl text-red-600 hover:scale-110 transition" />
        </button>
      </div>
    </div>

    {/* Product Details */}
    <div className="p-3 flex flex-col items-center justify-between flex-1 text-center">
      <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 w-full">
        {product.productName}
      </h3>
      <p className="text-xs sm:text-sm text-gray-500">{product.category}</p>
      <p className="text-[#FF385C] font-semibold mt-1 text-sm sm:text-base">
        ₹{product.price}
      </p>
    </div>
  </div>

  {editProduct && (
    <AdminEditProduct
      product={product}
      setEditProduct={setEditProduct}
      setAllProduct={setAllProduct}
    />
  )}
</>

  );
};

export default AdminProductCard;
