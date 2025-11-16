const VerticalCardShimmer = () => {
  return (
    <div
      className="flex-shrink-0 w-[250px] bg-white rounded-xl shadow border border-gray-200
                 p-3 animate-pulse"
    >
      {/* Image Skeleton */}
      <div className="w-full h-[150px] bg-gray-200 rounded-md"></div>

      {/* Name */}
      <div className="mt-3 h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>

      {/* Brand */}
      <div className="mt-2 h-3 bg-gray-200 rounded w-1/3"></div>

      {/* Prices */}
      <div className="flex justify-between items-center gap-2 mt-4 pr-8">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-14"></div>
      </div>

      {/* Button */}
      <div className="mt-3 w-full h-8 bg-gray-200 rounded-lg"></div>
    </div>
  );
};

export default VerticalCardShimmer;
