import { FaStore } from "react-icons/fa";

const RenderPending = ({result}) => (
  <div className="p-10 text-center">
    <FaStore className="text-6xl text-yellow-500 mx-auto mb-4 animate-pulse" />
    <h2 className="text-2xl font-bold text-gray-800">
      Application Under Review
    </h2>
    <p className="text-gray-600 mt-2">
      Your seller application is being reviewed by our team.
    </p>

    <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
      <p className="text-sm text-yellow-700">
        ⏳ This usually takes 24–48 hours
      </p>
    </div>

    <p className="text-xs text-gray-400 mt-4">
      Applied on: {new Date(result.appliedAt).toLocaleDateString()}
    </p>
  </div>
);

export default RenderPending;
