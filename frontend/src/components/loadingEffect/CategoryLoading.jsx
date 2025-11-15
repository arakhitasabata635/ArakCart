export default function CategoryLoading() {
  return (
    <div className="flex justify-center gap-4 overflow-x-auto no-scrollbar px-1">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="min-w-[120px] flex flex-col items-center cursor-pointer 
                       transition-all duration-300 hover:-translate-y-1"
        >
          <div className="h-24 w-24 rounded-full shimmer"></div>
          <p className="mt-2 h-4 w-20 shimmer"></p>
        </div>
      ))}
    </div>
  );
}
