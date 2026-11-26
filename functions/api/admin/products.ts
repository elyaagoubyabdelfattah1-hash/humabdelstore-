interface Env { DB: D1Database }
type ProductInput = { asin?: string; name?: string; brand?: string; category?: string; description?: string; highlights?: string[]; image?: string; url?: string };
const fields = ["asin", "name", "brand", "category", "description", "highlights_json", "image", "url"] as const;
function clean(input: ProductInput) {
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const category = typeof input.category === "string" ? input.category.trim() : "";
  const highlights = Array.isArray(input.highlights) ? input.highlights.map(v => String(v).trim()).filter(Boolean).slice(0, 10) : [];
  const value = (v: unknown) => typeof v === "string" ? v.trim() : "";
  return { asin: value(input.asin), name, brand: value(input.brand), category, description: value(input.description), highlights_json: JSON.stringify(highlights), image: value(input.image), url: value(input.url) };
}
function validUrl(value: string) { if (!value) return true; try { const u = new URL(value); return u.protocol === "https:"; } catch { return false; } }

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.DB.prepare("SELECT id, asin, name, brand, category, description, highlights_json, image, url FROM products ORDER BY id DESC").all();
  return Response.json({ products: (results || []).map((r: Record<string, unknown>) => ({ id:Number(r.id), asin:r.asin, name:r.name, brand:r.brand, category:r.category, description:r.description, highlights:parse(r.highlights_json), image:r.image, url:r.url })) }, { headers: { "Cache-Control": "no-store" } });
};
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: ProductInput;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid product data." }, { status: 400 }); }
  const p = clean(body);
  if (!p.name || !p.category || !validUrl(p.image) || !validUrl(p.url)) return Response.json({ error: "Product name, category, and valid HTTPS image/link URLs are required." }, { status: 400 });
  const result = await env.DB.prepare("INSERT INTO products (asin,name,brand,category,description,highlights_json,image,url) VALUES (?,?,?,?,?,?,?,?)").bind(p.asin,p.name,p.brand,p.category,p.description,p.highlights_json,p.image,p.url).run();
  return Response.json({ ok: true, id: result.meta.last_row_id }, { status: 201 });
};
function parse(value: unknown): string[] { try { const v=JSON.parse(String(value || "[]")); return Array.isArray(v)?v:[]; } catch { return []; } }
