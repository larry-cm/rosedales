import useCarousel from "../hooks/useCarousel"
import PointsSlides from "./PointsSlides"

import { ChevronRight, ChevronLeft } from "react-feather"
import { useEffect, useRef, useState } from "react"

type TypeMp4 = { url: string, alt: string }[]

export default function Slide({ videoMp4s }: { videoMp4s: TypeMp4 }) {

    const trackRef = useRef<HTMLDivElement | null>(null)
    const [translatePx, setTranslatePx] = useState(0)

    const [trackWidth, setTrackWidth] = useState(0)
    const visibleSlides = trackWidth <= 900 ? 1 : 3

    const { handleNextClick, handlePrevClick, position, moveToSlide, maxPosition } = useCarousel({ autoSlide: true, autoSlideInterval: 3000, slides: videoMp4s || [], visibleSlides })

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
    }, [position, videoMp4s])
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

    return (
        <article className="relative overflow-hidden flex-1 w-full rounded-2xl">
            <div ref={trackRef} className="flex h-full transition-transform duration-700 ease-in-out gap-6" style={{ transform: `translateX(-${translatePx}px)` }}>
                {
                    videoMp4s && videoMp4s.map(({ url: videoMp4, alt }, i) => (
                        <div key={i} style={{ minWidth: `${100 / visibleSlides}%` }} className="overflow-hidden rounded-xl shadow-lg h-full">
                            <video title={alt} src={videoMp4 ?? ""} className="h-full w-full object-cover" autoPlay muted loop></video>
                        </div>
                    ))
                }
            </div>

            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button onClick={handlePrevClick} className="focus:ring ring-primary cursor-pointer   rounded-full shadow">
                    <ChevronLeft className="block btn-effect bg-white/70 backdrop-blur-md rounded-full md:size-12 stroke-primary  transition duration-300" size={24} strokeWidth="1.5" />
                </button>
                <button onClick={handleNextClick} className="focus:ring ring-primary cursor-pointer   rounded-full shadow">
                    <ChevronRight className="block btn-effect bg-white/70 backdrop-blur-md rounded-full md:size-12 stroke-primary scale-100 transition duration-300" size={24} strokeWidth="1.5" />
                </button>
            </div>

            <PointsSlides maxPosition={maxPosition} moveToSlide={moveToSlide} position={position} />
        </article>
    )
}