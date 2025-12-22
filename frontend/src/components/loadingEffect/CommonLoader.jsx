const CommonLoader = () => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Outer Gradient Ring */}
        <div className="absolute w-20 h-20 border-4 border-transparent border-t-blue-500 border-b-blue-500 rounded-full animate-spin"></div>

        {/* Inner Glow */}
        <div className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center shadow-lg">
          <span className="w-5 h-5 bg-blue-500 rounded-full animate-ping"></span>
        </div>
      </div>
    </div>
  );
};

export default CommonLoader;
