import { useState } from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

const RejectSellerModal = ({ setRejectOpen, req }) => {
  const [reason, setReason] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
                    bg-black/40 backdrop-blur-sm px-4"
    >
      <div
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl 
                      animate-scaleIn overflow-hidden"
      >
        {/* ===== Header ===== */}
        <div
          className="flex justify-between items-center px-6 py-4 
                        bg-red-50 border-b border-red-100"
        >
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-full">
              <FaExclamationTriangle className="text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-red-700">
              Reject Seller Application
            </h2>
          </div>

          <button
            onClick={() => setRejectOpen(false)}
            className="p-2 rounded-full hover:bg-red-100 transition"
          >
            <FaTimes className="text-red-500" />
          </button>
        </div>

        {/* ===== Body ===== */}
        <div className="px-6 py-6 space-y-5">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-600">
              You are rejecting application for:
            </p>
            <p className="text-lg font-bold text-gray-800 mt-1">
              {req.shopName}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Reason for rejection
            </label>
            <textarea
              rows="4"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Example: Documents are unclear, GST number mismatch..."
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 
                         text-sm focus:ring-2 focus:ring-red-400 
                         focus:border-red-400 outline-none resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              This reason will be visible to the seller.
            </p>
          </div>
        </div>

        {/* ===== Footer ===== */}
        <div className="flex gap-4 px-6 py-4 border-t bg-gray-50">
          <button
            onClick={() => setRejectOpen(false)}
            className="flex-1 py-2.5 rounded-xl border border-gray-300 
                       text-gray-700 hover:bg-gray-200 transition"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            disabled={!reason.trim()}
            className={`flex-1 py-2.5 rounded-xl text-white font-semibold transition
              ${
                reason.trim()
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-red-300 cursor-not-allowed"
              }`}
          >
            Reject Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectSellerModal;
