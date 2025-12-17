import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="flex items-center gap-4 border rounded-lg p-3 shadow-sm bg-white">

      {/* IMAGE */}
      <img
        src={item.productImages[0].imgUrl}
        alt={item.productName}
        className="w-16 h-16 object-contain rounded border p-1 bg-gray-50"
      />

      {/* INFO */}
      <div className="flex-1">
        <p className="font-semibold text-sm line-clamp-1">
          {item.productName}
        </p>
        <p className="text-gray-500 text-xs capitalize">
          {item.brandName}
        </p>

        <div className="flex items-center gap-2">
          <p className="text-green-600 font-bold text-sm">
            ₹{item.sellingPrice}
          </p>
          <p className="line-through text-gray-400 text-xs">
            ₹{item.price}
          </p>
        </div>
      </div>

      {/* QUANTITY */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onDecrease(item)}
          className="p-1 border rounded text-gray-600 hover:bg-gray-100"
        >
          <FaMinus size={10} />
        </button>

        <span className="font-semibold w-5 text-center">{item.qty}</span>

        <button
          onClick={() => onIncrease(item)}
          className="p-1 border rounded text-gray-600 hover:bg-gray-100"
        >
          <FaPlus size={10} />
        </button>
      </div>

      {/* REMOVE */}
      <button
        onClick={() => onRemove(item)}
        className="p-2 text-red-500 hover:bg-red-100 rounded"
      >
        <FaTrash size={14} />
      </button>
    </div>
  );
};

export default CartItem;
