interface Env { DB: D1Database }
interface ProductRow { id:number; asin:string; name:string; brand:string; category:string; description:string; highlights_json:string; image:string; url:string }
function serialize(row: ProductRow) { return { id:row.id, asin:row.asin, name:row.name, brand:row.brand, category:row.category, description:row.description, highlights:JSON.parse(row.highlights_json || '[]'), image:row.image, url:row.url }; }
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const { results=[] } = await env.DB.prepare('SELECT id, asin, name, brand, category, description, highlights_json, image, url FROM products ORDER BY id').all<ProductRow>();
    return Response.json(results.map(serialize), { headers: { 'Cache-Control':'public, max-age=60' } });
  } catch { return Response.json({ error:'Catalogue database is not configured yet.' }, { status:503 }); }
};
