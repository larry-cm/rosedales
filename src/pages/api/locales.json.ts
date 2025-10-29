
import type { APIRoute } from "astro";
import { turso } from "@services/turso";
export const prerender = false;

export const POST: APIRoute = async ({ request, locals, redirect }) => {
    const data = await request.formData();
    const cate = data.get("cate");
    const subCate = data.get("sub-cate");

    if (cate && !subCate) {
        const { rows } = await turso.execute({
            sql: `
SELECT
  *
FROM
  local l
  JOIN local_category lc ON l.id = lc.local_id
  JOIN category c ON lc.category_id = c.id
WHERE
  c.name = ?
ORDER BY
  l.local ASC;
`,
            args: [cate as string]
        })
        return new Response(
            JSON.stringify({
                path: new URL(request.url).pathname,
                data: rows,
            }),
        );
    }
    if (!cate && subCate) {
        return new Response(
            JSON.stringify({
                path: new URL(request.url).pathname,
                data: [],
            }),
        );
    }
    if (!cate || !subCate) {
         const { rows } = await turso.execute({
            sql: "select logo,title,local from local where logo is not null;",
        });
        return new Response(
            JSON.stringify({
                path: new URL(request.url).pathname,
                 data:rows,
            }),
        );
    }
    return new Response(
        JSON.stringify({
            path: new URL(request.url).pathname,
            message: "hi!",
        }),
    );
};