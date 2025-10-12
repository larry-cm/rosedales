import type React from "react";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

export default function Carousel({
  slides,
  autoSlide = false,
  autoSlideInterval = 5000
}: {
  autoSlide?: boolean,
  autoSlideInterval?: number,
  slides: Array<{ url: string, alt: string }>,
}) {

  const [position, setPosition] = useState(0)
  const constPorcent = 100

  // auto slide
  const slideInterval = useRef<NodeJS.Timeout | number>(0)

  const resetInterval = () => {
    if (slideInterval.current !== null) {
      clearInterval(slideInterval.current)
      slideInterval.current = 0
    }
  }
  const startInterval = () => {
    if (!autoSlide) return
    resetInterval()
    slideInterval.current = setInterval(nextPosition, autoSlideInterval)
  }
  const moveToSlide = ({ position }: { position: number }) => {
    setPosition(position)
    startInterval()
  }
  // movimiento de los botones
  const nextPosition = () => setPosition(p => slides && p === slides.length - 1 ? 0 : p + 1)
  const prevPosition = () => setPosition(p => slides && p === 0 ? slides.length - 1 : p - 1)

  const handlePrevClick = () => {
    prevPosition()
    startInterval()
  }
  const handleNextClick = () => {
    nextPosition()
    startInterval()
  }

  useEffect(() => {
    startInterval()
    return () => resetInterval()
  }, [])

  return (
    <div
      className="overflow-hidden z-10 relative rounded-bl-[100px_70px] no-rounded-transition">
      <div className="flex transition-transform duration-300 ease-in-out "
        style={{
          transform: `translateX(-${position * constPorcent}%)`
        }}
      >
        {
          slides && slides.map(({ url: slide, alt }, i) => (
            <img key={i} alt={alt} className="min-w-full h-[83svh] object-cover" src={slide} />
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

      <div className=" absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2 h-12 backdrop-blur-md bg-white/70 rounded-full shadow min-w-28 w-fit mx-auto px-3 py-1" >
          {
            slides && slides?.map((_, i) => (
              <div onClick={() => moveToSlide({ position: i })} key={i} className={
                `transition-all size-3 rounded-full hover:scale-110 hover:cursor-pointer hover:bg-primary/80 ${position === i ? "p-2 bg-primary" : "bg-primary/70"}`
              }>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
