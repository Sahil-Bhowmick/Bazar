import { useState, useEffect } from "react";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const data: string[] = [
    "https://amazonproone.vercel.app/static/media/img2.bc1bdb910ead16c65197.jpg",
    "https://amazonproone.vercel.app/static/media/img5.aa945e25375bfdee385f.jpg",
    "https://amazonproone.vercel.app/static/media/img3.c80809bb40bee5c34372.jpg",
    "https://amazonproone.vercel.app/static/media/img1.efb3d39101f7ef77d616.jpg",
  ];

  const prevSlide = (): void => {
    setCurrentSlide(currentSlide === 0 ? 3 : currentSlide - 1);
  };

  const nextSlide = (): void => {
    setCurrentSlide(currentSlide === 3 ? 0 : currentSlide + 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  return (
    <div className="w-full h-auto overflow-x-hidden">
      {/* Mobile and Tablet View */}
      <div className="md:hidden">
        <div className="relative">
          <div
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            className="w-full h-[280px] flex transition-transform duration-1000"
          >
            {data.map((imageUrl, index) => (
              <img
                key={index}
                className="w-full h-full object-cover"
                src={imageUrl}
                alt={`Image${index + 1}`}
                loading={index === currentSlide ? "eager" : "lazy"}
              />
            ))}
          </div>
          <div className="absolute left-0 right-0 flex justify-center items-center bottom-4">
            <div
              onClick={prevSlide}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer"
            >
              <HiArrowLeft className="text-gray-800" />
            </div>
            <div
              onClick={nextSlide}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer ml-4"
            >
              <HiArrowRight className="text-gray-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View (Unchanged) */}
      <div className="hidden md:block h-[650px] w-screen relative">
        <div
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
          className="w-[400vw] h-full flex transition-transform duration-1000"
        >
          {data.map((imageUrl, index) => (
            <img
              key={index}
              className="w-screen h-full object-cover"
              src={imageUrl}
              alt={`Image${index + 1}`}
              loading={index === currentSlide ? "eager" : "lazy"}
            />
          ))}
        </div>
        <div className="absolute w-fit left-0 right-0 mx-auto flex gap-8 bottom-52">
          <div
            onClick={prevSlide}
            className="w-14 h-12 border-[1px] border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300"
          >
            <HiArrowLeft />
          </div>
          <div
            onClick={nextSlide}
            className="w-14 h-12 border-[1px] border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300"
          >
            <HiArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
