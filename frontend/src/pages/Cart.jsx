import { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import apiSummary from "../../common";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const fetchCartData = async () => {
    const response = await fetch(apiSummary.cartProducts.url, {
      method: apiSummary.cartProducts.method,
      credentials: "include",
    });

    const data = await response.json();
    console.log(data);
    if (data.success) setCart(data.data);
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const removeItem = (item) => {
    setCart((prev) => prev.filter((p) => p._id !== item._id));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.qty * item.sellingPrice,
    0
  );

  const totalMRP = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const discount = totalMRP - totalPrice;

  return (
    <div className="min-h-screen py-8 px-4">

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT AREA */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-semibold mb-6">
              Shopping Cart ({cart.length})
            </h2>

            {cart.length === 0 && (
              <p className="text-gray-600 text-center py-10 border rounded-lg">
                Your cart is empty.
              </p>
            )}

            <div className="space-y-5">
              {cart.map((i) => (
                <CartItem
                  key={i.product._id}
                  item={i.product}
                  onRemove={removeItem}
                />
              ))}
            </div>
          </div>

          {/* RIGHT AREA */}
          <div className="bg-gray-50 border rounded-xl p-6 h-fit sticky top-28">

            <h3 className="text-2xl font-semibold mb-5">Order Summary</h3>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Price ({cart.length} items)</span>
                <span>₹{totalMRP}</span>
              </div>

              <div className="flex justify-between text-green-600 font-medium">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-600">FREE</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total Amount</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-lg">
              Place Order
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
