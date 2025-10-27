import { ChevronLeft, ChevronRight } from "react-feather";
import { type TypeChevronsCarousel } from "../type/global";
export function ChevronsCarousel({
    handleNextClick,
    handlePrevClick,
    buttonClass = 'focus:ring ring-green-500 cursor-pointer rounded-2xl shadow',
    chevronClass = 'block btn-effect hover:stroke-zinc-300 backdrop-blur-md bg-green-500 text-white rounded-2xl size-8  md:size-10 hover:stroke-green-500 transition duration-300' }: TypeChevronsCarousel) {
    return (
        <div className="absolute inset-0 hidden sm:flex items-center justify-between p-4">
            <button onClick={handlePrevClick} className={buttonClass}>
                <ChevronLeft className={chevronClass} strokeWidth="2" />
            </button>
            <button onClick={handleNextClick} className={buttonClass}>
                <ChevronRight className={chevronClass} strokeWidth="2" />
            </button>
        </div>
    )
}