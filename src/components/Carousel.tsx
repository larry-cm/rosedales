import useCarousel, { type UseCarousel } from "../hooks/useCarousel";
import { ChevronLeft, ChevronRight } from "react-feather";
import PointsSlides from "./PointsSlides";

export default function Carousel({
  slides,
  autoSlide = false,
  autoSlideInterval = 5000,
  visibleSlides = 1,
}: UseCarousel) {

  const { handleNextClick, handlePrevClick, moveToSlide, position, constPorcent, maxPosition } = useCarousel({ autoSlide, autoSlideInterval, slides, visibleSlides })

  return (
    <div
      className="overflow-hidden z-10 relative no-rounded-transition">
      <div className="flex transition-transform duration-700 ease-in-out "
        style={{
          transform: `translateX(-${position * constPorcent}%)`
        }}
      >
        {
          slides && slides.map(({ url: slide, alt }, i) => (
            // Cada slide ocupa (100 / visibleSlides) % del contenedor
            <img key={i} alt={alt} className="h-[83svh] object-cover" style={{ minWidth: `${100 / visibleSlides}%` }} src={slide} />
          ))
        }
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button onClick={handlePrevClick} className="focus:ring ring-primary cursor-pointer   rounded-full shadow">
          <ChevronLeft className="block btn-effect bg-white/70 backdrop-blur-md rounded-full md:size-12 stroke-primary  transition duration-300" size={24} strokeWidth="1.5" />
        </button>
        <button onClick={handleNextClick} className="focus:ring ring-primary cursor-pointer   rounded-full shadow">
          <ChevronRight className="block btn-effect bg-white/70 backdrop-blur-md rounded-full md:size-12 stroke-primary scale-100 transition duration-300" size={24} strokeWidth="1.5" />
        </button>
      </div>

      <PointsSlides maxPosition={maxPosition} moveToSlide={moveToSlide} position={position} />
    </div>
  )
}
