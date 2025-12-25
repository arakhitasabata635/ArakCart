const backendPortUrl = "http://localhost:8080";

const apiSummary = {
  SignUP: {
    url: `${backendPortUrl}/api/signup`,
    method: "post",
  },
  login: {
    url: `${backendPortUrl}/api/login`,
    method: "post",
  },
  current_user: {
    url: `${backendPortUrl}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendPortUrl}/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendPortUrl}/api/admin/users`,
    method: "get",
  },
  updateUser: {
    url: `${backendPortUrl}/api/admin/update-user`,
    method: "post",
  },
  updateUserRole: {
    url: `${backendPortUrl}/api/user-role-update`,
    method: "post",
  },
  delImgCloudnary: {
    url: `${backendPortUrl}/api/delete-image`,
    method: "delete",
  },
  UploadProduct: {
    url: `${backendPortUrl}/api/upload-product`,
    method: "post",
  },
  allProducts: {
    url: `${backendPortUrl}/api/get-products`,
    method: "get",
  },
  editProduct: {
    url: `${backendPortUrl}/api/edit-product`,
    method: "post",
  },
  getCategory: {
    url: `${backendPortUrl}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendPortUrl}/api/category-products`,
    method: "post",
  },
  productDetails: {
    url: `${backendPortUrl}/api/product-details`,
    method: "post",
  },
  addtoCart: {
    url: `${backendPortUrl}/api/Add-cart`,
    method: "post",
  },
  cartCount: {
    url: `${backendPortUrl}/api/cart-itemCount`,
    method: "get",
  },
  cartProducts: {
    url: `${backendPortUrl}/api/cart-products`,
    method: "get",
  },
  deleteFromCart: {
    url: `${backendPortUrl}/api/remove-from-cart`,
    method: "post",
  },
  updateCartitemCount: {
    url: `${backendPortUrl}/api/update-cart-item-count`,
    method: "post",
  },
  search_products: {
    url: `${backendPortUrl}/api/search`,
    method: "get",
  },
  category_prouct: {
    url: `${backendPortUrl}/api/category-products`,
    method: "get",
  },
  createPayCheckoutSession: {
    url: `${backendPortUrl}/api/payment/create-checkout-session`,
    method: "post",
  },
  allOrders: {
    url: `${backendPortUrl}/api/orders`,
    method: "get",
  },
  sessionOrder: {
    url: `${backendPortUrl}/api/orders/session-order`,
    method: "post",
  },
};

export default apiSummary;
