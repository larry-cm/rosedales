import { type objetosSlides } from "@type/global";
import { turso } from "@services/turso";

export async function getImages() {
    let IMAGES: objetosSlides = [{ url: "", alt: "" }];
    try {
        const { rows } = await turso.execute({
            sql: "select id,logo,title,local from local where logo is not null order by id DESC;",
        });
        return rows.map(({ logo: url, title: alt, local }) => ({
            url: url?.toString() ?? "",
            alt: alt?.toString() ?? "",
            local: parseInt(local?.toString() ?? ""),
        }));
    } catch (error) {
        throw new Error(
            "Error al intentar capturar las imágenes del primer carousel" + error,
        );
    }
    return IMAGES;
}
export const getMonths = () => {
    const m = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const i = new Date().getMonth();
    return m.map((_, idx) => ({ month: m[(i + idx) % 12], url: null }));
};
