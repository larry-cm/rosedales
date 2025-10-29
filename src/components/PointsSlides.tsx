interface TypePointsSlides {
    maxPosition: number,
    moveToSlide: ({ position }: { position: number }) => void,
    position: number
}
export default function PointsSlides({ maxPosition, moveToSlide, position }: TypePointsSlides) {
    return (
        <div className=" absolute bottom-4 right-0 left-0 flex items-center justify-center gap-2 h-8 backdrop-blur-md bg-zinc-300 rounded-full shadow min-w-24 w-fit mx-auto px-4 py-0.5" >
            {
                Array.from({ length: maxPosition + 1 }).map((_, i) => (
                    <i onClick={() => moveToSlide({ position: i })} key={i} className={
                        `transition-all size-3 rounded-full hover:scale-110 hover:cursor-pointer hover:bg-primary/80 ${position === i ? "p-2 bg-primary" : "bg-primary/70"}`
                    }>
                    </i>
                ))
            }
        </div>
    )
}