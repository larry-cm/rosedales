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
  slides: string[],
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
    <div className="overflow-hidden relative bg-green-500 ">
      <div className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${position * constPorcent}%)`
        }}
      >
        {
          slides && slides.map((slide, i) => (
            <img key={i} className="min-w-full h-[82svh] object-cover" src={slide} />
          ))
        }
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button onClick={handlePrevClick} className="cursor-pointer  p-2 rounded-full shadow">
          <ChevronLeft className="hidden md:block md:size-16 stroke-primary hover:scale-110 scale-100 transition duration-300" size={24} strokeWidth="1.5" />
        </button>
        <button onClick={handleNextClick} className="cursor-pointer  p-2 rounded-full shadow">
          <ChevronRight className="hidden md:block md:size-16 stroke-primary hover:scale-110 scale-100 transition duration-300" size={24} strokeWidth="1.5" />
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2 h-8 bg-white/80 rounded-full shadow w-fit mx-auto px-3 py-1" >
          {
            slides && slides?.map((_, i) => (
              <div onClick={() => moveToSlide({ position: i })} key={i} className={
                `transition-all size-3 rounded-full ${position === i ? "p-2 bg-primary" : "bg-primary/50"}`
              }>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
