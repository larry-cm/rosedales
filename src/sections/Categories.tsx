import { cld } from "@services/cloudinary"
import { RefreshCcw } from "react-feather";
import React, { useEffect, useRef, useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import LocalCard from "./components/LocalCard";
import NoResults from "./components/NoResults";
import Pagination from "./components/Pagination";
import SelectReact from "@components/SelectReact";
import type { Row } from "@libsql/client";
import type { TypeCategories } from "@type/global";
import Separator from "@components/Separator";

function useResponsiveViewport() {
    const [itemsPerPage, setItemsPerPage] = useState(5);
    useEffect(() => {
        function updateItemsPerPage() {
            const width = window.innerWidth;
            if (width < 640) { // sm
                setItemsPerPage(3);
            } else if (width >= 640 && width < 1024) { // md
                setItemsPerPage(6);
            } else { // lg and above
                setItemsPerPage(8);
            }
        }
        updateItemsPerPage(); // Llamar a la función al montar el componente
        window.addEventListener("resize", updateItemsPerPage);
        return () => {
            window.removeEventListener("resize", updateItemsPerPage);
        };
    }, []);
    return itemsPerPage;
}
function usePagination() {
    const [cateVal, setCateVal] = useState<string | null>(null)
    const [subCateVal, setSubCateVal] = useState<string | null>(null)
    const [loadingGlobal, setLoadingGlobal] = useState<boolean>(true)
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false)
    const [data, setData] = useState<TypeCategories | null>(null)
    const { Locals, Cate, SubCate } = data ?? {}

    // Estados para paginación
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = useResponsiveViewport()
    const [animating, setAnimating] = useState(false)

    function getInitial(): Promise<TypeCategories> {
        return fetch("api/getAllData.json")
            .then(res => {
                if (!res.ok) throw new Error(`La petición no tuvo una respuesta correcta: ${res.status}`)
                return res.json()
            })
            .catch(error => {
                setLoadingGlobal(false)
                throw new Error('Error al hacer la petición: ' + error)
            })
    }

    useEffect(() => {
        async function getAllDataCategories() {
            setLoadingGlobal(true)
            setData(await getInitial())
            setLoadingGlobal(false)
        }
        getAllDataCategories()
            .then(res => res)
            .catch(e => { throw new Error(e) })
    }, [])

    function listenValCate(val: string) {
        setCateVal(val)
    }
    function listenValSubCate(val: string) {
        setSubCateVal(val)
    }
    function resetFilters() {
        if (!cateVal && !subCateVal) return
        setCateVal("")
        setSubCateVal("")
        setCurrentPage(1) // Resetear a la primera página
        setLoadingUpdate(true)
        getInitial()
            .then(res => {
                setData(oldData => oldData ? {
                    ...oldData,
                    Locals: res.Locals
                } : null)
            })
            .catch(e => { throw new Error(e) })
            .finally(() => {
                setLoadingUpdate(false)
            })
    }

    // Funciones de paginación
    const totalItems = Locals?.length ?? 0
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentItems = Locals?.slice(startIndex, endIndex) ?? []

    async function handleSubmit() {
        async function getLocals() {
            if (!cateVal && !subCateVal) return
            let formData = new FormData()
            formData.append('cate', cateVal ?? "")
            formData.append('sub-cate', subCateVal ?? "")
            try {
                setLoadingUpdate(true)
                const res = await fetch("api/locales.json", { method: "POST", body: formData })
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
                const data = await res.json()
                setLoadingUpdate(false)
                const newLocals = data.data as Row[]
                setData(oldData => oldData ? {
                    ...oldData,
                    Locals: newLocals
                } : null)

            } catch (error) {
                throw new Error('Error al hacer la petición: ' + error)
            } finally {
                setLoadingGlobal(false)
            }
        }
        await getLocals()
    }
    const handlePageChange = (page: number) => {
        setAnimating(true)
        setCurrentPage(page)
        // Sincronizar con la animación más larga (fadeInSmooth: 0.6s + delays)
        setTimeout(() => {
            setAnimating(false)
        }, 700) // Tiempo suficiente para que termine toda la animación
    }

    // recrear página cuando cambian los datos filtrados
    useEffect(() => {
        setCurrentPage(1)
    }, [Locals])

    // usar resetFilters cada ves que cambie el valor de la sub categoría y la  categoría 
    useEffect(() => {
        handleSubmit()
    }, [subCateVal, cateVal])
    return {
        loadingGlobal,
        loadingUpdate,
        cateVal,
        Cate,
        SubCate,
        subCateVal,
        Locals,
        animating,
        currentItems,
        totalItems,
        currentPage,
        totalPages,
        handlePageChange,
        resetFilters,
        listenValCate,
        listenValSubCate
    }
}

