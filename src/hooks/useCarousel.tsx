import { useEffect, useRef, useState } from "react";
export type MoveToSlide = { position: number }
export interface UseCarousel {
    autoSlide?: boolean,
    autoSlideInterval?: number,
    slides: Array<{ url: string, alt: string }>,
    visibleSlides?: number
}
export default function useCarousel({ autoSlideInterval, autoSlide, slides, visibleSlides = 1 }: UseCarousel) {
    const [position, setPosition] = useState(0)
    // cada slide visible ocupa 100 / visibleSlides % del ancho del contenedor
    const constPorcent = 100 / visibleSlides
    // la máxima posición de inicio es tal que queden visibleSlides elementos en pantalla
    const maxPosition = Math.max(0, (slides?.length || 0) - visibleSlides)

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
    const moveToSlide = ({ position }: MoveToSlide) => {
        // aseguramos rango
        const pos = Math.max(0, Math.min(position, maxPosition))
        setPosition(pos)
        startInterval()
    }
    // movimiento de los botones: avanzamos de a 1 pero no sobrepasamos maxPosition
    const nextPosition = () => setPosition(p => p >= maxPosition ? 0 : p + 1)
    const prevPosition = () => setPosition(p => p <= 0 ? maxPosition : p - 1)

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
    return { handleNextClick, handlePrevClick, moveToSlide, position, constPorcent, maxPosition }
}