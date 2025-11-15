import type { JSX } from "astro/jsx-runtime";

export default function Separator({ children }: { children?: JSX.Element }) {
    return (
        <article className="*:py-2 py-12 flex gap-4 items-center animation-go-text h-fit bg-green-500 shadow-lg">
            <p className="text-5xl text-end w-1/2 text-white font-bold">50 años</p>
            <div className="h-20 w-[2px] rounded-xl shadow bg-black"></div>
            <p className="text-4xl w-1/2 max-w-lg text-pretty font-normal text-white">
                {children ?? "Ofreciendo estilo y calidad en calzado."}
            </p>
        </article>

    )
}