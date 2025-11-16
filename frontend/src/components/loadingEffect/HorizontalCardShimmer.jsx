const HorizontalCardShimmer = () => {
  return (
    <div
      className="min-w-[260px] bg-white rounded-xl shadow border border-gray-300 p-3
                 animate-pulse"
    >
      <div className="flex gap-3 items-center">
        {/* Image Placeholder */}
        <div className="w-20 h-20 rounded-lg shimmer"></div>

        <div className="flex flex-col gap-2 w-full">
          {/* Title */}
          <div className="h-4 w-[70%] rounded shimmer"></div>
          {/* Brand */}
          <div className="h-3 w-[50%] rounded shimmer"></div>

          {/* Price Row */}
          <div className="flex gap-2 mt-1">
            <div className="h-4 w-16 rounded shimmer"></div>
            <div className="h-4 w-12 rounded shimmer"></div>
          </div>
        </div>
      </div>

      {/* Button Placeholder */}
      <div className="mt-3 h-8 w-full rounded-lg shimmer"></div>
    </div>
  );
};

export default HorizontalCardShimmer;
