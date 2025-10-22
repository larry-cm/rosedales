import { useEffect, useRef, useState } from "react";
export type MoveToSlide = { position: number }
export interface UseCarousel {
    autoSlide?: boolean,
    autoSlideInterval?: number,
    slides: Array<{ url: string, alt: string }>,
    visibleSlides?: number
    type?: "img" | "mp4"
}
export default function useCarousel({ autoSlideInterval, autoSlide, slides}: UseCarousel) {
    const [position, setPosition] = useState(0)
    // cada slide visible ocupa 100 / visibleSlides % del ancho del contenedor
    const [trackWidth, setTrackWidth] = useState(0)
    const visibleSlides = trackWidth <= 900 ? 1 : 3
    const constPorcent = 100 / visibleSlides
    const [translatePx, setTranslatePx] = useState(0)

    // la máxima posición de inicio es tal que queden visibleSlides elementos en pantalla
    const maxPosition = Math.max(0, (slides?.length || 0) - visibleSlides)
    const trackRef = useRef<HTMLDivElement | null>(null)
    


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
    
    // mover con el necesario
    const computeTranslate = () => {
        const track = trackRef.current
        if (!track) return
        const first = track.children[0] as HTMLElement | undefined
        const cs = getComputedStyle(track)
        const gapStr = cs.gap || (cs as any).columnGap || "0px"
        const gapPx = parseFloat(gapStr) || 0

        const itemWidth = first ? first.getBoundingClientRect().width : (track.clientWidth / visibleSlides)
        const step = itemWidth + gapPx
        setTranslatePx(Math.round(position * step))
    }
    useEffect(() => {
        computeTranslate()
        const track = trackRef.current
        if (!track) return
        let ro: ResizeObserver | null = null
        try {
            ro = new ResizeObserver(() => computeTranslate())
            ro.observe(track)
            if (track.children[0]) ro.observe(track.children[0] as Element)
        } catch (e) {
            window.addEventListener('resize', computeTranslate)
        }
        return () => {
            if (ro) {
                try { ro.disconnect() }
                catch (e) { console.error(e) }
            } else {
                window.removeEventListener('resize', computeTranslate)
            }
        }
    }, [position, slides])
    // veo el ancho de la pantalla para cambiar la cantidad de items
    useEffect(() => {
        const updateWidth = () => {
            if (document.body) {
                setTrackWidth(document.body.offsetWidth)
            }
        }
        updateWidth()
        const track = document.body
        let ro: ResizeObserver | null = null
        try {
            ro = new ResizeObserver(updateWidth)
            if (track) ro.observe(track)
        } catch (e) {
            window.addEventListener('resize', updateWidth)
        }
        return () => {
            if (ro) {
                try { ro.disconnect() } catch (e) { console.error(e) }
            } else {
                window.removeEventListener('resize', updateWidth)
            }
        }
    }, [])

    return { handleNextClick, handlePrevClick, moveToSlide, position, constPorcent, maxPosition ,trackRef,translatePx}
}