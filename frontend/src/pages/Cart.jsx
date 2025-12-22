import { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import { useDispatch } from "react-redux";
import apiSummary from "../../common";
import { removeFromCartLocal } from "../store/userSlice";
import { CartLoading } from "../components/loadingEffect/CartLoading";
import handlePayment from "../../helpers/handlePayment";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchCartData = async () => {
    const response = await fetch(apiSummary.cartProducts.url, {
      method: apiSummary.cartProducts.method,
      credentials: "include",
    });

    const data = await response.json();
    if (data.success) {
      setCart(data.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const removeItem = async (item) => {
    const fetchApi = await fetch(apiSummary.deleteFromCart.url, {
      method: apiSummary.deleteFromCart.method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ productId: item._id }),
    });
    const data = await fetchApi.json();
    if (data.success) {
      setCart((prev) => prev.filter((p) => p.product._id !== item._id));
      dispatch(removeFromCartLocal());
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.sellingPrice,
    0
  );

  const totalMRP = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );
  const discount = totalMRP - totalPrice;

  return (
    <div className="min-h-screen sm:py-8 sm:px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT AREA */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-semibold mb-6">
              Shopping Cart ({cart.length})
            </h2>
            {loading ? (
              [...Array(3)].map((_, i) => <CartLoading key={i} />)
            ) : (
              <>
                {cart.length === 0 && (
                  <p className="text-gray-600 text-center py-10 border rounded-lg">
                    Your cart is empty.
                  </p>
                )}
                <div className="space-y-5">
                  {cart?.map((i) => (
                    <CartItem
                      key={i.product._id}
                      item={i.product}
                      qty={i.quantity}
                      setCart={setCart}
                      removeItem={removeItem}
                    />
                  ))}
                </div>
              </>
            )}
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

            <button
              onClick={() => handlePayment(cart)}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-lg"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
