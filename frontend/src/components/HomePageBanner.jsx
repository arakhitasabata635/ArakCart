import React, { useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const HomePageBanner = ({ mobileImages, desktopImages }) => {
  const [index, setIndex] = useState(0);

  // Detect screen size
  const isMobile = window.innerWidth < 768;
  const images = isMobile ? mobileImages : desktopImages;

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [index, images]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="container relative mx-auto px-4 mt-6">
        <div className="relative h-[180px] md:h-[320px] w-full overflow-hidden rounded-xl shadow-lg bg-amber-200">
          <div
            className="flex w-full h-full min-w-full min-h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="banner"
                className="w-full h-full  flex-shrink-0"
              />
            ))}
          </div>
          {/* Left Button */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full group-hover:opacity-100 transition"
          >
            <IoChevronBack size={22} />
          </button>

          {/* Right Button */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full group-hover:opacity-100 transition"
          >
            <IoChevronForward size={22} />
          </button>

          {/* Dots Indicators */}
          <div className="absolute bottom-3 w-full flex justify-center gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                onClick={()=>{setIndex(i)}}
                className={`h-2 w-2 rounded-full transition ${
                  index === i ? "bg-white" : "bg-white/40"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageBanner;
