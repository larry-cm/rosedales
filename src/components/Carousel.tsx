import type React from "react";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

export default function Carousel({
  hijos,
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000
}: {
  autoSlide?: boolean,
  autoSlideInterval?: number,
  hijos: string[],
  children?: React.ReactElement[]
}) {

  const [position, setPosition] = useState(0)

  const nextPosition = () => setPosition(p => hijos && p === hijos.length - 1 ? 0 : p + 1)

  const prevPosition = () => setPosition(p => hijos && p === 0 ? hijos.length - 1 : p - 1)

  console.log(Array.from(hijos || []))
  useEffect(() => {
    if (!autoSlide) return

  }, [])
  return (
    <div className="overflow-hidden relative bg-green-500">
      <div className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${position * 100}%)`
        }}
      >
        {slides}
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button onClick={prevPosition} className="cursor-pointer  p-2 rounded-full shadow">
          <ChevronLeft className="size-6 stroke-primary hover:scale-125 scale-100 transition duration-300" size={24} strokeWidth="1.5" />
        </button>
        <button onClick={nextPosition} className="cursor-pointer  p-2 rounded-full shadow">
          <ChevronRight className="size-6 stroke-primary hover:scale-125 scale-100 transition duration-300" size={24} strokeWidth="1.5" />
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex  items-center justify-center gap-2" >
          {
            hijos && hijos?.map((_, i) => (
              <div className={
                `transition-all size-3 rounded-full ${position === i ? "p-2 bg-primary/50" : "bg-primary/80"}`
              }>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
