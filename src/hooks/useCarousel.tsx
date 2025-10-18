import { useEffect, useRef, useState } from "react";
import { type UseCarousel } from "../type/global";
export default function useCarousel({ autoSlideInterval, autoSlide, slides, visibleSlides }: UseCarousel) {
    const trackRef = useRef<HTMLDivElement | null>(null)
    const [translatePx, setTranslatePx] = useState(0)

    const [trackWidth, setTrackWidth] = useState(0)
    const visibleSlidesMacro = visibleSlides || trackWidth <= 900 ? 1 : 3

    const [position, setPosition] = useState(0)
    // cada slide visible ocupa 100 / visibleSlides % del ancho del contenedor
    const constPercent = 100 / visibleSlidesMacro
    // la máxima posición de inicio es tal que queden visibleSlides elementos en pantalla
    const maxPosition = Math.max(0, (slides?.length || 0) - visibleSlidesMacro)

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

    const computeTranslate = () => {
        const track = trackRef.current
        if (!track) return
        const first = track.children[0] as HTMLElement | undefined
        const cs = getComputedStyle(track)
        const gapStr = cs.gap || (cs as any).columnGap || "0px"
        const gapPx = parseFloat(gapStr) || 0

        const itemWidth = first ? first.getBoundingClientRect().width : (track.clientWidth / visibleSlidesMacro)
        const step = itemWidth + gapPx
        setTranslatePx(Math.round(position * step))
    }
    // auto slide
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

    // modifico la cantidad de vistas 
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
    return { handleNextClick, handlePrevClick, moveToSlide, visibleSlidesMacro, translatePx, trackRef, position, constPercent, maxPosition }
}