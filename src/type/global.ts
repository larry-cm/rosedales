import type { string } from "astro:schema";
import type { Ref } from "react";

export interface ServiceOffer {
    title: string;
    icon: Element | any
    desc: string;
    ubi: string;
}

export interface TypeChevronsCarousel {
    handlePrevClick: () => void;
    handleNextClick: () => void;
}
type objetosSlides = Array<{ url: string, alt: string }>

export interface UseCarousel {
    autoSlide?: boolean;
    autoSlideInterval?: number;
    visibleSlides?: number;
    type?: "img" | "mp4";
    slides?: objetosSlides;
    style?: string;
}