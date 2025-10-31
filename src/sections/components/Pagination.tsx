import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'react-feather';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    // Constantes para evitar magic numbers
    const MAX_VISIBLE_PAGES = 5;
    const MIN_PAGE = 1;
    const ANIMATION_DURATION_MS = 300;
    const BUTTON_SIZE_CLASS = "w-4 h-4";
    const GAP_CLASS = "gap-2";
    const PAGINATION_BUTTON_SIZE = "px-3 py-2";
    const CONTROL_BUTTON_SIZE = "p-2";
    const CONTAINER_PADDING = "px-4 py-2 sm:px-8 sm:py-4 ";
    const MARGIN_TOP = "mt-6";

    const TAILWIND_CLASSES = {
        BUTTON_BORDER: "border border-gray-300",
        BUTTON_DISABLED: "disabled:opacity-50 disabled:cursor-not-allowed",
        BUTTON_HOVER: "hover:bg-gray-50 hover:bg-zinc-200 cursor-pointer ",
        BUTTON_FOCUS: "focus:outline-none focus:ring-2 focus:ring-green-500",
        TRANSITION: `transition-colors duration-${ANIMATION_DURATION_MS}`
    };

    // Calcular rango de páginas a mostrar
    const halfOfMaxVisible = 5;
    let startPage = Math.max(MIN_PAGE, currentPage - halfOfMaxVisible);
    let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

    if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
        startPage = Math.max(MIN_PAGE, endPage - MAX_VISIBLE_PAGES + 1);
    }

    const pageNumbers: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const getPageNumbers = () => {
        if (totalPages <= MAX_VISIBLE_PAGES) {
            return Array.from({ length: totalPages }, (_, i) => i + MIN_PAGE);
        }
        return pageNumbers;
    };

    return (
        <div className={`flex  items-center justify-center ${GAP_CLASS} ${MARGIN_TOP} ${CONTAINER_PADDING}  `}>
            {/* Controles de paginación */}
            {/* Página anterior */}
            <button
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onPageChange(currentPage - 1)
                }}
                disabled={currentPage === MIN_PAGE}
                className={`${CONTROL_BUTTON_SIZE} rounded-lg ${TAILWIND_CLASSES.BUTTON_BORDER} ${TAILWIND_CLASSES.BUTTON_DISABLED} ${TAILWIND_CLASSES.BUTTON_HOVER} ${TAILWIND_CLASSES.TRANSITION} ${TAILWIND_CLASSES.BUTTON_FOCUS}`}
                title="Página anterior"
            >
                <ChevronLeft className={BUTTON_SIZE_CLASS} />
            </button>

            {/* Números de página */}
            {getPageNumbers().map((pageNum) => (
                <button
                    key={pageNum}
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onPageChange(pageNum)
                    }}
                    className={`${PAGINATION_BUTTON_SIZE} hidden sm:block rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 ${currentPage === pageNum
                        ? 'bg-green-500 text-white  font-semibold shadow-lg'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-zinc-200 cursor-pointer transition duration-200'
                        }`}
                >
                    {pageNum}
                </button>
            ))}

            {/* Página siguiente */}
            <button
                id="next-page-btn"
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const button = e.currentTarget as HTMLButtonElement;
                    button.blur(); // Remover foco temporalmente
                    onPageChange(currentPage + 1)
                    // Restaurar foco después de un breve delay
                    setTimeout(() => {
                        button.focus();
                    }, 100);
                }}
                disabled={currentPage === totalPages}
                className={`${CONTROL_BUTTON_SIZE} rounded-lg ${TAILWIND_CLASSES.BUTTON_BORDER} ${TAILWIND_CLASSES.BUTTON_DISABLED} ${TAILWIND_CLASSES.BUTTON_HOVER} ${TAILWIND_CLASSES.TRANSITION} ${TAILWIND_CLASSES.BUTTON_FOCUS}`}
                title="Página siguiente"
            >
                <ChevronRight className={BUTTON_SIZE_CLASS} />
            </button>
        </div>
    );
};

export default Pagination;
