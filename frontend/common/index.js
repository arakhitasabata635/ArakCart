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
};

export default apiSummary;
