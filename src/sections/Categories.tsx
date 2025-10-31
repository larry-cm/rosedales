import { cld } from "@services/cloudinary"
import { RefreshCcw } from "react-feather";
import { useEffect, useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import LocalCard from "./components/LocalCard";
import NoResults from "./components/NoResults";
import Pagination from "./components/Pagination";
import SelectReact from "@components/SelectReact";
import type { Row } from "@libsql/client";
import type { TypeCategories } from "@type/global";

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

export default function Categories() {
    const [cateVal, setCateVal] = useState<string | null>(null)
    const [subCateVal, setSubCateVal] = useState<string | null>(null)
    const [loadingGlobal, setLoadingGlobal] = useState<boolean>(false)
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
    async function getAllDataCategories() {
        setLoadingGlobal(true)
        setData(await getInitial())
        setLoadingGlobal(false)
    }

    useEffect(() => {
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

    if (loadingGlobal) return (
        <div className="overflow-hidden min-h-screen">
            <LoadingSpinner className="min-w-screen" />
        </div>
    )

    return (
        <section id="locales" className=" pt-22">
            <h4 className="text-4xl text-center pb-4 " >
                Selecciona por <b>categorías</b>
            </h4>

            <div className="p-8 m-8 mt-10 rounded-2xl shadow text-xl bg-green-500">
                <form
                    onSubmit={(e) => { e.preventDefault() }}
                    action="api/locales.json"
                    method="POST"
                    className="flex flex-col lg:flex-row justify-between gap-6"
                >
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
                        <button
                            className="px-4 flex-1 py-2 font-semibold cursor-pointer bg-white hover:bg-zinc-200 transition duration-200 rounded-lg shadow ring ring-green-700 btn-effect"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Buscar
                        </button>
                    </div>
                </form>
            </div>

            <section
                className="m-8 rounded-2xl  overflow-hidden"
            >
                <div className="rounded-2xl min-h-fit sm:h-[50vh] p-8">
                    {
                        loadingUpdate ? (
                            <LoadingSpinner className="min-w-screen" />
                        ) : Locals && Locals?.length <= 0 ? (
                            <NoResults />
                        ) : (
                            <div
                                className={`grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 ${animating ? 'animate-page-transition' : ''}`}
                            >
                                {currentItems.map((localItem, index) => (
                                    <div
                                        key={localItem.local?.toString() ?? localItem.title?.toString()}
                                        className="animate-fade-in"
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
    )
}