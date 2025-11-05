const backendPortUrl = "http://localhost:8080";

const apiSummary = {
  SignUP: {
    url: `${backendPortUrl}/api/signup`,
    method: "POST",
  },
  login: {
    url: `${backendPortUrl}/api/login`,
    method: "POST",
  },
  current_user: {
    url: `${backendPortUrl}/api/user-details`,
    method: "GET",
  },
};

export default apiSummary;
