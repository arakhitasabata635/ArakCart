import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiSummary from "../../common";
import ProductDetailsLoading from "../components/loadingEffect/ProductDetailsLoading";
import RecomendedProduct from "../components/RecomendedProduct";
import addToCart from "../../helpers/addToCart";
import { addToCartLocal } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import handlePayment from "../../helpers/handlePayment";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [bigImg, setBigImg] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = async () => {
    const fetchApi = await fetch(apiSummary.productDetails.url, {
      method: apiSummary.productDetails.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const dataRes = await fetchApi.json();
    setProduct(dataRes.data);
    setIsLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setBigImg(0);
    productDetails();
  }, [id]);

  return (
    <>
      {isloading ? (
        <ProductDetailsLoading />
      ) : (
        <div className="w-full bg-[#E3E6E6] py-6">
          <div className="max-w-6xl mx-auto px-3 md:px-4">
            {/* MAIN CONTAINER */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* LEFT: IMAGES SECTION */}
              <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-4">
                {/* SMALL IMAGES */}
                <div
                  className="
                              flex md:flex-col gap-3 
                              overflow-x-auto md:overflow-y-auto
                              no-scrollbar 
                              md:h-[450px] 
                              order-2 md:order-1
                            "
                >
                  {product?.productImages?.map((img, i) => (
                    <img
                      key={i}
                      src={img.imgUrl}
                      onClick={() => setBigImg(i)}
                      className=" bg-[#d8d8d8d1] w-20 h-20 flex-shrink-0 rounded-md 
                          p-2 object-contain mix-blend-multiply
                         cursor-pointer hover:scale-105 transition"
                    />
                  ))}
                </div>

                {/* BIG IMAGE */}
                <div
                  className="
                              w-full md:flex-1 
                              h-[300px] sm:h-[360px] md:h-[460px] lg:h-[520px]
                              flex items-center justify-center  
                              overflow-hidden 
                              order-1 md:order-2
                            "
                >
                  <img
                    src={product?.productImages[bigImg]?.imgUrl}
                    className="bg-[#d8d8d8d1] mix-blend-darken
              h-full w-full object-contain 
              transition-transform duration-300
            "
                  />
                </div>
              </div>

              {/* RIGHT: DETAILS SECTION */}
              <div className="md:w-1/2 flex flex-col gap-4 py-4 px-4 bg-[#F5F6F6] rounded-lg">
                {/* TITLE */}
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                  {product.productName}
                </h2>

                {/* BRAND */}
                <p className="text-sm text-gray-600">
                  Brand:
                  <span className="font-medium text-gray-800 ml-1">
                    {product.brandName}
                  </span>
                </p>

                {/* RATINGS */}
                <div className="flex items-center gap-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-md">
                    4.3 ★
                  </span>
                  <p className="text-xs text-gray-600">(12,430 ratings)</p>
                </div>

                {/* PRICES */}
                <div className="flex items-center gap-3 mt-2">
                  <p className="text-3xl font-bold text-green-700">
                    ₹{product.sellingPrice}
                  </p>
                  <p className="text-lg text-gray-500 line-through">
                    ₹{product.price}
                  </p>
                  <p className="text-green-600 text-sm font-semibold">
                    {Math.round(
                      ((product.price - product.sellingPrice) / product.price) *
                        100
                    )}
                    % Off
                  </p>
                </div>

                {/* OFFERS */}
                <div>
                  <p className="font-semibold text-sm text-gray-900">
                    Available Offers
                  </p>
                  <ul className="list-disc ml-5 mt-1 text-sm text-gray-600 space-y-1">
                    <li>10% instant discount with SBI Credit Card</li>
                    <li>Special Price: Extra ₹200 off</li>
                    <li>No Cost EMI from ₹199/month</li>
                  </ul>
                </div>

                {/* DESCRIPTION */}
                <div className="text-gray-800 text-sm leading-relaxed">
                  <p className="font-semibold text-gray-900">Description :</p>
                  <span className="pl-1">{product.description}</span>
                </div>

                {/* DELIVERY INFO */}
                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-semibold">Delivery:</span> 3–5 days
                  </p>
                  <p>
                    <span className="font-semibold">Return Policy:</span> 7-Day
                    Replacement
                  </p>
                </div>

                {/* BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-3 mt-3">
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const dataRes = await addToCart(product._id);
                      if (dataRes.success) {
                        toast.success(dataRes.message);
                        dispatch(addToCartLocal());
                      }
                      if (dataRes.error) {
                        toast.error(dataRes.message);
                      }
                    }}
                    className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      navigate("/order/checkout", {
                        state: {
                          totalPrice: product.sellingPrice,
                          cartItems: [{ product: product, quantity: 1 }],
                        },
                      });
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {product && (
        <RecomendedProduct
          category={product.category}
          heading={"Similar Products"}
        />
      )}
    </>
  );
};

export default ProductDetails;
