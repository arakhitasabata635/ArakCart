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
  allUser:{
    url: `${backendPortUrl}/api/admin/users`,
    method: "get"
  },
   updateUser:{
    url: `${backendPortUrl}/api/admin/update-user`,
    method: "post"
  },
  delImgCloudnary:{
    url: `${backendPortUrl}/api/delete-image`,
    method: "delete"
  },
  UploadProduct:{
    url: `${backendPortUrl}/api/upload-product`,
    method: "post"
  },
   allProducts:{
    url: `${backendPortUrl}/api/get-products`,
    method: "get"
  }
};

export default apiSummary;
