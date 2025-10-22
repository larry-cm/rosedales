import type { MoveToSlide } from "../hooks/useCarousel";
import { ChevronRight,ChevronLeft } from "react-feather"

interface TypePointsSlides {
    maxPosition: number,
    moveToSlide: ({ position }: MoveToSlide) => void,
    position: number,
    handlePrevClick:()=> void,
    handleNextClick:()=>void
}
export default function PointsSlides({handlePrevClick,handleNextClick,moveToSlide, maxPosition, position }: TypePointsSlides) {
    return (

        <>
        <div className="absolute inset-0 flex items-center justify-between p-4">
                <button onClick={handlePrevClick} className="focus:ring ring-primary cursor-pointer   rounded-full shadow">
                  <ChevronLeft className="block btn-effect bg-white/70 backdrop-blur-md rounded-full md:size-12 stroke-primary  transition duration-300" size={24} strokeWidth="1.5" />
                </button>
                <button onClick={handleNextClick} className="focus:ring ring-primary cursor-pointer   rounded-full shadow">
                  <ChevronRight className="block btn-effect bg-white/70 backdrop-blur-md rounded-full md:size-12 stroke-primary scale-100 transition duration-300" size={24} strokeWidth="1.5" />
                </button>
              </div>
              <div className=" absolute bottom-4 right-0 left-0">
            <div className="flex items-center justify-center gap-2 h-8 backdrop-blur-md bg-white/70 rounded-full shadow min-w-28 w-fit mx-auto px-2 py-0.5" >
                {
                    Array.from({ length: maxPosition + 1 }).map((_, i) => (
                        <div onClick={() => moveToSlide({ position: i })} key={i} className={
                            `transition-all size-3 rounded-full hover:scale-110 hover:cursor-pointer hover:bg-primary/80 ${position === i ? "p-2 bg-primary" : "bg-primary/70"}`
                        }>
                        </div>
                    ))
                }
            </div>
        </div>
        </>
        
    )
}