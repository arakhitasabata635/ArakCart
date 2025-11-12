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
        className="bg-white rounded-lg shadow hover:shadow-lg transition relative group"
      >
        {/* Product Image */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <img
            src={product.productImages[0]?.imgUrl}
            alt={product.productName}
            className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
          />

          {/* Hover Buttons */}
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
            {/* Edit */}
            <button
              onClick={() => setEditProduct(true)}
              className="bg-white p-2 rounded-full shadow hover:bg-blue-300"
            >
              <RiEdit2Fill className="text-xl hover:scale-110 transition" />
            </button>

            {/* Delete */}
            <button
              // onClick={() => handleDelete(product._id)}
              className="bg-white p-2 rounded-full shadow hover:bg-red-300"
            >
              <MdDelete className="text-xl hover:scale-110 transition" />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {product.productName}
          </h3>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="text-[#FF385C] font-semibold mt-1">₹{product.price}</p>
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