export default function Categories() {

    const { loadingGlobal,
        loadingUpdate,
        cateVal,
        Cate,
        SubCate,
        subCateVal,
        Locals,
        animating,
        currentItems,
        totalItems,
        currentPage,
        totalPages,
        handlePageChange,
        resetFilters,
        listenValCate,
        listenValSubCate } = usePagination()
    const OP_ALL = {
        action: () => {
            setViewCS(LOCALES_COMERCIALES.map(e => e.text))
        },
        text: 'Todos'
    }
    const OP_SÓTANO = {
        action: () => {
            console.log('spma');
            setViewCS(OP_SÓTANO.text)
        },
        text: 'sótano'
    }
    const OP_PISO_1 = {
        action: () => {
            setViewCS(OP_PISO_1.text)
        },
        text: 'piso 1'
    }
    const OP_PISO_2 = {
        action: () => { setViewCS(OP_PISO_2.text) },
        text: 'piso 2'
    }

    const OP_TORRE_SUR = {
        action: () => { },
        text: 'torre sur'
    }
    const OP_TORRE_NORTE = {
        action: () => { },
        text: 'torre norte'
    }
    const LOCALES_COMERCIALES = Array(OP_ALL, OP_SÓTANO, OP_PISO_1, OP_PISO_2)
    const TORRES_EMPRESARIALES = Array(OP_TORRE_NORTE, OP_TORRE_SUR)
    const NOMBRES_BOTONES = {
        LOCALES_COMERCIALES: "Locales Comerciales",
        TORRES_EMPRESARIALES: "Torres Empresariales"
    }
    const [viewCS, setViewCS] = useState<string | string[]>(LOCALES_COMERCIALES.map(e => e.text))

    return (
        <>
            <section className="py-10" >

                <GreenCard >
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <h4 className="capitalize text-4xl text-white max-w-xs font-semibold">
                            Edificio Centro Comercial Rosedal
                        </h4>

                        <BtnSelection popOvers={LOCALES_COMERCIALES} >
                            <>
                                {!Array.isArray(viewCS) ? viewCS : NOMBRES_BOTONES.LOCALES_COMERCIALES}
                            </>
                        </BtnSelection>
                        <BtnSelection popOvers={TORRES_EMPRESARIALES} >
                            <>
                                {NOMBRES_BOTONES.TORRES_EMPRESARIALES}
                            </>
                        </BtnSelection>

                    </div>
                </GreenCard>
                {
                    !Array.isArray(viewCS)
                        ? (
                            <SectionView loading={loadingGlobal} title={viewCS}>
                                <ViewCards currentItems={currentItems} />
                            </SectionView>
                        )
                        : (
                            viewCS.map(views => (
                                <SectionView loading={loadingGlobal} key={views} title={views}>
                                    <ViewCards currentItems={currentItems} />
                                </SectionView>
                            ))
                        )
                }
            </section>
            <Separator >
                {"Mas comodidad y mas servicios para sus clientes"}
            </Separator>
            <span id="mas-para-compartir"></span>
            <section className="py-10 ">
                <GreenCard>
                    <form
                        onSubmit={(e) => { e.preventDefault() }}
                        action="api/locales.json"
                        method="POST"
                        className="flex flex-col lg:flex-row items-center justify-between gap-6"
                    >
                        <h4 className="font-semibold text-4xl text-white max-w-xs">
                            Mas para compartir
                        </h4>
                        <div className="w-full md:w-4/5 l flex flex-col md:flex-row gap-6">
                            <SelectReact
                                setVal={listenValCate}
                                name="cate"
                                value={cateVal ?? ""}
                                options={Cate?.map(({ nameCategory }) => ({
                                    value: nameCategory?.toString() || "Valor no definido",
                                    label: nameCategory?.toString() || "Valor no definido",
                                })) || []}
                                placeholder="Categorías"
                            />
                            <SelectReact
                                setVal={listenValSubCate}
                                name="sub-cate"
                                value={subCateVal ?? ""}
                                options={SubCate?.map(({ subCategory }) => ({
                                    value: subCategory?.toString() || "Valor no definido",
                                    label: subCategory?.toString() || "Valor no definido",
                                })) || []}
                                placeholder="Sub Categorías"
                            />
                            <button onClick={resetFilters} type="button" className=" hidden md:block lg:hidden px-4 py-2 cursor-pointer bg-white hover:bg-zinc-200 transition duration-200 rounded-lg shadow ring ring-green-700 btn-effect">
                                <RefreshCcw className="size-6" />
                            </button>
                        </div>
                        <div className="flex gap-6">
                            <button onClick={resetFilters} type="button" className="block md:hidden lg:block px-4 py-2 cursor-pointer bg-white hover:bg-zinc-200 transition duration-200 rounded-lg shadow ring ring-green-700 btn-effect">
                                <RefreshCcw className="size-6" />
                            </button>

                        </div>
                    </form>
                </GreenCard>


                <section
                    className="mx-8 rounded-2xl  overflow-hidden"
                >
                    <div className="rounded-2xl sm:min-h-[100vh] px-8">
                        {
                            Locals && Locals?.length <= 0 ? (
                                <NoResults />
                            ) : (
                                <ViewCards currentItems={currentItems} />
                            )
                        }
                    </div>

                    {/* Paginación */}
                    {totalItems > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </section>
            </section>
            <Separator >
                {"Brindándote los mejores servicios "}
            </Separator>
        </>
    )
}

function GreenCard({ children, anotherProps }: { anotherProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, children?: React.ReactElement }) {
    return (
        <article {...anotherProps} className="p-8 m-16 mt-10 rounded-2xl shadow text-xl bg-green-500" >
            {children}
        </article >
    )
}

function BtnSelection({
    children,
    popOvers,
}: {
    children?: React.ReactElement;
    popOvers: { action: () => void; text: string }[];
}) {
    const [popOver, setPopOver] = useState(false);

    const elementRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const popOverHandleClick = (action: () => void) => {
        if (action) action();
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const popEl = elementRef.current;
            const btnEl = buttonRef.current;

            if (popEl?.contains(e.target as Node)) return
            if (btnEl?.contains(e.target as Node) && popOver === false) {
                setPopOver(true)
                return
            };

            setPopOver(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [popOver]);


    return (
        <div className="relative">
            <button
                ref={buttonRef}
                className="capitalize bg-zinc-100 outline-none rounded-lg ring ring-green-700 px-4 py-2 max-w-xs flex justify-between items-center gap-4 min-w-fit text-start lg:min-w-xs"
                type="button"
            >
                {children ?? "locales comerciales"}
            </button>

            {popOver && (
                <div
                    ref={elementRef}
                    className="absolute z-20 mt-2 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black/5 overflow-hidden animate-fadeIn"
                >
                    <ul className="py-1">
                        {popOvers.map(({ text, action }) => (
                            <li key={text}>
                                <button
                                    onClick={() => popOverHandleClick(action)}
                                    className="w-full capitalize text-left px-4 py-2 text-gray-700 hover:bg-gray-100  hover:scale-102 transition duration-300 hover:text-gray-900 focus:outline-none focus:bg-gray-100"
                                >
                                    {text}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

function SectionView({ title, children, loading }: { title: string, loading: boolean, children?: React.ReactElement }) {
    if (title.toLowerCase() === 'todos') return
    return (
        <article className="m-8 px-8 rounded-lg">
            <h5 className="text-4xl mb-6 mt-14 bg-zinc-100 px-8 py-4 w-fit rounded-lg shadow-md">
                {title ?? "Sub sección a mostrar"}
            </h5>

            {loading ? (
                <LocalCardsPlaceholder />
            ) : (
                <div>{children}</div>
            )}
        </article>
    )
}

function LocalCardsPlaceholder() {
    return (
        <div className="grid animate-fade-in gap-6 grid-cols-[repeat(auto-fill,minmax(180px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-2xl bg-white shadow animate-pulse border border-gray-200 flex flex-col justify-between h-[300px] p-4"
                >
                    {/* Espacio vacío simulando la imagen */}
                    <div className="flex-1"></div>

                    {/* Línea divisoria */}
                    <div className="h-px bg-gray-300 w-full my-2"></div>

                    {/* Texto del local */}
                    <div className="h-4 w-1/3 bg-gray-300 mx-auto rounded"></div>
                </div>
            ))}
        </div>
    );
}

function ViewCards({ currentItems }: { currentItems: Row[] }) {
    useEffect(() => {
        const items = Array.from(document.querySelectorAll(".card-fadein")) as HTMLDivElement[];
        items.forEach((el) => {
            el.classList.remove("animate-fade-in")
            void el.offsetWidth // reinicia animación
            el.classList.add("animate-fade-in")
        })

    }, [currentItems])

    return (
        <div className=" grid gap-6 grid-cols-[repeat(auto-fill,minmax(180px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
            {currentItems.map((localItem, index) => (
                <div
                    key={localItem.local?.toString() ?? localItem.title?.toString()}
                    className="card-fadein animate-fade-in"
                    style={{
                        animationDelay: `${index * 50}ms`,
                        willChange: 'transform, opacity, filter'
                    }}
                >
                    <LocalCard
                        local={localItem}
                        cld={cld}
                    />
                </div>
            ))}
        </div>
    )
}