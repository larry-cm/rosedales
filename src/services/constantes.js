// constantes del header
export const LINK_PAGE = ["Eventos", "Promociones", "Locales", "Contáctenos"]
export const SOCIAL_MEDIA = ["Facebook", "Instagram", "LinkedIn"]
export const URL_LOGO = "https://canaveral.com.co/wp-content/uploads/2024/10/logo-cana.jpeg"
// constantes del carrusel
const URLS_IMAGES = new Array(10).fill("/image.webp")
const ALTERNATIVE_TEXT_IMAGES = new Array(10).fill(null).map((_, i) => `Imagen del local numero ${i} en el centro comercial`)
const SLUGS_IMAGES = new Array(10).fill(null).map((_, i) => `local-${i + 1}`)

export const IMAGES = [URLS_IMAGES, ALTERNATIVE_TEXT_IMAGES, SLUGS_IMAGES].map((_, i) =>
({
    url: URLS_IMAGES[i],
    alt: ALTERNATIVE_TEXT_IMAGES[i],
    slug: SLUGS_IMAGES[i],
})
)
