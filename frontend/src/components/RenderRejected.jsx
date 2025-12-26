import { FaStore } from "react-icons/fa";
import apiSummary from "../../common";
import { toast } from "react-toastify";

const RenderRejected = ({ result, setResult }) => {
  const handleReapply = async () => {
    const fetchApi = await fetch(apiSummary.reapplySeller.url, {
      method: apiSummary.reapplySeller.method,
      credentials: "include",
    });

    const res = await fetchApi.json();

    if (res.success) {
      toast.success(res.message);
      setResult({ status: "not_applied" });
    }

    if (res.error) {
      toast.error(res.message);
    }
  };

  return (
    <div className="p-10 text-center">
      <FaStore className="text-6xl text-red-500 mx-auto mb-4" />

      <h2 className="text-2xl font-bold text-gray-800">Application Rejected</h2>

      <p className="text-gray-600 mt-2">Your seller request was rejected.</p>

      {result?.adminNote && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-700">Reason: {result?.adminNote}</p>
        </div>
      )}

      <button
        onClick={handleReapply}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition"
      >
        Reapply as Seller
      </button>
    </div>
  );
};

export default RenderRejected;
