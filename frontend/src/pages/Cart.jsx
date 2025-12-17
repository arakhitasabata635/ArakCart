import { useState } from "react";
import CartItem from "../components/CartItem";

const Cart = () => {
  const [cart, setCart] = useState([
    {
      _id: "1",
      productName: "iPhone 13",
      brandName: "Apple",
      price: 69999,
      sellingPrice: 58999,
      qty: 1,
      productImages: [{ imgUrl: "https://via.placeholder.com/100" }],
    },
  ]);

  const increaseQty = (item) => {
    setCart((prev) =>
      prev.map((p) =>
        p._id === item._id ? { ...p, qty: p.qty + 1 } : p
      )
    );
  };

  const decreaseQty = (item) => {
    setCart((prev) =>
      prev.map((p) =>
        p._id === item._id && p.qty > 1 ? { ...p, qty: p.qty - 1 } : p
      )
    );
  };

  const removeItem = (item) => {
    setCart((prev) => prev.filter((p) => p._id !== item._id));
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>

      <div className="space-y-3">
        {cart.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            onIncrease={increaseQty}
            onDecrease={decreaseQty}
            onRemove={removeItem}
          />
        ))}
      </div>

      {/* TOTAL */}
      <div className="flex justify-between mt-6 text-lg font-semibold">
        <span>Total</span>
        <span>
          ₹
          {cart.reduce(
            (sum, item) => sum + item.qty * item.sellingPrice,
            0
          )}
        </span>
      </div>

      <button className="w-full py-2 bg-blue-600 text-white rounded mt-4 hover:bg-blue-700">
        Checkout
      </button>
    </div>
  );
};

export default Cart;