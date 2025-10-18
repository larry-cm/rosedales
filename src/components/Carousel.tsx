import useCarousel from "../hooks/useCarousel";
import PointsSlides from "./PointsSlides";
import { type UseCarousel } from "../type/global";
import { ChevronsCarousel } from "./ChevronsCarousel";
export default function Carousel({
  slides,
  autoSlide = false,
  autoSlideInterval = 5000,
  type,
  visibleSlides,
  style
}: UseCarousel) {

  const { handleNextClick, handlePrevClick, moveToSlide, visibleSlidesMacro, translatePx, position, trackRef, maxPosition } = useCarousel({ autoSlide, autoSlideInterval, slides, visibleSlides })

  const TYPES_SLIDES = {
    img: (slides && slides.map(({ url: slide, alt }, i) => (
      <img key={i} alt={alt} className="h-[83svh] object-cover" style={{ minWidth: `${100 / visibleSlidesMacro}%` }} src={slide} />
    ))),
    mp4: slides && slides.map(({ url, alt }, i) => (
      <video key={i} src={url} title={alt} className="rounded-2xl" autoPlay loop muted style={{ minWidth: `${100 / visibleSlidesMacro}%` }}></video>)
    )
  }

  return (
    <div
      className={`overflow-hidden z-10 relative flex-1 no-rounded-transition ${style}`}>
      <div ref={trackRef} className="flex transition-transform duration-700 ease-in-out gap-6"
        style={{
          transform: `translateX(calc(-${translatePx}px))`
        }}
      >
        {
          type && TYPES_SLIDES[type]
        }
      </div>

      <ChevronsCarousel handleNextClick={handleNextClick} handlePrevClick={handlePrevClick} />

      <PointsSlides maxPosition={maxPosition} moveToSlide={moveToSlide} position={position} />
    </div>
  )
}
