import { ChevronLeft, ChevronRight } from "react-feather";
import { type TypeChevronsCarousel } from "../type/global";
export function ChevronsCarousel({ handleNextClick, handlePrevClick }: TypeChevronsCarousel) {
    return (
        <div className="absolute inset-0 flex items-center justify-between p-4">
            <button onClick={handlePrevClick} className="focus:ring ring-green-500 cursor-pointer rounded-full shadow">
                <ChevronLeft className="block btn-effect hover:bg-white/70 backdrop-blur-md bg-green-500 stroke-white rounded-full size-8 sm:10 md:size-12 hover:stroke-green-500  transition duration-300" size={24} strokeWidth="2" />
            </button>
            <button onClick={handleNextClick} className="focus:ring ring-green-500 cursor-pointer rounded-full shadow">
                <ChevronRight className="block btn-effect hover:bg-white/70 backdrop-blur-md bg-green-500 stroke-white rounded-full size-8 sm:10 md:size-12 hover:stroke-green-500 scale-100 transition duration-300" size={24} strokeWidth="2" />
            </button>
        </div>
    )
}