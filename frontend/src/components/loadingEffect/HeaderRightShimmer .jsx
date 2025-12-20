const HeaderRightShimmer = () => {
  return (
    <div className="flex pl-1 items-center gap-4">
      <div className="w-6 h-6 bg-gray-200 rounded shimmer"></div> {/* cart icon */}
      <div className="w-8 h-8 bg-gray-200 rounded-full shimmer"></div> {/* avatar */}
      <div className="hidden sm:block w-19 h-9 bg-gray-200 rounded-full shimmer"></div> {/* logout button */}
    </div>
  );
};
export default HeaderRightShimmer;