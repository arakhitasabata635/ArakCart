import { toast } from "react-toastify";
import apiSummary from "../common";

const pendingApplications = async () => {
  const fetchApi = await fetch(apiSummary.getAllSellerRequests.url, {
    credentials: "include",
  });
  const res = await fetchApi.json();

  if (res.success) return res.data;
  if (res.error) {
    toast.error(res.message);
  }
};
export default pendingApplications;
