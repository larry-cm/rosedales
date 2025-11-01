
import type { APIRoute } from "astro";
import { turso } from "@services/turso";
// export const prerender = false;

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const data = await request.formData();
  const cate = data.get("cate") as string;
  const subCate = data.get("sub-cate") as string;

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
      args: [cate]
    })
    return new Response(
      JSON.stringify({
        path: new URL(request.url).pathname,
        data: rows,
      }),
    );
  }
  if (!cate && subCate) {
    const { rows } = await turso.execute({
      sql: `
SELECT distinct
  l.*
FROM
  local l
  JOIN local_subcategory lsbc ON l.id = lsbc.local_id
  JOIN subcategory sb ON lsbc.subcategory_id = sb.id
WHERE sb.name = ? 
ORDER BY
  l.local ASC;
                `,
      args: [subCate]
    })

    return new Response(
      JSON.stringify({
        path: new URL(request.url).pathname,
        data: rows,
      }),
    );
  }
  if (!cate || !subCate) {
    return new Response(
      JSON.stringify({
        path: new URL(request.url).pathname,
        data: [],
      }),
    );
  }

  const { rows } = await turso.execute({
    sql: `
SELECT DISTINCT
  l.*
FROM
  local l
  JOIN local_subcategory lsbc ON l.id = lsbc.local_id
  JOIN subcategory sb ON lsbc.subcategory_id = sb.id
WHERE
  sb.name = ?
  AND l.id IN (
   SELECT 
  l.id
FROM local l
 JOIN local_category lc on l.id = lc.local_id
 JOIN category c ON lc.category_id = c.id
WHERE
  c.name = ?
  )
ORDER BY
  l.local ASC;
  `,
    args: [subCate, cate]
  })

  return new Response(
    JSON.stringify({
      path: new URL(request.url).pathname,
      data: rows,
    }),
  );
};