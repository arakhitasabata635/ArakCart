import { useEffect, useState } from "react";
import apiSummary from "../../common";
import RenderPending from "../components/RenderPending";
import RenderRejected from "../components/RenderRejected";
import RenderApplyForm from "../components/RenderApplyForm";

const ApplySeller = () => {
  const [result, setResult] = useState({});
  const sellerApplyStatus = async () => {
    const fetchApi = await fetch(apiSummary.checkApplyStatus.url, {
      method: apiSummary.checkApplyStatus.method,
      credentials: "include",
    });
    const res = await fetchApi.json();
    setResult(res.data);
  };
  useEffect(() => {
    sellerApplyStatus();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {result?.status === "not_applied" && (
          <RenderApplyForm sellerApplyStatus={sellerApplyStatus} />
        )}
        {result?.status === "pending" && <RenderPending result={result} />}
        {result?.status === "rejected" && (
          <RenderRejected result={result} setResult={setResult} />
        )}
      </div>
    </div>
  );
};

export default ApplySeller;
