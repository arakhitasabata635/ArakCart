import { useEffect, useState } from "react";
import { FaStoreAlt, FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import apiSummary from "../../common";
import FullImage from "../components/FullImage";
import RejectSellerModal from "../components/RejectSellerModal";

const SellerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [rejectOpen, setRejectOpen] = useState(false);

  const pendingApplications = async () => {
    const fetchApi = await fetch(apiSummary.getAllSellerRequests.url, {
      credentials: "include",
    });
    const res = await fetchApi.json();

    if (res.success) setRequests(res.data);
    if (res.error) toast.error(res.error);
  };

  useEffect(() => {
    pendingApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          🏪 Seller Applications
        </h1>

        {requests.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <FaStoreAlt className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              No pending seller applications
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden"
              >
                {/* Header */}
                <div className="bg-blue-600 text-white p-5 flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">{req.shopName}</h2>
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full">
                    PENDING
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                  {/* Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                    <p className="flex items-center gap-2">
                      <FaUser className="text-blue-500" />
                      <span className="font-medium">Owner:</span>
                      {req.ownerName}
                    </p>

                    <p className="flex items-center gap-2">
                      <FaPhone className="text-green-500" />
                      {req.phone}
                    </p>

                    <p className="flex items-center gap-2 col-span-2">
                      <FaEnvelope className="text-red-500" />
                      {req.ShopMail}
                    </p>

                    <p className="col-span-2">
                      <span className="font-medium">GST:</span> {req.gstNumber}
                    </p>
                  </div>

                  {/* Documents */}
                  {req.documents?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        📄 Uploaded Documents
                      </h3>

                      <div className="grid grid-cols-3 gap-3">
                        {req.documents.map((img, index) => (
                          <div key={index}>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setPreviewImage(img.imgUrl);
                              }}
                              className="border rounded-lg overflow-hidden hover:scale-105 transition cursor-pointer "
                            >
                              <img
                                src={img.imgUrl}
                                alt="document"
                                className="h-24 w-full object-cover"
                              />
                            </button>
                            {previewImage && (
                              <FullImage
                                previewImage={previewImage}
                                setPreviewImage={setPreviewImage}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-4 pt-4">
                    <button
                      className="flex-1 bg-green-600 hover:bg-green-700 
                                 text-white py-2.5 rounded-xl font-medium transition"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => {
                        setRejectOpen(true);
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 
                                 text-white py-2.5 rounded-xl font-medium transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
                {rejectOpen && (
                  <RejectSellerModal
                    pendingApplications={pendingApplications}
                    setRejectOpen={setRejectOpen}
                    req={req}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerRequests;
