import videoMp4 from "../assets/videos/videosCarousel.mp4";
import { Cloudinary } from "@cloudinary/url-gen";
// constantes del header
export const LINK_PAGE = ["Promociones", "Locales", "Contáctenos"]
export const SOCIAL_MEDIA = ["Facebook", "Instagram", "LinkedIn"]
export const URL_LOGO = "/rosedal-logo.svg"
// constantes del carrusel
export const vi = [
    { url: videoMp4, alt: "primer video de la semana" },
    { url: videoMp4, alt: "primer video de la semana" },
    { url: videoMp4, alt: "primer video de la semana" },
    { url: videoMp4, alt: "primer video de la semana" },
    { url: videoMp4, alt: "primer video de la semana" },
    { url: videoMp4, alt: "primer video de la semana" },
];
const URLS_IMAGES = new Array(10).fill("/image/image.webp")
const ALTERNATIVE_TEXT_IMAGES = new Array(10).fill(null).map((_, i) => `Imagen del local numero ${i} en el centro comercial`)
const SLUGS_IMAGES = new Array(10).fill(null).map((_, i) => `local-${i + 1}`)

export const IMAGES = [URLS_IMAGES, ALTERNATIVE_TEXT_IMAGES, SLUGS_IMAGES].map((_, i) =>
({
    url: URLS_IMAGES[i],
    alt: ALTERNATIVE_TEXT_IMAGES[i],
    slug: SLUGS_IMAGES[i],
})
)
export const SERVICIOS = (icon) => Array(3).fill({
    title: 'Bancos',
    desc: 'Somos los mejores bancos del mundo mundial',
    icon: icon,
    ubi: 'cra19 # 39-25',
    url: 'no tengo'
})

// cloudinary 
export const cld = new Cloudinary({
    cloud: {
        cloudName: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.PUBLIC_CLOUDINARY_CLOUD_NAME
    }
});