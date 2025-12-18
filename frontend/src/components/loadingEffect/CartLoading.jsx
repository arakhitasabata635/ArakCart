export const CartLoading = () => {
   return (
    <div className="flex items-center gap-5 border rounded-xl p-4 shadow bg-white animate-pulse">

      {/* IMAGE SKELETON */}
      <div className="w-20 h-20 bg-gray-200 rounded-lg" />

      {/* PRODUCT INFO SKELETON */}
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-200 w-40 rounded" />
        <div className="h-3 bg-gray-200 w-24 rounded" />
        <div className="h-3 bg-gray-200 w-20 rounded" />
        <div className="h-3 bg-gray-200 w-32 rounded" />
        <div className="h-4 bg-gray-200 w-24 rounded" />
      </div>

      {/* QTY BUTTONS SKELETON */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-gray-200 rounded" />
        <div className="w-6 h-4 bg-gray-200 rounded" />
        <div className="w-7 h-7 bg-gray-200 rounded" />
      </div>

      {/* REMOVE BTN */}
      <div className="w-7 h-7 bg-gray-200 rounded" />
    </div>
  );
}
