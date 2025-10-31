import useCarousel from "../hooks/useCarousel";
import PointsSlides from "./PointsSlides";
import { type UseCarousel } from "../type/global";
import { ChevronsCarousel } from "./ChevronsCarousel";
import { AdvancedImage } from '@cloudinary/react';
import { cld } from "@services/cloudinary";
import { pad } from "@cloudinary/url-gen/actions/resize";
import { ar4X3 } from "@cloudinary/url-gen/qualifiers/aspectRatio";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { generativeFill } from "@cloudinary/url-gen/qualifiers/background";

export default function Carousel({
  slides,
  autoSlide = false,
  autoSlideInterval = 5000,
  type,
  visibleSlides,
  style,
  visiblePoints,
  chevronClass,
  buttonClass,
  classImg,
  children
}: UseCarousel) {

  const { handleNextClick, handlePrevClick, moveToSlide, visibleSlidesMacro, translatePx, position, trackRef, maxPosition } = useCarousel({ autoSlide, autoSlideInterval, slides, visibleSlides })

  const TYPES_SLIDES = {
    img: (slides && slides.map(({ url: slide, alt }, i) => (
      <AdvancedImage
        key={i}
        alt={alt}
        className={`${classImg} `}
        style={{ minWidth: `calc(${100 / visibleSlidesMacro}% - ${visibleSlidesMacro === 3 ? "16px" : "0px"})` }}
        cldImg={cld.image(slide).resize(
          pad()
            .aspectRatio(ar4X3())
            .gravity(compass("center"))
            .background(generativeFill())
        )} />
    ))),
    mp4: slides && slides.map(({ url, alt }, i) => (
      <AdvancedImage key={i} cldImg={cld.video(url)} title={alt} className="object-cover rounded-2xl aspect-video min-h-44" autoPlay loop muted controls style={{ minWidth: `${100 / visibleSlidesMacro}%` }}></AdvancedImage>)
    )
  }

  return (
    <div
      className={`overflow-hidden z-10 relative h-full no-rounded-transition  ${style ?? ""}`}>
      <div ref={trackRef} className="flex w-full items-center transition-transform duration-700 ease-in-out gap-6 h-full"
        style={{
          transform: `translateX(calc(-${translatePx}px))`
        }}
      >
        {
          type && TYPES_SLIDES[type]
        }
      </div>

      {children ? children : <ChevronsCarousel buttonClass={buttonClass} chevronClass={chevronClass} handleNextClick={handleNextClick} handlePrevClick={handlePrevClick} />}

      {visiblePoints && <PointsSlides maxPosition={maxPosition} moveToSlide={moveToSlide} position={position} />}
    </div>
  )
}
