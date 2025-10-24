import type { JSX } from "astro/jsx-runtime";
import type React from "react";

export interface ServiceOffer {
    title: string;
    icon: Element | any
    desc: string;
    ubi: string;
    url: string;
}

export interface TypeChevronsCarousel {
    handlePrevClick: () => void;
    handleNextClick: () => void;
    buttonClass?: string;
    chevronClass?: string;
}
type objetosSlides = Array<{ url: string, alt: string }>

export interface UseCarousel {
    autoSlide?: boolean;
    autoSlideInterval?: number;
    visibleSlides?: number;
    visiblePoints?: boolean;
    type?: "img" | "mp4";
    slides?: objetosSlides;
    style?: string;
    buttonClass?: string;
    chevronClass?: string;
    children?: Element | JSX.Element
}