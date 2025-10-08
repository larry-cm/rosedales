import { useState } from "react";
import { ChevronLeft,ChevronRight } from "react-feather";

export default function Carousel({children:slides}){

  const [position,setPosition] = useState(0)

  const nextPosition = () => setPosition(p => slides && p === slides.length - 1 ? 0 : p + 1 )

  const prevPosition = () => setPosition(p => slides && p === 0 ? slides.length - 1 : p - 1)
  
console.log(Array.from(slides || []).length)

  return (
    <div className="overflow-hidden relative bg-green-500">
      <div className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform:`translateX(-${position * 100}%)`
        }}
      >
        {slides}
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button onClick={prevPosition} className="cursor-pointer transition duration-300 bg-white/80 p-2 rounded-full shadow  hover:bg-white">
<ChevronLeft size={24}  stroke="black" strokeWidth="1.5"/>
        </button>
        <button onClick={nextPosition} className="cursor-pointer transition duration-300 bg-white/80 p-2 rounded-full shadow  hover:bg-white">
<ChevronRight size={24} stroke="black"  strokeWidth="1.5"/>
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex  items-center justify-center gap-2" >
        {/* {
        slides &&  slides?.map((_,i) => (
            <div className={
              `transition-all size-3 bg-white rounded-full ${position === i ?"p-2 " :"bg-opacity-50" }`
              }>
            </div>
          ))
        } */}
        
        </div>
      </div>
    </div>
  )
}