import useCarousel from "../hooks/useCarousel";
import PointsSlides from "./PointsSlides";
<<<<<<< HEAD
  import { useState,useRef ,useEffect} from "react";
=======
import { type UseCarousel } from "../type/global";
import { ChevronsCarousel } from "./ChevronsCarousel";
>>>>>>> b91490bf25fb1ff94792244f90729b0a3b81befb
export default function Carousel({
  slides,
  autoSlide = false,
  autoSlideInterval = 5000,
<<<<<<< HEAD
  visibleSlides = 1,
  type
}: UseCarousel) {

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
=======
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
>>>>>>> b91490bf25fb1ff94792244f90729b0a3b81befb
    </div>
  )
}
