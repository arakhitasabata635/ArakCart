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
};

export default apiSummary;
