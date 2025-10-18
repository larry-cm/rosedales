import useCarousel, { type UseCarousel } from "../hooks/useCarousel";
import PointsSlides from "./PointsSlides";
import { ChevronsCarousel } from "./ChevronsCarousel";
export default function Carousel({
  slides,
  autoSlide = false,
  autoSlideInterval = 5000,
  visibleSlides = 1,
}: UseCarousel) {

  const { handleNextClick, handlePrevClick, moveToSlide, position, constPercent, maxPosition } = useCarousel({ autoSlide, autoSlideInterval, slides, visibleSlides })

  return (
    <div
      className="overflow-hidden z-10 relative no-rounded-transition">
      <div className="flex transition-transform duration-700 ease-in-out "
        style={{
          transform: `translateX(-${position * constPercent}%)`
        }}
      >
        {
          slides && slides.map(({ url: slide, alt }, i) => (
            <img key={i} alt={alt} className="h-[83svh] object-cover" style={{ minWidth: `${100 / visibleSlides}%` }} src={slide} />
          ))
        }
      </div>

      <ChevronsCarousel handleNextClick={handleNextClick} handlePrevClick={handlePrevClick} />

      <PointsSlides maxPosition={maxPosition} moveToSlide={moveToSlide} position={position} />
    </div>
  )
}
