export default function LinkBtn({ url }: { url: string }) {
    return (
        <a
            aria-describedby="tier-starter"
            className="items-center justify-center w-full px-6 py-2.5 text-center text-white font-semibold duration-200 bg-green-500 border-2 border-green-500 rounded-full inline-flex hover:bg-transparent hover:border-green-500 hover:text-green-500 focus:outline-none focus-visible:outline-green-500 text-sm focus-visible:ring-green-500"
            href={url
                .trim()
                .toLowerCase()
                .replace(" ", "-")}
        >
            Conocer
        </a>
    )
}