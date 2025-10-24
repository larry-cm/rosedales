import { ChevronLeft, ChevronRight } from "react-feather";
import { type TypeChevronsCarousel } from "../type/global";
export function ChevronsCarousel({ handleNextClick, handlePrevClick, buttonClass = 'focus:ring ring-green-500 cursor-pointer rounded-full shadow ', chevronClass = 'block btn-effect hover:bg-white/70 backdrop-blur-md bg-green-500 stroke-white rounded-full size-8 sm:10 md:size-12 hover:stroke-green-500  transition duration-300' }: TypeChevronsCarousel) {
    return (
        <div className="absolute inset-0 hidden sm:flex items-center justify-between p-4">
            <button onClick={handlePrevClick} className={buttonClass}>
                <ChevronLeft className={chevronClass} size={24} strokeWidth="2" />
            </button>
            <button onClick={handleNextClick} className={buttonClass}>
                <ChevronRight className={chevronClass} size={24} strokeWidth="2" />
            </button>
        </div>
    )
}