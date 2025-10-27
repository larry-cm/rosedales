import { turso } from "@services/turso";
import type { TypeCategories } from "@type/global";

import { type APIRoute } from "astro";
export const GET: APIRoute = async () => {
    // buscando las categorías
    let Cate
    try {
        const { rows: categoryRows } = await turso.execute({
            sql: "select name as nameCategory from category;",
        })
        Cate = categoryRows
    } catch (error) {
        console.error("Error al pedir las categorías: ", error)
    }

    // buscando las sub categorías
    let SubCate
    try {
        const { rows: subcategoryRows } = await turso.execute({
            sql: "select s.name as subCategory from subcategory s join category c on s.category_id = c.id order by s.name ASC;",
        });
        SubCate = subcategoryRows;
    } catch (error) {
        console.error("Error al pedir las sub categorías: ", error);
    }

    // buscando los locales
    let Locals
    try {
        const { rows: localRows } = await turso.execute({
            sql: "select * from local",
        });
        Locals = localRows;
    } catch (error) {
        console.error("Error al pedir los locales: ", error);
    }
    if (!Locals || !Cate || !SubCate) return new Response(JSON.stringify({
        Locals: undefined,
        Cate: undefined,
        SubCate: undefined,
        Message: "Ocurrió un error con alguna de las peticiones"
    }), { status: 400 })
    return new Response(JSON.stringify({
        Locals,
        Cate,
        SubCate
    } as TypeCategories))
}