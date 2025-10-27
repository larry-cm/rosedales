import type { Row } from "@libsql/client";
import type { JSX } from "astro/jsx-runtime";

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
export type objetosSlides = Array<{ url: string, alt: string, local?: number }>

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
    classImg?: string;
    children?: Element | JSX.Element
}

export interface SocialMedia {
    insta: string;
    facebook: string;
}

export interface TypeCategories {
    Locals: Row[];
    Cate: Row[];
    SubCate: Row[]
}