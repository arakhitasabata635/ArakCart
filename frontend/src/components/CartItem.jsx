import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import apiSummary from "../../common";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";

const CartItem = ({ item, qty, removeItem, setCart }) => {
  const discount = item.price - item.sellingPrice;

  const [updateCount, setUpdateCount] = useState(false);

  const updateCartItemCount = async (productId, action) => {
    setUpdateCount(true);
    const fetchApi = await fetch(apiSummary.updateCartitemCount.url, {
      method: apiSummary.updateCartitemCount.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, action }),
      credentials: "include",
    });
    const data = await fetchApi.json();
    if (data.success) {
      toast.success(data.message);
      setCart((prev) =>
        prev.map((i) =>
          i.product._id === item._id ? { ...i, quantity: data.quantity } : i
        )
      );
      setUpdateCount(false);
    }
  };

  return (
    <div className="flex  items-center gap-3 sm:gap-5 border rounded-xl p-2 sm:p-4 shadow hover:shadow-md bg-white transition-all duration-200">
      {/* IMAGE */}
      <Link
       to={`/product-details/${item._id}`}
       className="relative">
        <img
          src={item.productImages[0].imgUrl}
          alt={item.productName}
          className="w-20 h-20 object-contain rounded-lg bg-gray-50 p-2 border"
        />

        {/* DISCOUNT BADGE */}
        {discount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
            {Math.round((discount / item.price) * 100)}% OFF
          </span>
        )}
      </Link>

      {/* PRODUCT INFO */}
      <div className="flex-1 space-y-1">
        <p className="font-semibold text-sm line-clamp-1 text-gray-800">
          {item.productName}
        </p>

        <p className="text-gray-500 text-xs">
          Brand: <span className="capitalize">{item.brandName}</span>
        </p>

        <p className="text-gray-500 hidden md:block text-xs">Category: {item.category}</p>

        <p className="text-xs hidden md:block text-gray-600 line-clamp-1">{item.description}</p>

        <div className="flex items-center gap-2">
          <p className="text-green-600 font-bold text-sm">
            ₹{item.sellingPrice}
          </p>
          <p className="line-through text-gray-400 text-xs">₹{item.price}</p>
        </div>

        <p className="text-xs text-gray-500">
          {qty} × ₹{item.sellingPrice} ={" "}
          <span className="font-semibold text-gray-700">
            ₹{item.sellingPrice * qty}
          </span>
        </p>

        {discount > 0 && (
          <p className="text-green-600 text-xs font-medium">
            You saved ₹{discount * qty} 🎉
          </p>
        )}
      </div>

      {/* qty BUTTONS */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <button
          disabled={qty === 1 || updateCount}
          onClick={() => updateCartItemCount(item._id, "dec")}
          className={` ${
            qty === 1 || updateCount
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100"
          }
            p-2 border rounded-full cursor-pointer text-gray-600 hover:bg-gray-200 hover:text-black transition`}
        >
          <FaMinus size={10} />
        </button>

        <span className="font-semibold w-6 text-center text-gray-700">
          {qty}
        </span>

        <button
          disabled={updateCount}
          onClick={() => updateCartItemCount(item._id, "inc")}
          className={` ${
            updateCount ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
          }
            p-2 border rounded-full cursor-pointer text-gray-600 hover:bg-gray-200 hover:text-black transition`}
        >
          <FaPlus size={10} />
        </button>
      </div>

      {/* REMOVE */}
      <button
        onClick={() => removeItem(item)}
        className="p-2 rounded-lg cursor-pointer text-red-500 hover:bg-red-100 hover:text-red-600 transition"
      >
        <FaTrash size={14} />
      </button>
    </div>
  );
};

export default CartItem;
