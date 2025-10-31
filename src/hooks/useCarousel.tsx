import { useEffect, useRef, useState } from "react";
import { type UseCarousel } from "../type/global";

export default function useCarousel({ autoSlideInterval, autoSlide, slides, visibleSlides }: UseCarousel) {
    const trackRef = useRef<HTMLDivElement | null>(null)
    const [translatePx, setTranslatePx] = useState(0)

    const [trackWidth, setTrackWidth] = useState(0)
    const visibleSlidesMacro = typeof visibleSlides === "number" ? visibleSlides : (trackWidth <= 900 ? 1 : 3)

    const [position, setPosition] = useState(0)
    const constPercent = 100 / visibleSlidesMacro
    const maxPosition = Math.max(0, Math.ceil((slides?.length ? slides.length - visibleSlidesMacro : 0)))

    // auto slide
    const slideInterval = useRef<number | null>(null)

    // --- AJUSTE AUTO SLIDE ---
    const nextAutoPosition = () => {
        setPosition(p => (p >= maxPosition ? 0 : p + 1));
    };

    const resetInterval = () => {
        if (slideInterval.current !== null) {
            clearInterval(slideInterval.current);
            slideInterval.current = null;
        }
    };

    const startInterval = () => {
        if (!autoSlide) return;
        resetInterval();
        slideInterval.current = window.setInterval(nextAutoPosition, autoSlideInterval);
    };

    const moveToSlide = ({ position }: { position: number }) => {
        const pos = Math.max(0, Math.min(position, maxPosition));
        setPosition(pos);
        startInterval();
    };

    const nextPosition = () => setPosition(p => (p >= maxPosition ? 0 : p + 1));
    const prevPosition = () => setPosition(p => (p <= 0 ? maxPosition : p - 1));

    const handlePrevClick = () => {
        prevPosition();
        startInterval();
    };
    const handleNextClick = () => {
        nextPosition();
        startInterval();
    };

    useEffect(() => {
        startInterval();
        return () => resetInterval();
    }, [autoSlide, autoSlideInterval, maxPosition]);

    const computeTranslate = () => {
        const track = trackRef.current;
        if (!track) return;
        const first = track.children[0] as HTMLElement | undefined;
        const cs = getComputedStyle(track);
        const gapStr = cs.gap || (cs as any).columnGap || "0px";
        const gapPx = parseFloat(gapStr) || 0;

        const itemWidth = first ? first.getBoundingClientRect().width : (track.clientWidth / visibleSlidesMacro);
        const step = itemWidth + gapPx;
        setTranslatePx(Math.round(position * step));
    };

    useEffect(() => {
        computeTranslate();
        const track = trackRef.current;
        if (!track) return;
        let ro: ResizeObserver | null = null;
        try {
            ro = new ResizeObserver(() => computeTranslate());
            ro.observe(track);
            if (track.children[0]) ro.observe(track.children[0] as Element);
        } catch (e) {
            window.addEventListener('resize', computeTranslate);
        }
        return () => {
            if (ro) {
                try { ro.disconnect(); }
                catch (e) { console.error(e); }
            } else {
                window.removeEventListener('resize', computeTranslate);
            }
        }
    }, [position, slides, visibleSlidesMacro]);

    useEffect(() => {
        const updateWidth = () => {
            if (document.body) {
                setTrackWidth(document.body.offsetWidth);
            }
        };
        updateWidth();
        const track = document.body;
        let ro: ResizeObserver | null = null;
        try {
            ro = new ResizeObserver(updateWidth);
            if (track) ro.observe(track);
        } catch (e) {
            window.addEventListener('resize', updateWidth);
        }
        return () => {
            if (ro) {
                try { ro.disconnect(); } catch (e) { console.error(e); }
            } else {
                window.removeEventListener('resize', updateWidth);
            }
        }
    }, []);

    // Clamp position if slides or visibleSlidesMacro change
    useEffect(() => {
        setPosition(p => Math.max(0, Math.min(p, maxPosition)));
    }, [slides, visibleSlidesMacro, maxPosition]);

    return { handleNextClick, handlePrevClick, moveToSlide, visibleSlidesMacro, translatePx, trackRef, position, constPercent, maxPosition };
}