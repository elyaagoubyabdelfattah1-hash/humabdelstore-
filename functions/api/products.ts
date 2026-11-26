interface Env { DB: D1Database }
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const { results } = await env.DB.prepare("SELECT id, asin, name, brand, category, description, highlights_json, image, url FROM products ORDER BY id").all();
    const products = (results || []).map((row: Record<string, unknown>) => ({
      id: Number(row.id), asin: String(row.asin || ""), name: String(row.name || ""), brand: String(row.brand || ""),
      category: String(row.category || "Other Categories"), description: String(row.description || ""),
      highlights: safeHighlights(row.highlights_json), image: String(row.image || ""), url: String(row.url || "")
    }));
    return Response.json({ products }, { headers: { "Cache-Control": "public, max-age=60, s-maxage=60" } });
  } catch {
    return Response.json({ error: "Product catalogue is not available. Check the D1 database and migrations." }, { status: 503 });
  }
};
function safeHighlights(value: unknown): string[] {
  try { const parsed = JSON.parse(String(value || "[]")); return Array.isArray(parsed) ? parsed.map(String) : []; } catch { return []; }
}
