import useCarousel,{type UseCarousel} from "../hooks/useCarousel";
import PointsSlides from "./PointsSlides";
export default function Carousel({
  slides,
  autoSlide = false,
  autoSlideInterval = 5000,
  visibleSlides = 1,
  type
}: UseCarousel ) {

  const { handleNextClick, handlePrevClick, moveToSlide,translatePx, position, trackRef, maxPosition } = useCarousel({ autoSlide, autoSlideInterval, slides, visibleSlides })


    const views = {
      img:slides.map(({ url: slide, alt }, i) => (
            <img key={i} alt={alt} className="h-[83svh] object-cover" style={{ minWidth: `${100 / visibleSlides}%` }} src={slide} />
          )),
          mp4:slides.map(({url:videoMp4,alt},i) => (
              <div key={i} style={{ minWidth: `${100 / visibleSlides}%` }} className="overflow-hidden rounded-xl shadow-lg h-full">
                            <video title={alt} src={videoMp4 ?? ""} className="h-full w-full object-cover" autoPlay muted loop></video>
                        </div>
          ))
    }

  return (
    <div
      className="overflow-hidden z-10 relative no-rounded-transition">
      <div className="flex transition-transform duration-700 ease-in-out gap-6"
      ref={trackRef} 
        style={{
          transform: `translateX(-${translatePx}px)`
        }}
      >
        {
          slides && type && views[type]
        }
      </div>

      <PointsSlides handleNextClick={handleNextClick} handlePrevClick={handlePrevClick} maxPosition={maxPosition} moveToSlide={moveToSlide} position={position} />
    </div>
  )
}
